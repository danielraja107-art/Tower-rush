import { useEffect } from 'react'
import { gsap } from 'gsap'

export function LoadingScreen() {
  useEffect(() => {
    gsap.from('.loading-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
    gsap.from('.loading-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: 'power3.out' })
    gsap.from('.loading-bar-inner', { scaleX: 0, duration: 2, ease: 'power2.inOut' })

    return () => gsap.killTweensOf(['.loading-title', '.loading-subtitle', '.loading-bar-inner'])
  }, [])

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        textAlign: 'center',
        pointerEvents: 'none',
      }}
    >
      <h1
        className="loading-title"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 400,
          color: '#f5f0e1',
          marginBottom: '16px',
          textShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        TOWER RUSH
      </h1>

      <p
        className="loading-subtitle"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: '#daa520',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '48px',
        }}
      >
        Four Balls. One Winner.
      </p>

      <div
        className="loading-bar"
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '4px',
          background: 'rgba(45, 45, 45, 0.6)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          className="loading-bar-inner"
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #daa520 0%, #b8860b 100%)',
            borderRadius: '2px',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      <p
        style={{
          marginTop: '24px',
          fontSize: '0.875rem',
          color: '#e8dfd0',
          opacity: 0.6,
        }}
      >
        Loading assets...
      </p>
    </div>
  )
}