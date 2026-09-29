import { useFrame } from '@react-three/fiber'
import { useGameStore } from '@/store/gameStore'
import { PHYSICS_CONFIG } from '@/types/game'
import { useEffect } from 'react'

let RAPIER: any = null

export async function initRapier() {
  if (RAPIER) return RAPIER
  const mod = await import('@dimforge/rapier3d')
  RAPIER = mod.default
  return RAPIER
}

export interface PhysicsWorld {
  world: any | null
  gravity: any
  timeStep: number
  maxSubSteps: number
  step: (delta: number) => void
  reset: () => void
}

export function createPhysicsWorld(): PhysicsWorld {
  if (!RAPIER) {
    throw new Error('Rapier not initialized. Call initRapier() first.')
  }

  const gravity = new RAPIER.Vector3(
    PHYSICS_CONFIG.gravity.x,
    PHYSICS_CONFIG.gravity.y,
    PHYSICS_CONFIG.gravity.z
  )

  const world = new RAPIER.World(gravity)

  const timeStep = PHYSICS_CONFIG.fixedTimeStep
  const maxSubSteps = PHYSICS_CONFIG.maxSubSteps

  return {
    world,
    gravity,
    timeStep,
    maxSubSteps,
    step: (_delta: number) => {
      if (world) {
        world.step(timeStep, undefined, maxSubSteps)
      }
    },
    reset: () => {
      if (world) {
        world.free()
      }
    },
  }
}

export interface BallPhysicsBody {
  rigidBody: any | null
  collider: any | null
  ballId: string
  setPosition: (x: number, y: number, z: number) => void
  setVelocity: (x: number, y: number, z: number) => void
  getPosition: () => { x: number; y: number; z: number }
  getVelocity: () => { x: number; y: number; z: number }
  applyImpulse: (x: number, y: number, z: number) => void
}

export function createBallPhysics(
  world: any,
  ballId: string,
  initialPosition: { x: number; y: number; z: number },
  mass = PHYSICS_CONFIG.ballMass,
  radius = PHYSICS_CONFIG.ballRadius,
  restitution = PHYSICS_CONFIG.ballRestitution,
  friction = PHYSICS_CONFIG.ballFriction
): BallPhysicsBody {
  const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(initialPosition.x, initialPosition.y, initialPosition.z)

  rigidBodyDesc.setMass(mass)

  const rigidBody = world.createRigidBody(rigidBodyDesc)

  const colliderDesc = RAPIER.ColliderDesc.ball(radius)
    .setRestitution(restitution)
    .setFriction(friction)
    .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS)

  const collider = world.createCollider(colliderDesc, rigidBody)

  return {
    rigidBody,
    collider,
    ballId,
    setPosition: (x, y, z) => {
      rigidBody.setTranslation({ x, y, z }, true)
    },
    setVelocity: (x, y, z) => {
      rigidBody.setLinvel({ x, y, z }, true)
    },
    getPosition: () => {
      const pos = rigidBody.translation()
      return { x: pos.x, y: pos.y, z: pos.z }
    },
    getVelocity: () => {
      const vel = rigidBody.linvel()
      return { x: vel.x, y: vel.y, z: vel.z }
    },
    applyImpulse: (x, y, z) => {
      rigidBody.applyImpulse({ x, y, z }, true)
    },
  }
}

export function createStaticCollider(
  world: any,
  shape: any,
  position: { x: number; y: number; z: number },
  rotation?: { x: number; y: number; z: number; w: number }
) {
  const rigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
    .setTranslation(position.x, position.y, position.z)
  if (rotation) {
    rigidBodyDesc.setRotation(rotation)
  }
  const rigidBody = world.createRigidBody(rigidBodyDesc)
  return world.createCollider(shape, rigidBody)
}

export function createTrimeshCollider(
  world: any,
  vertices: Float32Array,
  indices: Uint32Array,
  position: { x: number; y: number; z: number },
  scale = { x: 1, y: 1, z: 1 }
) {
  const scaledVertices = new Float32Array(vertices.length)
  for (let i = 0; i < vertices.length; i += 3) {
    scaledVertices[i] = vertices[i] * scale.x
    scaledVertices[i + 1] = vertices[i + 1] * scale.y
    scaledVertices[i + 2] = vertices[i + 2] * scale.z
  }

  const shape = RAPIER.ColliderDesc.trimesh(scaledVertices, indices)
  return createStaticCollider(world, shape, position)
}

export function createCuboidCollider(
  world: any,
  halfExtents: { x: number; y: number; z: number },
  position: { x: number; y: number; z: number },
  rotation?: { x: number; y: number; z: number; w: number }
) {
  const shape = RAPIER.ColliderDesc.cuboid(halfExtents.x, halfExtents.y, halfExtents.z)
  return createStaticCollider(world, shape, position, rotation)
}

export function createCylinderCollider(
  world: any,
  radius: number,
  halfHeight: number,
  position: { x: number; y: number; z: number },
  rotation?: { x: number; y: number; z: number; w: number }
) {
  const shape = RAPIER.ColliderDesc.cylinder(halfHeight, radius)
  return createStaticCollider(world, shape, position, rotation)
}

export function createCapsuleCollider(
  world: any,
  radius: number,
  halfHeight: number,
  position: { x: number; y: number; z: number },
  rotation?: { x: number; y: number; z: number; w: number }
) {
  const shape = RAPIER.ColliderDesc.capsule(halfHeight, radius)
  return createStaticCollider(world, shape, position, rotation)
}

export function usePhysicsStep(worldRef: React.MutableRefObject<PhysicsWorld | null>) {
  const { currentState } = useGameStore()

  useFrame((_, delta) => {
    if (currentState === 'RACING' && worldRef.current) {
      worldRef.current.step(delta)
    }
  }, 1)
}

export function usePhysicsDebug(worldRef: React.MutableRefObject<PhysicsWorld | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled || !worldRef.current?.world) return

    const debug = worldRef.current.world.debugRender()
    const vertices = new Float32Array(debug.vertices)
    const colors = new Float32Array(debug.colors)

    console.log('Physics debug:', {
      vertices: vertices.length / 3,
      colors: colors.length / 4,
    })
  }, [enabled, worldRef])
}