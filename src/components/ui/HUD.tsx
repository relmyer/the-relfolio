import { useStore } from '../../store/useStore'
import styles from '../../styles/ui.module.css'

export function HUD() {
  const audioEnabled = useStore((s) => s.audioEnabled)
  const toggleAudio = useStore((s) => s.toggleAudio)
  const showMenu = useStore((s) => s.showMenu)
  const setShowMenu = useStore((s) => s.setShowMenu)
  const secretsFound = useStore((s) => s.secretsFound)
  const totalSecrets = useStore((s) => s.totalSecrets)

  return (
    <div className={styles.hud}>
      {/* Top-right controls */}
      <div className={styles.hudTopRight}>
        <button
          className={styles.hudButton}
          onClick={toggleAudio}
          aria-label={audioEnabled ? 'Mute audio' : 'Enable audio'}
        >
          {audioEnabled ? '\u{1F50A}' : '\u{1F507}'}
        </button>
        <button
          className={styles.hudButton}
          onClick={() => setShowMenu(!showMenu)}
          aria-label={showMenu ? 'Close menu' : 'Open menu'}
        >
          {showMenu ? '✕' : '☰'}
        </button>
      </div>

      {/* Bottom-right secrets counter */}
      <div className={styles.hudBottomRight}>
        <div className={styles.secretsCounter}>
          Secrets:{' '}
          <span className={styles.secretsAccent}>{secretsFound.size}</span>
          /{totalSecrets}
        </div>
      </div>

      {/* Bottom-left hint */}
      <div className={styles.hudBottomLeft}>
        <p className={styles.hintText}>Click objects to explore</p>
      </div>
    </div>
  )
}
