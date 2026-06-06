import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. BRANDING METADATA LOCK
export const metadata: Metadata = {
  title: "Code&Bugs | Premium Software & AI Agency",
  description: "High-end software development, custom MERN/Next.js architectures, AI bots, and luxury design solutions engineered by Code&Bugs.",
};

// 2. 100% VERCEL RESPONSIVE VIEWPORT SIGNAL FIX
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030712]">
        {children}
      </body>
    </html>
  );
}