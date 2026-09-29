import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useGameStore } from '@/store/gameStore'

export function TowerTrack({ onFinishCross }: { onFinishCross: (ballId: string) => void }) {
  const currentState = useGameStore((state) => state.currentState)
  const isRacing = currentState === 'RACING' || currentState === 'FINISH_DETECTION'

  return (
    <group>
      {/* ================= STARTING PLATFORM (Y = 18) ================= */}
      <RigidBody type="fixed" position={[0, 18, -2]}>
        <CuboidCollider args={[3, 0.4, 3]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[6, 0.8, 6]} />
          <meshStandardMaterial color="#8b6914" roughness={0.7} metalness={0.1} />
        </mesh>
      </RigidBody>

      {/* Starting Back Wall */}
      <RigidBody type="fixed" position={[0, 19.5, -4.8]}>
        <CuboidCollider args={[3, 1, 0.2]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[6, 2, 0.4]} />
          <meshStandardMaterial color="#5d4510" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Starting Side Walls */}
      <RigidBody type="fixed" position={[-2.8, 19.5, -2]}>
        <CuboidCollider args={[0.2, 1, 2.8]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.4, 2, 5.6]} />
          <meshStandardMaterial color="#5d4510" roughness={0.8} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[2.8, 19.5, -2]}>
        <CuboidCollider args={[0.2, 1, 2.8]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.4, 2, 5.6]} />
          <meshStandardMaterial color="#5d4510" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Starting Release Gate: closes before race, opens during race */}
      {!isRacing && (
        <RigidBody type="fixed" position={[0, 19.2, 1.2]}>
          <CuboidCollider args={[2.8, 0.8, 0.2]} />
          <mesh receiveShadow castShadow>
            <boxGeometry args={[5.6, 1.6, 0.3]} />
            <meshStandardMaterial color="#b8860b" metalness={0.5} roughness={0.3} />
          </mesh>
        </RigidBody>
      )}

      {/* ================= RAMP 1 (Y = 17 -> 13, sloping forward & right) ================= */}
      {/* Main slope */}
      <RigidBody type="fixed" position={[0, 15.5, 6]} rotation={[0.22, 0, 0]}>
        <CuboidCollider args={[2.5, 0.2, 4.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5, 0.4, 9]} />
          <meshStandardMaterial color="#a67c2e" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Ramp 1 Left Rail */}
      <RigidBody type="fixed" position={[-2.4, 16.2, 6]} rotation={[0.22, 0, 0]}>
        <CuboidCollider args={[0.15, 0.5, 4.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 1.0, 9]} />
          <meshStandardMaterial color="#5d4510" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* Ramp 1 Right Rail */}
      <RigidBody type="fixed" position={[2.4, 16.2, 6]} rotation={[0.22, 0, 0]}>
        <CuboidCollider args={[0.15, 0.5, 4.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 1.0, 9]} />
          <meshStandardMaterial color="#5d4510" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* ================= TURN 1 PLATFORM (Y = 13, Z = 11) ================= */}
      <RigidBody type="fixed" position={[0, 12.8, 12]}>
        <CuboidCollider args={[3.2, 0.3, 2.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[6.4, 0.6, 5]} />
          <meshStandardMaterial color="#8b6914" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* Turn 1 Bumper / Back Wall */}
      <RigidBody type="fixed" position={[0, 14.0, 14.3]}>
        <CuboidCollider args={[3.2, 0.8, 0.2]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[6.4, 1.6, 0.4]} />
          <meshStandardMaterial color="#5d4510" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Obstacle Pegs on Turn 1 Platform */}
      <RigidBody type="fixed" position={[-1.2, 13.6, 12]}>
        <CuboidCollider args={[0.2, 0.6, 0.2]} />
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 1.2, 16]} />
          <meshStandardMaterial color="#b8860b" metalness={0.4} roughness={0.4} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[1.2, 13.6, 12.2]}>
        <CuboidCollider args={[0.2, 0.6, 0.2]} />
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 1.2, 16]} />
          <meshStandardMaterial color="#b8860b" metalness={0.4} roughness={0.4} />
        </mesh>
      </RigidBody>

      {/* ================= RAMP 2 (Y = 12.5 -> 7.5, sloping back & down) ================= */}
      <RigidBody type="fixed" position={[0, 9.8, 4]} rotation={[-0.24, 0, 0]}>
        <CuboidCollider args={[2.5, 0.2, 5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5, 0.4, 10]} />
          <meshStandardMaterial color="#a67c2e" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Ramp 2 Rails */}
      <RigidBody type="fixed" position={[-2.4, 10.5, 4]} rotation={[-0.24, 0, 0]}>
        <CuboidCollider args={[0.15, 0.5, 5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 1.0, 10]} />
          <meshStandardMaterial color="#5d4510" roughness={0.7} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[2.4, 10.5, 4]} rotation={[-0.24, 0, 0]}>
        <CuboidCollider args={[0.15, 0.5, 5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 1.0, 10]} />
          <meshStandardMaterial color="#5d4510" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* ================= TURN 2 PLATFORM (Y = 7.0, Z = -2.5) ================= */}
      <RigidBody type="fixed" position={[0, 6.8, -2.5]}>
        <CuboidCollider args={[3.2, 0.3, 2.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[6.4, 0.6, 5]} />
          <meshStandardMaterial color="#8b6914" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* Turn 2 Back Wall */}
      <RigidBody type="fixed" position={[0, 8.0, -4.8]}>
        <CuboidCollider args={[3.2, 0.8, 0.2]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[6.4, 1.6, 0.4]} />
          <meshStandardMaterial color="#5d4510" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* ================= RAMP 3 - FINAL RUN (Y = 6.5 -> 0.8, Z = 5) ================= */}
      <RigidBody type="fixed" position={[0, 3.6, 6]} rotation={[0.26, 0, 0]}>
        <CuboidCollider args={[2.5, 0.2, 6]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5, 0.4, 12]} />
          <meshStandardMaterial color="#a67c2e" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Ramp 3 Rails */}
      <RigidBody type="fixed" position={[-2.4, 4.3, 6]} rotation={[0.26, 0, 0]}>
        <CuboidCollider args={[0.15, 0.5, 6]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 1.0, 12]} />
          <meshStandardMaterial color="#5d4510" roughness={0.7} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[2.4, 4.3, 6]} rotation={[0.26, 0, 0]}>
        <CuboidCollider args={[0.15, 0.5, 6]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 1.0, 12]} />
          <meshStandardMaterial color="#5d4510" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* ================= FINISH RUNWAY (Y = 0.5, Z = 14 to 20) ================= */}
      <RigidBody type="fixed" position={[0, 0.4, 17]}>
        <CuboidCollider args={[2.5, 0.2, 4]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5, 0.4, 8]} />
          <meshStandardMaterial color="#8b6914" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* Finish Runway Side Rails */}
      <RigidBody type="fixed" position={[-2.4, 0.9, 17]}>
        <CuboidCollider args={[0.15, 0.4, 4]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 0.8, 8]} />
          <meshStandardMaterial color="#5d4510" roughness={0.7} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[2.4, 0.9, 17]}>
        <CuboidCollider args={[0.15, 0.4, 4]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.3, 0.8, 8]} />
          <meshStandardMaterial color="#5d4510" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* Finish Backstop Wall */}
      <RigidBody type="fixed" position={[0, 1.2, 21.2]}>
        <CuboidCollider args={[2.5, 0.8, 0.2]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5, 1.6, 0.4]} />
          <meshStandardMaterial color="#5d4510" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* ================= FINISH LINE ARCH & SENSOR ================= */}
      {/* Left Finish Post */}
      <mesh position={[-2.4, 2.5, 15]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 3.5, 16]} />
        <meshStandardMaterial color="#b8860b" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Right Finish Post */}
      <mesh position={[2.4, 2.5, 15]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 3.5, 16]} />
        <meshStandardMaterial color="#b8860b" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Finish Overhead Banner */}
      <mesh position={[0, 4.0, 15]} castShadow>
        <boxGeometry args={[5.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#daa520" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* FINISH SENSOR (detects first ball crossing Z = 15) */}
      <RigidBody type="fixed" position={[0, 1.2, 15]} colliders={false}>
        <CuboidCollider
          args={[2.4, 1.5, 0.4]}
          sensor
          onIntersectionEnter={(payload) => {
            const userData = payload.other.rigidBodyObject?.userData as { ballId?: string } | undefined
            if (userData?.ballId) {
              onFinishCross(userData.ballId)
            }
          }}
        />
      </RigidBody>

      {/* ================= STRUCTURAL TIMBER PILLARS (Ground to Levels) ================= */}
      {/* 4 Main Columns */}
      <mesh position={[-2.6, 9, -2]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 18, 0.5]} />
        <meshStandardMaterial color="#5d4510" roughness={0.8} />
      </mesh>
      <mesh position={[2.6, 9, -2]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 18, 0.5]} />
        <meshStandardMaterial color="#5d4510" roughness={0.8} />
      </mesh>
      <mesh position={[-2.6, 7, 12]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 14, 0.5]} />
        <meshStandardMaterial color="#5d4510" roughness={0.8} />
      </mesh>
      <mesh position={[2.6, 7, 12]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 14, 0.5]} />
        <meshStandardMaterial color="#5d4510" roughness={0.8} />
      </mesh>
    </group>
  )
}
