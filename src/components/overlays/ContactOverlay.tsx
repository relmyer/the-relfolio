import { contact } from '../../store/content'
import styles from '../../styles/overlays.module.css'

const contactRows: { icon: string; label: string; href: string }[] = [
  { icon: '✉', label: contact.email, href: `mailto:${contact.email}` },
  { icon: '\u{1F4BB}', label: 'GitHub', href: contact.github },
  { icon: '\u{1F517}', label: 'LinkedIn', href: contact.linkedin },
  { icon: '\u{1F3A8}', label: 'Behance', href: contact.behance },
  { icon: '\u{1F3AF}', label: 'Dribbble', href: contact.dribbble },
]

export function ContactOverlay() {
  return (
    <div className={styles.phonePanel}>
      <div className={styles.phoneNotch} />
      <h2 className={styles.phoneTitle}>Contact</h2>

      {contactRows.map((row) => (
        <a
          key={row.label}
          href={row.href}
          className={styles.contactRow}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.contactIcon}>{row.icon}</span>
          <span className={styles.contactLabel}>{row.label}</span>
        </a>
      ))}
    </div>
  )
}
