import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Probability and Statistics Book",
  description: "Interactive companion website for the book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="p-4 bg-gray-100 border-b">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/chapter1" className="text-blue-600 hover:underline">Chapter 1</Link>
            </li>
            {/* Add links for other chapters here later */}
          </ul>
        </nav>
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}

