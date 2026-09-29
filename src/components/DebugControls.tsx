import { useEffect, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export function DebugControls() {
  const { camera, gl, scene } = useThree()
  const { currentState, goToState, demoBalance, setDemoBalance, roundHistory } = useGameStore()
  const [isOpen, setIsOpen] = useState(false)
  const [showPhysics, setShowPhysics] = useState(false)
  const [timeScale, setTimeScale] = useState(1)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'p') {
        setShowPhysics((prev) => !prev)
      }
      if (e.key === '1') goToState('HOME')
      if (e.key === '2') goToState('TOWER_SELECTION')
      if (e.key === '3') goToState('BALL_SELECTION')
      if (e.key === '4') goToState('WAGER_SELECTION')
      if (e.key === '5') goToState('ROUND_CONFIRMATION')
      if (e.key === '6') goToState('COUNTDOWN')
      if (e.key === '7') goToState('RACING')
      if (e.key === '8') goToState('RESULT')
      if (e.key === '9') goToState('CELEBRATION')
      if (e.key === '0') goToState('ROUND_COMPLETE')
      if (e.key === 'r') {
        const { startNewRound } = useGameStore.getState()
        startNewRound()
      }
      if (e.key === 'b') {
        setDemoBalance(250)
      }
      if (e.key === '[') setTimeScale(Math.max(0.1, timeScale - 0.1))
      if (e.key === ']') setTimeScale(Math.min(5, timeScale + 0.1))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToState, setDemoBalance, timeScale])

  if (!isOpen) {
    return (
      <Html fullscreen style={{ pointerEvents: 'none', zIndex: 1000 }}>
        <DebugToggle onClick={() => setIsOpen(true)} />
      </Html>
    )
  }

  const stats = gl.info

  return (
    <Html fullscreen style={{ pointerEvents: 'none', zIndex: 1000 }}>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '380px',
          maxHeight: '70vh',
          pointerEvents: 'auto',
        background: 'rgba(20, 20, 20, 0.95)',
        border: '1px solid rgba(184, 134, 11, 0.3)',
        borderRadius: '12px 0 0 0',
        padding: '16px',
        color: '#f5f0e1',
        fontFamily: 'monospace',
        fontSize: '12px',
        lineHeight: 1.5,
        overflow: 'auto',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(184, 134, 11, 0.3)',
        }}
      >
        <span style={{ fontWeight: 600, color: '#daa520' }}>🐛 Debug Panel</span>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#e8dfd0',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ×
        </button>
      </div>

      <DebugSection title="Game State">
        <DebugRow label="Current State" value={currentState} />
        <DebugRow label="Demo Balance" value={`${demoBalance.toFixed(2)}`} />
        <DebugRow label="Rounds Played" value={roundHistory.length} />
        <DebugRow label="Time Scale" value={`${timeScale.toFixed(1)}x`} />
      </DebugSection>

      <DebugSection title="Renderer">
        <DebugRow label="Draw Calls" value={stats.render.calls} />
        <DebugRow label="Triangles" value={stats.render.triangles} />
        <DebugRow label="Points" value={stats.render.points} />
        <DebugRow label="Lines" value={stats.render.lines} />
        <DebugRow label="Geometries" value={stats.memory.geometries} />
        <DebugRow label="Textures" value={stats.memory.textures} />
      </DebugSection>

      <DebugSection title="Camera">
        <DebugRow label="Position" value={`${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)}`} />
        <DebugRow label="Rotation" value={`${THREE.MathUtils.radToDeg(camera.rotation.x).toFixed(1)}, ${THREE.MathUtils.radToDeg(camera.rotation.y).toFixed(1)}, ${THREE.MathUtils.radToDeg(camera.rotation.z).toFixed(1)}`} />
        <DebugRow label="FOV" value={(camera as any).fov?.toFixed(1) ?? 'N/A'} />
      </DebugSection>

      <DebugSection title="Scene">
        <DebugRow label="Objects" value={scene.children.length} />
      </DebugSection>

      <DebugSection title="Controls" style={{ marginTop: '16px' }}>
        <DebugButton onClick={() => goToState('HOME')}>Home</DebugButton>
        <DebugButton onClick={() => goToState('TOWER_SELECTION')}>Tower Select</DebugButton>
        <DebugButton onClick={() => goToState('BALL_SELECTION')}>Ball Select</DebugButton>
        <DebugButton onClick={() => goToState('WAGER_SELECTION')}>Wager</DebugButton>
        <DebugButton onClick={() => goToState('RACING')}>Race</DebugButton>
        <DebugButton onClick={() => goToState('RESULT')}>Result</DebugButton>
        <DebugButton onClick={() => goToState('CELEBRATION')}>Celebrate</DebugButton>
        <DebugButton onClick={() => goToState('ROUND_COMPLETE')}>Round Complete</DebugButton>
        <DebugButton onClick={() => {
          const { startNewRound } = useGameStore.getState()
          startNewRound()
        }}>New Round</DebugButton>
        <DebugButton onClick={() => setDemoBalance(250)}>Reset Balance</DebugButton>
        <DebugButton onClick={() => {
          setTimeScale(timeScale === 1 ? 0.1 : 1)
        }}>Time: {timeScale}x</DebugButton>
        <DebugButton onClick={() => {
          setShowPhysics(!showPhysics)
          console.log('Physics debug:', showPhysics ? 'OFF' : 'ON')
        }}>
          Physics: {showPhysics ? 'ON' : 'OFF'}
        </DebugButton>
      </DebugSection>
    </div>
    </Html>
  )
}

function DebugToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(20, 20, 20, 0.9)',
        border: '1px solid rgba(184, 134, 11, 0.5)',
        color: '#daa520',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        pointerEvents: 'auto',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      🐛
    </button>
  )
}

function DebugSection({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ marginBottom: '16px', ...style }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#daa520',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '8px',
          paddingBottom: '4px',
          borderBottom: '1px solid rgba(184, 134, 11, 0.2)',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

function DebugRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 0',
        fontSize: '12px',
      }}
    >
      <span style={{ color: '#e8dfd0', opacity: 0.7 }}>{label}</span>
      <span style={{ color: '#f5f0e1', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  )
}

function DebugButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '8px 12px',
        marginTop: '8px',
        background: 'rgba(45, 45, 45, 0.6)',
        border: '1px solid rgba(184, 134, 11, 0.3)',
        borderRadius: '6px',
        color: '#f5f0e1',
        fontSize: '11px',
        fontFamily: 'monospace',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        textAlign: 'left',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(184, 134, 11, 0.2)'
        e.currentTarget.style.borderColor = '#daa520'
        e.currentTarget.style.color = '#daa520'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(45, 45, 45, 0.6)'
        e.currentTarget.style.borderColor = 'rgba(184, 134, 11, 0.3)'
        e.currentTarget.style.color = '#f5f0e1'
      }}
    >
      {children}
    </button>
  )
}