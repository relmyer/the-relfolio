import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  Vignette,
} from '@react-three/postprocessing'
import { Room } from './room/Room'
import { CameraController } from './room/CameraController'
import { Hands } from './hands/Hands'
import { useStore } from '../store/useStore'

export function Scene() {
  const isMobile = useStore((s) => s.isMobile)

  return (
    <Canvas
      camera={{ fov: 65, near: 0.1, far: 50, position: [0, 1.6, 0] }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      shadows
      gl={{ antialias: !isMobile, alpha: false }}
      style={{ position: 'fixed', top: 0, left: 0 }}
    >
      <color attach="background" args={['#E8F4F2']} />
      <fog attach="fog" args={['#E8F4F2', 6, 16]} />

      <CameraController />

      <Suspense fallback={null}>
        <Room />
        <Hands />
        <Preload all />
      </Suspense>

      <EffectComposer enabled={!isMobile}>
        <Bloom
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
          intensity={0.2}
        />
        <Vignette darkness={0.2} offset={0.4} />
      </EffectComposer>
    </Canvas>
  )
}
