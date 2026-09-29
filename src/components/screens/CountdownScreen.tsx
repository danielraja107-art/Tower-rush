import { useGameStore } from '@/store/gameStore'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export function CountdownScreen() {
  const { goToState, currentState } = useGameStore()
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (currentState !== 'COUNTDOWN') return

    const sequence = async () => {
      await gsap.to('.countdown-number', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
      await gsap.to('.countdown-number', { scale: 0.8, opacity: 0, duration: 0.2, delay: 0.5 })

      setCount(2)
      await gsap.to('.countdown-number', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
      await gsap.to('.countdown-number', { scale: 0.8, opacity: 0, duration: 0.2, delay: 0.5 })

      setCount(1)
      await gsap.to('.countdown-number', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
      await gsap.to('.countdown-number', { scale: 0.8, opacity: 0, duration: 0.2, delay: 0.5 })

      await gsap.to('.countdown-go', { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
      await gsap.to('.countdown-go', { scale: 1.2, opacity: 0, duration: 0.3, delay: 0.3 })

      goToState('RACING')
    }

    sequence()
  }, [currentState, goToState])

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <div className="countdown-number" style={{ opacity: 0, transform: 'scale(0.8)' }}>
        {count}
      </div>
      <div className="countdown-go" style={{ opacity: 0, transform: 'scale(0.8)' }}>
        GO!
      </div>
    </div>
  )
}