import styles from '../../styles/ui.module.css'

interface LoadingScreenProps {
  progress: number
  onEnter: () => void
}

export function LoadingScreen({ progress, onEnter }: LoadingScreenProps) {
  const ready = progress >= 100

  return (
    <div className={styles.loadingScreen}>
      <h1 className={styles.loadingName}>Ebru Altıner</h1>
      <p className={styles.loadingSubtitle}>Creative Studio</p>

      {!ready && (
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}

      {ready && (
        <button className={styles.enterButton} onClick={onEnter}>
          Click to Enter
        </button>
      )}
    </div>
  )
}
