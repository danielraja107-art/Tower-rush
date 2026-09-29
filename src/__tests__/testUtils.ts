import { render } from '@testing-library/react'
import { useGameStore } from '@/store/gameStore'
import { act } from 'react'

export function createTestStore(initialState = {}) {
  return useGameStore.setState({
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
    ...initialState,
  })
}

export function resetTestStore() {
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
}

export async function renderWithStore(ui: React.ReactElement, storeState = {}) {
  createTestStore(storeState)
  return render(ui)
}

export async function advanceTimers(timer: ReturnType<typeof vi.useFakeTimers>, ms: number) {
  await act(async () => {
    timer.advanceTimersByTime(ms)
  })
}

export function mockGsap() {
  const mockTimeline = {
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    call: vi.fn().mockReturnThis(),
  }

  return {
    to: vi.fn().mockImplementation(() => Promise.resolve()),
    from: vi.fn().mockImplementation(() => Promise.resolve()),
    fromTo: vi.fn().mockImplementation(() => Promise.resolve()),
    timeline: vi.fn().mockReturnValue(mockTimeline),
    set: vi.fn(),
    killTweensOf: vi.fn(),
  }
}

export const TEST_BALLS = {
  ruby: { id: 'ruby', name: 'RUBY', color: '#c0392b', metalness: 0.9, roughness: 0.1 },
  sapphire: { id: 'sapphire', name: 'SAPPHIRE', color: '#2980b9', metalness: 0.9, roughness: 0.1 },
  emerald: { id: 'emerald', name: 'EMERALD', color: '#27ae60', metalness: 0.9, roughness: 0.1 },
  amber: { id: 'amber', name: 'AMBER', color: '#f39c12', metalness: 0.9, roughness: 0.1 },
}

export const TEST_TOWERS = {
  'timber-cascade': { id: 'timber-cascade', name: 'TIMBER CASCADE', description: 'Classic wooden race tower' },
  'spiral-timber': { id: 'spiral-timber', name: 'SPIRAL TIMBER', description: 'Tall circular tower' },
  'forest-switchback': { id: 'forest-switchback', name: 'FOREST SWITCHBACK', description: 'Cinematic outdoor tower' },
}