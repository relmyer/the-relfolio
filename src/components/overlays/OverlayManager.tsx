import { useEffect } from 'react'
import { useStore } from '../../store/useStore'
import { ProjectsOverlay } from './ProjectsOverlay'
import { ExperienceOverlay } from './ExperienceOverlay'
import { AboutOverlay } from './AboutOverlay'
import { SkillsOverlay } from './SkillsOverlay'
import { ContactOverlay } from './ContactOverlay'
import { SketchbookOverlay } from './SketchbookOverlay'
import { StickyNoteOverlay } from './StickyNoteOverlay'
import styles from '../../styles/overlays.module.css'

const overlayComponents = {
  projects: ProjectsOverlay,
  experience: ExperienceOverlay,
  about: AboutOverlay,
  skills: SkillsOverlay,
  contact: ContactOverlay,
  sketchbook: SketchbookOverlay,
} as const

export function OverlayManager() {
  const activeOverlay = useStore((s) => s.activeOverlay)
  const resetFocus = useStore((s) => s.resetFocus)

  useEffect(() => {
    if (!activeOverlay) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetFocus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeOverlay, resetFocus])

  if (!activeOverlay) return null

  // Sticky note has its own layout (no shared shell)
  if (activeOverlay === 'sticky-note') {
    return (
      <div className={styles.overlay}>
        <div className={styles.backdrop} onClick={resetFocus} />
        <StickyNoteOverlay />
      </div>
    )
  }

  const OverlayContent = overlayComponents[activeOverlay]
  if (!OverlayContent) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={resetFocus} />
      <div className={styles.panelWrapper}>
        <button
          className={styles.closeButton}
          onClick={resetFocus}
          aria-label="Close overlay"
        >
          &times;
        </button>
        <OverlayContent />
      </div>
    </div>
  )
}
