import Link from "next/link";

import type { BookSummary } from "@/lib/types/book";

import { BookCover } from "./BookCover";

const cardTones = [
  "bg-tint-lavender",
  "bg-tint-pink",
  "bg-tint-peach",
  "bg-tint-mint",
  "bg-tint-sky",
  "bg-tint-sun",
] as const;

interface BookCardProps {
  book: BookSummary;
}

export function BookCard({ book }: BookCardProps) {
  const tone = cardTones[book.book_id % cardTones.length];

  return (
    <Link
      href={`/books/${book.book_id}`}
      className={`brutal-card brutal-card-pressable group grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-3 ${tone}`}
    >
      <div className="brutal-frame relative h-32 w-24 shrink-0 overflow-hidden bg-white sm:h-36 sm:w-28">
        <BookCover imagePath={book.thumbnail} title={book.title} sizes="(max-width: 640px) 96px, 112px" />
      </div>

      <div className="brutal-frame flex min-w-0 flex-col justify-between bg-white p-3">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-bold leading-tight text-foreground group-hover:underline">
            {book.title}
          </h2>
          <p className="mt-1 text-xs font-medium text-foreground/65">{book.author}</p>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="text-xs font-bold text-foreground/70">
            {book.bid_count} {book.bid_count === 1 ? "bid" : "bids"}
          </span>
          <span className="font-display text-base font-bold text-foreground">
            ${book.suggested_price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
