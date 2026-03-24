'use client'

import { Play } from 'lucide-react'
import { usePlayerStore } from '@/lib/store/player-store'
import type { BookWithChapters } from '@/types'

interface Props {
  book: BookWithChapters
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function ChapterList({ book }: Props) {
  const loadBook = usePlayerStore((s) => s.loadBook)
  const play = usePlayerStore((s) => s.play)

  const currentChapterId = usePlayerStore(
    (s) => s.currentChapter?.id
  )

  const handleSelect = (index: number) => {
    loadBook(book, index)
    play()
  }

  return (
    <div className="space-y-2">
      {book.chapters.map((chapter, index) => {
        const isActive = currentChapterId === chapter.id

        return (
          <button
            key={chapter.id}
            onClick={() => handleSelect(index)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition ${
              isActive
                ? 'bg-muted border-primary'
                : 'hover:bg-muted/50'
            }`}
          >
            {/* Left: Title */}
            <div className="flex items-center gap-3">
              {isActive && (
                <Play className="h-4 w-4 text-primary" />
              )}

              <p className="font-medium">
                {chapter.title}
              </p>
            </div>

            {/* Right: Duration */}
            <span className="text-sm text-muted-foreground">
              {formatTime(chapter.duration)}
            </span>
          </button>
        )
      })}
    </div>
  )
}