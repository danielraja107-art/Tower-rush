import { useGameStore } from '@/store/gameStore'
import { WAGER_OPTIONS, DEFAULT_CONFIG } from '@/types/game'
import { formatCurrency } from '@/utils/format'
import { gsap } from 'gsap'

export function WagerSelectionScreen() {
  const {
    selectedWager,
    setSelectedWager,
    adjustWager,
    demoBalance,
    goToState,
  } = useGameStore()

  const postWagerBalance = demoBalance - selectedWager

  const handleQuickWager = (value: number) => {
    setSelectedWager(value)
  }

  const handleContinue = () => {
    gsap.to('.wager-content', { opacity: 0, y: -20, duration: 0.3, onComplete: () => goToState('ROUND_CONFIRMATION') })
  }

  return (
    <div
      className="wager-content"
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
          Place Your Wager
        </h2>
        <p style={{ color: '#e8dfd0', opacity: 0.7, fontSize: '1rem' }}>
          Demo credits only — no real money involved
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          flex: 1,
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <BalanceDisplay
          label="Demo Balance"
          value={demoBalance}
          highlight
        />

        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {WAGER_OPTIONS.map((option) => (
            <WagerButton
              key={option.value}
              option={option}
              isSelected={selectedWager === option.value}
              onClick={() => handleQuickWager(option.value)}
            />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 24px',
            background: 'rgba(45, 45, 45, 0.6)',
            border: '1px solid rgba(184, 134, 11, 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <AdjustButton onClick={() => adjustWager(-1)} aria-label="Decrease wager">
            −
          </AdjustButton>
          <div
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 600,
              color: '#f5f0e1',
              fontVariantNumeric: 'tabular-nums',
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            {formatCurrency(selectedWager)}
          </div>
          <AdjustButton onClick={() => adjustWager(1)} aria-label="Increase wager">
            +
          </AdjustButton>
        </div>

        <BalanceDisplay
          label="After Wager"
          value={postWagerBalance}
          highlight={false}
        />

        <PotentialWinDisplay wager={selectedWager} />
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
        <BackButton onClick={() => goToState('BALL_SELECTION')} />
        <PrimaryButton
          onClick={handleContinue}
          disabled={selectedWager < DEFAULT_CONFIG.minWager || selectedWager > demoBalance}
        >
          Place Wager
        </PrimaryButton>
      </div>
    </div>
  )
}

function WagerButton({
  option,
  isSelected,
  onClick,
}: {
  option: { value: number; label: string }
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: 600,
        color: isSelected ? '#2d2d2d' : '#f5f0e1',
        background: isSelected
          ? 'linear-gradient(135deg, #daa520 0%, #b8860b 100%)'
          : 'rgba(45, 45, 45, 0.6)',
        border: `1px solid ${isSelected ? '#daa520' : 'rgba(184, 134, 11, 0.3)'}`,
        borderRadius: '9999px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#b8860b'
          e.currentTarget.style.background = 'rgba(184, 134, 11, 0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(184, 134, 11, 0.3)'
          e.currentTarget.style.background = 'rgba(45, 45, 45, 0.6)'
        }
      }}
    >
      {option.label}
    </button>
  )
}

function AdjustButton({
  onClick,
  children,
  'aria-label': ariaLabel,
}: {
  onClick: () => void
  children: React.ReactNode
  'aria-label': string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(184, 134, 11, 0.2)',
        border: '1px solid rgba(184, 134, 11, 0.5)',
        color: '#daa520',
        fontSize: '1.5rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(184, 134, 11, 0.4)'
        e.currentTarget.style.borderColor = '#daa520'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(184, 134, 11, 0.2)'
        e.currentTarget.style.borderColor = 'rgba(184, 134, 11, 0.5)'
      }}
    >
      {children}
    </button>
  )
}

function BalanceDisplay({
  label,
  value,
  highlight,
}: {
  label: string
  value: number
  highlight: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '12px 24px',
        background: highlight
          ? 'rgba(184, 134, 11, 0.15)'
          : 'rgba(45, 45, 45, 0.6)',
        border: `1px solid ${highlight ? '#daa520' : 'rgba(184, 134, 11, 0.3)'}`,
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
        width: '100%',
        maxWidth: '280px',
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
          fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
          fontWeight: 600,
          color: highlight ? '#daa520' : '#f5f0e1',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatCurrency(value)}
      </span>
    </div>
  )
}

function PotentialWinDisplay({ wager }: { wager: number }) {
  const potentialWin = wager * 2

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 24px',
        background: 'rgba(39, 174, 96, 0.15)',
        border: '1px solid rgba(39, 174, 96, 0.5)',
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
        width: '100%',
        maxWidth: '280px',
      }}
    >
      <span
        style={{
          fontSize: '0.75rem',
          color: '#27ae60',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Potential Win
      </span>
      <span
        style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
          fontWeight: 600,
          color: '#27ae60',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatCurrency(potentialWin)}
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