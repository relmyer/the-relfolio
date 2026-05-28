import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import type { RoomMood } from '../../store/useStore'

interface LightingProps {
  mood: RoomMood
}

const CONFIGS = {
  evening: {
    spotIntensity: 2,
    spotColor: new THREE.Color('#FFA54F'),
    ambientIntensity: 0.3,
    ambientColor: new THREE.Color('#FFF5E6'),
    fillIntensity: 0.15,
    fillColor: new THREE.Color('#FFE0B2'),
  },
  night: {
    spotIntensity: 0.8,
    spotColor: new THREE.Color('#FFA54F'),
    ambientIntensity: 0.1,
    ambientColor: new THREE.Color('#8EA8C8'),
    fillIntensity: 0.05,
    fillColor: new THREE.Color('#6B7FA0'),
  },
} as const

const LERP_SPEED = 3

export function Lighting({ mood }: LightingProps) {
  const spotRef = useRef<THREE.SpotLight>(null)
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const fillRef = useRef<THREE.PointLight>(null)

  useFrame((_, delta) => {
    const target = CONFIGS[mood]
    const t = Math.min(1, delta * LERP_SPEED)

    if (spotRef.current) {
      spotRef.current.intensity = THREE.MathUtils.lerp(
        spotRef.current.intensity,
        target.spotIntensity,
        t
      )
      spotRef.current.color.lerp(target.spotColor, t)
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        target.ambientIntensity,
        t
      )
      ambientRef.current.color.lerp(target.ambientColor, t)
    }

    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.lerp(
        fillRef.current.intensity,
        target.fillIntensity,
        t
      )
      fillRef.current.color.lerp(target.fillColor, t)
    }
  })

  return (
    <>
      {/* Desk lamp spotlight — positioned above and slightly behind the desk */}
      <spotLight
        ref={spotRef}
        position={[0.3, 2.2, -1.2]}
        angle={Math.PI / 5}
        penumbra={0.6}
        intensity={CONFIGS[mood].spotIntensity}
        color={CONFIGS[mood].spotColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        target-position={[0, 0.75, -1.5]}
      />

      {/* Ambient fill */}
      <ambientLight
        ref={ambientRef}
        intensity={CONFIGS[mood].ambientIntensity}
        color={CONFIGS[mood].ambientColor}
      />

      {/* Subtle fill point light — opposite side to prevent harsh shadows */}
      <pointLight
        ref={fillRef}
        position={[-1.5, 1.8, 0.5]}
        intensity={CONFIGS[mood].fillIntensity}
        color={CONFIGS[mood].fillColor}
        decay={2}
      />

      {/* Contact shadows under the desk area */}
      <ContactShadows
        position={[0, 0.005, -1.5]}
        width={3}
        height={2}
        far={2}
        opacity={mood === 'evening' ? 0.4 : 0.25}
        blur={2}
        color="#1A1008"
      />
    </>
  )
}
