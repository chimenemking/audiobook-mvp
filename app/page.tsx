// app/page.tsx (or pages/index.tsx)
"use client";


import { PlayerProvider } from "@/context/audio-player-context";
import { BookWithChapters } from "../types";
import BookCard from "@/components/book/book-card";
import PlayerBar from "@/components/player-bar";
import {Navbar} from "@/components/navbar";

const books: BookWithChapters[] = [
  {
    id: "1",
    slug: "art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    narrator: "John Doe",
    coverUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXVkaW98ZW58MHx8MHx8fDA%3D",
    description: "Classic strategy book",
    totalDuration: 200,
    createdAt: new Date(),
    chapters: [
      { id: "c1", bookId: "1", title: "Chapter 1", order: 1, duration: 10, audioUrl: "/audio/chapter1.wav", createdAt: new Date() },
      { id: "c2", bookId: "1", title: "Chapter 2", order: 2, duration: 15, audioUrl: "/audio/chapter2.wav", createdAt: new Date() },
    ]
  },
  // Add more books here...
];

export default function HomePage() {
  return (
    <PlayerProvider>
      <Navbar/>
      <main className="bg-white min-h-screen p-6">
        <h1 className="text-3xl font-sans font-bold text-black mb-6">
          Your Library
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <PlayerBar />
      </main>
    </PlayerProvider>
  );
}
