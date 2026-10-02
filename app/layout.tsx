import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A professional portfolio showcasing my work and experience.",
  openGraph: {
    title: "My Portfolio",
    description: "A professional portfolio showcasing my work and experience.",
    url: "https://your-portfolio-url.com", // update this with your actual deployed URL
    siteName: "My Portfolio",
    images: [
      {
        url: "/crisper.png", // fallback image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio",
    description: "A professional portfolio showcasing my work and experience.",
    images: ["/crisper.png"], // fallback image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
