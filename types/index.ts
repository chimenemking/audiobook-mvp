export interface Book {
  id: string
  slug: string
  title: string
  author: string
  narrator: string
  coverUrl: string
  description: string
  totalDuration: number
  createdAt: Date
}

export interface Chapter {
  id: string
  bookId: string
  title: string
  order: number
  duration: number
  audioUrl: string
  createdAt: Date
}

export interface BookWithChapters extends Book {
  chapters: Chapter[]
}

export interface PlayerState {
  currentBook: BookWithChapters | null
  currentChapter: Chapter | null
  currentChapterIndex: number
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackRate: number
  volume: number
  isLoading: boolean
  isBuffering: boolean
  error: string | null
  
  loadBook: (book: BookWithChapters, chapterIndex?: number) => void
  play: () => void
  pause: () => void
  togglePlay: () => void
  seek: (time: number) => void
  setPlaybackRate: (rate: number) => void
  setVolume: (volume: number) => void
  nextChapter: () => void
  prevChapter: () => void
  selectChapter: (chapterId: string) => void
  updateTime: (time: number) => void
  updateDuration: (duration: number) => void
  setBuffering: (isBuffering: boolean) => void
  setError: (error: string | null) => void
  handleEnded: () => void
  reset: () => void
}

export const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const
export type PlaybackRate = typeof PLAYBACK_RATES[number]