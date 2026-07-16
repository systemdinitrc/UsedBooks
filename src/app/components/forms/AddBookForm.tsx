"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../SubmitButton";
import { Plus } from "lucide-react";

import type { ApiResponse } from "@/lib/types/api";

interface CreateBookResponse {
  book_id: number;
}

export function AddBookForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const payload = (await response.json()) as ApiResponse<CreateBookResponse>;

      if (!response.ok || !payload.success || !payload.data) {
        setError(payload.error ?? "Your listing could not be saved. Please try again.");
        return;
      }

      router.push(`/books/${payload.data.book_id}`);
      router.refresh();
    } catch {
      setError("Your listing could not be saved. Check your connection and try again.");
    } 
  }

  return (
    <form onSubmit={handleSubmit} className="brutal-card bg-tint-lavender p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold">
          Title
          <input
            required
            name="title"
            maxLength={200}
            className="brutal-frame mt-1 w-full bg-white px-3 py-2 font-medium focus:outline-none"
          />
        </label>
        <label className="text-sm font-bold">
          Author
          <input
            required
            name="author"
            maxLength={200}
            className="brutal-frame mt-1 w-full bg-white px-3 py-2 font-medium focus:outline-none"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-bold">
        Description <span className="font-medium text-foreground/65">(optional)</span>
        <textarea
          name="description"
          maxLength={2000}
          rows={5}
          className="brutal-frame mt-1 w-full resize-y bg-white px-3 py-2 font-medium focus:outline-none"
        />
      </label>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold">
          Starting price
          <input
            required
            name="suggested_price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            className="brutal-frame mt-1 w-full bg-white px-3 py-2 font-medium focus:outline-none"
          />
        </label>
        <label className="text-sm font-bold">
          Cover images <span className="font-medium text-foreground/65">(up to 3)</span>
          <input
            name="images"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="mt-2 block w-full text-sm font-medium file:mr-3 file:rounded-lg file:border-2 file:border-foreground file:bg-white file:px-3 file:py-1.5 file:font-bold"
          />
        </label>
      </div>

      {error ? (
        <p role="alert" className="mt-5 text-sm font-bold text-red-800">
          {error}
        </p>
      ) : null}

      <SubmitButton
        pendingText="Saving listing…"
        icon=<Plus aria-hidden className="h-5 w-5" strokeWidth={2.5} />
        className="mt-5 bg-brand-orange">
        Publish listing
      </SubmitButton>

    </form>
  );
}
