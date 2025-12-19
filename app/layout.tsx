import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import GlobalSwitcher from "@/components/GlobalSwitcher";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Ball",
  description: "The daily sports newspaper.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${inter.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <GlobalSwitcher />
        {children}
      </body>
    </html>
  );
}
