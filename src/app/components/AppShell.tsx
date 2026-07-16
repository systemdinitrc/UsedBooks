import type { ReactNode } from "react";

import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <Sidebar />
        <main className="min-w-0 flex-1 pb-28 lg:pb-8">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
