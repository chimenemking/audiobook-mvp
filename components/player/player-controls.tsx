'use client'

import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePlayerStore } from '@/lib/store/player-store'

export function PlayerControls() {
  const {
    isPlaying,
    togglePlay,
    nextChapter,
    prevChapter,
  } = usePlayerStore()

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={prevChapter}>
        <SkipBack className="h-5 w-5" />
      </Button>

      <Button size="icon" onClick={togglePlay}>
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>

      <Button variant="ghost" size="icon" onClick={nextChapter}>
        <SkipForward className="h-5 w-5" />
      </Button>
    </div>
  )
}