import { db } from '@/lib/db';
import type { Bid } from '@/lib/types/bid';


export function getBidsByBookId(bookId: number): Bid[] {
  return db.prepare(
    'SELECT * FROM Bid WHERE book_id = ? ORDER BY bid_amount DESC'
  ).all(bookId) as Bid[];
}

export function createBid(bookId: number, bidderName: string, bidAmount: number): Bid {
  return db.prepare(
    'INSERT INTO Bid (book_id, bidder_name, bid_amount) VALUES (?, ?, ?) RETURNING *'
  ).get(bookId, bidderName, bidAmount) as Bid;
}

export function getHighestBid(bookId: number): number | null {
  const row = db.prepare(
    'SELECT MAX(bid_amount) AS highest FROM Bid WHERE book_id = ?'
  ).get(bookId) as { highest: number | null };

  return row.highest;
}
