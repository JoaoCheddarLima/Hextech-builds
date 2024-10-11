import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hextech",
  description: "Data, with actually meaning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='w-full h-full'>
      <Analytics/>
      <body className={`${inter.className} w-full h-full`}>{children}</body>
    </html>
  );
}
