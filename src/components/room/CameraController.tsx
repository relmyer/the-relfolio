import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

const INITIAL_POSITION = new THREE.Vector3(0, 1.6, 0)
const LOOK_TARGET = new THREE.Vector3(0, 1.2, -1.5)

const HORIZONTAL_LIMIT = Math.PI * 0.4
const VERTICAL_LIMIT = Math.PI * 0.25

export function CameraController() {
  const { camera, gl } = useThree()
  const focusedObject = useStore((s) => s.focusedObject)
  const isMobile = useStore((s) => s.isMobile)

  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const isPointerDown = useRef(false)
  const prevPointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    camera.position.copy(INITIAL_POSITION)
    camera.lookAt(LOOK_TARGET)

    const baseEuler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ')
    euler.current.x = baseEuler.x
    euler.current.y = baseEuler.y
  }, [camera])

  useEffect(() => {
    if (focusedObject) return

    const sensitivity = isMobile ? 0.004 : 0.002
    const dom = gl.domElement

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown.current = true
      prevPointer.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      isPointerDown.current = false
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return

      const dx = e.clientX - prevPointer.current.x
      const dy = e.clientY - prevPointer.current.y
      prevPointer.current = { x: e.clientX, y: e.clientY }

      euler.current.y -= dx * sensitivity
      euler.current.x -= dy * sensitivity

      euler.current.y = THREE.MathUtils.clamp(
        euler.current.y,
        -HORIZONTAL_LIMIT,
        HORIZONTAL_LIMIT
      )
      euler.current.x = THREE.MathUtils.clamp(
        euler.current.x,
        -VERTICAL_LIMIT,
        VERTICAL_LIMIT * 0.3
      )
    }

    dom.addEventListener('pointerdown', onPointerDown)
    dom.addEventListener('pointerup', onPointerUp)
    dom.addEventListener('pointermove', onPointerMove)
    dom.addEventListener('pointerleave', onPointerUp)

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown)
      dom.removeEventListener('pointerup', onPointerUp)
      dom.removeEventListener('pointermove', onPointerMove)
      dom.removeEventListener('pointerleave', onPointerUp)
    }
  }, [gl, focusedObject, isMobile])

  useFrame(() => {
    if (focusedObject) return
    camera.quaternion.setFromEuler(euler.current)
  })

  return null
}
