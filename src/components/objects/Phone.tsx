import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import { useInteraction } from '../../hooks/useInteraction'

const POSITION: [number, number, number] = [0.7, 0.78, -1.0]

export function Phone() {
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.MeshStandardMaterial>(null)
  const { camera } = useThree()
  const { focusObject, isAnimating } = useInteraction()
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const isHovered = hoveredObject === 'phone'

  useFrame(({ clock }) => {
    if (!screenRef.current) return
    // Subtle idle glow pulse
    const idlePulse = 0.08 + Math.sin(clock.getElapsedTime() * 2) * 0.04
    const targetIntensity = isHovered ? 0.6 : idlePulse
    screenRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      screenRef.current.emissiveIntensity,
      targetIntensity,
      0.08
    )
  })

  const handleClick = () => {
    if (isAnimating.current) return
    const targetPos = new THREE.Vector3(0.7, 1.1, -0.5)
    const targetLookAt = new THREE.Vector3(0.7, 0.78, -1.0)
    focusObject('phone', 'contact', camera, targetPos, targetLookAt)
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      rotation={[-Math.PI / 2, 0, -0.1]}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('phone')
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
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[0.065, 0.13, 0.008]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.005, 0.005]}>
        <planeGeometry args={[0.055, 0.11]} />
        <meshStandardMaterial
          ref={screenRef}
          color="#0a0a1a"
          emissive="#6ec6ff"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Camera bump */}
      <mesh position={[0, 0.055, 0.005]}>
        <circleGeometry args={[0.004, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}
