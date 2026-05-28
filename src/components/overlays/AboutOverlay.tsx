import { about } from '../../store/content'
import styles from '../../styles/overlays.module.css'

export function AboutOverlay() {
  return (
    <div className={styles.badgePanel}>
      <h2 className={styles.badgeName}>{about.name}</h2>
      <p className={styles.badgeRole}>{about.role}</p>
      <p className={styles.badgeLocation}>{about.location}</p>
      <div className={styles.badgeDivider} />
      <p className={styles.badgeBio}>{about.bio}</p>

      <div className={styles.valuesList}>
        {about.values.map((value) => (
          <span key={value} className={styles.valuePill}>
            {value}
          </span>
        ))}
      </div>
    </div>
  )
}
