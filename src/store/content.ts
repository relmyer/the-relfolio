export const about = {
  name: 'Rel Meyer',
  role: 'UI/UX Designer & Developer',
  location: 'Istanbul, Turkey',
  bio: `Creative technologist blending design thinking with clean code. I craft digital experiences that feel intuitive, personal, and a little unexpected. Rooted in the intersection of Turkish visual culture and modern interaction design — I believe the best interfaces tell stories.`,
  values: [
    'Curiosity-driven design',
    'Craft over polish',
    'Accessibility is not optional',
    'Every pixel has a purpose',
  ],
}

export interface Experience {
  company: string
  title: string
  dates: string
  description: string
}

export const experience: Experience[] = [
  {
    company: 'Visibuy',
    title: 'UI/UX Designer',
    dates: '2024 – Present',
    description:
      'Designing e-commerce experiences that help shoppers see before they buy.',
  },
  {
    company: 'BLUESENSE',
    title: 'Product Designer',
    dates: '2023 – 2024',
    description:
      'Led design for IoT dashboard and mobile apps across the smart-building platform.',
  },
  {
    company: 'Software Persona',
    title: 'Junior Frontend Developer',
    dates: '2022 – 2023',
    description:
      'Built responsive web apps and component libraries in React and Flutter.',
  },
]

export const education = {
  target: 'Interaction Design — Politecnico di Milano',
  note: 'Targeting MSc admission',
}

export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  color: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 'byte-me',
    title: 'BYTE ME',
    description:
      'Bold brand identity & landing page for a creative tech collective.',
    stack: ['Figma', 'React', 'Framer Motion'],
    color: '#E85002',
    link: '#',
  },
  {
    id: 'hormonie',
    title: 'Hormonie',
    description:
      "Women's wellness app designed around hormonal cycle tracking and self-care routines.",
    stack: ['Figma', 'Flutter', 'Firebase'],
    color: '#C77DBA',
    link: '#',
  },
  {
    id: 'outradar',
    title: 'OutRadar',
    description:
      'Real-time outage tracking app with live status maps and push notifications.',
    stack: ['Flutter', 'Firebase', 'Google Maps API'],
    color: '#3B82F6',
    link: '#',
  },
  {
    id: 'flowa',
    title: 'Flowa',
    description:
      'Minimal task manager with flow-state timers and ambient productivity modes.',
    stack: ['React', 'TypeScript', 'Zustand'],
    color: '#10B981',
    link: '#',
  },
  {
    id: 'relfolio',
    title: 'This Portfolio',
    description:
      'The 3D interactive studio you\'re standing in right now. Meta, right?',
    stack: ['React', 'Three.js', 'R3F', 'GSAP'],
    color: '#F59E0B',
  },
]

export interface Skill {
  category: string
  items: string[]
  color: string
}

export const skills: Skill[] = [
  {
    category: 'Design',
    items: ['Figma', 'Adobe Suite', 'Prototyping', 'Design Systems', 'User Research'],
    color: '#E85002',
  },
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Three.js', 'CSS/SCSS'],
    color: '#3B82F6',
  },
  {
    category: 'Mobile',
    items: ['Flutter', 'Dart', 'React Native', 'Firebase'],
    color: '#10B981',
  },
  {
    category: 'Tools',
    items: ['Git', 'Framer', 'Notion', 'Jira', 'VS Code'],
    color: '#8B5CF6',
  },
]

export const contact = {
  email: 'its.altnrbru@gmail.com',
  github: 'https://github.com/relmyer',
  linkedin: '#',
  behance: '#',
  dribbble: '#',
}

export const stickyNotes = [
  { id: 'sticky-1', text: '"Design is not just what it looks like — design is how it works." — Steve Jobs', position: [0.3, 0.15, 0] as [number, number, number] },
  { id: 'sticky-2', text: 'Currently: deep into Three.js rabbit holes', position: [-0.2, 0.1, 0] as [number, number, number] },
  { id: 'sticky-3', text: 'Goal: Milano 2026 🇮🇹', position: [0.1, -0.1, 0] as [number, number, number] },
  { id: 'sticky-4', text: 'Remember: ship > perfect', position: [-0.3, -0.05, 0] as [number, number, number] },
]

export const easterEggs = [
  { id: 'secret-drawer', hint: 'Check the bottom drawer...' },
  { id: 'secret-book', hint: 'One book on the shelf is different.' },
  { id: 'secret-mug', hint: 'What does the mug say?' },
  { id: 'secret-lamp', hint: 'Try toggling the mood.' },
  { id: 'secret-explorer', hint: 'Find all other secrets to unlock this one.' },
]
