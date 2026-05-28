import { Monitor } from '../objects/Monitor'
import { Resume } from '../objects/Resume'
import { PhotoFrame } from '../objects/PhotoFrame'
import { BookStack } from '../objects/BookStack'
import { StickyNotes } from '../objects/StickyNotes'
import { Sketchbook } from '../objects/Sketchbook'
import { Phone } from '../objects/Phone'
import { CoffeeMug } from '../objects/CoffeeMug'
import { DeskLamp } from '../objects/DeskLamp'
import { Drawer } from '../objects/Drawer'
import { Decorations } from '../objects/Decorations'
import { SecretBook } from '../objects/SecretBook'
import { Lighting } from './Lighting'
import { useStore } from '../../store/useStore'

const ROOM_WIDTH = 6
const ROOM_HEIGHT = 3
const ROOM_DEPTH = 5

const WALL_THICKNESS = 0.08

const COLORS = {
  floor: '#C4B89C',        // light warm wood/laminate
  wall: '#F5F0E8',         // bright cream walls
  backWall: '#3BBFB5',     // vivid teal pegboard
  ceiling: '#F5F0E8',
  desk: '#F5F0E8',         // white/cream desk
  deskTop: '#F5F5F0',      // very light desk surface
  shelf: '#7BC67E',        // bright green shelf (like the reference)
  sideTable: '#7BC67E',    // matching green
} as const

