import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Cut the Bullshit",
  description:
    "Decode executive nonsense into what people actually mean.",
  openGraph: {
    title: "Cut the Bullshit",
    description:
      "Decode executive nonsense into what people actually mean.",
    url: "https://cut-the-bullshit.vercel.app",
    siteName: "Cut the Bullshit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cut the Bullshit - corporate jargon translator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cut the Bullshit",
    description:
      "Decode executive nonsense into what people actually mean.",
    images: ["/og-image.png"],
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
