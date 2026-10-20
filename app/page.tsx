import type { Metadata } from "next";
import HeroCampaign from "@/components/home/HeroCampaign";
import Marquee from "@/components/home/Marquee";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductGrid from "@/components/home/ProductGrid";
import SectionHeading from "@/components/home/SectionHeading";
import TrustBar from "@/components/home/TrustBar";
import BrandStory from "@/components/home/BrandStory";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import Newsletter from "@/components/home/Newsletter";
import { FAQS, PRODUCTS, SITE, getByTag } from "@/lib/products";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  keywords: SITE.keywords,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: [SITE.ogImage] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/logo.png`,
    },
    {
      "@type": "ItemList",
      name: "Bestselling artificial jewellery",
      itemListElement: PRODUCTS.slice(0, 3).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          image: `${SITE.url}${p.image}`,
          category: p.cat,
          material: p.material,
          url: `${SITE.url}/product/${p.slug}`,
          aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
          offers: { "@type": "Offer", priceCurrency: SITE.currency, price: p.price, availability: "https://schema.org/InStock" },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroCampaign />
      <Marquee />
      <CategoryGrid />

      {/* Bestsellers Section (Limited to 3 cards) */}
      <section aria-labelledby="best-title" className="pb-20">
        <div className="wrap">
          <SectionHeading id="best-title" eyebrow="Most loved" title="Bestsellers" subtitle="The pieces everyone keeps adding to their wishlist." />
          <ProductGrid items={getByTag("Bestseller").slice(0, 3)} />
        </div>
      </section>

      <TrustBar />
      <BrandStory />

      {/* New Arrivals Section (Limited to 3 cards) */}
      <section aria-labelledby="new-title" className="py-20">
        <div className="wrap">
          <SectionHeading id="new-title" eyebrow="Just dropped" title="New Arrivals" subtitle="Fresh designs for this festive season." />
          <ProductGrid items={getByTag("New").slice(0, 3)} />
        </div>
      </section>

      <Testimonials />
      <Faq />
      <Newsletter />
    </>
  );
}