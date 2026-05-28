import { useStore } from '../../store/useStore'
import styles from '../../styles/overlays.module.css'

export function StickyNoteOverlay() {
  const stickyNoteContent = useStore((s) => s.stickyNoteContent)
  const resetFocus = useStore((s) => s.resetFocus)

  if (!stickyNoteContent) return null

  return (
    <div className={styles.stickyPanel}>
      <button
        className={styles.stickyCloseButton}
        onClick={resetFocus}
        aria-label="Close note"
      >
        &times;
      </button>
      <p className={styles.stickyText}>{stickyNoteContent}</p>
    </div>
  )
}
