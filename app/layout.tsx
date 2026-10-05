import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: "#040506",
  colorScheme: "dark",
};

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Sameer Shahid Siddiqui",
  description: "Professional portfolio of Sameer Shahid Siddiqui, a Frontend Developer specializing in React, Next.js, and AI-Assisted Development.",
  openGraph: {
    title: "Portfolio | Sameer Shahid Siddiqui",
    description: "Professional portfolio of Sameer Shahid Siddiqui, a Frontend Developer specializing in React, Next.js, and AI-Assisted Development.",
    url: "https://shadowxai.vercel.app", // Fallback URL, update with actual domain
    siteName: "Sameer Shahid Siddiqui - Portfolio",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Sameer Shahid Siddiqui Portfolio"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Sameer Shahid Siddiqui",
    description: "Professional portfolio of Sameer Shahid Siddiqui, a Frontend Developer specializing in React, Next.js, and AI-Assisted Development.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-16">
      <body className={`${manrope.variable} ${instrumentSerif.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
