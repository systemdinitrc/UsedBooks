
import { Home, Search, BookOpen, Plus } from "lucide-react";
export const nav = [
	{ href: "/", label: "Home", icon: Home },
	{ href: "/search", label: "Search", icon: Search },
	{ href: "/library", label: "Library", icon: BookOpen },
	{ href: "/add", label: "Add", icon: Plus },
] as const;

