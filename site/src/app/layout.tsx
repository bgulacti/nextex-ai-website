import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "NexTex AI — Machine Intelligence for Sustainable Textile Manufacturing",
    template: "%s — NexTex AI",
  },
  description:
    "NexTex AI connects quality intelligence, process intelligence, industrial data and sustainability intelligence into one platform for textile manufacturers — from industrial cameras and PLC signals to audit-ready, CSRD-oriented reporting.",
  keywords: [
    "textile AI",
    "fabric defect detection",
    "machine vision textile",
    "sustainability intelligence",
    "CSRD reporting",
    "Digital Product Passport",
    "industrial AI",
    "edge AI manufacturing",
  ],
  openGraph: {
    title: "NexTex AI — Machine Intelligence for Sustainable Textile Manufacturing",
    description:
      "One platform for quality, process, industrial data and sustainability intelligence in textile manufacturing.",
    type: "website",
    images: [{ url: "/img/hero_v2.jpg", width: 1920, height: 1072 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
