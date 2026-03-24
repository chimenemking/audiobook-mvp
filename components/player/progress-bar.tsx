'use client'

import { Slider } from '@/components/ui/slider'
import { usePlayerStore } from '@/lib/store/player-store'

function formatTime(seconds: number) {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function ProgressBar() {
  const { currentTime, duration, seek } = usePlayerStore()

  return (
    <div className="w-full space-y-2">
      <Slider
        value={[currentTime]}
        max={duration || 1}
        step={1}
        onValueChange={(value) => seek(value[0])}
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}