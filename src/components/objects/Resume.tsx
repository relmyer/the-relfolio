import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import { useInteraction } from '../../hooks/useInteraction'

const POSITION: [number, number, number] = [0.5, 0.78, -1.2]

export function Resume() {
  const groupRef = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const { camera } = useThree()
  const { focusObject, isAnimating } = useInteraction()
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const isHovered = hoveredObject === 'resume'

  useFrame(() => {
    if (!groupRef.current) return
    const targetRotX = isHovered ? -0.08 : 0
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06
    )

    if (matRef.current) {
      const targetIntensity = isHovered ? 0.4 : 0
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetIntensity,
        0.08
      )
    }
  })

  const handleClick = () => {
    if (isAnimating.current) return
    const targetPos = new THREE.Vector3(0.5, 1.2, -0.7)
    const targetLookAt = new THREE.Vector3(0.5, 0.78, -1.2)
    focusObject('resume', 'experience', camera, targetPos, targetLookAt)
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('resume')
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
      {/* Paper sheet */}
      <mesh rotation={[-Math.PI / 2, 0, 0.05]}>
        <boxGeometry args={[0.17, 0.22, 0.003]} />
        <meshStandardMaterial
          ref={matRef}
          color="#f5f0e8"
          emissive="#ffffff"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Faint text lines */}
      {[0.06, 0.03, 0, -0.03, -0.06].map((yOff, i) => (
        <mesh key={i} position={[0, 0.003, yOff]} rotation={[-Math.PI / 2, 0, 0.05]}>
          <planeGeometry args={[0.12, 0.006]} />
          <meshStandardMaterial color="#c0b8a8" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}
