import { describe, it, expect } from 'vitest'
import { PHYSICS_CONFIG, CAMERA_CONFIG } from '@/types/game'

describe('Physics Configuration', () => {
  it('should have correct gravity', () => {
    expect(PHYSICS_CONFIG.gravity.x).toBe(0)
    expect(PHYSICS_CONFIG.gravity.y).toBe(-9.81)
    expect(PHYSICS_CONFIG.gravity.z).toBe(0)
  })

  it('should have correct ball properties', () => {
    expect(PHYSICS_CONFIG.ballMass).toBe(1.0)
    expect(PHYSICS_CONFIG.ballRadius).toBe(0.5)
    expect(PHYSICS_CONFIG.ballRestitution).toBe(0.3)
    expect(PHYSICS_CONFIG.ballFriction).toBe(0.4)
  })

  it('should have correct simulation settings', () => {
    expect(PHYSICS_CONFIG.fixedTimeStep).toBe(1 / 60)
    expect(PHYSICS_CONFIG.maxSubSteps).toBe(4)
  })
})

describe('Physics Calculations', () => {
  it('should calculate ball terminal velocity correctly', () => {
    const g = 9.81
    const mass = PHYSICS_CONFIG.ballMass
    const radius = PHYSICS_CONFIG.ballRadius
    const dragCoefficient = 0.47
    const airDensity = 1.225
    const crossSection = Math.PI * radius * radius

    const terminalVelocity = Math.sqrt((2 * mass * g) / (dragCoefficient * airDensity * crossSection))
    expect(terminalVelocity).toBeGreaterThan(0)
    expect(terminalVelocity).toBeLessThan(50)
  })

  it('should calculate impact force', () => {
    const mass = PHYSICS_CONFIG.ballMass
    const velocity = 10
    const impactDuration = 0.01

    const force = (mass * velocity) / impactDuration
    expect(force).toBe(1000)
  })

  it('should calculate bounce height with restitution', () => {
    const dropHeight = 10
    const restitution = PHYSICS_CONFIG.ballRestitution

    const bounceHeight = dropHeight * restitution * restitution
    expect(bounceHeight).toBeCloseTo(0.9, 1)
  })
})

describe('Camera Configuration', () => {
  it('should have valid camera configs', () => {
    expect(CAMERA_CONFIG.overview.position).toHaveLength(3)
    expect(CAMERA_CONFIG.overview.target).toHaveLength(3)
    expect(CAMERA_CONFIG.overview.fov).toBeGreaterThan(0)
    expect(CAMERA_CONFIG.overview.fov).toBeLessThan(180)

    expect(CAMERA_CONFIG.chase.offset).toHaveLength(3)
    expect(CAMERA_CONFIG.chase.lookAhead).toBeGreaterThan(0)
    expect(CAMERA_CONFIG.chase.smoothness).toBeGreaterThan(0)
    expect(CAMERA_CONFIG.chase.smoothness).toBeLessThanOrEqual(1)

    expect(CAMERA_CONFIG.finish.position).toHaveLength(3)
    expect(CAMERA_CONFIG.finish.target).toHaveLength(3)
    expect(CAMERA_CONFIG.finish.fov).toBeGreaterThan(0)
  })
})