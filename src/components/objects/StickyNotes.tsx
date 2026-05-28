import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useCursor, Html } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import { useInteraction } from '../../hooks/useInteraction'
import { stickyNotes } from '../../store/content'

const GROUP_POSITION: [number, number, number] = [0.4, 1.45, -1.75]

const STICKY_COLORS = ['#FFE066', '#FF9ECD', '#7ECFFF', '#A8F0C0']

export function StickyNotes() {
  const groupRef = useRef<THREE.Group>(null)
  const matRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([])
  const { camera } = useThree()
  const { focusObject, isAnimating } = useInteraction()
  const hoveredObject = useStore((s) => s.hoveredObject)
  const setHoveredObject = useStore((s) => s.setHoveredObject)
  const setStickyNoteContent = useStore((s) => s.setStickyNoteContent)

  const [hovered, setHovered] = useState(false)
  const [hoveredNote, setHoveredNote] = useState<number | null>(null)
  useCursor(hovered)

  const isHovered = hoveredObject === 'sticky-notes'

  useFrame(() => {
    matRefs.current.forEach((mat) => {
      if (!mat) return
      const targetIntensity = isHovered ? 0.3 : 0
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        targetIntensity,
        0.08
      )
    })
  })

  const handleClick = (noteIndex: number) => {
    if (isAnimating.current) return
    setStickyNoteContent(stickyNotes[noteIndex].text)
    const targetPos = new THREE.Vector3(0.4, 1.55, -1.2)
    const targetLookAt = new THREE.Vector3(0.4, 1.45, -1.75)
    focusObject('sticky-notes', 'sticky-note', camera, targetPos, targetLookAt)
  }

  return (
    <group
      ref={groupRef}
      position={GROUP_POSITION}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredObject('sticky-notes')
      }}
      onPointerLeave={(e) => {
        e.stopPropagation()
        setHovered(false)
        setHoveredObject(null)
        setHoveredNote(null)
      }}
    >
      {stickyNotes.map((note, i) => (
        <group
          key={note.id}
          position={[
            note.position[0] * 0.4,
            note.position[1] * 0.4,
            note.position[2],
          ]}
          onPointerEnter={(e) => {
            e.stopPropagation()
            setHoveredNote(i)
          }}
          onPointerLeave={(e) => {
            e.stopPropagation()
            setHoveredNote(null)
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleClick(i)
          }}
        >
          {/* Sticky note plane */}
          <mesh rotation={[0, 0, (i - 1.5) * 0.06]}>
            <planeGeometry args={[0.08, 0.08]} />
            <meshStandardMaterial
              ref={(el) => {
                matRefs.current[i] = el
              }}
              color={STICKY_COLORS[i % STICKY_COLORS.length]}
              emissive={STICKY_COLORS[i % STICKY_COLORS.length]}
              emissiveIntensity={0}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Show text on hover */}
          {hoveredNote === i && (
            <Html
              position={[0, 0.06, 0.01]}
              center
              distanceFactor={4}
              style={{
                background: STICKY_COLORS[i % STICKY_COLORS.length],
                color: '#1a1a1a',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '10px',
                fontFamily: 'system-ui, sans-serif',
                maxWidth: '140px',
                whiteSpace: 'normal',
                lineHeight: '1.3',
                pointerEvents: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {note.text}
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}
