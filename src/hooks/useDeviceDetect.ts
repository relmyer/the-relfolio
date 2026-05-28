import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export function useDeviceDetect() {
  const setIsMobile = useStore((s) => s.setIsMobile)

  useEffect(() => {
    const check = () => {
      const mobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      setIsMobile(mobile)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [setIsMobile])
}
