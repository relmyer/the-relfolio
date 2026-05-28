import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import { useInteraction } from '../../hooks/useInteraction'

const POSITION: [number, number, number] = [0, 1.1, -1.8]

export function Monitor() {
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.MeshStandardMaterial>(null)
  const { camera } = useThree()
  const { focusObject, isAnimating } = useInteraction()
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)
  const focusedObject = useStore((s) => s.focusedObject)

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const isHovered = hoveredObject === 'monitor'
  const isFocused = focusedObject === 'monitor'

  useFrame(() => {
    if (!screenRef.current) return
    const targetIntensity = isFocused ? 1.2 : isHovered ? 0.6 : 0.15
    screenRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      screenRef.current.emissiveIntensity,
      targetIntensity,
      0.08
    )
  })

  const handleClick = () => {
    if (isAnimating.current) return
    const targetPos = new THREE.Vector3(0, 1.3, -1.0)
    const targetLookAt = new THREE.Vector3(0, 1.1, -1.8)
    focusObject('monitor', 'projects', camera, targetPos, targetLookAt)
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('monitor')
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
      {/* Bezel / frame */}
      <mesh position={[0, 0.28, -0.005]}>
        <boxGeometry args={[0.96, 0.58, 0.025]} />
        <meshStandardMaterial color="#E8E0D4" roughness={0.5} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.9, 0.52, 0.03]} />
        <meshStandardMaterial color="#0D1117" />
      </mesh>

      {/* Screen face (front) — vibrant glow */}
      <mesh position={[0, 0.28, 0.016]}>
        <planeGeometry args={[0.84, 0.47]} />
        <meshStandardMaterial
          ref={screenRef}
          color="#0D1117"
          emissive="#4ECDC4"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Screen light splash (subtle glow) */}
      <pointLight
        position={[0, 0.28, 0.15]}
        color="#4ECDC4"
        intensity={0.15}
        distance={1.5}
        decay={2}
      />

      {/* Stand neck */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.06, 0.15, 0.04]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -0.13, 0.05]}>
        <boxGeometry args={[0.3, 0.02, 0.18]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  )
}
