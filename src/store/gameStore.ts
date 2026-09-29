import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type {
  GameState,
  BallId,
  TowerId,
  RoundData,
  GameConfig,
  RaceResult,
} from '@/types/game'
import { DEFAULT_CONFIG } from '@/types/game'

interface GameStore {
  currentState: GameState
  previousState: GameState | null

  config: GameConfig
  demoBalance: number
  roundHistory: RoundData[]

  selectedTower: TowerId | null
  selectedBall: BallId | null
  selectedWager: number

  currentRound: RoundData | null
  raceResult: RaceResult | null

  isTransitioning: boolean
  transitionProgress: number

  error: string | null

  setState: (state: GameState) => void
  goToState: (state: GameState) => boolean
  canTransition: (from: GameState, to: GameState) => boolean

  setSelectedTower: (tower: TowerId) => void
  setSelectedBall: (ball: BallId) => void
  setSelectedWager: (wager: number) => void
  adjustWager: (delta: number) => void

  startRound: () => void
  cancelRound: () => void
  completeRace: (result: RaceResult) => void
  startNewRound: () => void

  setDemoBalance: (balance: number) => void
  addToHistory: (round: RoundData) => void

  setTransitioning: (isTransitioning: boolean, progress?: number) => void
  setError: (error: string | null) => void
  reset: () => void
}

const VALID_TRANSITIONS: Record<GameState, GameState[]> = {
  LOADING: ['HOME'],
  HOME: ['TOWER_SELECTION', 'LOADING'],
  TOWER_SELECTION: ['BALL_SELECTION', 'HOME'],
  BALL_SELECTION: ['WAGER_SELECTION', 'TOWER_SELECTION'],
  WAGER_SELECTION: ['ROUND_CONFIRMATION', 'BALL_SELECTION'],
  ROUND_CONFIRMATION: ['COUNTDOWN', 'WAGER_SELECTION'],
  COUNTDOWN: ['RACING', 'ROUND_CONFIRMATION', 'WAGER_SELECTION'],
  RACING: ['FINISH_DETECTION'],
  FINISH_DETECTION: ['RESULT'],
  RESULT: ['CELEBRATION', 'ROUND_COMPLETE'],
  CELEBRATION: ['ROUND_COMPLETE'],
  ROUND_COMPLETE: ['TOWER_SELECTION', 'HOME'],
}

