import { useCallback, useRef } from 'react'
import { useStore } from '../store/useStore'
import type { OverlayType } from '../store/useStore'
import gsap from 'gsap'
import type { Camera } from 'three'
import * as THREE from 'three'

const DESK_POSITION = new THREE.Vector3(0, 1.6, 0)
const DESK_LOOK_AT = new THREE.Vector3(0, 1.2, -1.5)

export function useInteraction() {
  const {
    setFocusedObject,
    setActiveOverlay,
    setHoveredObject,
    resetFocus,
  } = useStore()
  const isAnimating = useRef(false)

  const focusObject = useCallback(
    (
      objectId: string,
      overlay: OverlayType,
      camera: Camera,
      targetPosition: THREE.Vector3,
      targetLookAt: THREE.Vector3
    ) => {
      if (isAnimating.current) return
      isAnimating.current = true
      setFocusedObject(objectId)

      const startPos = camera.position.clone()
      const startQuat = camera.quaternion.clone()

      const tempCam = camera.clone()
      tempCam.position.copy(targetPosition)
      tempCam.lookAt(targetLookAt)
      const endQuat = tempCam.quaternion.clone()

      const progress = { t: 0 }
      gsap.to(progress, {
        t: 1,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.position.lerpVectors(startPos, targetPosition, progress.t)
          camera.quaternion.slerpQuaternions(startQuat, endQuat, progress.t)
        },
        onComplete: () => {
          setActiveOverlay(overlay)
          isAnimating.current = false
        },
      })
    },
    [setFocusedObject, setActiveOverlay]
  )

  const returnToDesk = useCallback(
    (camera: Camera) => {
      if (isAnimating.current) return
      isAnimating.current = true

      const startPos = camera.position.clone()
      const startQuat = camera.quaternion.clone()

      const tempCam = camera.clone()
      tempCam.position.copy(DESK_POSITION)
      tempCam.lookAt(DESK_LOOK_AT)
      const endQuat = tempCam.quaternion.clone()

      const progress = { t: 0 }
      gsap.to(progress, {
        t: 1,
        duration: 0.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.position.lerpVectors(startPos, DESK_POSITION, progress.t)
          camera.quaternion.slerpQuaternions(startQuat, endQuat, progress.t)
        },
        onComplete: () => {
          resetFocus()
          isAnimating.current = false
        },
      })
    },
    [resetFocus]
  )

  const hover = useCallback(
    (id: string | null) => {
      setHoveredObject(id)
    },
    [setHoveredObject]
  )

  return { focusObject, returnToDesk, hover, isAnimating }
}
