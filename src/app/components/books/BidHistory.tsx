import type { Bid } from "@/lib/types/bid";

interface BidHistoryProps {
  bids: Bid[];
}

function formatBidDate(timestamp: string): string {
  const isoTimestamp = timestamp.includes("T") ? timestamp : timestamp.replace(" ", "T");
  const date = new Date(isoTimestamp.endsWith("Z") ? isoTimestamp : `${isoTimestamp}Z`);

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function BidHistory({ bids }: BidHistoryProps) {
  return (
    <section className="brutal-card mt-8 bg-tint-sky p-6 sm:p-8" aria-labelledby="bid-history-heading">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="bid-history-heading" className="font-display text-2xl font-bold">
          Bid history
        </h2>
        <span className="text-sm font-bold text-foreground/70">
          {bids.length} {bids.length === 1 ? "bid" : "bids"}
        </span>
      </div>

      {bids.length > 0 ? (
        <ol className="mt-4 space-y-3">
          {bids.map((bid, index) => (
            <li key={bid.bid_id} className="brutal-frame flex items-center justify-between gap-4 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{bid.bidder_name}</p>
                <p className="mt-0.5 text-xs font-medium text-foreground/65">{formatBidDate(bid.timestamp)}</p>
              </div>
              <div className="shrink-0 text-right">
                {index === 0 ? <span className="block text-xs font-bold text-foreground/65">Highest</span> : null}
                <span className="font-display text-lg font-bold">${bid.bid_amount.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="brutal-frame mt-4 bg-white p-4 text-sm font-medium text-foreground/75">
          No bids yet. Be the first to make an offer.
        </p>
      )}
    </section>
  );
}
