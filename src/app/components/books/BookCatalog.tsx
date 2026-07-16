"use client";

import { useMemo, useState } from "react";

import type { BookSummary } from "@/lib/types/book";

import { BookGrid } from "./BookGrid";
import { BookSearch } from "./BookSearch";

interface BookCatalogProps {
  books: BookSummary[];
  variant: "home" | "browse";
}

function matchesQuery(book: BookSummary, query: string): boolean {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return (
    !normalizedQuery ||
    book.title.toLocaleLowerCase().includes(normalizedQuery) ||
    book.author.toLocaleLowerCase().includes(normalizedQuery)
  );
}

export function BookCatalog({ books, variant }: BookCatalogProps) {
  const [query, setQuery] = useState("");
  const filteredBooks = useMemo(
    () => books.filter((book) => matchesQuery(book, query)),
    [books, query],
  );
  const isHome = variant === "home";

  return (
    <div className="px-4 pt-4 sm:px-8 sm:pt-8 lg:px-10">
      {isHome ? (
        <header className="brutal-card bg-brand-orange p-6 sm:p-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <h1 className="font-display text-5xl font-bold italic leading-none sm:text-6xl lg:text-7xl">
                Kiddies
              </h1>
              <p className="mt-3 text-lg font-bold sm:text-xl">Find a story to love.</p>
            </div>
            <div
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-foreground bg-tint-pink font-display text-lg font-bold sm:h-14 sm:w-14"
            >
              K
            </div>
          </div>
          <div className="mt-6 max-w-xl">
            <BookSearch value={query} onChange={setQuery} />
          </div>
        </header>
      ) : (
        <header className="brutal-card bg-tint-lavender p-6 sm:flex sm:items-end sm:justify-between sm:gap-6 sm:p-8">
          <div>
            <h1 className="font-display text-4xl font-bold italic sm:text-5xl">Browse books</h1>
            <p className="mt-2 max-w-xl text-sm font-medium text-foreground/75 sm:text-base">
              Explore every listing from our community.
            </p>
          </div>
          <div className="mt-5 max-w-xl sm:mt-0 sm:w-80">
            <BookSearch value={query} onChange={setQuery} />
          </div>
        </header>
      )}

      <section className="py-8" aria-live="polite">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold italic sm:text-4xl">
            {isHome ? "Trending books" : "All books"}
          </h2>
          <p className="mt-1 text-sm font-medium text-foreground/70">
            {filteredBooks.length} {filteredBooks.length === 1 ? "story" : "stories"} available
          </p>
        </div>

        {filteredBooks.length > 0 ? (
          <BookGrid books={filteredBooks} />
        ) : (
          <div className="brutal-card bg-white p-8 text-center text-sm font-medium">
            No books match “{query}”. Try another title or author.
          </div>
        )}
      </section>
    </div>
  );
}
