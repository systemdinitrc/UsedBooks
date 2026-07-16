"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActivePath, navigationItems } from "./Nav";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-4 z-30 mx-auto flex w-[min(92%,22rem)] items-center justify-around rounded-3xl border-[3px] border-foreground bg-white px-3 py-2 shadow-[6px_6px_0_0_var(--brand-navy)] lg:hidden"
    >
      {navigationItems.map(({ href, icon: Icon, label }) => {
        const active = isActivePath(pathname, href);

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 border-foreground ${
              active ? "bg-brand-orange" : "bg-white hover:bg-tint-peach"
            }`}
          >
            <Icon aria-hidden className="h-5 w-5" strokeWidth={2.5} />
          </Link>
        );
      })}
    </nav>
  );
}
