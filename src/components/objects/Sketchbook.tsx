import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import { useInteraction } from '../../hooks/useInteraction'

const POSITION: [number, number, number] = [-0.4, 0.78, -1.0]

export function Sketchbook() {
  const groupRef = useRef<THREE.Group>(null)
  const coverRef = useRef<THREE.MeshStandardMaterial>(null)
  const { camera } = useThree()
  const { focusObject, isAnimating } = useInteraction()
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const isHovered = hoveredObject === 'sketchbook'

  useFrame(() => {
    if (!coverRef.current) return
    const targetIntensity = isHovered ? 0.35 : 0
    coverRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      coverRef.current.emissiveIntensity,
      targetIntensity,
      0.08
    )
  })

  const handleClick = () => {
    if (isAnimating.current) return
    const targetPos = new THREE.Vector3(-0.4, 1.2, -0.5)
    const targetLookAt = new THREE.Vector3(-0.4, 0.78, -1.0)
    focusObject('sketchbook', 'sketchbook', camera, targetPos, targetLookAt)
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      rotation={[-Math.PI / 2, 0, 0.12]}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('sketchbook')
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
      {/* Cover */}
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[0.18, 0.24, 0.008]} />
        <meshStandardMaterial
          ref={coverRef}
          color="#2c3e50"
          emissive="#4a90d9"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Pages block */}
      <mesh>
        <boxGeometry args={[0.17, 0.23, 0.02]} />
        <meshStandardMaterial color="#f5f0e0" />
      </mesh>

      {/* Back cover */}
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[0.18, 0.24, 0.008]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>

      {/* Spine accent */}
      <mesh position={[-0.09, 0, 0]}>
        <boxGeometry args={[0.008, 0.24, 0.03]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
    </group>
  )
}
