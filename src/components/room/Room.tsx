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
  floor: '#3B2617',
  wall: '#E8E0D4',
  ceiling: '#D9D2C7',
  desk: '#4A3222',
  shelf: '#5C3A24',
  sideTable: '#4A3222',
} as const

export function Room() {
  const roomMood = useStore((s) => s.roomMood)

  return (
    <group>
      <Lighting mood={roomMood} />

      {/* ── Floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color={COLORS.floor} roughness={0.8} />
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

      {/* ── Back wall (facing camera) ── */}
      <mesh
        position={[0, ROOM_HEIGHT / 2, -ROOM_DEPTH / 2]}
        receiveShadow
      >
        <boxGeometry args={[ROOM_WIDTH, ROOM_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={COLORS.wall} roughness={0.85} />
      </mesh>

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

const DESK_TOP_THICKNESS = 0.05
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
        <meshStandardMaterial color={COLORS.desk} roughness={0.7} />
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
          <meshStandardMaterial color={COLORS.desk} roughness={0.7} />
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
