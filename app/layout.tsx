import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/constants";

export const viewport: Viewport = {
  themeColor: "#040506",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
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

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "Sameer Shahid Siddiqui | Frontend Developer Portfolio";
const siteDescription =
  "Official portfolio of Sameer Shahid Siddiqui — Frontend Developer specializing in React, Next.js, TypeScript, and AI-assisted development. Explore projects, interactive UI work, and technical skills.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: "%s | Sameer Shahid Siddiqui",
  },
  description: siteDescription,
  applicationName: "Sameer Shahid Siddiqui Portfolio",
  authors: [
    {
      name: "Sameer Shahid Siddiqui",
      url: "https://linkedin.com/in/sameershahidsiddiqui/",
    },
  ],
  generator: "Next.js",
  keywords: [
    "Sameer Shahid Siddiqui",
    "Sameer Shahid Siddiqui portfolio",
    "Sameer Shahid Siddiqui frontend developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Web Developer Lucknow",
    "AI-Assisted Development",
    "Software Engineer",
    "Frontend Engineer Portfolio",
  ],
  creator: "Sameer Shahid Siddiqui",
  publisher: "Sameer Shahid Siddiqui",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: "Sameer Shahid Siddiqui - Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@sameershahid",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Sameer Shahid Siddiqui",
      alternateName: ["Sameer Siddiqui", "Sameer S. Siddiqui"],
      jobTitle: "Frontend Developer",
      description: siteDescription,
      url: SITE_URL,
      image: `${SITE_URL}/about/about-card.webp`,
      email: "mailto:sameershahidsiddiqui365@gmail.com",
      telephone: "+919335847773",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/sam-eer31",
        "https://linkedin.com/in/sameershahidsiddiqui/",
      ],
      knowsAbout: [
        "Frontend Development",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "AI-Assisted Development",
        "Web Development",
        "User Interface Design",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Babu Banarasi Das University",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sameer Shahid Siddiqui | Frontend Developer Portfolio",
      description: siteDescription,
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Sameer Shahid Siddiqui - Portfolio",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
      description: siteDescription,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-16">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${instrumentSerif.variable} ${caveat.variable} font-sans min-h-screen flex flex-col antialiased`}
      >
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-semibold focus:rounded-md focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
