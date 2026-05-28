import * as THREE from 'three'

export function Decorations() {
  return (
    <group>
      <Plant position={[1.3, 0.59, -1.2]} />
      <FairyLights />
      <WallPoster position={[1.5, 1.8, -2.45]} />
      <Rug />
    </group>
  )
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 0.1, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.02, 8]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>
      {[0, 0.7, 1.4, 2.1, 2.8].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.02,
            0.08 + i * 0.02,
            Math.sin(angle) * 0.02,
          ]}
          rotation={[
            Math.sin(angle) * 0.3,
            angle,
            Math.cos(angle) * 0.3,
          ]}
        >
          <sphereGeometry args={[0.035 + i * 0.005, 6, 4]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.3, 0.5, 0.25 + i * 0.04)}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function FairyLights() {
  const lightPositions: [number, number, number][] = []
  const count = 12
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const x = THREE.MathUtils.lerp(-2.2, 2.2, t)
    const y = 2.3 + Math.sin(t * Math.PI) * 0.15
    lightPositions.push([x, y, -2.4])
  }

  return (
    <group>
      {lightPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshStandardMaterial
              color="#FFF5E0"
              emissive="#FFAA44"
              emissiveIntensity={1.5}
            />
          </mesh>
          <pointLight
            color="#FFA54F"
            intensity={0.02}
            distance={0.6}
          />
        </group>
      ))}
      {lightPositions.slice(0, -1).map((pos, i) => {
        const next = lightPositions[i + 1]
        const mid: [number, number, number] = [
          (pos[0] + next[0]) / 2,
          (pos[1] + next[1]) / 2 - 0.03,
          pos[2],
        ]
        return (
          <mesh key={`wire-${i}`} position={mid}>
            <boxGeometry args={[0.38, 0.003, 0.003]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        )
      })}
    </group>
  )
}

function WallPoster({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.7, 0.01]} />
        <meshStandardMaterial color="#2a1f14" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[0.44, 0.64]} />
        <meshStandardMaterial color="#1a1520" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.15, 0.008]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial
          color="#E85002"
          emissive="#E85002"
          emissiveIntensity={0.05}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, -0.1, 0.008]}>
        <planeGeometry args={[0.2, 0.15]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.03}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -0.5]}>
      <planeGeometry args={[2.5, 1.8]} />
      <meshStandardMaterial
        color="#2D1B0E"
        roughness={0.95}
        metalness={0}
      />
    </mesh>
  )
}
