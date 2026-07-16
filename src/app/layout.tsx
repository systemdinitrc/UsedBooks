import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "./components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kiddies",
    template: "%s | Kiddies",
  },
  description: "A friendly marketplace for children’s books.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
