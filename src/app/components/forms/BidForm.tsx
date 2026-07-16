"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Gavel } from "lucide-react";
import type { ApiResponse } from "@/lib/types/api";
import { SubmitButton } from "../SubmitButton";

interface BidFormProps {
  bookId: number;
  minimumBid: number;
}
export function BidForm({ bookId, minimumBid }: BidFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  // 1. Add a ref to control the form directly
  const formRef = useRef<HTMLFormElement>(null);

  // 2. Change the handler to accept FormData directly
  async function handleAction(formData: FormData) {
    setError(null);

    try {
      const response = await fetch(`/api/books/${bookId}/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bidder_name: formData.get("bidderName"),
          bid_amount: Number(formData.get("bidAmount")),
        }),
      });
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        setError(payload.error ?? "Your bid could not be placed. Please try again.");
        return;
      }

      console.log("HERE");
      formRef.current?.reset();
      router.refresh();

    } catch {
      setError("Your bid could not be placed. Check your connection and try again.");
    } 
  }

  return (
    <form ref={formRef} action={handleAction} className="mt-8 border-t-2 border-foreground pt-6">
      <h2 className="font-display text-2xl font-bold">Place a bid</h2>
      <p className="mt-1 text-sm font-medium text-foreground/70">
        Bids start at ${minimumBid.toFixed(2)}.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-bold">
          Your name
          <input
            required
            name="bidderName"
            maxLength={100}
            autoComplete="name"
            className="brutal-frame mt-1 w-full bg-white px-3 py-2 font-medium focus:outline-none"
          />
        </label>
        <label className="text-sm font-bold">
          Bid amount
          <input
            required
            name="bidAmount"
            type="number"
            min={minimumBid}
            step="0.01"
            inputMode="decimal"
            className="brutal-frame mt-1 w-full bg-white px-3 py-2 font-medium focus:outline-none"
          />
        </label>
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm font-bold text-red-800">
          {error}
        </p>
      ) : null}

      <SubmitButton
        pendingText="Placing bid…"
        icon={<Gavel aria-hidden className="h-5 w-5" strokeWidth={2.5} />}
        className="mt-5 bg-brand-orange">
        Place bid
      </SubmitButton>
    </form>
  );
}
