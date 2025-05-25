import type { Metadata } from "next";
import "./globals.css";
import ProtectedRoute from "@/components/protected-route";

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
        {children}
      </body>
    </html>
  );
}
