import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { BidHistory } from "@/app/components/books/BidHistory";
import { BookCover } from "@/app/components/books/BookCover";
import { BidForm } from "@/app/components/forms/BidForm";
import { getBookBids } from "@/lib/services/bid.service";
import { getBook } from "@/lib/services/book.service";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

const getCachedBook = cache((bookId: number) => getBook(bookId));

function parseBookId(id: string): number | null {
  const bookId = Number(id);
  return Number.isSafeInteger(bookId) && bookId > 0 ? bookId : null;
}

async function loadBook(params: BookPageProps["params"]) {
  const { id } = await params;
  const bookId = parseBookId(id);

  return bookId ? getCachedBook(bookId) : null;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = await loadBook(params);

  return book
    ? { title: book.title, description: book.description ?? `Bid on ${book.title} by ${book.author}.` }
    : { title: "Book not found", robots: { index: false } };
}

export const dynamic = "force-dynamic";

export default async function BookPage({ params }: BookPageProps) {
  const book = await loadBook(params);

  if (!book) {
    notFound();
  }

  const currentPrice = book.highest_bid ?? book.suggested_price;
  const minimumBid = Number((currentPrice + 0.01).toFixed(2));
  const coverImage = book.images[0]?.image_path ?? null;
  const bids = getBookBids(book.book_id);

  return (
    <div className="px-4 pb-8 pt-6 sm:px-8 lg:px-10">
      <Link href="/browse" className="brutal-btn inline-grid h-11 w-11 place-items-center bg-white" aria-label="Back to books">
        <ArrowLeft aria-hidden className="h-5 w-5" strokeWidth={2.5} />
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="brutal-card relative flex aspect-square items-center justify-center overflow-hidden bg-white p-8">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-[45%_55%_60%_40%/50%_40%_60%_50%] bg-tint-lavender"
          />
          <div className="brutal-frame relative h-64 w-44 overflow-hidden bg-white sm:h-80 sm:w-56">
            <BookCover imagePath={coverImage} title={book.title} sizes="(max-width: 1024px) 224px, 256px" />
          </div>
        </div>

        <article className="brutal-card bg-tint-lavender p-6 sm:p-8">
          <p className="text-sm font-bold text-foreground/75">{book.author}</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {book.title}
          </h1>
          <p className="mt-5 text-sm font-medium leading-relaxed text-foreground/80 sm:text-base">
            {book.description ?? "A well-loved book looking for its next reader."}
          </p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="brutal-frame bg-white px-5 py-3">
              <span className="block text-xs font-bold text-foreground/70">Current bid</span>
              <span className="font-display text-xl font-bold">${currentPrice.toFixed(2)}</span>
            </div>
            <span className="text-right text-sm font-bold text-foreground/75">
              {book.highest_bid === null ? "No bids yet" : "Highest offer"}
            </span>
          </div>

          <BidForm bookId={book.book_id} minimumBid={minimumBid} />
        </article>
      </div>

      <BidHistory bids={bids} />
    </div>
  );
}
