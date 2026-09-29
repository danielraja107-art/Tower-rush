import { useGameStore } from '@/store/gameStore'
import { BALLS } from '@/types/game'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export function CelebrationScreen() {
  const { raceResult, goToState } = useGameStore()

  useEffect(() => {
    if (!raceResult) return

    const tl = gsap.timeline()

    tl.from('.celebration-title', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' })
      .from('.winner-ball', { scale: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, '-=0.3')
      .from('.celebration-text', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.4')
      .from('.continue-btn', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')

    const particles = document.querySelectorAll('.particle')
    particles.forEach((particle, i) => {
      gsap.set(particle, { x: 'random(-200, 200)', y: 'random(-200, 200)', scale: 0 })
      gsap.to(particle, {
        scale: 'random(0.5, 1.5)',
        x: 'random(-300, 300)',
        y: 'random(-300, 300)',
        opacity: 0,
        duration: 'random(1, 2)',
        delay: i * 0.05,
        ease: 'power2.out',
      })
    })

    return () => { tl.kill() }
  }, [raceResult])

  const handleContinue = () => {
    goToState('ROUND_COMPLETE')
  }

  if (!raceResult) return null

  const { winnerId } = raceResult
  const winnerBall = BALLS[winnerId]

  return (
    <div
      className="celebration-content"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        textAlign: 'center',
        pointerEvents: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="particles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, ${lightenColor(winnerBall.color, 0.3)} 0%, ${winnerBall.color} 100%)`,
              boxShadow: `0 0 12px ${winnerBall.color}`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          animation: 'fadeInUp 0.8s ease-out',
        }}
      >
        <h1
          className="celebration-title"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#f5f0e1',
            marginBottom: '24px',
            textShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          VICTORY!
        </h1>

        <div
          className="winner-ball"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            margin: '0 auto 24px',
            background: `radial-gradient(circle at 30% 30%, ${lightenColor(winnerBall.color, 0.3)} 0%, ${winnerBall.color} 50%, ${darkenColor(winnerBall.color, 0.3)} 100%)`,
            boxShadow: `
              inset 0 -16px 32px ${darkenColor(winnerBall.color, 0.4)},
              0 16px 48px ${winnerBall.color}80,
              0 0 0 2px rgba(255,255,255,0.1)
            `,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.4)',
              filter: 'blur(4px)',
            }}
          />
        </div>

        <div className="celebration-text" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p
            style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              color: '#daa520',
              fontWeight: 500,
            }}
          >
            {winnerBall.name} Takes the Crown!
          </p>
          <p
            style={{
              fontSize: '1rem',
              color: '#e8dfd0',
              opacity: 0.8,
            }}
          >
            Your intuition was flawless. The demo credits are yours.
          </p>
        </div>

        <button
          className="continue-btn"
          onClick={handleContinue}
          style={{
            marginTop: '32px',
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
          Continue
        </button>
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

function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.round((num >> 16) * (1 - amount)))
  const g = Math.max(0, Math.round(((num >> 8) & 0x00ff) * (1 - amount)))
  const b = Math.max(0, Math.round((num & 0x0000ff) * (1 - amount)))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}