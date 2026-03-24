import { create } from 'zustand'

interface Chapter {
  id: string
  title: string
  url: string
  duration: number
}

interface PlayerState {
  isPlaying: boolean
  currentChapter: Chapter | null
  currentTime: number
  playbackRate: number
  
  setPlaying: (playing: boolean) => void
  loadChapter: (chapter: Chapter) => void
  setTime: (time: number) => void
  setRate: (rate: number) => void
}

export const usePlayer = create<PlayerState>((set) => ({
  isPlaying: false,
  currentChapter: null,
  currentTime: 0,
  playbackRate: 1,
  
  setPlaying: (playing) => set({ isPlaying: playing }),
  loadChapter: (chapter) => set({ currentChapter: chapter, currentTime: 0 }),
  setTime: (time) => set({ currentTime: time }),
  setRate: (rate) => set({ playbackRate: rate }),
}))