export function Room() {
  const roomMood = useStore((s) => s.roomMood)

  return (
    <group>
      <Lighting mood={roomMood} />

      {/* ── Floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color={COLORS.floor} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, ROOM_HEIGHT, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color={COLORS.ceiling} roughness={0.9} />
      </mesh>

      {/* ── Back wall (facing camera) — teal accent wall ── */}
      <mesh
        position={[0, ROOM_HEIGHT / 2, -ROOM_DEPTH / 2]}
        receiveShadow
      >
        <boxGeometry args={[ROOM_WIDTH, ROOM_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={COLORS.backWall} roughness={0.85} />
      </mesh>

      {/* ── Pegboard pegs on back wall ── */}
      {Array.from({ length: 12 }).flatMap((_, col) =>
        Array.from({ length: 8 }).map((_, row) => (
          <mesh
            key={`peg-${col}-${row}`}
            position={[
              -1.1 + col * 0.18 + 0.09,
              0.9 + row * 0.18 + 0.09,
              -ROOM_DEPTH / 2 + WALL_THICKNESS / 2 + 0.005,
            ]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} />
            <meshStandardMaterial color="#1A8A82" roughness={0.4} />
          </mesh>
        ))
      )}

      {/* ── Front wall (behind camera) ── */}
      <mesh position={[0, ROOM_HEIGHT / 2, ROOM_DEPTH / 2]}>
        <boxGeometry args={[ROOM_WIDTH, ROOM_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={COLORS.wall} roughness={0.85} />
      </mesh>

      {/* ── Left wall ── */}
      <mesh
        position={[-ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[WALL_THICKNESS, ROOM_HEIGHT, ROOM_DEPTH]} />
        <meshStandardMaterial color={COLORS.wall} roughness={0.85} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh
        position={[ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[WALL_THICKNESS, ROOM_HEIGHT, ROOM_DEPTH]} />
        <meshStandardMaterial color={COLORS.wall} roughness={0.85} />
      </mesh>

      {/* ── Desk ── */}
      <Desk />

      {/* ── Bookshelf on the left wall ── */}
      <BookShelf />

      {/* ── Green desk organizer (right side of desk) ── */}
      <DeskOrganizer />

      {/* ── Side table (right of desk) ── */}
      <SideTable />

      {/* ── Interactive objects ── */}
      <Monitor />
      <Resume />
      <PhotoFrame />
      <BookStack />
      <StickyNotes />
      <Sketchbook />
      <Phone />
      <CoffeeMug />
      <DeskLamp />
      <Drawer />
      <Decorations />
      <SecretBook />
    </group>
  )
}

/* ── Desk: centered at x=0, z=-1.5, desktop surface at y~0.75 ── */

const DESK_TOP_THICKNESS = 0.06
const DESK_WIDTH = 1.6
const DESK_DEPTH = 0.8
const DESK_HEIGHT = 0.75
const LEG_SIZE = 0.06

function Desk() {
  const legH = DESK_HEIGHT - DESK_TOP_THICKNESS
  const legY = legH / 2
  const halfW = (DESK_WIDTH - LEG_SIZE) / 2
  const halfD = (DESK_DEPTH - LEG_SIZE) / 2

  return (
    <group position={[0, 0, -1.5]}>
      {/* Desktop surface */}
      <mesh
        position={[0, DESK_HEIGHT - DESK_TOP_THICKNESS / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[DESK_WIDTH, DESK_TOP_THICKNESS, DESK_DEPTH]} />
        <meshStandardMaterial color={COLORS.deskTop} roughness={0.4} />
      </mesh>

      {/* Four legs */}
      {[
        [halfW, legY, halfD],
        [-halfW, legY, halfD],
        [halfW, legY, -halfD],
        [-halfW, legY, -halfD],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[LEG_SIZE, legH, LEG_SIZE]} />
          <meshStandardMaterial color="#E8E0D4" roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Bookshelf: against the left wall ── */

const SHELF_WIDTH = 0.8
const SHELF_DEPTH = 0.3
const SHELF_BOARD = 0.03
const SHELF_SIDE = 0.04
const SHELF_TOTAL_HEIGHT = 1.8
const SHELF_COUNT = 5

function BookShelf() {
  const innerWidth = SHELF_WIDTH - SHELF_SIDE * 2
  const spacing = SHELF_TOTAL_HEIGHT / (SHELF_COUNT - 1)

  return (
    <group position={[-ROOM_WIDTH / 2 + SHELF_DEPTH / 2 + 0.12, 0, -0.5]}>
      {/* Side panels */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            side * ((innerWidth + SHELF_SIDE) / 2),
            SHELF_TOTAL_HEIGHT / 2,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[SHELF_SIDE, SHELF_TOTAL_HEIGHT, SHELF_DEPTH]}
          />
          <meshStandardMaterial color={COLORS.shelf} roughness={0.75} />
        </mesh>
      ))}

      {/* Back panel */}
      <mesh
        position={[0, SHELF_TOTAL_HEIGHT / 2, -SHELF_DEPTH / 2 + 0.01]}
        castShadow
      >
        <boxGeometry
          args={[SHELF_WIDTH, SHELF_TOTAL_HEIGHT, 0.02]}
        />
        <meshStandardMaterial color={COLORS.shelf} roughness={0.8} />
      </mesh>

      {/* Horizontal shelves */}
      {Array.from({ length: SHELF_COUNT }).map((_, i) => (
        <mesh
          key={i}
          position={[0, i * spacing, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[innerWidth, SHELF_BOARD, SHELF_DEPTH]} />
          <meshStandardMaterial color={COLORS.shelf} roughness={0.75} />
        </mesh>
      ))}

      {/* Decorative books on shelves */}
      {([
        { x: -0.22, shelf: 3, h: 0.28, w: 0.05, color: '#E85002' },
        { x: -0.14, shelf: 3, h: 0.32, w: 0.04, color: '#3B82F6' },
        { x: -0.07, shelf: 3, h: 0.26, w: 0.05, color: '#10B981' },
        { x: 0.08,  shelf: 4, h: 0.30, w: 0.04, color: '#F59E0B' },
        { x: 0.15,  shelf: 4, h: 0.34, w: 0.05, color: '#8B5CF6' },
        { x: 0.23,  shelf: 4, h: 0.27, w: 0.04, color: '#EC4899' },
      ] as const).map((book, i) => (
        <mesh
          key={`book-${i}`}
          position={[
            book.x,
            book.shelf * spacing + SHELF_BOARD / 2 + book.h / 2,
            0,
          ]}
          castShadow
        >
          <boxGeometry args={[book.w, book.h, SHELF_DEPTH * 0.75]} />
          <meshStandardMaterial color={book.color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Green desk organizer: right side of desk ── */

function DeskOrganizer() {
  const boxW = 0.3
  const boxH = 0.3
  const boxD = 0.25
  const thick = 0.02

  const books = [
    { x: -0.07, h: 0.22, w: 0.03, color: '#E85002' },
    { x: -0.02, h: 0.26, w: 0.03, color: '#3B82F6' },
    { x: 0.03,  h: 0.20, w: 0.04, color: '#F59E0B' },
    { x: 0.09,  h: 0.24, w: 0.03, color: '#EC4899' },
  ] as const

  return (
    <group position={[0.95, 0.76, -1.6]}>
      {/* Bottom */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[boxW, thick, boxD]} />
        <meshStandardMaterial color={COLORS.shelf} roughness={0.7} />
      </mesh>
      {/* Top */}
      <mesh position={[0, boxH, 0]} castShadow>
        <boxGeometry args={[boxW, thick, boxD]} />
        <meshStandardMaterial color={COLORS.shelf} roughness={0.7} />
      </mesh>
      {/* Left side */}
      <mesh position={[-boxW / 2 + thick / 2, boxH / 2, 0]} castShadow>
        <boxGeometry args={[thick, boxH, boxD]} />
        <meshStandardMaterial color={COLORS.shelf} roughness={0.7} />
      </mesh>
      {/* Right side */}
      <mesh position={[boxW / 2 - thick / 2, boxH / 2, 0]} castShadow>
        <boxGeometry args={[thick, boxH, boxD]} />
        <meshStandardMaterial color={COLORS.shelf} roughness={0.7} />
      </mesh>
      {/* Back */}
      <mesh position={[0, boxH / 2, -boxD / 2 + thick / 2]} castShadow>
        <boxGeometry args={[boxW, boxH, thick]} />
        <meshStandardMaterial color={COLORS.shelf} roughness={0.7} />
      </mesh>

      {/* Small books inside */}
      {books.map((book, i) => (
        <mesh
          key={`org-book-${i}`}
          position={[book.x, thick / 2 + book.h / 2, 0]}
          castShadow
        >
          <boxGeometry args={[book.w, book.h, boxD * 0.7]} />
          <meshStandardMaterial color={book.color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Side table: to the right of the desk ── */

const TABLE_SIZE = 0.45
const TABLE_HEIGHT = 0.55
const TABLE_TOP = 0.04
const TABLE_LEG = 0.05

function SideTable() {
  const legH = TABLE_HEIGHT - TABLE_TOP
  const legY = legH / 2
  const offset = (TABLE_SIZE - TABLE_LEG) / 2

  return (
    <group position={[1.3, 0, -1.2]}>
      {/* Tabletop */}
      <mesh
        position={[0, TABLE_HEIGHT - TABLE_TOP / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[TABLE_SIZE, TABLE_TOP, TABLE_SIZE]} />
        <meshStandardMaterial color={COLORS.sideTable} roughness={0.7} />
      </mesh>

      {/* Four legs */}
      {[
        [offset, legY, offset],
        [-offset, legY, offset],
        [offset, legY, -offset],
        [-offset, legY, -offset],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[TABLE_LEG, legH, TABLE_LEG]} />
          <meshStandardMaterial color={COLORS.sideTable} roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}
