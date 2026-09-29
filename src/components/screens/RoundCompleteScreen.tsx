import { useGameStore } from '@/store/gameStore'
import { formatCurrency } from '@/utils/format'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export function RoundCompleteScreen() {
  const { demoBalance, raceResult, startNewRound } = useGameStore()

  useEffect(() => {
    gsap.from('.complete-content > *', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [])

  const handleNewRound = () => {
    gsap.to('.complete-content', { opacity: 0, y: -20, duration: 0.3, onComplete: startNewRound })
  }

  return (
    <div
      className="complete-content"
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
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
            color: '#f5f0e1',
            marginBottom: '8px',
          }}
        >
          ROUND COMPLETE
        </h2>

        {raceResult && (
          <div
            style={{
              display: 'inline-block',
              padding: '8px 24px',
              marginBottom: '24px',
              background: raceResult.selectedBallWon
                ? 'rgba(39, 174, 96, 0.2)'
                : 'rgba(192, 57, 43, 0.2)',
              border: `1px solid ${raceResult.selectedBallWon ? '#27ae60' : '#c0392b'}`,
              borderRadius: '9999px',
            }}
          >
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: raceResult.selectedBallWon ? '#27ae60' : '#c0392b',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {raceResult.selectedBallWon ? 'WINNER' : 'TRY AGAIN'}
            </span>
          </div>
        )}

        <div
          style={{
            marginBottom: '32px',
            padding: '24px',
            background: 'rgba(45, 45, 45, 0.6)',
            border: '1px solid rgba(184, 134, 11, 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: '#e8dfd0',
              opacity: 0.7,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}
          >
            Demo Balance
          </div>
          <div
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 600,
              color: '#daa520',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatCurrency(demoBalance)}
          </div>
        </div>

        <button
          onClick={handleNewRound}
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
          New Round
        </button>
      </div>
    </div>
  )
}