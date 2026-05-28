import * as THREE from 'three'

export function Decorations() {
  return (
    <group>
      <Cactus position={[0.65, 0.76, -1.7]} />
      <PenHolder position={[-0.55, 0.76, -1.65]} />
      <Headphones position={[0.6, 0.78, -1.1]} />
      <Calendar position={[0.72, 0.85, -1.5]} />
      <Speaker position={[1.8, 1.5, -1.8]} />
      <WatermelonSlice position={[-0.15, 0.77, -0.85]} />
      <FairyLights />
      <WallPoster position={[1.5, 1.8, -2.44]} />
      <PinnedPapers />
      <HeartFrame position={[-0.7, 0.8, -1.3]} />
      <Rug />
      <WallShelf position={[2.8, 1.2, -1.0]} />
    </group>
  )
}

function Cactus({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.06, 8]} />
        <meshStandardMaterial color="#E8B89D" roughness={0.85} />
      </mesh>
      {/* Dirt */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 0.008, 8]} />
        <meshStandardMaterial color="#5C3A24" roughness={1} />
      </mesh>
      {/* Cactus body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.08, 6]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.8} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.035, 0.11, 0]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#66BB6A" roughness={0.8} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.035, 0.12, 0]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#66BB6A" roughness={0.8} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.145, 0]}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.8} />
      </mesh>
    </group>
  )
}

function PenHolder({ position }: { position: [number, number, number] }) {
  const pens: { color: string; angle: number; lean: number }[] = [
    { color: '#E85002', angle: 0, lean: 0.08 },
    { color: '#3B82F6', angle: 1.6, lean: 0.1 },
    { color: '#F59E0B', angle: 3.2, lean: 0.06 },
    { color: '#EC4899', angle: 4.8, lean: 0.12 },
  ]

  return (
    <group position={position}>
      {/* Cup */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.08, 8]} />
        <meshStandardMaterial color="#4ECDC4" roughness={0.6} />
      </mesh>
      {/* Pens */}
      {pens.map((pen, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(pen.angle) * 0.01,
            0.1,
            Math.cos(pen.angle) * 0.01,
          ]}
          rotation={[
            Math.sin(pen.angle) * pen.lean,
            0,
            Math.cos(pen.angle) * pen.lean,
          ]}
        >
          <cylinderGeometry args={[0.005, 0.005, 0.1, 4]} />
          <meshStandardMaterial color={pen.color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Headphones({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0.3]}>
      {/* Left ear cup */}
      <mesh position={[-0.06, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
        <meshStandardMaterial color="#2D3748" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Left ear cushion */}
      <mesh position={[-0.06, 0.011, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.005, 12]} />
        <meshStandardMaterial color="#4A5568" roughness={0.8} />
      </mesh>
      {/* Right ear cup */}
      <mesh position={[0.06, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
        <meshStandardMaterial color="#2D3748" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Right ear cushion */}
      <mesh position={[0.06, 0.011, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.005, 12]} />
        <meshStandardMaterial color="#4A5568" roughness={0.8} />
      </mesh>
      {/* Headband */}
      <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.06, 0.008, 6, 16, Math.PI]} />
        <meshStandardMaterial color="#2D3748" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  )
}

function Calendar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Calendar body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 0.14, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>
      {/* Red accent bar at top */}
      <mesh position={[0, 0.055, 0.001]}>
        <boxGeometry args={[0.12, 0.03, 0.01]} />
        <meshStandardMaterial color="#EF4444" roughness={0.5} />
      </mesh>
      {/* Faint grid lines (decorative boxes) */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.035 + col * 0.025,
              0.01 - row * 0.025,
              0.006,
            ]}
          >
            <boxGeometry args={[0.02, 0.018, 0.001]} />
            <meshStandardMaterial color="#F3F4F6" roughness={0.7} />
          </mesh>
        )),
      )}
    </group>
  )
}

function Speaker({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Speaker body */}
      <mesh>
        <boxGeometry args={[0.12, 0.16, 0.1]} />
        <meshStandardMaterial color="#2D3748" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Speaker cone circle */}
      <mesh position={[0, 0.02, 0.051]}>
        <cylinderGeometry args={[0.03, 0.03, 0.005, 12]} />
        <meshStandardMaterial color="#4A5568" roughness={0.6} />
      </mesh>
      {/* Small tweeter */}
      <mesh position={[0, -0.04, 0.051]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.005, 10]} />
        <meshStandardMaterial color="#4A5568" roughness={0.6} />
      </mesh>
      {/* Indicator light */}
      <mesh position={[0.04, -0.065, 0.051]}>
        <sphereGeometry args={[0.005, 6, 6]} />
        <meshStandardMaterial
          color="#4ADE80"
          emissive="#4ADE80"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  )
}

