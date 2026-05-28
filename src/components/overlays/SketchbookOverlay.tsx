import styles from '../../styles/overlays.module.css'

export function SketchbookOverlay() {
  return (
    <div className={styles.sketchPanel}>
      <h2 className={styles.sketchTitle}>Sketchbook</h2>
      <p className={styles.sketchDate}>Page 7 — Ongoing</p>
      <div className={styles.sketchDivider} />

      <div className={styles.sketchBody}>
        <p>
          This is where ideas live before they become real. Rough wireframes,
          half-baked concepts, color experiments, and late-night "what if"
          moments. Not everything here ships — and that is the point.
        </p>
        <p>
          I believe the design process is just as interesting as the final
          product. Every polished interface starts as a messy sketch.
        </p>
        <p>
          Right now I am exploring generative typography, spatial UI patterns
          for 3D environments, and ways to bring warmth into minimal
          interfaces. Stay tuned.
        </p>
      </div>

      <p className={styles.sketchDoodle}>~ more pages coming soon ~</p>
    </div>
  )
}
