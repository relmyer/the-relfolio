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
    spotIntensity: 3.0,
    spotColor: new THREE.Color('#FFFFFF'),
    ambientIntensity: 0.8,
    ambientColor: new THREE.Color('#FFF8F0'),
    fillIntensity: 0.4,
    fillColor: new THREE.Color('#87CEEB'),
    sunIntensity: 1.2,
  },
  night: {
    spotIntensity: 1.5,
    spotColor: new THREE.Color('#FFB86C'),
    ambientIntensity: 0.2,
    ambientColor: new THREE.Color('#8EA8C8'),
    fillIntensity: 0.1,
    fillColor: new THREE.Color('#5B8FB9'),
    sunIntensity: 0,
  },
} as const

const SUN_COLOR = new THREE.Color('#FFF5E6')
const LERP_SPEED = 3

export function Lighting({ mood }: LightingProps) {
  const spotRef = useRef<THREE.SpotLight>(null)
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const fillRef = useRef<THREE.PointLight>(null)
  const sunRef = useRef<THREE.DirectionalLight>(null)

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

    if (sunRef.current) {
      sunRef.current.intensity = THREE.MathUtils.lerp(
        sunRef.current.intensity,
        target.sunIntensity,
        t
      )
      sunRef.current.color.lerp(SUN_COLOR, t)
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

      {/* Directional sunlight — simulates window light from the right */}
      <directionalLight
        ref={sunRef}
        position={[4, 3, -1]}
        intensity={CONFIGS[mood].sunIntensity}
        color="#FFF5E6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Contact shadows under the desk area */}
      <ContactShadows
        position={[0, 0.005, -1.5]}
        width={3}
        height={2}
        far={2}
        opacity={mood === 'evening' ? 0.5 : 0.25}
        blur={2}
        color="#1A1008"
      />
    </>
  )
}
