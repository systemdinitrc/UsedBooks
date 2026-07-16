import type { BookSummary } from "@/lib/types/book";

import { BookCard } from "./BookCard";

interface BookGridProps {
  books: BookSummary[];
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.book_id} book={book} />
      ))}
    </div>
  );
}
