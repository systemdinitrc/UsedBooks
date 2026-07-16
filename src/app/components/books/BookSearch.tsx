"use client";

import { Search } from "lucide-react";

interface BookSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BookSearch({ value, onChange }: BookSearchProps) {
  return (
    <label className="brutal-card flex items-center gap-3 bg-white px-5 py-3">
      <Search aria-hidden className="h-4 w-4 shrink-0 text-foreground" strokeWidth={2.5} />
      <span className="sr-only">Search books</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title or author"
        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/50 focus:outline-none"
      />
    </label>
  );
}
