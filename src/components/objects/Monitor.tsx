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
    <group>
      {/* === CRT Monitor === */}
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
        {/* CRT body — big boxy beige case */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.55, 0.45]} />
          <meshStandardMaterial color="#E8DCC8" roughness={0.7} />
        </mesh>

        {/* Front bezel — slightly smaller, slightly forward */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[0.65, 0.5, 0.06]} />
          <meshStandardMaterial color="#D4C8B0" roughness={0.6} />
        </mesh>

        {/* Screen inset — green-tinted emissive glow */}
        <mesh position={[0, 0.02, 0.235]}>
          <planeGeometry args={[0.52, 0.4]} />
          <meshStandardMaterial
            ref={screenRef}
            color="#0D1117"
            emissive="#4ECDC4"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Power LED — tiny sphere at bottom-right of bezel */}
        <mesh position={[0.25, -0.2, 0.235]}>
          <sphereGeometry args={[0.008, 12, 12]} />
          <meshStandardMaterial
            color="#4ADE80"
            emissive="#4ADE80"
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      {/* === PC Tower === */}
      <group position={[0, 0.35, -1.8]}>
        {/* Tower case */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.25, 0.35, 0.4]} />
          <meshStandardMaterial color="#E8DCC8" roughness={0.7} />
        </mesh>

        {/* Drive bay 1 (upper) */}
        <mesh position={[0, 0.06, 0.201]}>
          <boxGeometry args={[0.18, 0.02, 0.005]} />
          <meshStandardMaterial color="#D4C8B0" roughness={0.5} />
        </mesh>

        {/* Drive bay 2 (lower) */}
        <mesh position={[0, 0.02, 0.201]}>
          <boxGeometry args={[0.18, 0.02, 0.005]} />
          <meshStandardMaterial color="#D4C8B0" roughness={0.5} />
        </mesh>

        {/* Floppy drive slot */}
        <mesh position={[0, -0.04, 0.201]}>
          <boxGeometry args={[0.15, 0.005, 0.003]} />
          <meshStandardMaterial color="#888888" roughness={0.4} />
        </mesh>

        {/* Smiley badge */}
        <mesh position={[0, -0.1, 0.201]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.3} />
        </mesh>
      </group>

      {/* === Keyboard === */}
      <group position={[0, 0.77, -1.25]} rotation={[-0.1, 0, 0]}>
        {/* Keyboard body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.45, 0.015, 0.15]} />
          <meshStandardMaterial color="#F5F0E8" roughness={0.6} />
        </mesh>

        {/* Key group — left block */}
        <mesh position={[-0.12, 0.009, -0.02]}>
          <boxGeometry args={[0.15, 0.004, 0.08]} />
          <meshStandardMaterial color="#E0D8CC" roughness={0.5} />
        </mesh>

        {/* Key group — center block */}
        <mesh position={[0.06, 0.009, -0.02]}>
          <boxGeometry args={[0.12, 0.004, 0.08]} />
          <meshStandardMaterial color="#E0D8CC" roughness={0.5} />
        </mesh>

        {/* Key group — right small block */}
        <mesh position={[0.17, 0.009, -0.02]}>
          <boxGeometry args={[0.06, 0.004, 0.08]} />
          <meshStandardMaterial color="#E0D8CC" roughness={0.5} />
        </mesh>

        {/* Key group — spacebar area */}
        <mesh position={[0, 0.009, 0.04]}>
          <boxGeometry args={[0.2, 0.004, 0.025]} />
          <meshStandardMaterial color="#E0D8CC" roughness={0.5} />
        </mesh>
      </group>

      {/* === Mouse === */}
      <group position={[0.35, 0.77, -1.2]}>
        {/* Mouse body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.04, 0.02, 0.06]} />
          <meshStandardMaterial color="#F5F0E8" roughness={0.6} />
        </mesh>

        {/* Scroll wheel line */}
        <mesh position={[0, 0.012, -0.008]}>
          <boxGeometry args={[0.01, 0.005, 0.005]} />
          <meshStandardMaterial color="#CCCCCC" roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}
