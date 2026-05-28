import { useEffect } from 'react'
import { useStore } from '../../store/useStore'
import type { OverlayType } from '../../store/useStore'
import styles from '../../styles/ui.module.css'

const menuItems: { label: string; overlay: OverlayType }[] = [
  { label: 'About', overlay: 'about' },
  { label: 'Experience', overlay: 'experience' },
  { label: 'Projects', overlay: 'projects' },
  { label: 'Skills', overlay: 'skills' },
  { label: 'Contact', overlay: 'contact' },
  { label: 'Sketchbook', overlay: 'sketchbook' },
]

export function MenuPanel() {
  const showMenu = useStore((s) => s.showMenu)
  const setShowMenu = useStore((s) => s.setShowMenu)
  const setActiveOverlay = useStore((s) => s.setActiveOverlay)

  useEffect(() => {
    if (!showMenu) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMenu(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showMenu, setShowMenu])

  if (!showMenu) return null

  const handleSelect = (overlay: OverlayType) => {
    setActiveOverlay(overlay)
    setShowMenu(false)
  }

  return (
    <>
      <div className={styles.menuBackdrop} onClick={() => setShowMenu(false)} />
      <nav className={styles.menuPanel}>
        <button
          className={styles.menuCloseButton}
          onClick={() => setShowMenu(false)}
          aria-label="Close menu"
        >
          &times;
        </button>

        <p className={styles.menuHeading}>Navigate</p>

        {menuItems.map((item) => (
          <button
            key={item.label}
            className={styles.menuItem}
            onClick={() => handleSelect(item.overlay)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  )
}
