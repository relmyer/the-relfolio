import { create } from 'zustand'

export type OverlayType =
  | 'projects'
  | 'experience'
  | 'about'
  | 'skills'
  | 'contact'
  | 'sketchbook'
  | 'sticky-note'
  | null

export type RoomMood = 'evening' | 'night'

interface PortfolioState {
  focusedObject: string | null
  activeOverlay: OverlayType
  hoveredObject: string | null
  roomMood: RoomMood
  audioEnabled: boolean
  secretsFound: Set<string>
  totalSecrets: number
  isLoaded: boolean
  showMenu: boolean
  isMobile: boolean
  stickyNoteContent: string | null

  setFocusedObject: (id: string | null) => void
  setActiveOverlay: (overlay: OverlayType) => void
  setHoveredObject: (id: string | null) => void
  toggleRoomMood: () => void
  toggleAudio: () => void
  discoverSecret: (id: string) => void
  setIsLoaded: (loaded: boolean) => void
  setShowMenu: (show: boolean) => void
  setIsMobile: (mobile: boolean) => void
  setStickyNoteContent: (content: string | null) => void
  resetFocus: () => void
}

export const useStore = create<PortfolioState>((set) => ({
  focusedObject: null,
  activeOverlay: null,
  hoveredObject: null,
  roomMood: 'evening',
  audioEnabled: false,
  secretsFound: new Set(),
  totalSecrets: 5,
  isLoaded: false,
  showMenu: false,
  isMobile: false,
  stickyNoteContent: null,

  setFocusedObject: (id) => set({ focusedObject: id }),
  setActiveOverlay: (overlay) => set({ activeOverlay: overlay }),
  setHoveredObject: (id) => set({ hoveredObject: id }),
  toggleRoomMood: () =>
    set((state) => ({
      roomMood: state.roomMood === 'evening' ? 'night' : 'evening',
    })),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  discoverSecret: (id) =>
    set((state) => {
      const next = new Set(state.secretsFound)
      next.add(id)
      return { secretsFound: next }
    }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setShowMenu: (show) => set({ showMenu: show }),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
  setStickyNoteContent: (content) => set({ stickyNoteContent: content }),
  resetFocus: () =>
    set({ focusedObject: null, activeOverlay: null, stickyNoteContent: null }),
}))
