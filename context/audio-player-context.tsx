
// context/PlayerContext.tsx
"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { BookWithChapters, Chapter } from "../types";

interface PlayerContextType {
  currentBook: BookWithChapters | null;
  currentChapter: Chapter | null;
  isPlaying: boolean;
  loadBook: (book: BookWithChapters, chapterIndex?: number) => void;
  togglePlay: () => void;
  nextChapter: () => void;
  prevChapter: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentBook, setCurrentBook] = useState<BookWithChapters | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentChapter = currentBook?.chapters[currentChapterIndex] || null;

  const loadBook = (book: BookWithChapters, chapterIndex = 0) => {
    setCurrentBook(book);
    setCurrentChapterIndex(chapterIndex);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextChapter = () => {
    if (!currentBook) return;
    if (currentChapterIndex < currentBook.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      setIsPlaying(true);
    }
  };

  const prevChapter = () => {
    if (!currentBook) return;
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current || !currentChapter) return;
    audioRef.current.src = currentChapter.audioUrl;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [currentChapter, isPlaying]);

  return (
    <PlayerContext.Provider
      value={{ currentBook, currentChapter, isPlaying, loadBook, togglePlay, nextChapter, prevChapter }}
    >
      {children}
      {currentChapter && <audio ref={audioRef} />}
    </PlayerContext.Provider>
  );
};