import { Suspense, useEffect, useRef, useCallback } from 'react'
import { Environment, Sky, ContactShadows } from '@react-three/drei'
import { CameraController } from './CameraController'
import { TowerTrack } from './TowerTrack'
import { RaceBalls } from './RaceBalls'
import { liveBallProgress } from '@/systems/raceState'
import { DebugControls } from './DebugControls'
import { useGameStore } from '@/store/gameStore'
import { BallId } from '@/types/game'

export function Scene() {
  const currentState = useGameStore((state) => state.currentState)
  const isRaceFinished = useRef(false)

  // Reset finish trigger state on new round
  useEffect(() => {
    if (currentState !== 'RACING' && currentState !== 'FINISH_DETECTION') {
      isRaceFinished.current = false
    }
  }, [currentState])

  const handleFinishCross = useCallback((winnerId: string) => {
    if (isRaceFinished.current) return
    isRaceFinished.current = true

    const store = useGameStore.getState()
    if (store.currentState !== 'RACING') return

    const selectedBallWon = winnerId === store.selectedBall
    const payout = selectedBallWon ? store.selectedWager * 2 : 0

    store.goToState('FINISH_DETECTION')

    setTimeout(() => {
      store.completeRace({
        winnerId: winnerId as BallId,
        finishTimes: {
          ruby: 1000,
          sapphire: 1000,
          emerald: 1000,
          amber: 1000,
          [winnerId]: 850,
        } as any,
        selectedBallWon,
        payout,
      })
    }, 1200)
  }, [])

  // Failsafe timer: if balls get delayed or stuck during race, resolve safely after 16s
  useEffect(() => {
    if (currentState === 'RACING') {
      const failsafeTimer = setTimeout(() => {
        if (!isRaceFinished.current) {
          // Find leading ball by progress
          let bestBall: BallId = 'ruby'
          let maxProgress = -1
          ;(Object.keys(liveBallProgress) as BallId[]).forEach((id) => {
            if (liveBallProgress[id] > maxProgress) {
              maxProgress = liveBallProgress[id]
              bestBall = id
            }
          })
          handleFinishCross(bestBall)
        }
      }, 16000)

      return () => clearTimeout(failsafeTimer)
    }
  }, [currentState, handleFinishCross])

  return (
    <>
      <CameraController />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[25, 35, 20]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />

      <Sky
        sunPosition={[25, 35, 20]}
        turbidity={2}
        rayleigh={1.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      <Environment preset="forest" background={false}>
        {/* @ts-ignore - Environment render prop types */}
        {(props: any) => (
          <group {...props}>
            <ContactShadows
              opacity={0.4}
              scale={50}
              blur={2}
              far={40}
              resolution={1024}
            />
          </group>
        )}
      </Environment>

      <Suspense fallback={null}>
        <SceneContent onFinishCross={handleFinishCross} />
      </Suspense>

      <DebugControls />
    </>
  )
}

function SceneContent({ onFinishCross }: { onFinishCross: (winnerId: string) => void }) {
  return (
    <group>
      <GroundPlane />
      <EnvironmentScatter />
      <TowerTrack onFinishCross={onFinishCross} />
      <RaceBalls />
    </group>
  )
}

function GroundPlane() {
  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[200, 200, 32, 32]} />
      <meshStandardMaterial
        color="#2d6b3f"
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  )
}

function EnvironmentScatter() {
  const treePositions: [number, number, number][] = [
    [-18, 0, -10],
    [-22, 0, 5],
    [-16, 0, 18],
    [18, 0, -8],
    [22, 0, 8],
    [17, 0, 20],
    [-12, 0, -22],
    [12, 0, -22],
  ]

  return (
    <group>
      {/* Decorative pine trees */}
      {treePositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          {/* Trunk */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.6, 5, 8]} />
            <meshStandardMaterial color="#4a3518" roughness={0.9} />
          </mesh>
          {/* Foliage Cone 1 */}
          <mesh position={[0, 5.5, 0]} castShadow>
            <coneGeometry args={[2.5, 4, 8]} />
            <meshStandardMaterial color="#1b4d2e" roughness={0.8} />
          </mesh>
          {/* Foliage Cone 2 */}
          <mesh position={[0, 7.5, 0]} castShadow>
            <coneGeometry args={[1.8, 3.5, 8]} />
            <meshStandardMaterial color="#225c38" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}