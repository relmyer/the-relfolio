import { useState, useCallback, useEffect } from 'react'
import { Scene } from './components/Scene'
import { OverlayManager } from './components/overlays/OverlayManager'
import { HUD } from './components/ui/HUD'
import { MenuPanel } from './components/ui/MenuPanel'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { useDeviceDetect } from './hooks/useDeviceDetect'
import { useStore } from './store/useStore'
import './styles/global.css'

function App() {
  useDeviceDetect()
  const [entered, setEntered] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const setIsLoaded = useStore((s) => s.setIsLoaded)

  useEffect(() => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setIsLoaded(true)
      }
      setLoadProgress(Math.min(progress, 100))
    }, 200)
    return () => clearInterval(interval)
  }, [setIsLoaded])

  const handleEnter = useCallback(() => {
    setEntered(true)
  }, [])

  if (!entered) {
    return (
      <LoadingScreen
        progress={loadProgress}
        onEnter={handleEnter}
      />
    )
  }

  return (
    <>
      <Scene />
      <OverlayManager />
      <HUD />
      <MenuPanel />
    </>
  )
}

export default App
