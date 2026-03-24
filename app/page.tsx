'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePlayer } from '@/lib/store'

const TEST_CHAPTERS = [
  {
    id: '1',
    title: 'Chapter 1: The Beginning',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 30,
  },
  {
    id: '2',
    title: 'Chapter 2: The Journey',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 30,
  },
  {
    id: '3',
    title: 'Chapter 3: The End',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 30,
  },
]

export default function Home() {
  const { loadChapter, setPlaying } = usePlayer()

  const handlePlay = (chapter: typeof TEST_CHAPTERS[0]) => {
    loadChapter(chapter)
    setPlaying(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Test Audiobook</h1>
        
        <div className="space-y-4">
          {TEST_CHAPTERS.map((chapter) => (
            <Card key={chapter.id} className="bg-slate-900 border-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{chapter.title}</h3>
                  <p className="text-sm text-slate-400">{chapter.duration}s</p>
                </div>
                <Button onClick={() => handlePlay(chapter)}>Play</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}