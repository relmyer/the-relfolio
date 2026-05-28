import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useCursor, Html } from '@react-three/drei'
import { useStore } from '../../store/useStore'

export function SecretBook() {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const secretsFound = useStore((s) => s.secretsFound)
  const discoverSecret = useStore((s) => s.discoverSecret)
  const setHoveredObject = useStore((s) => s.setHoveredObject)
  const hoveredObject = useStore((s) => s.hoveredObject)

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  useCursor(hovered && visible)

  const visible = secretsFound.size >= 4 && !secretsFound.has('secret-explorer')
  const isHovered = hoveredObject === 'secret-book'

  useFrame((state) => {
    if (!meshRef.current || !visible) return
    meshRef.current.position.y =
      1.08 + Math.sin(state.clock.elapsedTime * 2) * 0.02

    if (matRef.current) {
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        isHovered ? 1.2 : 0.6,
        0.08
      )
    }
  })

  if (!visible && !clicked) return null

  const handleClick = () => {
    discoverSecret('secret-explorer')
    setClicked(true)
  }

  if (clicked) {
    return (
      <Html position={[-2.5, 1.3, -1.2]} center distanceFactor={4}>
        <div
          style={{
            background: 'linear-gradient(135deg, #E85002, #FF7A33)',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontFamily: 'system-ui',
            maxWidth: '240px',
            textAlign: 'center',
            lineHeight: '1.5',
            boxShadow: '0 8px 32px rgba(232, 80, 2, 0.4)',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>
            {'✨'}
          </div>
          You found all secrets! You're a true explorer. The curious ones always find the best things.
        </div>
      </Html>
    )
  }

  return (
    <mesh
      ref={meshRef}
      position={[-2.5, 1.08, -1.2]}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('secret-book')
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
      <boxGeometry args={[0.08, 0.14, 0.1]} />
      <meshStandardMaterial
        ref={matRef}
        color="#E85002"
        emissive="#E85002"
        emissiveIntensity={0.6}
      />
    </mesh>
  )
}
