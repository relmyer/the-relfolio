import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export function Hands() {
  const leftRef = useRef<THREE.Group>(null)
  const rightRef = useRef<THREE.Group>(null)
  const hoveredObject = useStore((s) => s.hoveredObject)
  const focusedObject = useStore((s) => s.focusedObject)
  const { camera } = useThree()

  useFrame((state) => {
    if (!leftRef.current || !rightRef.current) return

    const t = state.clock.elapsedTime

    leftRef.current.position.copy(camera.position)
    rightRef.current.position.copy(camera.position)
    leftRef.current.quaternion.copy(camera.quaternion)
    rightRef.current.quaternion.copy(camera.quaternion)

    const breathe = Math.sin(t * 1.5) * 0.003

    if (focusedObject) {
      leftRef.current.translateX(-0.22)
      leftRef.current.translateY(-0.28)
      leftRef.current.translateZ(-0.4)

      rightRef.current.translateX(0.22)
      rightRef.current.translateY(-0.28)
      rightRef.current.translateZ(-0.4)
    } else if (hoveredObject) {
      leftRef.current.translateX(-0.25)
      leftRef.current.translateY(-0.32 + breathe)
      leftRef.current.translateZ(-0.45)

      rightRef.current.translateX(0.18)
      rightRef.current.translateY(-0.25 + breathe)
      rightRef.current.translateZ(-0.5)
      rightRef.current.rotateX(-0.3)
    } else {
      leftRef.current.translateX(-0.25)
      leftRef.current.translateY(-0.35 + breathe)
      leftRef.current.translateZ(-0.45)

      rightRef.current.translateX(0.25)
      rightRef.current.translateY(-0.35 + breathe)
      rightRef.current.translateZ(-0.45)
    }
  })

  const skinColor = '#E8B89D'
  const shirtColor = '#2D3748'

  return (
    <>
      <group ref={leftRef} renderOrder={999}>
        <group rotation={[0.3, 0.15, 0.1]}>
          <mesh>
            <boxGeometry args={[0.08, 0.04, 0.12]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          {[-0.025, -0.008, 0.008, 0.025].map((x, i) => (
            <mesh key={i} position={[x, 0, -0.08]}>
              <boxGeometry args={[0.014, 0.03, 0.05]} />
              <meshStandardMaterial color={skinColor} />
            </mesh>
          ))}
          <mesh position={[-0.05, 0, 0.02]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.014, 0.03, 0.04]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[0.08, 0.04, 0.06]} />
            <meshStandardMaterial color={shirtColor} />
          </mesh>
        </group>
      </group>

      <group ref={rightRef} renderOrder={999}>
        <group rotation={[0.3, -0.15, -0.1]}>
          <mesh>
            <boxGeometry args={[0.08, 0.04, 0.12]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          {[-0.025, -0.008, 0.008, 0.025].map((x, i) => (
            <mesh key={i} position={[x, 0, -0.08]}>
              <boxGeometry args={[0.014, 0.03, 0.05]} />
              <meshStandardMaterial color={skinColor} />
            </mesh>
          ))}
          <mesh position={[0.05, 0, 0.02]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.014, 0.03, 0.04]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[0.08, 0.04, 0.06]} />
            <meshStandardMaterial color={shirtColor} />
          </mesh>
        </group>
      </group>
    </>
  )
}
