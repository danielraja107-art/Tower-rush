import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { gsap } from 'gsap'

type InfoModalType = 'how-to-play' | 'rules' | 'terms' | 'disclaimer' | 'responsible' | null

export function HomeScreen() {
  const { goToState } = useGameStore()
  const [activeModal, setActiveModal] = useState<InfoModalType>(null)

  const handleStart = () => {
    gsap.to('.home-content', { opacity: 0, y: -20, duration: 0.3, onComplete: () => goToState('TOWER_SELECTION') })
  }

  return (
    <div
      className="home-content"
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
          maxWidth: '600px',
          animation: 'fadeInUp 0.8s ease-out',
        }}
      >
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#f5f0e1',
            marginBottom: '8px',
            letterSpacing: '0.05em',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          TOWER RUSH
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#daa520',
            marginBottom: '16px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Four Balls. One Winner.
        </p>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: '#e8dfd0',
            lineHeight: 1.6,
            marginBottom: '32px',
            opacity: 0.9,
          }}
        >
          Choose your tower, pick your ball, place your wager.
          Watch four balls race through a handcrafted wooden tower.
          The first to cross the finish line wins.
        </p>

        <button
          type="button"
          onClick={handleStart}
          style={{
            padding: '16px 48px',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
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
          Start New Round
        </button>

        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <SecondaryLink onClick={() => setActiveModal('how-to-play')} href="#how-to-play">How to Play</SecondaryLink>
          <SecondaryLink onClick={() => setActiveModal('rules')} href="#rules">Rules</SecondaryLink>
          <SecondaryLink onClick={() => setActiveModal('terms')} href="#terms">Terms & Conditions</SecondaryLink>
          <SecondaryLink onClick={() => setActiveModal('disclaimer')} href="#disclaimer">Betting Disclaimer</SecondaryLink>
          <SecondaryLink onClick={() => setActiveModal('responsible')} href="#responsible">Responsible Play</SecondaryLink>
        </div>
      </div>

      {activeModal && (
        <InfoModal type={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  )
}

function SecondaryLink({ href, onClick, children }: { href: string; onClick?: () => void; children: string }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      style={{
        color: '#e8dfd0',
        fontSize: '0.875rem',
        opacity: 0.7,
        transition: 'opacity 0.2s ease',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
    >
      {children}
    </a>
  )
}

function InfoModal({ type, onClose }: { type: NonNullable<InfoModalType>; onClose: () => void }) {
  const content = getModalContent(type)

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
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#242424',
          border: '1px solid rgba(184, 134, 11, 0.4)',
          borderRadius: '16px',
          maxWidth: '560px',
          width: '100%',
          padding: '32px',
          textAlign: 'left',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          color: '#f5f0e1',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#daa520', fontSize: '1.5rem', fontWeight: 600 }}>
            {content.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              color: '#e8dfd0',
              fontSize: '1.5rem',
              lineHeight: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ maxHeight: '60vh', overflowY: 'auto', lineHeight: 1.6, fontSize: '0.95rem', color: '#e8dfd0' }}>
          {content.body}
        </div>

        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 24px',
              background: 'rgba(184, 134, 11, 0.2)',
              border: '1px solid #b8860b',
              color: '#f5f0e1',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function getModalContent(type: NonNullable<InfoModalType>) {
  switch (type) {
    case 'how-to-play':
      return {
        title: 'How to Play',
        body: (
          <div>
            <p style={{ marginBottom: '12px' }}><strong>1. Choose Tower:</strong> Pick one of three handcrafted wooden race tracks.</p>
            <p style={{ marginBottom: '12px' }}><strong>2. Choose Ball:</strong> Select your champion: Ruby, Sapphire, Emerald, or Amber.</p>
            <p style={{ marginBottom: '12px' }}><strong>3. Place Wager:</strong> Select your demo credits wager amount ($1 – $50).</p>
            <p style={{ marginBottom: '12px' }}><strong>4. Watch the Race:</strong> Four balls roll down the physical tower simultaneously.</p>
            <p><strong>5. First to Cross:</strong> The first ball across the finish line wins! If your ball wins, claim 2x demo credits.</p>
          </div>
        ),
      }
    case 'rules':
      return {
        title: 'Game Rules',
        body: (
          <div>
            <p style={{ marginBottom: '12px' }}>• Each round features exactly 4 balls: Ruby, Sapphire, Emerald, and Amber.</p>
            <p style={{ marginBottom: '12px' }}>• All balls start from rest simultaneously at the release gate.</p>
            <p style={{ marginBottom: '12px' }}>• Movement is simulated via Rapier 3D rigid-body physics.</p>
            <p>• The winner is determined strictly by the first valid ball crossing the finish sensor plane.</p>
          </div>
        ),
      }
    case 'terms':
      return {
        title: 'Terms & Conditions',
        body: (
          <div>
            <p style={{ marginBottom: '12px' }}>Tower Rush is a simulation and entertainment demonstration prototype.</p>
            <p style={{ marginBottom: '12px' }}>All currency, balances, and wagers in this game are 100% virtual demo credits.</p>
            <p>Virtual demo credits carry no real monetary value, cannot be deposited, and cannot be redeemed for fiat currency.</p>
          </div>
        ),
      }
    case 'disclaimer':
      return {
        title: 'Betting Disclaimer',
        body: (
          <div>
            <p style={{ marginBottom: '12px' }}>This game operates strictly with simulated virtual demo credits for demonstration and testing purposes.</p>
            <p>No real money gambling or payment processing is offered or facilitated in this version.</p>
          </div>
        ),
      }
    case 'responsible':
      return {
        title: 'Responsible Play',
        body: (
          <div>
            <p style={{ marginBottom: '12px' }}>Tower Rush encourages healthy gaming habits.</p>
            <p style={{ marginBottom: '12px' }}>Take regular breaks and remember that this experience is purely for recreation and entertainment.</p>
            <p>If you or someone you know struggles with real-world gambling, please seek help from local support organizations.</p>
          </div>
        ),
      }
  }
}