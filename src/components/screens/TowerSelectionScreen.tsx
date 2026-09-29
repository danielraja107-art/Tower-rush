import { useGameStore } from '@/store/gameStore'
import { TOWERS, TowerId } from '@/types/game'
import { gsap } from 'gsap'

export function TowerSelectionScreen() {
  const { selectedTower, setSelectedTower, goToState } = useGameStore()

  const handleSelect = (towerId: TowerId) => {
    setSelectedTower(towerId)
    gsap.to('.tower-card', {
      opacity: (i, el) => (el.dataset.tower === towerId ? 1 : 0.3),
      scale: (i, el) => (el.dataset.tower === towerId ? 1.02 : 0.98),
      duration: 0.2,
    })
  }

  const handleContinue = () => {
    if (selectedTower) {
      gsap.to('.tower-selection-content', { opacity: 0, y: -20, duration: 0.3, onComplete: () => goToState('BALL_SELECTION') })
    }
  }

  return (
    <div
      className="tower-selection-content"
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
          Choose Your Tower
        </h2>
        <p style={{ color: '#e8dfd0', opacity: 0.7, fontSize: '1rem' }}>
          Each tower offers a unique racing experience
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          flex: 1,
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
          alignContent: 'start',
        }}
      >
        {Object.entries(TOWERS).map(([, tower]) => (
          <TowerCard
            key={tower.id}
            tower={tower}
            isSelected={selectedTower === tower.id}
            onSelect={() => handleSelect(tower.id as TowerId)}
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
        <BackButton onClick={() => goToState('HOME')} />
        <PrimaryButton
          onClick={handleContinue}
          disabled={!selectedTower}
        >
          Continue
        </PrimaryButton>
      </div>
    </div>
  )
}

function TowerCard({
  tower,
  isSelected,
  onSelect,
}: {
  tower: { id: string; name: string; description: string }
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className="tower-card"
      data-tower={tower.id}
      aria-label={tower.name}
      onClick={onSelect}
      style={{
        position: 'relative',
        padding: '24px',
        background: isSelected
          ? 'rgba(184, 134, 11, 0.15)'
          : 'rgba(45, 45, 45, 0.6)',
        border: `2px solid ${isSelected ? '#daa520' : 'rgba(184, 134, 11, 0.3)'}`,
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#b8860b'
          e.currentTarget.style.background = 'rgba(184, 134, 11, 0.1)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)'
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
          border: `2px solid ${isSelected ? '#daa520' : 'rgba(184, 134, 11, 0.5)'}`,
          background: isSelected ? '#daa520' : 'transparent',
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

      <h3
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.25rem',
          fontWeight: 400,
          color: '#f5f0e1',
          marginBottom: '8px',
        }}
      >
        {tower.name}
      </h3>
      <p
        style={{
          color: '#e8dfd0',
          opacity: 0.8,
          fontSize: '0.9375rem',
          lineHeight: 1.5,
        }}
      >
        {tower.description}
      </p>
    </button>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Back"
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
      type="button"
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