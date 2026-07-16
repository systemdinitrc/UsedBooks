import { db } from '@/lib/db';
import type { Book, BookSummary, BookDetail, BookImage } from '@/lib/types/book';

export function getAllBooks(): BookSummary[] {
  const rows = db.prepare(`
    SELECT
      b.*,
      (SELECT bi.image_path FROM BookImage bi WHERE bi.book_id = b.book_id LIMIT 1) AS thumbnail,
      (SELECT COUNT(*) FROM Bid bd WHERE bd.book_id = b.book_id) AS bid_count
    FROM Book b
    ORDER BY b.book_id DESC
  `).all() as BookSummary[];

  return rows;
}

export function getBookById(id: number): BookDetail | null {
  const book = db.prepare('SELECT * FROM Book WHERE book_id = ?').get(id) as Book | undefined;
  if (!book) return null;

  const images = db.prepare('SELECT * FROM BookImage WHERE book_id = ?').all(id) as BookImage[];

  const highestBidRow = db.prepare(
    'SELECT MAX(bid_amount) AS highest FROM Bid WHERE book_id = ?'
  ).get(id) as { highest: number | null };

  return {
    ...book,
    images,
    highest_bid: highestBidRow.highest,
  };
}

export function createBook(data: Omit<Book, 'book_id'>): number {
  const result = db.prepare(
    'INSERT INTO Book (title, author, description, suggested_price) VALUES (?, ?, ?, ?)'
  ).run(data.title, data.author, data.description, data.suggested_price);

  return Number(result.lastInsertRowid);
}
