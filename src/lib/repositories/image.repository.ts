import { db } from '@/lib/db';
import type { BookImage } from '@/lib/types/book';


export function createImage(bookId: number, imagePath: string): BookImage {
  const result = db.prepare(
    'INSERT INTO BookImage (book_id, image_path) VALUES (?, ?)'
  ).run(bookId, imagePath);

  return {
    image_id: Number(result.lastInsertRowid),
    book_id: bookId,
    image_path: imagePath,
  };
}

export function getImagesByBookId(bookId: number): BookImage[] {
  return db.prepare(
    'SELECT * FROM BookImage WHERE book_id = ?'
  ).all(bookId) as BookImage[];
}
