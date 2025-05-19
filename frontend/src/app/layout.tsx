import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aegis Ledger",
  description: "AI powered book keeping app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MarketingNavbar />
        {children}
      </body>
    </html>
  );
}
