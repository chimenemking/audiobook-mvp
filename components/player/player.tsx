'use client'

import { useAudio } from '@/lib/hooks/use-audio'
import { useKeyboardShortcuts } from '@/lib/hooks/use-keyboard'
import { usePlayerStore } from '@/lib/store/player-store'
// import { PlayerControls } from './player-controls'
import { ProgressBar } from './progress-bar'
import { PlayerControls } from './player-controls'

export function Player() {
  useAudio()
  useKeyboardShortcuts()

  const { currentBook, currentChapter } = usePlayerStore()

  if (!currentBook || !currentChapter) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
      <div className="max-w-5xl mx-auto space-y-3">
        
        {/* Book + Chapter Info */}
        <div>
          <p className="font-semibold">{currentBook.title}</p>
          <p className="text-sm text-muted-foreground">
            {currentChapter.title}
          </p>
        </div>

        {/* Progress */}
        <ProgressBar />

        {/* Controls */}
        <div className="flex justify-center">
          <PlayerControls />
        </div>
      </div>
    </div>
  )
}