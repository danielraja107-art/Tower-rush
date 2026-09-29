import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeScreen } from '@/components/screens/HomeScreen'
import { TowerSelectionScreen } from '@/components/screens/TowerSelectionScreen'
import { BallSelectionScreen } from '@/components/screens/BallSelectionScreen'
import { WagerSelectionScreen } from '@/components/screens/WagerSelectionScreen'
import { createTestStore } from './testUtils'

describe('UI Screens', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    createTestStore()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('HomeScreen', () => {
    it('should render title and tagline', () => {
      render(<HomeScreen />)

      expect(screen.getByText('TOWER RUSH')).toBeInTheDocument()
      expect(screen.getByText('Four Balls. One Winner.')).toBeInTheDocument()
    })

    it('should render start button', () => {
      render(<HomeScreen />)

      const startButton = screen.getByRole('button', { name: /start new round/i })
      expect(startButton).toBeInTheDocument()
    })

    it('should render secondary links', () => {
      render(<HomeScreen />)

      expect(screen.getByText('How to Play')).toBeInTheDocument()
      expect(screen.getByText('Rules')).toBeInTheDocument()
      expect(screen.getByText('Terms & Conditions')).toBeInTheDocument()
      expect(screen.getByText('Betting Disclaimer')).toBeInTheDocument()
      expect(screen.getByText('Responsible Play')).toBeInTheDocument()
    })
  })

  describe('TowerSelectionScreen', () => {
    it('should render all three towers', () => {
      render(<TowerSelectionScreen />)

      expect(screen.getByText('TIMBER CASCADE')).toBeInTheDocument()
      expect(screen.getByText('SPIRAL TIMBER')).toBeInTheDocument()
      expect(screen.getByText('FOREST SWITCHBACK')).toBeInTheDocument()
    })

    it('should show tower descriptions', () => {
      render(<TowerSelectionScreen />)

      expect(screen.getByText(/classic wooden race tower/i)).toBeInTheDocument()
      expect(screen.getByText(/tall circular tower/i)).toBeInTheDocument()
      expect(screen.getByText(/cinematic outdoor tower/i)).toBeInTheDocument()
    })

    it('should have back and continue buttons', () => {
      render(<TowerSelectionScreen />)

      expect(screen.getByRole('button', { name: /^back$/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
    })

    it('should disable continue button when no tower selected', () => {
      createTestStore({ selectedTower: null })
      render(<TowerSelectionScreen />)

      const continueButton = screen.getByRole('button', { name: /continue/i })
      expect(continueButton).toBeDisabled()
    })
  })

  describe('BallSelectionScreen', () => {
    it('should render all four balls', () => {
      render(<BallSelectionScreen />)

      expect(screen.getByText('RUBY')).toBeInTheDocument()
      expect(screen.getByText('SAPPHIRE')).toBeInTheDocument()
      expect(screen.getByText('EMERALD')).toBeInTheDocument()
      expect(screen.getByText('AMBER')).toBeInTheDocument()
    })

    it('should have back and continue buttons', () => {
      render(<BallSelectionScreen />)

      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
    })

    it('should disable continue button when no ball selected', () => {
      createTestStore({ selectedBall: null })
      render(<BallSelectionScreen />)

      const continueButton = screen.getByRole('button', { name: /continue/i })
      expect(continueButton).toBeDisabled()
    })
  })

  describe('WagerSelectionScreen', () => {
    it('should render wager options', () => {
      render(<WagerSelectionScreen />)

      expect(screen.getByText('$1')).toBeInTheDocument()
      expect(screen.getByText('$5')).toBeInTheDocument()
      expect(screen.getByText('$10')).toBeInTheDocument()
      expect(screen.getByText('$25')).toBeInTheDocument()
      expect(screen.getByText('$50')).toBeInTheDocument()
    })

    it('should show balance and after wager', () => {
      createTestStore({ demoBalance: 250, selectedWager: 10 })
      render(<WagerSelectionScreen />)

      expect(screen.getByText('Demo Balance')).toBeInTheDocument()
      expect(screen.getByText('After Wager')).toBeInTheDocument()
      expect(screen.getByText('Potential Win')).toBeInTheDocument()
    })

    it('should have plus/minus adjusters', () => {
      render(<WagerSelectionScreen />)

      expect(screen.getByRole('button', { name: /decrease wager/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /increase wager/i })).toBeInTheDocument()
    })

    it('should have back and place wager buttons', () => {
      render(<WagerSelectionScreen />)

      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /place wager/i })).toBeInTheDocument()
    })
  })
})

describe('Accessibility', () => {
  beforeEach(() => {
    createTestStore()
  })

  it('should have proper button roles', () => {
    render(<HomeScreen />)

    const startButton = screen.getByRole('button', { name: /start new round/i })
    expect(startButton).toHaveAttribute('type', 'button')
  })

  it('should have proper heading hierarchy', () => {
    render(<HomeScreen />)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('TOWER RUSH')
  })

  it('should have color-independent selection indicators', () => {
    render(<BallSelectionScreen />)

    const ballCards = screen.getAllByRole('button', { name: /ruby|sapphire|emerald|amber/i })
    expect(ballCards.length).toBe(4)
  })
})