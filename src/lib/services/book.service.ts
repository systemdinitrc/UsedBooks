import * as bookRepo from '@/lib/repositories/book.repository';
import type { BookSummary, BookDetail } from '@/lib/types/book';
import type { CreateBookInput } from '@/lib/validation/book.schema';

export function listBooks(): BookSummary[] {
  return bookRepo.getAllBooks();
}

export function getBook(id: number): BookDetail | null {
  return bookRepo.getBookById(id);
}

export function createBook(input: CreateBookInput): number {
  return bookRepo.createBook({
    title: input.title,
    author: input.author,
    description: input.description ?? null,
    suggested_price: input.suggested_price,
  });
}
