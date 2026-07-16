import { getDb } from '@/lib/db/connection';
import { initializeSchema } from '@/lib/db/schema';
import type { Bid } from '@/lib/types/bid';

function ensureDb() {
  initializeSchema();
  return getDb();
}

export function getBidsByBookId(bookId: number): Bid[] {
  const db = ensureDb();

  return db.prepare(
    'SELECT * FROM Bid WHERE book_id = ? ORDER BY bid_amount DESC'
  ).all(bookId) as Bid[];
}

export function createBid(bookId: number, bidderName: string, bidAmount: number): Bid {
  const db = ensureDb();

  const result = db.prepare(
    'INSERT INTO Bid (book_id, bidder_name, bid_amount) VALUES (?, ?, ?)'
  ).run(bookId, bidderName, bidAmount);

  return db.prepare('SELECT * FROM Bid WHERE bid_id = ?').get(
    Number(result.lastInsertRowid)
  ) as Bid;
}

export function getHighestBid(bookId: number): number | null {
  const db = ensureDb();

  const row = db.prepare(
    'SELECT MAX(bid_amount) AS highest FROM Bid WHERE book_id = ?'
  ).get(bookId) as { highest: number | null };

  return row.highest;
}
