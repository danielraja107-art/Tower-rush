import { useGameStore } from '@/store/gameStore'
import { Header } from './Header'
import { HomeScreen } from './screens/HomeScreen'
import { TowerSelectionScreen } from './screens/TowerSelectionScreen'
import { BallSelectionScreen } from './screens/BallSelectionScreen'
import { WagerSelectionScreen } from './screens/WagerSelectionScreen'
import { RoundConfirmationScreen } from './screens/RoundConfirmationScreen'
import { CountdownScreen } from './screens/CountdownScreen'
import { RaceHUD } from './screens/RaceHUD'
import { ResultScreen } from './screens/ResultScreen'
import { CelebrationScreen } from './screens/CelebrationScreen'
import { RoundCompleteScreen } from './screens/RoundCompleteScreen'
import { LoadingScreen } from './screens/LoadingScreen'

export function UIShell() {
  const { currentState, isTransitioning, transitionProgress } = useGameStore()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <Header />

      <main
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderScreen(currentState)}
      </main>

      {isTransitioning && (
        <TransitionOverlay progress={transitionProgress} />
      )}
    </div>
  )
}

function renderScreen(state: string) {
  switch (state) {
    case 'LOADING':
      return <LoadingScreen />
    case 'HOME':
      return <HomeScreen />
    case 'TOWER_SELECTION':
      return <TowerSelectionScreen />
    case 'BALL_SELECTION':
      return <BallSelectionScreen />
    case 'WAGER_SELECTION':
      return <WagerSelectionScreen />
    case 'ROUND_CONFIRMATION':
      return <RoundConfirmationScreen />
    case 'COUNTDOWN':
      return <CountdownScreen />
    case 'RACING':
      return <RaceHUD />
    case 'FINISH_DETECTION':
      return <RaceHUD />
    case 'RESULT':
      return <ResultScreen />
    case 'CELEBRATION':
      return <CelebrationScreen />
    case 'ROUND_COMPLETE':
      return <RoundCompleteScreen />
    default:
      return <HomeScreen />
  }
}

function TransitionOverlay({ progress }: { progress: number }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(45, 45, 45, 0.5)',
        opacity: 1 - progress,
        pointerEvents: 'none',
        zIndex: 100,
        transition: 'opacity 0.3s ease',
      }}
    />
  )
}