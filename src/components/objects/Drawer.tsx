import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor, Html } from '@react-three/drei'
import { useStore } from '../../store/useStore'

const POSITION: [number, number, number] = [0.3, 0.45, -1.2]

export function Drawer() {
  const groupRef = useRef<THREE.Group>(null)
  const drawerRef = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)
  const discoverSecret = useStore((s) => s.discoverSecret)

  // useThree required per spec
  useThree()

  const [hovered, setHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const slideTarget = useRef(0)
  useCursor(hovered)

  const isHovered = hoveredObject === 'drawer'

  useFrame(() => {
    if (drawerRef.current) {
      drawerRef.current.position.z = THREE.MathUtils.lerp(
        drawerRef.current.position.z,
        slideTarget.current,
        0.06
      )
    }
    if (matRef.current) {
      const targetIntensity = isHovered ? 0.3 : 0
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetIntensity,
        0.08
      )
    }
  })

  const handleClick = () => {
    if (!isOpen) {
      slideTarget.current = 0.3
      setIsOpen(true)
      discoverSecret('secret-drawer')
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 4000)
    } else {
      slideTarget.current = 0
      setIsOpen(false)
      setShowMessage(false)
    }
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('drawer')
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
      <group ref={drawerRef}>
        {/* Drawer front panel */}
        <mesh>
          <boxGeometry args={[0.35, 0.12, 0.02]} />
          <meshStandardMaterial
            ref={matRef}
            color="#5c4a3a"
            emissive="#aa8866"
            emissiveIntensity={0}
          />
        </mesh>

        {/* Handle */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <meshStandardMaterial color="#8a7560" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Drawer body (sides visible when open) */}
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[0.33, 0.1, 0.2]} />
          <meshStandardMaterial color="#6b5a4a" />
        </mesh>
      </group>

      {/* Hidden message */}
      {showMessage && (
        <Html
          position={[0, 0.2, 0.3]}
          center
          distanceFactor={3}
          style={{
            background: 'rgba(30, 20, 10, 0.92)',
            color: '#ffeedd',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            maxWidth: '220px',
            whiteSpace: 'normal',
            lineHeight: '1.4',
            pointerEvents: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
            textAlign: 'center',
          }}
        >
          {"You found a secret! 🎉 Here's a fun fact: I once spent 3 hours debugging a CSS issue that turned out to be a typo."}
        </Html>
      )}
    </group>
  )
}
