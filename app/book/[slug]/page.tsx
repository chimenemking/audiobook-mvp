// app/page.tsx (or pages/index.tsx)
"use client";

import { Navbar } from "@/components/navbar";
import BookCard from "@/components/book/book-card";
import PlayerBar from "@/components/player-bar";
// import { AudioPlayerProvider } from "@/context/audio-player-context";
import { Book } from "@/types";
import { motion } from "framer-motion";

// Example book data (you would fetch this dynamically)
const book: Book = {
  title: "The Art of War",
  author: "Sun Tzu",
  coverUrl: "https://images.pexels.com/photos/1059116/pexels-photo-1059116.jpeg",
  audioUrl: "/audio/art_of_war.mp3",
  duration: "3h 20m",
  description:
    "An ancient Chinese military treatise dating from the Late Spring and Autumn Period. Covers strategy, tactics, and philosophy of war.",
};

// Example recommended books
const recommendedBooks: Book[] = [
  {
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg",
    audioUrl: "/audio/1984.mp3",
    duration: "11h 15m",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    coverUrl: "https://images.pexels.com/photos/459829/pexels-photo-459829.jpeg",
    audioUrl: "/audio/meditations.mp3",
    duration: "5h 30m",
  },
];

export default function BookPage() {
  return (
    <AudioPlayerProvider>
      <Navbar />

      <main className="bg-white min-h-screen pt-24 px-6">
        {/* Book Hero / Cover + Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          {/* Cover Image */}
          <motion.img
            src={book.coverUrl}
            alt={book.title}
            className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Book Info */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-4xl font-semibold text-gray-900">{book.title}</h1>
            <p className="text-gray-600 text-lg">
              <span className="font-medium text-gray-800">Author:</span> {book.author}
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-medium text-gray-800">Duration:</span> {book.duration}
            </p>
            <p className="text-gray-700 mt-4">{book.description}</p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all">
                Play
              </button>
              <button className="px-6 py-3 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition-all">
                Add to Library
              </button>
            </div>
          </div>
        </motion.section>

        {/* Recommended Books Carousel */}
        {recommendedBooks.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
            <motion.div
              className="flex gap-4 overflow-x-auto pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {recommendedBooks.map((b) => (
                <BookCard key={b.title} book={b} className="min-w-[200px] flex-shrink-0" />
              ))}
            </motion.div>
          </section>
        )}

        <PlayerBar />
      </main>
    </AudioPlayerProvider>
  );
}