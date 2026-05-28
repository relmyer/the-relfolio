import { experience, education } from '../../store/content'
import styles from '../../styles/overlays.module.css'

export function ExperienceOverlay() {
  return (
    <div className={styles.paperPanel}>
      <h2 className={styles.paperTitle}>Experience</h2>

      <div className={styles.timeline}>
        {experience.map((entry) => (
          <div key={entry.company} className={styles.timelineEntry}>
            <p className={styles.entryCompany}>{entry.company}</p>
            <p className={styles.entryRole}>{entry.title}</p>
            <p className={styles.entryDates}>{entry.dates}</p>
            <p className={styles.entryDesc}>{entry.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.educationSection}>
        <p className={styles.educationLabel}>Education</p>
        <p className={styles.educationTarget}>{education.target}</p>
        <p className={styles.educationNote}>{education.note}</p>
      </div>
    </div>
  )
}
