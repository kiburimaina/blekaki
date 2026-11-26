import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500"] });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Blekaki — Discover. Shop. Sell. Become.",
  description: "A Kenya-first marketplace and entrepreneurship platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans text-[17px] leading-relaxed">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
