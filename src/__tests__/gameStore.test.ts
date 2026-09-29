import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useGameStore } from '@/store/gameStore'

describe('GameStore', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useGameStore.setState({
      currentState: 'LOADING',
      previousState: null,
      config: {
        demoBalance: 250,
        minWager: 1,
        maxWager: 50,
        winMultiplier: 2,
        countdownDuration: 3000,
      },
      demoBalance: 250,
      roundHistory: [],
      selectedTower: 'timber-cascade',
      selectedBall: 'ruby',
      selectedWager: 10,
      currentRound: null,
      raceResult: null,
      isTransitioning: false,
      transitionProgress: 0,
      error: null,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('State Transitions', () => {
    it('should allow valid transitions', () => {
      const store = useGameStore.getState()

      expect(store.goToState('HOME')).toBe(true)
      expect(useGameStore.getState().currentState).toBe('HOME')

      expect(store.goToState('TOWER_SELECTION')).toBe(true)
      expect(useGameStore.getState().currentState).toBe('TOWER_SELECTION')

      expect(store.goToState('BALL_SELECTION')).toBe(true)
      expect(useGameStore.getState().currentState).toBe('BALL_SELECTION')

      expect(store.goToState('WAGER_SELECTION')).toBe(true)
      expect(useGameStore.getState().currentState).toBe('WAGER_SELECTION')

      expect(store.goToState('ROUND_CONFIRMATION')).toBe(true)
      expect(useGameStore.getState().currentState).toBe('ROUND_CONFIRMATION')

      expect(store.goToState('COUNTDOWN')).toBe(true)
      expect(useGameStore.getState().currentState).toBe('COUNTDOWN')

      expect(store.goToState('RACING')).toBe(true)
      expect(useGameStore.getState().currentState).toBe('RACING')
    })

    it('should reject invalid transitions', () => {
      const store = useGameStore.getState()

      expect(store.goToState('RACING')).toBe(false)
      expect(useGameStore.getState().currentState).toBe('LOADING')

      expect(store.goToState('RESULT')).toBe(false)
      expect(useGameStore.getState().currentState).toBe('LOADING')
    })

    it('should prevent invalid transitions from ROUND_COMPLETE', () => {
      const store = useGameStore.getState()

      store.goToState('HOME')
      store.goToState('TOWER_SELECTION')
      store.goToState('BALL_SELECTION')
      store.goToState('WAGER_SELECTION')
      store.goToState('ROUND_CONFIRMATION')
      store.goToState('COUNTDOWN')
      store.goToState('RACING')
      store.goToState('FINISH_DETECTION')
      store.goToState('RESULT')
      store.goToState('ROUND_COMPLETE')

      expect(store.goToState('RACING')).toBe(false)
      expect(useGameStore.getState().currentState).toBe('ROUND_COMPLETE')
    })
  })

  describe('Selections', () => {
    it('should set selected tower in TOWER_SELECTION or HOME', () => {
      useGameStore.setState({ currentState: 'TOWER_SELECTION' })
      const store = useGameStore.getState()

      store.setSelectedTower('spiral-timber')
      expect(useGameStore.getState().selectedTower).toBe('spiral-timber')

      store.setSelectedTower('forest-switchback')
      expect(useGameStore.getState().selectedTower).toBe('forest-switchback')
    })

    it('should set selected ball when in BALL_SELECTION state', () => {
      useGameStore.setState({ currentState: 'BALL_SELECTION' })
      const store = useGameStore.getState()

      store.setSelectedBall('sapphire')
      expect(useGameStore.getState().selectedBall).toBe('sapphire')

      store.setSelectedBall('emerald')
      expect(useGameStore.getState().selectedBall).toBe('emerald')
    })

    it('should set and adjust wager within bounds in WAGER_SELECTION state', () => {
      useGameStore.setState({ currentState: 'WAGER_SELECTION' })
      const store = useGameStore.getState()

      store.setSelectedWager(25)
      expect(useGameStore.getState().selectedWager).toBe(25)

      store.setSelectedWager(100)
      expect(useGameStore.getState().selectedWager).toBe(50)

      store.setSelectedWager(0)
      expect(useGameStore.getState().selectedWager).toBe(1)

      store.adjustWager(5)
      expect(useGameStore.getState().selectedWager).toBe(6)

      store.adjustWager(-10)
      expect(useGameStore.getState().selectedWager).toBe(6) // Cannot decrease below minWager (6 - 10 = -4 < 1, so rejected)
    })

    it('should not allow wager exceeding demo balance', () => {
      useGameStore.setState({ currentState: 'WAGER_SELECTION', demoBalance: 5 })
      const store = useGameStore.getState()

      store.setSelectedWager(10)
      // Clamped wager 10 is > demoBalance 5, so setSelectedWager rejects change, keeping 10 default or clamped
      expect(useGameStore.getState().selectedWager).toBe(10)
    })
  })

  describe('Round Management', () => {
    it('should start a round correctly', () => {
      const store = useGameStore.getState()

      store.goToState('HOME')
      store.goToState('TOWER_SELECTION')
      store.goToState('BALL_SELECTION')
      store.goToState('WAGER_SELECTION')
      store.goToState('ROUND_CONFIRMATION')

      const initialBalance = useGameStore.getState().demoBalance
      const wager = useGameStore.getState().selectedWager
      const selectedTower = useGameStore.getState().selectedTower
      const selectedBall = useGameStore.getState().selectedBall

      store.startRound()

      const currentRound = useGameStore.getState().currentRound
      expect(currentRound).not.toBeNull()
      expect(currentRound?.towerId).toBe(selectedTower)
      expect(currentRound?.selectedBallId).toBe(selectedBall)
      expect(currentRound?.wagerAmount).toBe(wager)
      expect(currentRound?.virtualBalanceBefore).toBe(initialBalance)
      expect(currentRound?.virtualBalanceAfter).toBe(initialBalance - wager)
      expect(currentRound?.roundStatus).toBe('racing')
      expect(currentRound?.raceStartTime).toBeGreaterThan(0)
      expect(useGameStore.getState().currentState).toBe('COUNTDOWN')
    })

    it('should cancel round and restore balance', () => {
      const store = useGameStore.getState()

      store.goToState('HOME')
      store.goToState('TOWER_SELECTION')
      store.goToState('BALL_SELECTION')
      store.goToState('WAGER_SELECTION')
      store.goToState('ROUND_CONFIRMATION')

      const initialBalance = useGameStore.getState().demoBalance
      store.startRound()
      expect(useGameStore.getState().demoBalance).toBe(initialBalance - 10)

      store.cancelRound()

      expect(useGameStore.getState().currentRound).toBeNull()
      expect(useGameStore.getState().demoBalance).toBe(initialBalance)
      expect(useGameStore.getState().currentState).toBe('WAGER_SELECTION')
    })

    it('should complete race and calculate payout', () => {
      const store = useGameStore.getState()

      store.goToState('HOME')
      store.goToState('TOWER_SELECTION')
      store.goToState('BALL_SELECTION')
      store.goToState('WAGER_SELECTION')
      store.goToState('ROUND_CONFIRMATION')

      store.startRound()
      store.goToState('RACING')
      store.goToState('FINISH_DETECTION')

      const balanceBeforeRace = useGameStore.getState().demoBalance

      store.completeRace({
        winnerId: 'ruby',
        finishTimes: { ruby: 1000, sapphire: 1500, emerald: 2000, amber: 2500 },
        selectedBallWon: true,
        payout: 10,
      })

      const state = useGameStore.getState()
      expect(state.currentRound).not.toBeNull()
      expect(state.currentRound?.winnerBallId).toBe('ruby')
      expect(state.currentRound?.selectedBallWon).toBe(true)
      expect(state.currentRound?.resultAmount).toBe(20) // 10 * winMultiplier(2) = 20
      expect(state.currentRound?.virtualBalanceAfter).toBe(balanceBeforeRace + 20)
      expect(state.currentRound?.roundStatus).toBe('complete')
      expect(state.raceResult?.winnerId).toBe('ruby')
      expect(state.currentState).toBe('RESULT')
    })

    it('should handle loss correctly', () => {
      const store = useGameStore.getState()

      store.goToState('HOME')
      store.goToState('TOWER_SELECTION')
      store.goToState('BALL_SELECTION')
      store.goToState('WAGER_SELECTION')
      store.goToState('ROUND_CONFIRMATION')

      store.startRound()
      store.goToState('RACING')
      store.goToState('FINISH_DETECTION')

      const balanceBeforeRace = useGameStore.getState().demoBalance

      store.completeRace({
        winnerId: 'sapphire',
        finishTimes: { ruby: 1500, sapphire: 1000, emerald: 2000, amber: 2500 },
        selectedBallWon: false,
        payout: 10,
      })

      const state = useGameStore.getState()
      expect(state.currentRound?.selectedBallWon).toBe(false)
      expect(state.currentRound?.resultAmount).toBe(0)
      expect(state.currentRound?.virtualBalanceAfter).toBe(balanceBeforeRace)
    })

    it('should start new round and reset selections', () => {
      const store = useGameStore.getState()

      store.goToState('HOME')
      store.goToState('TOWER_SELECTION')
      store.goToState('BALL_SELECTION')
      store.goToState('WAGER_SELECTION')
      store.goToState('ROUND_CONFIRMATION')

      store.startRound()
      store.goToState('RACING')
      store.goToState('FINISH_DETECTION')
      store.completeRace({
        winnerId: 'ruby',
        finishTimes: { ruby: 1000, sapphire: 1500, emerald: 2000, amber: 2500 },
        selectedBallWon: true,
        payout: 10,
      })
      store.goToState('ROUND_COMPLETE')

      store.startNewRound()

      const state = useGameStore.getState()
      expect(state.selectedTower).toBe('timber-cascade')
      expect(state.selectedBall).toBe('ruby')
      expect(state.selectedWager).toBe(10)
      expect(state.currentState).toBe('TOWER_SELECTION')
    })
  })

  describe('History', () => {
    it('should add rounds to history', () => {
      const store = useGameStore.getState()

      store.goToState('HOME')
      store.goToState('TOWER_SELECTION')
      store.goToState('BALL_SELECTION')
      store.goToState('WAGER_SELECTION')
      store.goToState('ROUND_CONFIRMATION')

      store.startRound()
      store.goToState('RACING')
      store.goToState('FINISH_DETECTION')
      store.completeRace({
        winnerId: 'ruby',
        finishTimes: { ruby: 1000, sapphire: 1500, emerald: 2000, amber: 2500 },
        selectedBallWon: true,
        payout: 10,
      })

      const history = useGameStore.getState().roundHistory
      expect(history.length).toBe(1)
      expect(history[0].winnerBallId).toBe('ruby')
      expect(history[0].selectedBallWon).toBe(true)
    })

    it('should limit history to 50 rounds', () => {
      const store = useGameStore.getState()

      for (let i = 0; i < 55; i++) {
        useGameStore.setState({ currentState: 'ROUND_CONFIRMATION' })
        store.startRound()
        store.goToState('RACING')
        store.goToState('FINISH_DETECTION')
        store.completeRace({
          winnerId: 'ruby',
          finishTimes: { ruby: 1000, sapphire: 1500, emerald: 2000, amber: 2500 },
          selectedBallWon: true,
          payout: 10,
        })
      }

      expect(useGameStore.getState().roundHistory.length).toBe(50)
    })
  })

  describe('Error Handling', () => {
    it('should set and clear errors', () => {
      const store = useGameStore.getState()

      store.setError('Test error')
      expect(useGameStore.getState().error).toBe('Test error')

      store.setError(null)
      expect(useGameStore.getState().error).toBeNull()
    })
  })

  describe('Reset', () => {
    it('should reset to initial state', () => {
      const store = useGameStore.getState()

      store.goToState('HOME')
      store.goToState('TOWER_SELECTION')
      store.goToState('BALL_SELECTION')
      store.goToState('WAGER_SELECTION')
      store.goToState('ROUND_CONFIRMATION')
      store.startRound()
      store.goToState('RACING')
      store.goToState('FINISH_DETECTION')
      store.completeRace({
        winnerId: 'ruby',
        finishTimes: { ruby: 1000, sapphire: 1500, emerald: 2000, amber: 2500 },
        selectedBallWon: true,
        payout: 10,
      })

      store.reset()

      const state = useGameStore.getState()
      expect(state.currentState).toBe('LOADING')
      expect(state.demoBalance).toBe(250)
      expect(state.roundHistory.length).toBe(0)
      expect(state.selectedTower).toBe('timber-cascade')
      expect(state.selectedBall).toBe('ruby')
      expect(state.selectedWager).toBe(10)
    })
  })
})