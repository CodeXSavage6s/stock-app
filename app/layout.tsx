import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://signalist.app';

export const metadata: Metadata = {
  title: "Signalist",
  description: "Track real-time stock prices, get personalized alerts and explore detailed company insights.",
  keywords: [
    'stock analysis',
    'market analysis',
    'market overview',
    'summits',
    'Next.js',
    'TypeScript',
    'real-time',
    'online analysis',
  ],
  authors: [{ name: 'Code X Team', url: BASE_URL }],
  creator: 'CodeXSavage',
  publisher: 'CodeXSavage',
  applicationName: 'Signalist',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Canonical
  alternates: {
    canonical: '/',
  },
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Signalist',
    title: 'Signalist — Discover & Monitor stocks in real-time',
    description:
      'Track real-time stock prices, get personalized alerts and explore detailed company insights.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Signalist — Monitor stocks world wide',
        type: 'image/jpeg',
      },
    ],
  },
  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    site: '@Signalist',
    creator: '@CodeXSavage',
    title: 'Signalist — Discover & Monitor stocks in real-time',
    description:
      'Track real-time stock prices, get personalized alerts and explore detailed company insights.',
    images: ['/og-image.jpg'],
  },
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  // Manifest
  //manifest: '/site.webmanifest',
  // Theme
  category: 'marketing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="dark min-h-full flex flex-col">{children}</body>
    </html>
  );
}