"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActivePath, navigationItems } from "./Nav";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-3 border-r-[3px] border-foreground bg-background px-6 py-8 lg:flex">
      <Link href="/" className="mb-6 block rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white">
        <span className="font-display text-4xl font-bold italic text-foreground">Kiddies</span>
      </Link>

      <nav aria-label="Primary navigation" className="flex flex-col gap-3">
        {navigationItems.map(({ href, icon: Icon, label }) => {
          const active = isActivePath(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              className={`brutal-card brutal-card-pressable flex items-center gap-3 px-4 py-3 text-sm font-bold ${
                active ? "bg-brand-orange" : "bg-white hover:bg-tint-peach"
              }`}
            >
              <Icon aria-hidden className="h-5 w-5" strokeWidth={2.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="brutal-card mt-auto bg-tint-lavender p-4 text-xs text-foreground">
        <p className="font-display text-base font-bold">Reading is a superpower.</p>
        <p className="mt-1">Give a much-loved story its next chapter.</p>
      </div>
    </aside>
  );
}
