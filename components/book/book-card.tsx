// components/BookCard.tsx
"use client";

import { usePlayer } from "@/context/audio-player-context";
import { BookWithChapters } from "@/types";

// import { BookWithChapters, usePlayer } from "../context/PlayerContext";

export default function BookCard({ book }: { book: BookWithChapters }) {
  const { currentBook, currentChapter, isPlaying, loadBook, togglePlay } = usePlayer();

  const playingThisBook =
    currentBook?.id === book.id && isPlaying;

  const firstChapter = book.chapters[0];

  return (
    <div
      onClick={() => loadBook(book, 0)}
      className="flex flex-col bg-gray-900 text-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    >
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-sans font-semibold text-lg truncate">{book.title}</h3>
        <p className="font-sans text-gray-400 text-sm truncate">{book.author}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400 text-xs">
            {firstChapter ? `${firstChapter.duration} min` : "--"}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playingThisBook ? togglePlay() : loadBook(book, 0);
            }}
            className=" text-white p-2 rounded-full"
          >
            {playingThisBook ? "❚❚" : "▶️"}
          </button>
        </div>
      </div>
    </div>
  );
}