const initialRoundData = (): RoundData => ({
  roundId: '',
  towerId: 'timber-cascade',
  selectedBallId: 'ruby',
  wagerAmount: 10,
  virtualBalanceBefore: DEFAULT_CONFIG.demoBalance,
  virtualBalanceAfter: DEFAULT_CONFIG.demoBalance,
  raceStartTime: 0,
  raceEndTime: null,
  winnerBallId: null,
  selectedBallWon: null,
  resultAmount: 0,
  roundStatus: 'pending',
})

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    currentState: 'LOADING',
    previousState: null,
    config: DEFAULT_CONFIG,
    demoBalance: DEFAULT_CONFIG.demoBalance,
    roundHistory: [],
    selectedTower: 'timber-cascade',
    selectedBall: 'ruby',
    selectedWager: 10,
    currentRound: null,
    raceResult: null,
    isTransitioning: false,
    transitionProgress: 0,
    error: null,

    setState: (state) => set({ currentState: state }),

    goToState: (newState) => {
      const { currentState } = get()
      if (get().canTransition(currentState, newState)) {
        set({
          previousState: currentState,
          currentState: newState,
          isTransitioning: true,
          transitionProgress: 0,
        })
        return true
      }
      return false
    },

    canTransition: (from, to) => {
      return VALID_TRANSITIONS[from]?.includes(to) ?? false
    },

    setSelectedTower: (tower) => {
      if (get().currentState === 'TOWER_SELECTION' || get().currentState === 'HOME') {
        set({ selectedTower: tower })
      }
    },

    setSelectedBall: (ball) => {
      if (get().currentState === 'BALL_SELECTION') {
        set({ selectedBall: ball })
      }
    },

    setSelectedWager: (wager) => {
      const { config, demoBalance } = get()
      const clamped = Math.max(config.minWager, Math.min(config.maxWager, wager))
      if (clamped <= demoBalance && get().currentState === 'WAGER_SELECTION') {
        set({ selectedWager: clamped })
      }
    },

    adjustWager: (delta) => {
      const { selectedWager, config, demoBalance } = get()
      const newWager = selectedWager + delta
      if (newWager >= config.minWager && newWager <= config.maxWager && newWager <= demoBalance) {
        set({ selectedWager: newWager })
      }
    },

    startRound: () => {
      const { selectedTower, selectedBall, selectedWager, demoBalance } = get()
      if (!selectedTower || !selectedBall) return

      const roundId = `round_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const newRound: RoundData = {
        ...initialRoundData(),
        roundId,
        towerId: selectedTower,
        selectedBallId: selectedBall,
        wagerAmount: selectedWager,
        virtualBalanceBefore: demoBalance,
        virtualBalanceAfter: demoBalance - selectedWager,
        raceStartTime: Date.now(),
        roundStatus: 'racing',
      }

      set({
        currentRound: newRound,
        demoBalance: demoBalance - selectedWager,
      })
      get().goToState('COUNTDOWN')
    },

    cancelRound: () => {
      const { currentRound, demoBalance } = get()
      if (currentRound) {
        set({
          demoBalance: demoBalance + currentRound.wagerAmount,
          currentRound: null,
        })
      }
      get().goToState('WAGER_SELECTION')
    },

    completeRace: (result) => {
      const { currentRound, demoBalance, config } = get()
      if (!currentRound) return

      const payout = result.selectedBallWon
        ? Math.round(result.payout * config.winMultiplier * 100) / 100
        : 0

      const completedRound: RoundData = {
        ...currentRound,
        raceEndTime: Date.now(),
        winnerBallId: result.winnerId,
        selectedBallWon: result.selectedBallWon,
        resultAmount: payout,
        virtualBalanceAfter: demoBalance + payout,
        roundStatus: 'complete',
      }

      set({
        raceResult: result,
        demoBalance: demoBalance + payout,
        currentRound: completedRound,
      })
      get().addToHistory(completedRound)
      get().goToState('RESULT')
    },

    startNewRound: () => {
      set({
        currentRound: null,
        raceResult: null,
        selectedTower: 'timber-cascade',
        selectedBall: 'ruby',
        selectedWager: 10,
      })
      get().goToState('TOWER_SELECTION')
    },

    setDemoBalance: (balance) => set({ demoBalance: balance }),

    addToHistory: (round) =>
      set((state) => ({
        roundHistory: [round, ...state.roundHistory].slice(0, 50),
      })),

    setTransitioning: (isTransitioning, progress = 0) =>
      set({ isTransitioning, transitionProgress: progress }),

    setError: (error) => set({ error }),

    reset: () =>
      set({
        currentState: 'LOADING',
        previousState: null,
        demoBalance: DEFAULT_CONFIG.demoBalance,
        roundHistory: [],
        selectedTower: 'timber-cascade',
        selectedBall: 'ruby',
        selectedWager: 10,
        currentRound: null,
        raceResult: null,
        isTransitioning: false,
        transitionProgress: 0,
        error: null,
      }),
  }))
)

export const selectGameState = (state: GameStore) => state.currentState
export const selectDemoBalance = (state: GameStore) => state.demoBalance
export const selectSelectedTower = (state: GameStore) => state.selectedTower
export const selectSelectedBall = (state: GameStore) => state.selectedBall
export const selectSelectedWager = (state: GameStore) => state.selectedWager
export const selectCurrentRound = (state: GameStore) => state.currentRound
export const selectRaceResult = (state: GameStore) => state.raceResult
export const selectIsTransitioning = (state: GameStore) => state.isTransitioning
export const selectTransitionProgress = (state: GameStore) => state.transitionProgress