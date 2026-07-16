import { Home, Plus, Search } from "lucide-react";

export const navigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/browse", label: "Browse", icon: Search },
  { href: "/add", label: "List a book", icon: Plus },
] as const;

export function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}
