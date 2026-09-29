import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, BallCollider, RapierRigidBody } from '@react-three/rapier'
import { useGameStore } from '@/store/gameStore'
import { BALLS, BallId } from '@/types/game'
import { liveBallProgress } from '@/systems/raceState'

const BALL_IDS: BallId[] = ['ruby', 'sapphire', 'emerald', 'amber']

const START_POSITIONS: Record<BallId, [number, number, number]> = {
  ruby: [-1.5, 19.0, -1.0],
  sapphire: [-0.5, 19.0, -1.0],
  emerald: [0.5, 19.0, -1.0],
  amber: [1.5, 19.0, -1.0],
}

export function RaceBalls() {
  const currentState = useGameStore((state) => state.currentState)
  const isRacing = currentState === 'RACING' || currentState === 'FINISH_DETECTION'

  const bodyRefs = useRef<Record<BallId, RapierRigidBody | null>>({
    ruby: null,
    sapphire: null,
    emerald: null,
    amber: null,
  })

  const hasLaunched = useRef(false)

  // Reset positions before race starts
  useEffect(() => {
    if (!isRacing) {
      hasLaunched.current = false
      BALL_IDS.forEach((id) => {
        const body = bodyRefs.current[id]
        const start = START_POSITIONS[id]
        if (body) {
          body.setTranslation({ x: start[0], y: start[1], z: start[2] }, true)
          body.setLinvel({ x: 0, y: 0, z: 0 }, true)
          body.setAngvel({ x: 0, y: 0, z: 0 }, true)
        }
        liveBallProgress[id] = 0
      })
    }
  }, [isRacing])

  // Launch balls simultaneously when RACING starts
  useEffect(() => {
    if (currentState === 'RACING' && !hasLaunched.current) {
      hasLaunched.current = true
      BALL_IDS.forEach((id) => {
        const body = bodyRefs.current[id]
        if (body) {
          body.wakeUp()
          const impulseX = (Math.random() - 0.5) * 0.15
          const impulseZ = 0.8 + Math.random() * 0.4
          body.applyImpulse({ x: impulseX, y: 0, z: impulseZ }, true)
        }
      })
    }
  }, [currentState])

  // Track real progress for HUD
  useFrame(() => {
    if (isRacing) {
      BALL_IDS.forEach((id) => {
        const body = bodyRefs.current[id]
        if (body) {
          const pos = body.translation()
          // Start is at Y=19, Z=-1. Finish is at Z=15, Y=0.5.
          const heightProgress = Math.max(0, Math.min(1, (19 - pos.y) / 18.5))
          const zProgress = Math.max(0, Math.min(1, (pos.z - (-1)) / 16))
          const progress = Math.max(0, Math.min(100, Math.round((heightProgress * 0.6 + zProgress * 0.4) * 100)))
          liveBallProgress[id] = progress
        }
      })
    }
  })

  return (
    <group>
      {BALL_IDS.map((id) => {
        const ball = BALLS[id]
        const start = START_POSITIONS[id]

        return (
          <RigidBody
            key={id}
            ref={(el) => { bodyRefs.current[id] = el }}
            position={start}
            colliders={false}
            mass={1.0}
            restitution={0.35}
            friction={0.2}
            linearDamping={0.02}
            angularDamping={0.15}
            userData={{ ballId: id }}
          >
            <BallCollider args={[0.45]} restitution={0.35} friction={0.2} />
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[0.45, 32, 32]} />
              <meshPhysicalMaterial
                color={ball.color}
                roughness={0.12}
                metalness={0.85}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                envMapIntensity={1.5}
              />
            </mesh>
          </RigidBody>
        )
      })}
    </group>
  )
}
