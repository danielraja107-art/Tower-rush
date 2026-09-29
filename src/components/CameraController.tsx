import { useRef } from 'react'
import { PerspectiveCamera, Vector3, Quaternion } from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useGameStore } from '@/store/gameStore'
import { CAMERA_CONFIG } from '@/types/game'

export function CameraController() {
  const { camera } = useThree()
  const perspCamera = camera as PerspectiveCamera
  const rigRef = useRef({
    mode: 'overview' as 'overview' | 'chase' | 'finish',
    position: new Vector3(...CAMERA_CONFIG.overview.position),
    target: new Vector3(...CAMERA_CONFIG.overview.target),
    quaternion: new Quaternion(),
    fov: CAMERA_CONFIG.overview.fov,
    isTransitioning: false,
    transitionStart: 0,
    transitionDuration: 1.0,
    startPos: new Vector3(...CAMERA_CONFIG.overview.position),
    startTarget: new Vector3(...CAMERA_CONFIG.overview.target),
    startFov: CAMERA_CONFIG.overview.fov,
    startQuat: new Quaternion(),
    chaseTarget: null as Vector3 | null,
    chaseOffset: new Vector3(...CAMERA_CONFIG.chase.offset),
  })

  const { currentState } = useGameStore()

  useFrame((_, delta) => {
    const mode = getCameraModeForState(currentState)
    setMode(rigRef.current, mode)
    updateRig(rigRef.current, delta)

    perspCamera.position.copy(rigRef.current.position)
    perspCamera.quaternion.copy(rigRef.current.quaternion)
    perspCamera.fov = rigRef.current.fov
    perspCamera.updateProjectionMatrix()
  }, 1)

  return null
}

function getCameraModeForState(gameState: string): 'overview' | 'chase' | 'finish' {
  switch (gameState) {
    case 'LOADING':
    case 'HOME':
    case 'TOWER_SELECTION':
    case 'BALL_SELECTION':
    case 'WAGER_SELECTION':
    case 'ROUND_CONFIRMATION':
    case 'COUNTDOWN':
      return 'overview'
    case 'RACING':
      return 'chase'
    case 'FINISH_DETECTION':
    case 'RESULT':
    case 'CELEBRATION':
      return 'finish'
    case 'ROUND_COMPLETE':
      return 'overview'
    default:
      return 'overview'
  }
}

function setMode(rig: any, mode: 'overview' | 'chase' | 'finish') {
  if (mode === rig.mode && !rig.isTransitioning) return
  rig.mode = mode
  rig.isTransitioning = true
  rig.transitionStart = performance.now() / 1000
  rig.startPos = rig.position.clone()
  rig.startTarget = rig.target.clone()
  rig.startFov = rig.fov
  rig.startQuat = rig.quaternion.clone()
}

function updateRig(rig: any, _delta: number) {
  if (rig.isTransitioning) {
    const elapsed = performance.now() / 1000 - rig.transitionStart
    const progress = Math.min(elapsed / rig.transitionDuration, 1)
    const eased = easeInOutCubic(progress)

    let endPos: Vector3
    let endTarget: Vector3
    let endFov: number

    if (rig.mode === 'chase' && rig.chaseTarget) {
      endPos = rig.chaseTarget.clone().add(rig.chaseOffset)
      endTarget = rig.chaseTarget.clone()
      endFov = CAMERA_CONFIG.overview.fov
    } else if (rig.mode === 'overview') {
      endPos = new Vector3(...CAMERA_CONFIG.overview.position)
      endTarget = new Vector3(...CAMERA_CONFIG.overview.target)
      endFov = CAMERA_CONFIG.overview.fov
    } else {
      endPos = new Vector3(...CAMERA_CONFIG.finish.position)
      endTarget = new Vector3(...CAMERA_CONFIG.finish.target)
      endFov = CAMERA_CONFIG.finish.fov
    }

    rig.position.lerpVectors(rig.startPos, endPos, eased)
    rig.target.lerpVectors(rig.startTarget, endTarget, eased)
    rig.fov = rig.startFov + (endFov - rig.startFov) * eased

    const lookAt = new Vector3().subVectors(rig.target, rig.position).normalize()
    const desiredQuat = new Quaternion().setFromUnitVectors(new Vector3(0, 0, -1), lookAt)
    rig.quaternion.slerpQuaternions(rig.startQuat, desiredQuat, eased)

    if (progress >= 1) {
      rig.isTransitioning = false
    }
  } else if (rig.mode === 'chase' && rig.chaseTarget) {
    const desiredPosition = new Vector3().copy(rig.chaseTarget).add(rig.chaseOffset)
    rig.position.lerp(desiredPosition, CAMERA_CONFIG.chase.smoothness)
    rig.target.lerp(rig.chaseTarget, CAMERA_CONFIG.chase.smoothness)

    const lookAt = new Vector3().subVectors(rig.target, rig.position).normalize()
    const desiredQuat = new Quaternion().setFromUnitVectors(new Vector3(0, 0, -1), lookAt)
    rig.quaternion.slerp(desiredQuat, CAMERA_CONFIG.chase.smoothness)
  }
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}