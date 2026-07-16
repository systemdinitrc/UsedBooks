import type { Metadata } from "next";

import { AddBookForm } from "../components/forms/AddBookForm";

export const metadata: Metadata = { title: "List a book" };

export default function AddBookPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 pt-6 sm:px-8 sm:pt-8 lg:px-10">
      <header className="mb-6">
        <h1 className="font-display text-4xl font-bold italic sm:text-5xl">List a book</h1>
        <p className="mt-2 text-sm font-medium text-foreground/75 sm:text-base">
          Give a beloved book a new home. Add up to three clear cover photos.
        </p>
      </header>
      <AddBookForm />
    </div>
  );
}
