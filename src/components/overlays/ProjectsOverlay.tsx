import { projects } from '../../store/content'
import styles from '../../styles/overlays.module.css'

export function ProjectsOverlay() {
  return (
    <div className={styles.monitorPanel}>
      <div className={styles.monitorHeader}>
        EBRU://PROJECTS <span className={styles.monitorCursor}>_</span>
      </div>

      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div
              className={styles.projectAccent}
              style={{ background: project.color }}
            />
            <div className={styles.projectBody}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>

              <div className={styles.stackTags}>
                {project.stack.map((tech) => (
                  <span key={tech} className={styles.stackTag}>
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  className={styles.viewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project &rarr;
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
