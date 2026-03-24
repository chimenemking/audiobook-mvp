'use client'

import { useEffect } from 'react'
import { usePlayerStore } from '@/lib/store/player-store'

export function useKeyboardShortcuts() {
  const { togglePlay, seek, currentTime } = usePlayerStore()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
          e.preventDefault()
          seek(currentTime - 10)
          break
        case 'ArrowRight':
          e.preventDefault()
          seek(currentTime + 10)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [togglePlay, seek, currentTime])
}