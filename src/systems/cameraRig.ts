import { Camera, Vector3, Quaternion } from 'three'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '@/store/gameStore'
import { CAMERA_CONFIG } from '@/types/game'

export type CameraMode = 'overview' | 'chase' | 'finish'

interface CameraRigState {
  mode: CameraMode
  position: Vector3
  target: Vector3
  quaternion: Quaternion
  fov: number
  isTransitioning: boolean
  transitionStart: number
  transitionDuration: number
}

const CAMERA_TRANSITION_DURATION = 1.0

export function createCameraRig() {
  const state: CameraRigState = {
    mode: 'overview',
    position: new Vector3(...CAMERA_CONFIG.overview.position),
    target: new Vector3(...CAMERA_CONFIG.overview.target),
    quaternion: new Quaternion(),
    fov: CAMERA_CONFIG.overview.fov,
    isTransitioning: false,
    transitionStart: 0,
    transitionDuration: CAMERA_TRANSITION_DURATION,
  }

  let targetMode: CameraMode = 'overview'
  let chaseTarget: Vector3 | null = null
  const chaseOffset = new Vector3(...CAMERA_CONFIG.chase.offset)

  return {
    getState: () => state,
    setMode: (mode: CameraMode, immediate = false) => {
      if (mode === state.mode && !immediate) return

      targetMode = mode
      if (immediate) {
        state.mode = mode
        state.isTransitioning = false
        applyCameraMode(state, mode)
      } else {
        state.isTransitioning = true
        state.transitionStart = performance.now() / 1000
      }
    },
    setChaseTarget: (target: Vector3 | null) => {
      chaseTarget = target
    },
    setChaseOffset: (offset: Vector3) => {
      chaseOffset.copy(offset)
    },
    update: (_delta: number) => {
      if (!state.isTransitioning) {
        updateCameraMode(state, chaseTarget, chaseOffset)
        return
      }

      const elapsed = performance.now() / 1000 - state.transitionStart
      const progress = Math.min(elapsed / state.transitionDuration, 1)

      interpolateCamera(state, targetMode, progress, chaseTarget, chaseOffset)

      if (progress >= 1) {
        state.mode = targetMode
        state.isTransitioning = false
      }
    },
  }
}

function applyCameraMode(state: CameraRigState, mode: CameraMode) {
  switch (mode) {
    case 'overview':
      state.position.set(...CAMERA_CONFIG.overview.position)
      state.target.set(...CAMERA_CONFIG.overview.target)
      state.fov = CAMERA_CONFIG.overview.fov
      break
    case 'finish':
      state.position.set(...CAMERA_CONFIG.finish.position)
      state.target.set(...CAMERA_CONFIG.finish.target)
      state.fov = CAMERA_CONFIG.finish.fov
      break
    case 'chase':
      // Chase mode is handled dynamically
      break
  }
  state.quaternion.setFromUnitVectors(
    new Vector3(0, 0, -1),
    new Vector3().subVectors(state.target, state.position).normalize()
  )
}

function updateCameraMode(
  state: CameraRigState,
  chaseTarget: Vector3 | null,
  chaseOffset: Vector3
) {
  switch (state.mode) {
    case 'chase':
      if (chaseTarget) {
        const desiredPosition = new Vector3()
          .copy(chaseTarget)
          .add(chaseOffset)

        state.position.lerp(desiredPosition, CAMERA_CONFIG.chase.smoothness)
        state.target.lerp(chaseTarget, CAMERA_CONFIG.chase.smoothness)

        const lookAt = new Vector3().subVectors(state.target, state.position).normalize()
        const desiredQuat = new Quaternion().setFromUnitVectors(new Vector3(0, 0, -1), lookAt)
        state.quaternion.slerp(desiredQuat, CAMERA_CONFIG.chase.smoothness)
      }
      break
    case 'overview':
    case 'finish':
      // Static cameras - minimal updates
      break
  }
}

function interpolateCamera(
  state: CameraRigState,
  targetMode: CameraMode,
  progress: number,
  chaseTarget: Vector3 | null,
  chaseOffset: Vector3
) {
  const eased = easeInOutCubic(progress)

  const startPos = state.position.clone()
  const startTarget = state.target.clone()
  const startFov = state.fov

  let endPos: Vector3
  let endTarget: Vector3
  let endFov: number

  if (targetMode === 'chase' && chaseTarget) {
    endPos = new Vector3().copy(chaseTarget).add(chaseOffset)
    endTarget = chaseTarget.clone()
    endFov = CAMERA_CONFIG.overview.fov
  } else if (targetMode === 'overview') {
    endPos = new Vector3(...CAMERA_CONFIG.overview.position)
    endTarget = new Vector3(...CAMERA_CONFIG.overview.target)
    endFov = CAMERA_CONFIG.overview.fov
  } else {
    endPos = new Vector3(...CAMERA_CONFIG.finish.position)
    endTarget = new Vector3(...CAMERA_CONFIG.finish.target)
    endFov = CAMERA_CONFIG.finish.fov
  }

  state.position.lerpVectors(startPos, endPos, eased)
  state.target.lerpVectors(startTarget, endTarget, eased)
  state.fov = startFov + (endFov - startFov) * eased

  const lookAt = new Vector3().subVectors(state.target, state.position).normalize()
  const desiredQuat = new Quaternion().setFromUnitVectors(new Vector3(0, 0, -1), lookAt)
  state.quaternion.slerp(desiredQuat, eased)
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function useCameraRig(camera: Camera, rig: ReturnType<typeof createCameraRig>) {
  const { currentState } = useGameStore()

  useFrame((_, delta) => {
    const mode = getCameraModeForState(currentState)
    rig.setMode(mode)
    rig.update(delta)

    const state = rig.getState()
    camera.position.copy(state.position)
    camera.quaternion.copy(state.quaternion)
    ;(camera as any).fov = state.fov
    ;(camera as any).updateProjectionMatrix?.()
  }, 1)
}

function getCameraModeForState(gameState: string): CameraMode {
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

export function useChaseCamera(rig: ReturnType<typeof createCameraRig>) {
  const { currentState } = useGameStore()

  useFrame(() => {
    if (currentState === 'RACING') {
      rig.setMode('chase')
    }
  }, 1)
}