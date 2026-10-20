import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import AnnouncementBar from "@/components/others/AnnouncementBar";
import SiteHeader from "@/components/others/SiteHeader";
import SiteFooter from "@/components/others/SiteFooter";
import CartDrawer from "@/components/others/CartDrawer";
import { SITE } from "@/lib/products";

const geistSans = Geist({ 
  variable: "--font-geist-sans", 
  subsets: ["latin"], 
  display: "swap" 
});

const geistMono = Geist_Mono({ 
  variable: "--font-geist-mono", 
  subsets: ["latin"], 
  display: "swap" 
});

const serif = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600"], 
  style: ["normal", "italic"], 
  variable: "--serif",
  display: "swap" 
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { 
    default: SITE.title, 
    template: `%s | ${SITE.name}` 
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Crochet Patterns",
    "Digital Amigurumi Patterns",
    "PDF Crochet Guides",
    "Craft Patterns",
    "Plushie Crochet",
    "DIY Crochet Projects"
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} Banner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [`${SITE.url}/og-image.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#211711",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/organization`,
        "name": SITE.name,
        "url": SITE.url,
        "logo": `${SITE.url}/logo.png`,
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/website`,
        "url": SITE.url,
        "name": SITE.name,
        "description": SITE.description,
        "publisher": {
          "@id": `${SITE.url}/#organization`
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased bg-background text-foreground" suppressHydrationWarning>
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}