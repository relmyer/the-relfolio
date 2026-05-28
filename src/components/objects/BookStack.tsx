import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import { useInteraction } from '../../hooks/useInteraction'

const POSITION: [number, number, number] = [-2.5, 1.2, -1.5]

const BOOKS = [
  { color: '#E85002', height: 0.04, width: 0.22, depth: 0.16, offset: 0 },
  { color: '#3B82F6', height: 0.035, width: 0.2, depth: 0.15, offset: 0.038 },
  { color: '#10B981', height: 0.045, width: 0.21, depth: 0.16, offset: 0.078 },
  { color: '#8B5CF6', height: 0.03, width: 0.19, depth: 0.14, offset: 0.115 },
]

export function BookStack() {
  const groupRef = useRef<THREE.Group>(null)
  const matRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([])
  const { camera } = useThree()
  const { focusObject, isAnimating } = useInteraction()
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const isHovered = hoveredObject === 'book-stack'

  useFrame(() => {
    matRefs.current.forEach((mat) => {
      if (!mat) return
      const targetIntensity = isHovered ? 0.35 : 0
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        targetIntensity,
        0.08
      )
    })
  })

  const handleClick = () => {
    if (isAnimating.current) return
    const targetPos = new THREE.Vector3(-2.0, 1.5, -0.8)
    const targetLookAt = new THREE.Vector3(-2.5, 1.2, -1.5)
    focusObject('book-stack', 'skills', camera, targetPos, targetLookAt)
  }

  return (
    <group
      ref={groupRef}
      position={POSITION}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('book-stack')
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
      {BOOKS.map((book, i) => (
        <mesh key={i} position={[0, book.offset, (i % 2) * 0.01]}>
          <boxGeometry args={[book.width, book.height, book.depth]} />
          <meshStandardMaterial
            ref={(el) => {
              matRefs.current[i] = el
            }}
            color={book.color}
            emissive={book.color}
            emissiveIntensity={0}
          />
        </mesh>
      ))}
    </group>
  )
}
