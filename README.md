# The Relfolio - First-Person 3D Interactive Portfolio

A first-person interactive 3D portfolio built with React, Three.js, and react-three-fiber. Step into a creative studio and explore objects on the desk to discover projects, experience, skills, and hidden easter eggs.

## Tech Stack

- **React + Vite + TypeScript**
- **react-three-fiber** (`@react-three/fiber`) - Three.js renderer
- **@react-three/drei** - Helpers (Html, useCursor, ContactShadows, etc.)
- **@react-three/postprocessing** - Bloom, vignette
- **Zustand** - Global state management
- **GSAP** - Camera transitions and animations
- **CSS Modules** - Overlay styling

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and click "Enter" to step into the studio.

## Project Structure

```
src/
  components/
    room/           # Room geometry, lighting, camera controller
    objects/        # Interactive 3D objects (Monitor, Resume, Phone, etc.)
    overlays/       # 2D overlay panels (Projects, About, Experience, etc.)
    hands/          # First-person hand model
    ui/             # HUD, loading screen, menu panel
  hooks/            # useInteraction, useDeviceDetect
  store/            # Zustand store + content data
  styles/           # CSS Modules for overlays and UI
```

## Interactive Objects

| Object | What it reveals |
|--------|----------------|
| Computer monitor | Projects gallery |
| Resume (paper) | Experience & education timeline |
| Photo frame | About me / bio |
| Book stack | Skills & tech stack |
| Sticky notes | Fun facts & quotes |
| Sketchbook | Design process notes |
| Phone | Contact & social links |
| Coffee mug | Easter egg |
| Desk lamp | Toggles room mood (evening/night) |
| Drawer | Hidden easter egg message |

## Easter Eggs

There are 5 hidden secrets to discover. A counter in the bottom-right tracks progress. The fifth secret only appears after finding the other four.

## Swapping in Real Content

### Content
Edit `src/store/content.ts` to update:
- `about` - Name, role, bio, values
- `experience` - Work history entries
- `education` - Education details
- `projects` - Portfolio projects with links
- `skills` - Skill categories
- `contact` - Email, social links

### 3D Models (GLTF)
To replace primitive geometry with real models:

1. Place Draco-compressed `.glb` files in `public/models/`
2. In each object component (e.g., `src/components/objects/Monitor.tsx`), replace the primitive `<mesh>` elements with:
```tsx
import { useGLTF } from '@react-three/drei'

const { scene } = useGLTF('/models/your-model.glb')
return <primitive object={scene} />
```
3. Add `useGLTF.preload('/models/your-model.glb')` at the bottom of the file

### Textures
Place texture images in `public/textures/` and apply them via `useTexture` from drei.

### Fonts
Place `.woff2` font files in `public/fonts/` and reference them in `src/styles/global.css`.

## Accessibility

- **Menu button** (top-right) provides direct access to all sections without hunting
- **Escape key** closes any open overlay
- **`prefers-reduced-motion`** is respected (reduces animations)
- **Mobile detection** adjusts for touch and lower-power devices

## Build

```bash
npm run build    # Output in dist/
npm run preview  # Preview production build
```
