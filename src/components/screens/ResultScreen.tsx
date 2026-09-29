import { useGameStore } from '@/store/gameStore'
import { BALLS } from '@/types/game'
import { formatCurrency } from '@/utils/format'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export function ResultScreen() {
  const { raceResult, selectedBall, goToState } = useGameStore()

  useEffect(() => {
    if (raceResult) {
      gsap.from('.result-content > *', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }
  }, [raceResult])

  if (!raceResult) return null

  const { winnerId, selectedBallWon, payout } = raceResult
  const isWin = selectedBallWon === true

  return (
    <div
      className="result-content"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        textAlign: 'center',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          animation: 'fadeInUp 0.6s ease-out',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            marginBottom: '24px',
            background: isWin
              ? 'rgba(39, 174, 96, 0.2)'
              : 'rgba(192, 57, 43, 0.2)',
            border: `1px solid ${isWin ? '#27ae60' : '#c0392b'}`,
            borderRadius: '9999px',
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: isWin ? '#27ae60' : '#c0392b',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {isWin ? 'YOU WON!' : 'YOU LOST'}
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
            color: '#f5f0e1',
            marginBottom: '16px',
          }}
        >
          RACE COMPLETE
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <ResultRow
            label="WINNER"
            value={BALLS[winnerId].name}
            valueColor={BALLS[winnerId].color}
          />
          <ResultRow
            label="YOUR SELECTION"
            value={selectedBall ? BALLS[selectedBall].name : 'RUBY'}
            valueColor={selectedBall ? BALLS[selectedBall].color : '#c0392b'}
          />
          <ResultRow
            label="RESULT"
            value={isWin ? `+${formatCurrency(payout)} DEMO CREDITS` : 'No demo-credit return'}
            valueColor={isWin ? '#27ae60' : '#c0392b'}
            highlight
          />
        </div>

        <button
          onClick={() => goToState(isWin ? 'CELEBRATION' : 'ROUND_COMPLETE')}
          style={{
            padding: '16px 48px',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#2d2d2d',
            background: 'linear-gradient(135deg, #daa520 0%, #b8860b 100%)',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 20px rgba(184, 134, 11, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(184, 134, 11, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(184, 134, 11, 0.4)'
          }}
        >
          {isWin ? 'Celebrate' : 'New Round'}
        </button>
      </div>
    </div>
  )
}

function ResultRow({
  label,
  value,
  valueColor,
  highlight,
}: {
  label: string
  value: string
  valueColor?: string
  highlight?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '16px 24px',
        background: highlight
          ? 'rgba(39, 174, 96, 0.15)'
          : 'rgba(45, 45, 45, 0.6)',
        border: `1px solid ${highlight ? '#27ae60' : 'rgba(184, 134, 11, 0.3)'}`,
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        style={{
          fontSize: '0.75rem',
          color: '#e8dfd0',
          opacity: 0.7,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: valueColor || (highlight ? '#27ae60' : '#f5f0e1'),
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
    </div>
  )
}