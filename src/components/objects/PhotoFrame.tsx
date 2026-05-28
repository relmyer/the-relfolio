import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import { useInteraction } from '../../hooks/useInteraction'

const POSITION: [number, number, number] = [-0.6, 0.85, -1.3]

export function PhotoFrame() {
  const groupRef = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const { camera } = useThree()
  const { focusObject, isAnimating } = useInteraction()
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const isHovered = hoveredObject === 'photo-frame'

  useFrame(() => {
    if (!matRef.current) return
    const targetIntensity = isHovered ? 0.4 : 0
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      targetIntensity,
      0.08
    )
  })

  const handleClick = () => {
    if (isAnimating.current) return
    const targetPos = new THREE.Vector3(-0.6, 1.1, -0.7)
    const targetLookAt = new THREE.Vector3(-0.6, 0.85, -1.3)
    focusObject('photo-frame', 'about', camera, targetPos, targetLookAt)
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      rotation={[0.15, 0, 0]}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('photo-frame')
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
      {/* Outer frame */}
      <mesh>
        <boxGeometry args={[0.2, 0.24, 0.02]} />
        <meshStandardMaterial color="#5c3a1e" />
      </mesh>

      {/* Inner photo area */}
      <mesh position={[0, 0, 0.011]}>
        <planeGeometry args={[0.15, 0.19]} />
        <meshStandardMaterial
          ref={matRef}
          color="#d4a574"
          emissive="#ffeedd"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Frame stand (back) */}
      <mesh position={[0, -0.06, -0.04]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.02, 0.14, 0.01]} />
        <meshStandardMaterial color="#5c3a1e" />
      </mesh>
    </group>
  )
}
