export const about = {
  name: 'Ebru Altıner',
  role: 'Product Designer • Engineer',
  location: 'İzmir, Türkiye',
  bio: `Hey! It’s me, Ebru — building and improving my skills in product design & engineering through UX, motion, interactions, frontend and digital experiences turning prototypes into smooth, pixel-perfect products while probably overthinking whether 2px feels right at 4am.`,
  values: [
    'Pixel-perfect craft',
    'Design × Engineering',
    'Community-driven',
    'Always learning',
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
    company: 'LiseUP',
    title: 'Product Designer',
    dates: 'Apr 2026 – Present',
    description:
      'Designing product experiences at LiseUP in İzmir.',
  },
  {
    company: 'BLUESENSE',
    title: 'UI/UX Designer · Intern',
    dates: 'Jan 2026 – Mar 2026',
    description:
      'UI/UX design for an AI-powered beauty tech product. Mobile-first screens in Figma with clean, intuitive user flows. Harvard Innovation Labs 2026 semifinalist.',
  },
  {
    company: 'Software Persona',
    title: 'Software Developer · Intern',
    dates: 'Feb 2026 – Mar 2026',
    description:
      'Built applications with SQL, Flutter and more in İstanbul.',
  },
  {
    company: 'Visibuy',
    title: 'Product Designer · Intern',
    dates: 'Oct 2025 – Mar 2026',
    description:
      'Designed wireframes, UI screens, and interactive flows for the e-commerce product. Remote role.',
  },
]

export interface Education {
  school: string
  degree: string
  dates: string
}

export const education: Education[] = [
  {
    school: 'İstanbul Üniversitesi',
    degree: 'Computer Programming',
    dates: '2025 – 2027',
  },
  {
    school: 'Kırklareli Üniversitesi',
    degree: 'B.Sc. Architecture',
    dates: '2021 – 2024',
  },
]

export const certifications = [
  { name: 'Google UX Design', issuer: 'Google', date: 'Nov 2025' },
  { name: "Sustain2Solve Summit'24 Hackathon", issuer: 'Sustain2Solve', date: 'Aug 2024' },
]

export const community = [
  { role: 'Member', org: 'Women Techmakers', dates: 'Jun 2024 – Present' },
  { role: 'Designer', org: 'GDG İzmir', dates: 'Nov 2024 – Aug 2025', description: 'Designed social media posts, ensured brand consistency, and supported event promotion.' },
  { role: 'Flutter Mentor', org: 'Kodluyoruz (Hi-Kod)', dates: 'Sep 2024 – Mar 2025', description: 'Mentored beginners in Flutter development.' },
  { role: 'Designer', org: 'Loopix Games', dates: 'Jan 2025 – Aug 2025', description: 'Game idea development, AI-assisted asset creation, and game design.' },
  { role: 'Pixel Team', org: 'Pi Youth Association', dates: 'Sep 2024 – Present', description: 'Guiding ESC volunteers in Turkey, cross-cultural mentorship.' },
  { role: 'Volunteer', org: 'WWF-Türkiye', dates: 'Aug 2025 – Present' },
  { role: 'Volunteer', org: 'Lions Clubs International', dates: 'Nov 2025 – Present' },
  { role: 'Member', org: 'Turkishe', dates: 'Sep 2024 – Present' },
]

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
    items: ['Figma', 'Blender', 'Adobe After Effects', 'Prototyping', 'Design Systems'],
    color: '#E85002',
  },
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Three.js', 'CSS/SCSS', 'HTML'],
    color: '#3B82F6',
  },
  {
    category: 'Mobile',
    items: ['Flutter', 'Dart', 'Firebase'],
    color: '#10B981',
  },
  {
    category: 'Engineering',
    items: ['C#', 'SQL', 'Git', 'VS Code', 'Google Cloud'],
    color: '#8B5CF6',
  },
]

export const contact = {
  email: 'its.altnrbru@gmail.com',
  github: 'https://github.com/relmyer',
  linkedin: 'https://www.linkedin.com/in/ebru-alt%C4%B1ner/',
  behance: '#',
  dribbble: '#',
}

export const stickyNotes = [
  { id: 'sticky-1', text: 'Probably overthinking whether 2px feels right at 4am.', position: [0.3, 0.15, 0] as [number, number, number] },
  { id: 'sticky-2', text: 'BLUESENSE → Harvard Innovation Labs 2026 semifinalist!', position: [-0.2, 0.1, 0] as [number, number, number] },
  { id: 'sticky-3', text: 'Google UX Design certified ✅', position: [0.1, -0.1, 0] as [number, number, number] },
  { id: 'sticky-4', text: 'Architecture grad turned product designer — the plot twist nobody expected.', position: [-0.3, -0.05, 0] as [number, number, number] },
]

export const easterEggs = [
  { id: 'secret-drawer', hint: 'Check the bottom drawer...' },
  { id: 'secret-book', hint: 'One book on the shelf is different.' },
  { id: 'secret-mug', hint: 'What does the mug say?' },
  { id: 'secret-lamp', hint: 'Try toggling the mood.' },
  { id: 'secret-explorer', hint: 'Find all other secrets to unlock this one.' },
]
