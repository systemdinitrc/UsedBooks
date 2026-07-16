import { db } from '@/lib/db';

export function initializeSchema(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Book (
      book_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL CHECK(length(title) > 0),
      author TEXT NOT NULL CHECK(length(author) > 0),
      description TEXT,
      suggested_price REAL NOT NULL CHECK(suggested_price >= 0)
    );

    CREATE TABLE IF NOT EXISTS BookImage (
      image_id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      FOREIGN KEY (book_id) REFERENCES Book(book_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Bid (
      bid_id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER NOT NULL,
      bidder_name TEXT NOT NULL CHECK(length(bidder_name) > 0),
      bid_amount REAL NOT NULL CHECK(bid_amount > 0),
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (book_id) REFERENCES Book(book_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_bookimage_book ON BookImage(book_id);
    CREATE INDEX IF NOT EXISTS idx_bid_book ON Bid(book_id);
  `);
}
