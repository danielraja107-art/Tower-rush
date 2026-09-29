import { Canvas } from '@react-three/fiber'
import { PhysicsProvider } from './components/PhysicsProvider'
import { Scene } from './components/Scene'
import { UIShell } from './components/UIShell'
import { useGameStore, selectGameState } from './store/gameStore'
import { useEffect } from 'react'

function GameCanvas() {
  const _gameState = useGameStore(selectGameState)

  return (
    <Canvas
      camera={{ position: [0, 25, 30], fov: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      shadows={{ type: 2, autoUpdate: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x87ceeb, 1)
        gl.toneMapping = 2
        gl.toneMappingExposure = 1.0
      }}
    >
      <PhysicsProvider>
        <Scene />
      </PhysicsProvider>
    </Canvas>
  )
}

export function App() {
  const { goToState } = useGameStore()

  useEffect(() => {
    if (useGameStore.getState().currentState === 'LOADING') {
      const timer = setTimeout(() => {
        if (useGameStore.getState().currentState === 'LOADING') {
          goToState('HOME')
        }
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [goToState])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <GameCanvas />
      <UIShell />
    </div>
  )
}