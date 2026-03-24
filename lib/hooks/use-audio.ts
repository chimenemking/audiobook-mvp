'use client'

import { useEffect, useRef } from 'react'
import { usePlayerStore } from '@/lib/store/player-store'

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const {
    currentChapter,
    isPlaying,
    playbackRate,
    volume,
    updateTime,
    updateDuration,
    setBuffering,
    setError,
    handleEnded,
  } = usePlayerStore()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const audio = new Audio()
    audio.preload = 'metadata'
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentChapter) return

    audio.src = currentChapter.audioUrl
    audio.load()

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error('Play error:', err)
        setError('Failed to play')
      })
    }
  }, [currentChapter, isPlaying, setError])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch((err) => setError('Failed to play'))
    } else {
      audio.pause()
    }
  }, [isPlaying, setError])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => updateTime(audio.currentTime)
    const onDurationChange = () => updateDuration(audio.duration)
    const onWaiting = () => setBuffering(true)
    const onCanPlay = () => setBuffering(false)
    const onError = () => {
      setError('Failed to load audio')
      setBuffering(false)
    }
    const onEnded = () => handleEnded()

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('ended', onEnded)
    }
  }, [updateTime, updateDuration, setBuffering, setError, handleEnded])

  return { audioRef }
}