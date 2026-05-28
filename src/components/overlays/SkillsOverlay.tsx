import { skills } from '../../store/content'
import styles from '../../styles/overlays.module.css'

export function SkillsOverlay() {
  return (
    <div className={styles.booksPanel}>
      <h2 className={styles.booksTitle}>Skills &amp; Tools</h2>

      <div className={styles.booksGrid}>
        {skills.map((category) => (
          <div
            key={category.category}
            className={styles.bookCard}
            style={{ borderLeftColor: category.color }}
          >
            <h3 className={styles.bookCategory}>{category.category}</h3>
            <div className={styles.bookItems}>
              {category.items.map((item) => (
                <span key={item} className={styles.bookTag}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
