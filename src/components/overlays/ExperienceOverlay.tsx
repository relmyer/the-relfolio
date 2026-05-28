import { experience, education, certifications, community } from '../../store/content'
import styles from '../../styles/overlays.module.css'

export function ExperienceOverlay() {
  return (
    <div className={styles.paperPanel}>
      <h2 className={styles.paperTitle}>Experience</h2>

      <div className={styles.timeline}>
        {experience.map((entry) => (
          <div key={`${entry.company}-${entry.title}`} className={styles.timelineEntry}>
            <p className={styles.entryCompany}>{entry.company}</p>
            <p className={styles.entryRole}>{entry.title}</p>
            <p className={styles.entryDates}>{entry.dates}</p>
            <p className={styles.entryDesc}>{entry.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.educationSection}>
        <p className={styles.educationLabel}>Education</p>
        {education.map((edu) => (
          <div key={edu.school} style={{ marginBottom: '0.75rem' }}>
            <p className={styles.educationTarget}>{edu.school}</p>
            <p className={styles.educationNote}>{edu.degree} — {edu.dates}</p>
          </div>
        ))}
      </div>

      <div className={styles.educationSection}>
        <p className={styles.educationLabel}>Certifications</p>
        {certifications.map((cert) => (
          <div key={cert.name} style={{ marginBottom: '0.5rem' }}>
            <p className={styles.educationTarget}>{cert.name}</p>
            <p className={styles.educationNote}>{cert.issuer} — {cert.date}</p>
          </div>
        ))}
      </div>

      <div className={styles.educationSection}>
        <p className={styles.educationLabel}>Community & Volunteering</p>
        {community.slice(0, 5).map((c) => (
          <div key={`${c.org}-${c.role}`} style={{ marginBottom: '0.5rem' }}>
            <p className={styles.entryCompany}>{c.org}</p>
            <p className={styles.entryRole}>{c.role}</p>
            <p className={styles.entryDates}>{c.dates}</p>
            {c.description && <p className={styles.entryDesc}>{c.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
