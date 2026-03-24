'use server'

import { db } from './db'
import { books, chapters } from './db/schema'
import { eq, asc } from 'drizzle-orm'
import type { BookWithChapters } from '@/types'

export async function getAllBooks(): Promise<BookWithChapters[]> {
  const allBooks = await db.select().from(books)
  
  const booksWithChapters = await Promise.all(
    allBooks.map(async (book) => {
      const bookChapters = await db
        .select()
        .from(chapters)
        .where(eq(chapters.bookId, book.id))
        .orderBy(asc(chapters.order))
      
      return { ...book, chapters: bookChapters }
    })
  )
  
  return booksWithChapters
}

export async function getBookBySlug(slug: string): Promise<BookWithChapters | null> {
  const [book] = await db.select().from(books).where(eq(books.slug, slug))
  if (!book) return null
  
  const bookChapters = await db
    .select()
    .from(chapters)
    .where(eq(chapters.bookId, book.id))
    .orderBy(asc(chapters.order))
  
  return { ...book, chapters: bookChapters }
}