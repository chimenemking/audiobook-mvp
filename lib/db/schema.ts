import { pgTable, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core'

export const books = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  narrator: text('narrator').notNull(),
  coverUrl: text('cover_url').notNull(),
  description: text('description').notNull(),
  totalDuration: integer('total_duration').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const chapters = pgTable('chapters', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookId: uuid('book_id')
    .references(() => books.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  order: integer('order').notNull(),
  duration: integer('duration').notNull(),
  audioUrl: text('audio_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})