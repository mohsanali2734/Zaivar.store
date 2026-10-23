import type { Metadata, Viewport } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
// import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import { StoreProvider } from "@/lib/store";
import AnnouncementBar from "@/components/others/AnnouncementBar";
import SiteHeader from "@/components/others/SiteHeader";
import SiteFooter from "@/components/others/SiteFooter";
import CartDrawer from "@/components/others/CartDrawer";
import { SITE } from "@/lib/products";

const LOGO_PATH = "/img/logo.png";
const OG_IMAGE_PATH = LOGO_PATH;

const SOCIAL_LINKS = [
  "https://www.instagram.com/zaivar.info/",
  "https://www.tiktok.com/@zaivarstore",
  "https://www.facebook.com/profile.php?id=61595752559876",
  "https://x.com/zaivarstore",
];

const CONTACT_EMAIL = "zaivar.info@gmail.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },

  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,

  verification: {
    google: "M7Yk5A8cawcd4TGbzpzxU0eQ31NGGgKzbtuUqush7kk",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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

  alternates: {
    canonical: "/",
    languages: {
      "en-PK": "/",
      "en-US": "/",
      "x-default": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_PK",
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: OG_IMAGE_PATH,
        alt: `${SITE.name} logo`,
      },
    ],
  },

  twitter: {
    card: "summary",
    title: SITE.title,
    description: SITE.description,
    images: [OG_IMAGE_PATH],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: LOGO_PATH,
  },
};

export const viewport: Viewport = {
  themeColor: "#211711",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}${LOGO_PATH}`,
        },
        image: `${SITE.url}${LOGO_PATH}`,
        areaServed: "PK",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: CONTACT_EMAIL,
            areaServed: "PK",
            availableLanguage: ["English", "Urdu"],
          },
        ],
        sameAs: SOCIAL_LINKS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "en-PK",
      },
    ],
  };

  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html
      lang="en-PK"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${serif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>

      <body className="min-h-screen antialiased bg-background text-foreground">
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-100 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
          >
            Skip to content
          </a>

          <AnnouncementBar />
          <SiteHeader />

          <main id="main">{children}</main>

          <SiteFooter />
          <CartDrawer />
        </StoreProvider>

        {/* <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
      </body>
    </html>
  );
}