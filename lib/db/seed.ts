import { db } from './index'
import { books, chapters } from './schema'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    await db.delete(chapters)
    await db.delete(books)

    const [book] = await db.insert(books).values({
      slug: 'the-midnight-library',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      narrator: 'Carey Mulligan',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
      description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
      totalDuration: 900,
    }).returning()

    await db.insert(chapters).values([
      {
        bookId: book.id,
        title: 'Chapter 1: The Book of Regrets',
        order: 1,
        duration: 300,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        bookId: book.id,
        title: 'Chapter 2: The Midnight Library',
        order: 2,
        duration: 300,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
      {
        bookId: book.id,
        title: 'Chapter 3: The Librarian',
        order: 3,
        duration: 300,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      },
    ])

    console.log('✅ Database seeded!')
  } catch (error) {
    console.error('❌ Seed error:', error)
    process.exit(1)
  }
}

seed()