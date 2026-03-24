'use client'

import { useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { usePlayer } from '@/lib/store'

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { isPlaying, currentChapter, currentTime, playbackRate, setPlaying, setTime, setRate } = usePlayer()

  // Update audio element when state changes
  useEffect(() => {
    if (!audioRef.current || !currentChapter) return
    
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    if (!audioRef.current || !currentChapter) return
    audioRef.current.src = currentChapter.url
    audioRef.current.load()
  }, [currentChapter])

  if (!currentChapter) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 border-t border-slate-700">
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
      />
      
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="text-sm font-medium">{currentChapter.title}</div>
        
        <Slider
          value={[currentTime]}
          max={currentChapter.duration}
          step={1}
          onValueChange={([val]) => {
            setTime(val)
            if (audioRef.current) audioRef.current.currentTime = val
          }}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={() => setTime(Math.max(0, currentTime - 10))}>
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button size="icon" onClick={() => setPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button size="icon" variant="ghost" onClick={() => setTime(currentTime + 10)}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Speed:</span>
            {[0.5, 1, 1.5, 2].map((rate) => (
              <Button
                key={rate}
                size="sm"
                variant={playbackRate === rate ? "default" : "ghost"}
                onClick={() => setRate(rate)}
              >
                {rate}x
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}