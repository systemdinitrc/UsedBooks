"use client";
import { nav } from "./Nav";
import Link from "next/link";
import { usePathname } from 'next/navigation';
export default function MobileNav(){
	const pathname = usePathname();

          {/* Mobile bottom nav */}
	return(
          <nav className="fixed inset-x-0 bottom-4 z-30 mx-auto flex w-[min(92%,22rem)] items-center justify-around rounded-3xl border-[3px] border-foreground bg-white px-3 py-2 shadow-[6px_6px_0_0_var(--brand-navy)] lg:hidden">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
            {/* hover ko theme mein define krna */}
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  // TODO: fix hover ki location
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 border-foreground ${active ? "bg-brand-orange" : "bg-white hover:bg-[#F7AE58] "}`}>
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                </Link>
              );
            })}
          </nav>
	);
}
