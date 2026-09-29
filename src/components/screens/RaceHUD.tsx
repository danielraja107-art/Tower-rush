import { useGameStore } from '@/store/gameStore'
import { BALLS, BallId } from '@/types/game'
import { liveBallProgress } from '@/systems/raceState'
import { useEffect, useState } from 'react'

export function RaceHUD() {
  const { selectedBall, currentRound, currentState } = useGameStore()
  const [positions, setPositions] = useState<Record<BallId, number>>({
    ruby: 0,
    sapphire: 0,
    emerald: 0,
    amber: 0,
  })

  useEffect(() => {
    if (currentState !== 'RACING' && currentState !== 'FINISH_DETECTION') return

    const interval = setInterval(() => {
      setPositions({ ...liveBallProgress })
    }, 100)

    return () => clearInterval(interval)
  }, [currentState])

  const sortedBalls = (Object.keys(positions) as BallId[]).sort((a, b) => positions[b] - positions[a])

  return (
    <div
      style={{
        position: 'absolute',
        top: '100px',
        left: '24px',
        right: '24px',
        pointerEvents: 'none',
        zIndex: 15,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 16px',
            background: 'rgba(45, 45, 45, 0.8)',
            border: '1px solid rgba(184, 134, 11, 0.3)',
            borderRadius: '9999px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: selectedBall ? BALLS[selectedBall].color : '#c0392b',
              boxShadow: `0 0 8px ${selectedBall ? BALLS[selectedBall].color : '#c0392b'}`,
            }}
          />
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#f5f0e1',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            YOUR BALL: {selectedBall ? BALLS[selectedBall].name : 'RUBY'}
          </span>
        </div>

        <div
          style={{
            padding: '8px 16px',
            background: 'rgba(45, 45, 45, 0.8)',
            border: '1px solid rgba(184, 134, 11, 0.3)',
            borderRadius: '9999px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#daa520',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {currentRound ? `Round #${currentRound.roundId.slice(-6)}` : 'Race in Progress'}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxWidth: '280px',
        }}
      >
        {sortedBalls.map((ballId, index) => (
          <PositionRow
            key={ballId}
            position={index + 1}
            ball={BALLS[ballId]}
            progress={Math.min(positions[ballId], 100)}
            isPlayerBall={ballId === selectedBall}
          />
        ))}
      </div>
    </div>
  )
}

function PositionRow({
  position,
  ball,
  progress,
  isPlayerBall,
}: {
  position: number
  ball: { id: BallId; name: string; color: string }
  progress: number
  isPlayerBall: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        background: isPlayerBall
          ? 'rgba(184, 134, 11, 0.2)'
          : 'rgba(45, 45, 45, 0.7)',
        border: `1px solid ${isPlayerBall ? '#daa520' : 'rgba(184, 134, 11, 0.2)'}`,
        borderRadius: '8px',
        backdropFilter: 'blur(8px)',
        pointerEvents: 'none',
        opacity: isPlayerBall ? 1 : 0.9,
      }}
    >
      <span
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: isPlayerBall ? '#daa520' : 'rgba(255,255,255,0.1)',
          color: isPlayerBall ? '#2d2d2d' : 'rgba(255,255,255,0.7)',
          fontSize: '0.75rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {position}
      </span>

      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: ball.color,
          boxShadow: `0 0 8px ${ball.color}`,
          flexShrink: 0,
        }}
      />

      <span
        style={{
          fontSize: '0.875rem',
          fontWeight: isPlayerBall ? 600 : 500,
          color: isPlayerBall ? '#daa520' : '#f5f0e1',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          flex: 1,
        }}
      >
        {ball.name}
      </span>

      <div
        style={{
          width: '80px',
          height: '6px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '3px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${ball.color}, ${lightenColor(ball.color, 0.3)})`,
            borderRadius: '3px',
            transition: 'width 0.1s linear',
          }}
        />
      </div>
    </div>
  )
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.round((num >> 16) + 255 * amount))
  const g = Math.min(255, Math.round(((num >> 8) & 0x00ff) + 255 * amount))
  const b = Math.min(255, Math.round((num & 0x0000ff) + 255 * amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}