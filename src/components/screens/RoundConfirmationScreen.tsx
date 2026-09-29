import { useGameStore } from '@/store/gameStore'
import { BALLS, TOWERS } from '@/types/game'
import { formatCurrency } from '@/utils/format'
import { gsap } from 'gsap'

export function RoundConfirmationScreen() {
  const {
    selectedTower,
    selectedBall,
    selectedWager,
    demoBalance,
    goToState,
    startRound,
  } = useGameStore()

  const towerName = selectedTower && TOWERS[selectedTower] ? TOWERS[selectedTower].name : 'TIMBER CASCADE'
  const ballName = selectedBall && BALLS[selectedBall] ? BALLS[selectedBall].name : 'RUBY'
  const ballColor = selectedBall && BALLS[selectedBall] ? BALLS[selectedBall].color : '#c0392b'

  const postWagerBalance = demoBalance - selectedWager
  const potentialWin = selectedWager * 2

  const handleConfirm = () => {
    gsap.to('.confirm-content', { opacity: 0, y: -20, duration: 0.3, onComplete: startRound })
  }

  return (
    <div
      className="confirm-content"
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
          Confirm Round
        </h2>
        <p style={{ color: '#e8dfd0', opacity: 0.7, fontSize: '1rem' }}>
          Review your selections before the race begins
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: 1,
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <ConfirmationRow
          label="Tower"
          value={towerName}
        />
        <ConfirmationRow
          label="Your Ball"
          value={ballName}
          valueColor={ballColor}
        />
        <ConfirmationRow
          label="Wager"
          value={formatCurrency(selectedWager)}
        />
        <ConfirmationRow
          label="Demo Balance"
          value={formatCurrency(demoBalance)}
          muted
        />
        <ConfirmationRow
          label="After Wager"
          value={formatCurrency(postWagerBalance)}
          muted
        />
        <ConfirmationRow
          label="Potential Win"
          value={formatCurrency(potentialWin)}
          highlight
          valueColor="#27ae60"
        />
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
        <BackButton onClick={() => goToState('WAGER_SELECTION')} />
        <PrimaryButton onClick={handleConfirm}>
          Confirm Round
        </PrimaryButton>
      </div>
    </div>
  )
}

function ConfirmationRow({
  label,
  value,
  muted,
  highlight,
  valueColor,
}: {
  label: string
  value: string
  muted?: boolean
  highlight?: boolean
  valueColor?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        background: highlight
          ? 'rgba(39, 174, 96, 0.15)'
          : muted
          ? 'rgba(45, 45, 45, 0.4)'
          : 'rgba(45, 45, 45, 0.6)',
        border: `1px solid ${highlight ? '#27ae60' : muted ? 'rgba(184, 134, 11, 0.2)' : 'rgba(184, 134, 11, 0.3)'}`,
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        style={{
          fontSize: '0.9375rem',
          color: muted ? 'rgba(232, 223, 208, 0.7)' : '#e8dfd0',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '1rem',
          fontWeight: highlight ? 600 : 500,
          color: valueColor || (highlight ? '#27ae60' : '#f5f0e1'),
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
    </div>
  )
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
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 32px',
        fontSize: '0.9375rem',
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
      {children}
    </button>
  )
}