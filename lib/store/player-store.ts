import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { PlayerState, BookWithChapters } from '@/types'

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentBook: null,
      currentChapter: null,
      currentChapterIndex: -1,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      playbackRate: 1,
      volume: 1,
      isLoading: false,
      isBuffering: false,
      error: null,

      loadBook: (book: BookWithChapters, chapterIndex = 0) => {
        const chapter = book.chapters[chapterIndex]
        if (!chapter) return

        set({
          currentBook: book,
          currentChapter: chapter,
          currentChapterIndex: chapterIndex,
          currentTime: 0,
          isLoading: true,
          error: null,
        })
      },

      play: () => set({ isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      seek: (time: number) => {
        const { duration } = get()
        set({ currentTime: Math.max(0, Math.min(time, duration)) })
      },

      setPlaybackRate: (rate: number) => set({ playbackRate: rate }),
      setVolume: (volume: number) => set({ volume: Math.max(0, Math.min(1, volume)) }),

      nextChapter: () => {
        const { currentBook, currentChapterIndex } = get()
        if (!currentBook) return

        const nextIndex = currentChapterIndex + 1
        if (nextIndex < currentBook.chapters.length) {
          set({
            currentChapter: currentBook.chapters[nextIndex],
            currentChapterIndex: nextIndex,
            currentTime: 0,
            isPlaying: true,
          })
        } else {
          set({ isPlaying: false })
        }
      },

      prevChapter: () => {
        const { currentBook, currentChapterIndex, currentTime } = get()
        if (!currentBook) return

        if (currentTime > 3) {
          set({ currentTime: 0 })
          return
        }

        const prevIndex = currentChapterIndex - 1
        if (prevIndex >= 0) {
          set({
            currentChapter: currentBook.chapters[prevIndex],
            currentChapterIndex: prevIndex,
            currentTime: 0,
            isPlaying: true,
          })
        }
      },

      selectChapter: (chapterId: string) => {
        const { currentBook } = get()
        if (!currentBook) return

        const index = currentBook.chapters.findIndex((ch) => ch.id === chapterId)
        if (index === -1) return

        set({
          currentChapter: currentBook.chapters[index],
          currentChapterIndex: index,
          currentTime: 0,
          isPlaying: true,
        })
      },

      updateTime: (time: number) => set({ currentTime: time }),
      updateDuration: (duration: number) => set({ duration, isLoading: false }),
      setBuffering: (isBuffering: boolean) => set({ isBuffering }),
      setError: (error: string | null) => set({ error, isLoading: false }),
      
      handleEnded: () => get().nextChapter(),

      reset: () => set({
        currentBook: null,
        currentChapter: null,
        currentChapterIndex: -1,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        isLoading: false,
        isBuffering: false,
        error: null,
      }),
    }),
    {
      name: 'audiobook-player',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentBook: state.currentBook,
        currentChapter: state.currentChapter,
        currentChapterIndex: state.currentChapterIndex,
        currentTime: state.currentTime,
        playbackRate: state.playbackRate,
        volume: state.volume,
      }),
    }
  )
)