function WatermelonSlice({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {/* Rind (green outer) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.06, 0.02, 0.06]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.7} />
      </mesh>
      {/* Flesh (red inner) */}
      <mesh position={[0, 0.008, 0]}>
        <boxGeometry args={[0.05, 0.015, 0.05]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.6} />
      </mesh>
      {/* Seeds (tiny dark dots) */}
      {[[-0.01, 0.017, 0.01], [0.01, 0.017, -0.005], [0, 0.017, -0.015]].map(
        (seedPos, i) => (
          <mesh key={i} position={seedPos as [number, number, number]}>
            <sphereGeometry args={[0.003, 4, 4]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.9} />
          </mesh>
        ),
      )}
    </group>
  )
}

function FairyLights() {
  const lightPositions: [number, number, number][] = []
  const count = 16
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const x = THREE.MathUtils.lerp(-2.2, 2.2, t)
    const y = 2.35 + Math.sin(t * Math.PI) * 0.12
    lightPositions.push([x, y, -2.44])
  }

  return (
    <group>
      {lightPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshStandardMaterial
              color="#FFD93D"
              emissive="#FFAA00"
              emissiveIntensity={1.8}
            />
          </mesh>
          <pointLight color="#FFAA00" intensity={0.02} distance={0.6} />
        </group>
      ))}
      {/* Wires between lights */}
      {lightPositions.slice(0, -1).map((pos, i) => {
        const next = lightPositions[i + 1]
        const mid: [number, number, number] = [
          (pos[0] + next[0]) / 2,
          (pos[1] + next[1]) / 2 - 0.02,
          pos[2],
        ]
        const dx = next[0] - pos[0]
        const dy = next[1] - pos[1]
        const length = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)
        return (
          <mesh key={`wire-${i}`} position={mid} rotation={[0, 0, angle]}>
            <boxGeometry args={[length, 0.003, 0.003]} />
            <meshStandardMaterial color="#444" />
          </mesh>
        )
      })}
    </group>
  )
}

function WallPoster({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.5, 0.7, 0.01]} />
        <meshStandardMaterial color="#2a1f14" roughness={0.7} />
      </mesh>
      {/* Inner background */}
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[0.44, 0.64]} />
        <meshStandardMaterial color="#1a1520" roughness={0.6} />
      </mesh>
      {/* Teal accent shape */}
      <mesh position={[-0.05, 0.15, 0.008]}>
        <planeGeometry args={[0.25, 0.2]} />
        <meshStandardMaterial
          color="#4ECDC4"
          emissive="#4ECDC4"
          emissiveIntensity={0.06}
          roughness={0.4}
        />
      </mesh>
      {/* Coral/pink accent shape */}
      <mesh position={[0.06, -0.1, 0.008]}>
        <planeGeometry args={[0.2, 0.15]} />
        <meshStandardMaterial
          color="#FF6B6B"
          emissive="#FF6B6B"
          emissiveIntensity={0.04}
          roughness={0.4}
        />
      </mesh>
      {/* Small yellow circle accent */}
      <mesh position={[0.12, 0.22, 0.009]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.04, 12]} />
        <meshStandardMaterial
          color="#FFD93D"
          emissive="#FFD93D"
          emissiveIntensity={0.03}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

