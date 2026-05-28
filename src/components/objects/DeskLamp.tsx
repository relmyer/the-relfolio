import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useStore } from '../../store/useStore'

const POSITION: [number, number, number] = [-0.8, 0.76, -1.6]

export function DeskLamp() {
  const groupRef = useRef<THREE.Group>(null)
  const bulbRef = useRef<THREE.MeshStandardMaterial>(null)
  const shadeRef = useRef<THREE.MeshStandardMaterial>(null)
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)
  const toggleRoomMood = useStore((s) => s.toggleRoomMood)
  const discoverSecret = useStore((s) => s.discoverSecret)
  const roomMood = useStore((s) => s.roomMood)

  // useThree required per spec
  useThree()

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const isHovered = hoveredObject === 'desk-lamp'
  const isEvening = roomMood === 'evening'

  useFrame(() => {
    if (bulbRef.current) {
      const bulbTarget = isEvening ? 1.5 : 0.2
      const bulbHover = isHovered ? bulbTarget + 0.5 : bulbTarget
      bulbRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        bulbRef.current.emissiveIntensity,
        bulbHover,
        0.06
      )
    }
    if (shadeRef.current) {
      const targetIntensity = isHovered ? 0.25 : 0
      shadeRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        shadeRef.current.emissiveIntensity,
        targetIntensity,
        0.08
      )
    }
  })

  const handleClick = () => {
    toggleRoomMood()
    discoverSecret('secret-lamp')
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('desk-lamp')
      }}
      onPointerLeave={(e) => {
        e.stopPropagation()
        setHovered(false)
        setHoveredObject(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        handleClick()
      }}
    >
      {/* Base */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.02, 16]} />
        <meshStandardMaterial color="#2D3748" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Arm (lower) */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.2, 8]} />
        <meshStandardMaterial color="#2D3748" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Arm joint */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="#4A5568" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Arm (upper, angled) */}
      <mesh position={[0.04, 0.26, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.007, 0.007, 0.16, 8]} />
        <meshStandardMaterial color="#2D3748" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Shade (cone) */}
      <mesh position={[0.08, 0.32, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.05, 0.06, 16, 1, true]} />
        <meshStandardMaterial
          ref={shadeRef}
          color="#2D3748"
          emissive="#FFB86C"
          emissiveIntensity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bulb */}
      <mesh position={[0.08, 0.3, 0]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial
          ref={bulbRef}
          color={isEvening ? '#fff5e0' : '#666'}
          emissive={isEvening ? '#ffcc66' : '#333'}
          emissiveIntensity={isEvening ? 1.5 : 0.2}
        />
      </mesh>

      {/* Point light for lamp effect */}
      <pointLight
        position={[0.08, 0.28, 0]}
        color="#ffcc66"
        intensity={isEvening ? 0.4 : 0.05}
        distance={1.5}
        decay={2}
      />
    </group>
  )
}
