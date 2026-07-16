"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from './Nav';
export default function Sidebar(){
	const pathname = usePathname();
{/* Desktop sidebar */}
	return(
		<aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-3 border-r-[3px] border-foreground bg-background px-6 py-8 lg:flex">
			<Link href="/" className="mb-6 block">
				<span className="font-display text-4xl font-bold italic text-foreground">
					Kiddies
				</span>
			</Link>
			<nav className="flex flex-col gap-3">
				{nav.map((item) => {
					const active = pathname === item.href;
					const Icon = item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`brutal-card flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${active? "bg-brand-orange": "bg-white hover:bg-[#F7AE58]"}`}>
							<Icon className="h-5 w-5" />
							{item.label}
						</Link>
					);
				})}
			</nav>
			<div className="brutal-card mt-auto bg-tint-lavender p-4 text-xs text-foreground">
				<p className="font-display text-base font-bold">Reading is a superpower.</p>
				<p className="mt-1">New picks every week, listed with love.</p>
			</div>
		</aside>
	);
}


