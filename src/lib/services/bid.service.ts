import * as bidRepo from '@/lib/repositories/bid.repository';
import * as bookRepo from '@/lib/repositories/book.repository';
import type { Bid } from '@/lib/types/bid';
import type { CreateBidInput } from '@/lib/validation/bid.schema';

export function placeBid(bookId: number, input: CreateBidInput): Bid {
  const book = bookRepo.getBookById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  return bidRepo.createBid(bookId, input.bidder_name, input.bid_amount);
}

export function getBookBids(bookId: number): Bid[] {
  return bidRepo.getBidsByBookId(bookId);
}
