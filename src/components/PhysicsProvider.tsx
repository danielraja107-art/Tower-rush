import {
  Physics,
  RigidBody,
  CuboidCollider,
  CylinderCollider,
  CapsuleCollider,
  BallCollider,
} from '@react-three/rapier'
import { PHYSICS_CONFIG } from '@/types/game'

interface PhysicsProviderProps {
  children: React.ReactNode
}

export function PhysicsProvider({ children }: PhysicsProviderProps) {
  return (
    <Physics
      gravity={[PHYSICS_CONFIG.gravity.x, PHYSICS_CONFIG.gravity.y, PHYSICS_CONFIG.gravity.z]}
      timeStep={PHYSICS_CONFIG.fixedTimeStep}
      maxCcdSubsteps={PHYSICS_CONFIG.maxSubSteps}
    >
      {children}
    </Physics>
  )
}

export function BallPhysics({
  position = [0, 10, 0],
  mass = PHYSICS_CONFIG.ballMass,
  radius = PHYSICS_CONFIG.ballRadius,
  restitution = PHYSICS_CONFIG.ballRestitution,
  friction = PHYSICS_CONFIG.ballFriction,
  children,
}: {
  position?: [number, number, number]
  mass?: number
  radius?: number
  restitution?: number
  friction?: number
  children: React.ReactNode
}) {
  return (
    <RigidBody
      type="dynamic"
      position={position}
      mass={mass}
      restitution={restitution}
      friction={friction}
      colliders={false}
      linearDamping={0.01}
      angularDamping={0.9}
    >
      <BallCollider args={[radius]} restitution={restitution} friction={friction} />
      {children}
    </RigidBody>
  )
}

export function StaticCollider({
  shape,
  args,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  children,
}: {
  shape: 'cuboid' | 'cylinder' | 'capsule'
  args: number[]
  position?: [number, number, number]
  rotation?: [number, number, number]
  children?: React.ReactNode
}) {
  return (
    <RigidBody type="fixed" position={position} rotation={rotation} colliders={false}>
      {shape === 'cuboid' && (
        <CuboidCollider args={[args[0] ?? 1, args[1] ?? 1, args[2] ?? 1]} />
      )}
      {shape === 'cylinder' && (
        <CylinderCollider args={[args[0] ?? 1, args[1] ?? 1]} />
      )}
      {shape === 'capsule' && (
        <CapsuleCollider args={[args[0] ?? 1, args[1] ?? 1]} />
      )}
      {children}
    </RigidBody>
  )
}