function PinnedPapers() {
  const papers: {
    position: [number, number, number]
    rotation: [number, number, number]
    pinColor: string
    paperColor: string
    size: [number, number]
  }[] = [
    {
      position: [-0.5, 2.0, -2.44],
      rotation: [0, 0, 0.05],
      pinColor: '#EF4444',
      paperColor: '#F5F5F0',
      size: [0.15, 0.2],
    },
    {
      position: [0.6, 2.1, -2.44],
      rotation: [0, 0, -0.08],
      pinColor: '#3B82F6',
      paperColor: '#F5F5F0',
      size: [0.13, 0.18],
    },
    {
      position: [-0.8, 1.7, -2.44],
      rotation: [0, 0, 0.12],
      pinColor: '#F59E0B',
      paperColor: '#FFFFF0',
      size: [0.14, 0.19],
    },
    {
      position: [0.1, 1.75, -2.44],
      rotation: [0, 0, -0.03],
      pinColor: '#EC4899',
      paperColor: '#F0F5FF',
      size: [0.12, 0.16],
    },
  ]

  return (
    <group>
      {papers.map((paper, i) => (
        <group key={i} position={paper.position} rotation={paper.rotation}>
          {/* Paper */}
          <mesh>
            <boxGeometry args={[paper.size[0], paper.size[1], 0.002]} />
            <meshStandardMaterial color={paper.paperColor} roughness={0.9} />
          </mesh>
          {/* Faint line decorations on paper */}
          {[0, 1, 2].map((line) => (
            <mesh
              key={`line-${line}`}
              position={[0, paper.size[1] * 0.25 - line * paper.size[1] * 0.2, 0.002]}
            >
              <boxGeometry args={[paper.size[0] * 0.7, 0.003, 0.001]} />
              <meshStandardMaterial color="#D1D5DB" roughness={0.9} />
            </mesh>
          ))}
          {/* Pin */}
          <mesh position={[0, paper.size[1] * 0.45, 0.003]}>
            <sphereGeometry args={[0.012, 6, 6]} />
            <meshStandardMaterial
              color={paper.pinColor}
              roughness={0.3}
              metalness={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function HeartFrame({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Frame outer */}
      <mesh>
        <boxGeometry args={[0.06, 0.07, 0.01]} />
        <meshStandardMaterial color="#EC4899" roughness={0.5} />
      </mesh>
      {/* Inner plane */}
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[0.045, 0.055]} />
        <meshStandardMaterial color="#FFE0F0" roughness={0.7} />
      </mesh>
      {/* Tiny heart-like decoration (two small spheres + triangle) */}
      <mesh position={[-0.008, 0.005, 0.008]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshStandardMaterial color="#F472B6" roughness={0.5} />
      </mesh>
      <mesh position={[0.008, 0.005, 0.008]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshStandardMaterial color="#F472B6" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.005, 0.008]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.012, 0.012, 0.003]} />
        <meshStandardMaterial color="#F472B6" roughness={0.5} />
      </mesh>
    </group>
  )
}

function Rug() {
  return (
    <group>
      {/* Main rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -0.5]}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshStandardMaterial color="#B5651D" roughness={0.95} metalness={0} />
      </mesh>
      {/* Decorative border stripe */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, -0.5]}>
        <planeGeometry args={[2.3, 1.6]} />
        <meshStandardMaterial color="#A0522D" roughness={0.95} metalness={0} />
      </mesh>
      {/* Inner pattern area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.007, -0.5]}>
        <planeGeometry args={[2.0, 1.3]} />
        <meshStandardMaterial color="#C4783E" roughness={0.95} metalness={0} />
      </mesh>
      {/* Center diamond pattern */}
      <mesh
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        position={[0, 0.008, -0.5]}
      >
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial color="#D4956B" roughness={0.95} metalness={0} />
      </mesh>
    </group>
  )
}

function WallShelf({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Shelf board */}
      <mesh>
        <boxGeometry args={[0.5, 0.03, 0.2]} />
        <meshStandardMaterial color="#8B6F4E" roughness={0.8} />
      </mesh>
      {/* Small bracket left */}
      <mesh position={[-0.18, -0.04, 0.08]}>
        <boxGeometry args={[0.02, 0.06, 0.02]} />
        <meshStandardMaterial color="#6B5740" roughness={0.8} />
      </mesh>
      {/* Small bracket right */}
      <mesh position={[0.18, -0.04, 0.08]}>
        <boxGeometry args={[0.02, 0.06, 0.02]} />
        <meshStandardMaterial color="#6B5740" roughness={0.8} />
      </mesh>
      {/* Item 1: small box/book */}
      <mesh position={[-0.15, 0.055, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.06]} />
        <meshStandardMaterial color="#6366F1" roughness={0.6} />
      </mesh>
      {/* Item 2: tiny cylinder (candle/jar) */}
      <mesh position={[0.05, 0.05, 0.02]}>
        <cylinderGeometry args={[0.03, 0.03, 0.07, 8]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.5} />
      </mesh>
      {/* Item 3: small sphere (decorative ball) */}
      <mesh position={[0.18, 0.04, -0.02]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#EC4899" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  )
}
