import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { formatCurrency } from '@/utils/format'

export function Header() {
  const { demoBalance, roundHistory, setDemoBalance } = useGameStore()
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  return (
    <>
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 400,
              color: '#f5f0e1',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '0.05em',
            }}
          >
            TOWER RUSH
          </h1>
          <div
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              color: '#daa520',
              fontWeight: 500,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            Demo Balance: {formatCurrency(demoBalance)}
          </div>
        </div>

        <nav
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <AccountButton onClick={() => setIsAccountOpen(true)} />
        </nav>
      </header>

      {isAccountOpen && (
        <AccountModal
          balance={demoBalance}
          history={roundHistory}
          onResetBalance={() => setDemoBalance(250)}
          onClose={() => setIsAccountOpen(false)}
        />
      )}
    </>
  )
}

function AccountButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 16px',
        background: 'rgba(139, 105, 20, 0.2)',
        border: '1px solid #b8860b',
        borderRadius: '9999px',
        color: '#f5f0e1',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(4px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#b8860b'
        e.currentTarget.style.color = '#2d2d2d'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(139, 105, 20, 0.2)'
        e.currentTarget.style.color = '#f5f0e1'
      }}
    >
      Account
    </button>
  )
}

function AccountModal({
  balance,
  history,
  onResetBalance,
  onClose,
}: {
  balance: number
  history: any[]
  onResetBalance: () => void
  onClose: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 1000,
        pointerEvents: 'auto',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#222222',
          border: '1px solid rgba(184, 134, 11, 0.4)',
          borderRadius: '16px',
          maxWidth: '520px',
          width: '100%',
          padding: '28px',
          color: '#f5f0e1',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#daa520', fontSize: '1.4rem', margin: 0 }}>
            Account & Wallet
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#e8dfd0',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.875rem', color: '#daa520', textTransform: 'uppercase', marginBottom: '4px' }}>
            Current Demo Balance
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 600 }}>{formatCurrency(balance)}</div>
          <button
            type="button"
            onClick={onResetBalance}
            style={{
              marginTop: '10px',
              padding: '6px 14px',
              background: 'rgba(184, 134, 11, 0.25)',
              border: '1px solid #b8860b',
              color: '#f5f0e1',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.8rem',
            }}
          >
            Reset Balance to $250.00
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1rem', color: '#daa520', marginBottom: '10px' }}>Payment Placeholders</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {['Card', 'UPI', 'Bank Transfer'].map((method) => (
              <div
                key={method}
                style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px dashed rgba(184, 134, 11, 0.3)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ fontWeight: 600 }}>{method}</div>
                <span style={{ fontSize: '0.7rem', color: '#daa520', opacity: 0.8 }}>Coming Soon</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', color: '#daa520', marginBottom: '10px' }}>Recent Round History</h3>
          {history.length === 0 ? (
            <div style={{ fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>
              No completed rounds yet in this session.
            </div>
          ) : (
            <div style={{ maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {history.slice(0, 5).map((r, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                  }}
                >
                  <span>Winner: {r.winnerBallId?.toUpperCase()}</span>
                  <span style={{ color: r.selectedBallWon ? '#27ae60' : '#c0392b', fontWeight: 600 }}>
                    {r.selectedBallWon ? `+${formatCurrency(r.resultAmount)}` : `-${formatCurrency(r.wagerAmount)}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}