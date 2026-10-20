import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/products/AddToCart";
import ProductGallery from "@/components/products/ProductGallery";
import ProductGrid from "@/components/home/ProductGrid";
import Reveal from "@/components/home/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { CONFIG, PRODUCTS, SITE, TRUST_POINTS, formatPrice, getProductBySlug, getRelated } from "@/lib/products";

export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} | ${p.cat}`,
    description: p.desc,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: `${p.name} | ${SITE.name}`, description: p.desc, images: [{ url: p.image }], type: "website" },
    twitter: { card: "summary_large_image", title: p.name, description: p.desc, images: [p.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const discount = p.comparePrice ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100) : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: p.name,
        description: p.desc,
        image: [p.image, p.hoverImage].map((i) => `${SITE.url}${i}`),
        category: p.cat,
        material: p.material,
        color: p.colour,
        brand: { "@type": "Brand", name: SITE.name },
        sku: p.id,
        aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
        offers: {
          "@type": "Offer",
          url: `${SITE.url}/product/${p.slug}`,
          priceCurrency: SITE.currency,
          price: p.price,
          availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE.url}/shop` },
          { "@type": "ListItem", position: 3, name: p.name, item: `${SITE.url}/product/${p.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap py-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
            <li aria-hidden>/</li>
            <li><Link href={`/shop?cat=${encodeURIComponent(p.cat)}`} className="hover:text-primary">{p.cat}</Link></li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal from="left"><ProductGallery images={[p.image, p.hoverImage]} alt={p.alt} /></Reveal>

          <Reveal from="right" className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 flex items-center gap-2">
              {p.tag && <Badge className="rounded-none text-[10px] uppercase tracking-widest">{p.tag}</Badge>}
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.cat}</span>
            </div>
            <h1>{p.name}</h1>

            <p className="mt-3 flex items-center gap-2 text-sm" aria-label={`Rated ${p.rating} out of 5 from ${p.reviews} reviews`}>
              <span className="text-primary">{"★".repeat(Math.round(p.rating))}</span>
              <span className="text-muted-foreground">{p.rating.toFixed(1)} ({p.reviews} reviews)</span>
            </p>

            <p className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="font-serif text-4xl">{formatPrice(p.price)}</span>
              {p.comparePrice && <s className="text-muted-foreground">{formatPrice(p.comparePrice)}</s>}
              {discount > 0 && <Badge variant="secondary" className="rounded-none font-bold">Save {discount}%</Badge>}
            </p>

            <p className="mt-6 max-w-lg text-muted-foreground">{p.desc}</p>

            <dl className="mt-6 grid max-w-sm grid-cols-2 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Finish</dt><dd>{p.finish}</dd>
              <dt className="text-muted-foreground">Colour</dt><dd>{p.colour}</dd>
              <dt className="text-muted-foreground">Material</dt><dd>{p.material}</dd>
              <dt className="text-muted-foreground">Availability</dt>
              <dd className={p.stock === 0 ? "text-destructive" : p.stock <= 5 ? "animate-pulse font-medium text-primary" : ""}>
                {p.stock === 0 ? "Sold out" : p.stock <= 5 ? `Only ${p.stock} left` : "In stock"}
              </dd>
            </dl>

            <div className="mt-8 max-w-md"><AddToCart id={p.id} stock={p.stock} /></div>

            <ul className="mt-8 grid max-w-md grid-cols-2 gap-3 border-y py-5 text-xs">
              {TRUST_POINTS.map((t) => (
                <li key={t.title} className="flex items-center gap-2"><span className="text-primary" aria-hidden>{t.icon}</span>{t.title}</li>
              ))}
            </ul>

            <div className="mt-2 max-w-md divide-y">
              <details className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-medium [&::-webkit-details-marker]:hidden">
                  Material &amp; care
                  <span aria-hidden className="text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
                </summary>
                <p className="pb-4 text-sm text-muted-foreground">Made from {p.material.toLowerCase()} with anti-tarnish plating. Keep dry, avoid perfume and water, and store in the pouch provided.</p>
              </details>
              <details className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-medium [&::-webkit-details-marker]:hidden">
                  Shipping &amp; returns
                  <span aria-hidden className="text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
                </summary>
                <p className="pb-4 text-sm text-muted-foreground">Free shipping over {formatPrice(CONFIG.freeShipping)}, otherwise {formatPrice(CONFIG.shippingFee)}. Cash on delivery available. Returns within 7 days.</p>
              </details>
            </div>
          </Reveal>
        </div>

        <section aria-labelledby="rel-title" className="pt-24">
          <SectionHeading id="rel-title" eyebrow="You may also like" title="Related Pieces" />
          <ProductGrid items={getRelated(p)} />
        </section>
      </div>
    </>
  );
}