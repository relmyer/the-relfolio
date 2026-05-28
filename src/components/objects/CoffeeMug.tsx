import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor, Html } from '@react-three/drei'
import { useStore } from '../../store/useStore'

const POSITION: [number, number, number] = [-0.3, 0.85, -0.8]

export function CoffeeMug() {
  const groupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.MeshStandardMaterial>(null)
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)
  const discoverSecret = useStore((s) => s.discoverSecret)

  // useThree is required per spec even though camera is unused for this easter egg
  useThree()

  const [hovered, setHovered] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  useCursor(hovered)

  const isHovered = hoveredObject === 'coffee-mug'

  useFrame(() => {
    if (!bodyRef.current) return
    const targetIntensity = isHovered ? 0.35 : 0
    bodyRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      bodyRef.current.emissiveIntensity,
      targetIntensity,
      0.08
    )
  })

  const handleClick = () => {
    discoverSecret('secret-mug')
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 2500)
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('coffee-mug')
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
      {/* Mug body */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.035, 0.03, 0.08, 16]} />
        <meshStandardMaterial
          ref={bodyRef}
          color="#e8e0d4"
          emissive="#ffeedd"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.078, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.032, 16]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>

      {/* Handle (torus) */}
      <mesh position={[0.045, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.022, 0.006, 8, 12]} />
        <meshStandardMaterial color="#e8e0d4" />
      </mesh>

      {/* Floating message */}
      {showMessage && (
        <Html
          position={[0, 0.18, 0]}
          center
          distanceFactor={3}
          style={{
            background: 'rgba(30, 20, 10, 0.9)',
            color: '#ffeedd',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'system-ui, sans-serif',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          But first, coffee ☕
        </Html>
      )}
    </group>
  )
}
