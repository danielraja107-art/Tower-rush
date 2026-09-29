import { useGameStore } from '@/store/gameStore'
import { BALLS, BallId } from '@/types/game'
import { gsap } from 'gsap'

export function BallSelectionScreen() {
  const { selectedBall, setSelectedBall, goToState } = useGameStore()

  const handleSelect = (ballId: BallId) => {
    setSelectedBall(ballId)
    gsap.to('.ball-card', {
      opacity: (i, el) => (el.dataset.ball === ballId ? 1 : 0.3),
      scale: (i, el) => (el.dataset.ball === ballId ? 1.02 : 0.98),
      duration: 0.2,
    })
  }

  const handleContinue = () => {
    if (selectedBall) {
      gsap.to('.ball-selection-content', { opacity: 0, y: -20, duration: 0.3, onComplete: () => goToState('WAGER_SELECTION') })
    }
  }

  return (
    <div
      className="ball-selection-content"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '32px',
          animation: 'fadeInDown 0.5s ease-out',
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
          Choose Your Ball
        </h2>
        <p style={{ color: '#e8dfd0', opacity: 0.7, fontSize: '1rem' }}>
          Four premium balls. One will be the champion.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          flex: 1,
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          alignContent: 'center',
          justifyItems: 'center',
        }}
      >
        {Object.entries(BALLS).map(([, ball]) => (
          <BallCard
            key={ball.id}
            ball={ball}
            isSelected={selectedBall === ball.id}
            onSelect={() => handleSelect(ball.id as BallId)}
          />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '24px',
          marginTop: 'auto',
          animation: 'fadeInUp 0.5s ease-out 0.2s both',
        }}
      >
        <BackButton onClick={() => goToState('TOWER_SELECTION')} />
        <PrimaryButton
          onClick={handleContinue}
          disabled={!selectedBall}
        >
          Continue
        </PrimaryButton>
      </div>
    </div>
  )
}

function BallCard({
  ball,
  isSelected,
  onSelect,
}: {
  ball: { id: string; name: string; color: string }
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <button
      className="ball-card"
      data-ball={ball.id}
      onClick={onSelect}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '24px 16px',
        background: isSelected
          ? `rgba(${hexToRgb(ball.color).join(',')}, 0.15)`
          : 'rgba(45, 45, 45, 0.6)',
        border: `2px solid ${isSelected ? ball.color : 'rgba(184, 134, 11, 0.3)'}`,
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = ball.color
          e.currentTarget.style.background = `rgba(${hexToRgb(ball.color).join(',')}, 0.1)`
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = `0 12px 30px ${ball.color}40`
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(184, 134, 11, 0.3)'
          e.currentTarget.style.background = 'rgba(45, 45, 45, 0.6)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: `2px solid ${isSelected ? ball.color : 'rgba(184, 134, 11, 0.5)'}`,
          background: isSelected ? ball.color : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}
      >
        {isSelected && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${lightenColor(ball.color, 0.3)} 0%, ${ball.color} 50%, ${darkenColor(ball.color, 0.3)} 100%)`,
          boxShadow: `
            inset 0 -8px 16px ${darkenColor(ball.color, 0.4)},
            0 8px 24px ${ball.color}60,
            0 0 0 1px rgba(255,255,255,0.1)
          `,
          position: 'relative',
          transition: 'transform 0.2s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            filter: 'blur(2px)',
          }}
        />
      </div>

      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.125rem',
          fontWeight: 500,
          color: '#f5f0e1',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {ball.name}
      </span>
    </button>
  )
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0]
}

function lightenColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  return `rgb(${Math.min(255, Math.round(rgb[0] + 255 * amount))}, ${Math.min(255, Math.round(rgb[1] + 255 * amount))}, ${Math.min(255, Math.round(rgb[2] + 255 * amount))})`
}

function darkenColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  return `rgb(${Math.max(0, Math.round(rgb[0] * (1 - amount)))}, ${Math.max(0, Math.round(rgb[1] * (1 - amount)))}, ${Math.max(0, Math.round(rgb[2] * (1 - amount)))})`
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        background: 'transparent',
        border: '1px solid rgba(184, 134, 11, 0.5)',
        borderRadius: '9999px',
        color: '#e8dfd0',
        fontSize: '0.9375rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(184, 134, 11, 0.1)'
        e.currentTarget.style.borderColor = '#daa520'
        e.currentTarget.style.color = '#daa520'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'rgba(184, 134, 11, 0.5)'
        e.currentTarget.style.color = '#e8dfd0'
      }}
    >
      Back
    </button>
  )
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '12px 32px',
        fontSize: '0.9375rem',
        fontWeight: 600,
        color: disabled ? 'rgba(45, 45, 45, 0.5)' : '#2d2d2d',
        background: disabled
          ? 'rgba(184, 134, 11, 0.3)'
          : 'linear-gradient(135deg, #daa520 0%, #b8860b 100%)',
        border: 'none',
        borderRadius: '9999px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: disabled ? 'none' : '0 4px 20px rgba(184, 134, 11, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(184, 134, 11, 0.5)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(184, 134, 11, 0.4)'
        }
      }}
    >
      {children}
    </button>
  )
}