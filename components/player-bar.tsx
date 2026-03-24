// components/PlayerBar.tsx
"use client";

import { usePlayer } from "@/context/audio-player-context";

// import { usePlayer } from "../context/PlayerContext";

export default function PlayerBar() {
  const { currentBook, currentChapter, isPlaying, togglePlay, nextChapter, prevChapter } = usePlayer();

  if (!currentBook || !currentChapter) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50">
      <div className="flex items-center gap-4">
        <img
          src={currentBook.coverUrl}
          alt={currentBook.title}
          className="w-12 h-12 rounded-md object-cover"
        />
        <div className="flex flex-col">
          <span className="font-sans font-semibold">{currentBook.title}</span>
          <span className="font-sans text-gray-400 text-sm">{currentChapter.title}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={prevChapter} className="p-2 hover:bg-gray-800 rounded-full">⏮</button>
        <button onClick={togglePlay} className="bg- p-3 rounded-full ">
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button onClick={nextChapter} className="p-2 hover:bg-gray-800 rounded-full">⏭</button>
      </div>
    </div>
  );
}