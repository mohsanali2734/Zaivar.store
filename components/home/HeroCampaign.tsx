import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO, HERO_STATS, PRODUCTS, formatPrice } from "@/lib/products";

const SPARKS = [
  "top-[8%] left-[6%]",
  "top-[20%] right-[8%]",
  "bottom-[30%] left-[2%]",
  "bottom-[10%] right-[14%]",
  "top-[48%] right-[2%]",
];

export default function HeroCampaign() {
  const featured = PRODUCTS.find((p) => p.slug === HERO.floatingProduct);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-secondary/60">
      {/* Background Glow Blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float [animation-delay:2s]" />

      {/* Golden Sparks using Lucide Icon */}
      {SPARKS.map((pos, i) => (
        <div 
          key={i} 
          className={cn("absolute pointer-events-none text-amber-400 animate-twinkle", pos)} 
          style={{ animationDelay: `${i * 0.5}s` }}
        >
          <Sparkles className="size-5 fill-amber-400/30" />
        </div>
      ))}

      <div className="wrap grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        {/* Copy Column */}
        <div>
          <Badge variant="outline" className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 border-primary/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-primary">
            {HERO.eyebrow}
          </Badge>

          <h1 id="hero-title" className="animate-in fade-in slide-in-from-bottom-6 duration-1000 [animation-delay:150ms] fill-mode-both">
            {HERO.title} <span className="text-gold-shine italic">{HERO.highlight}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-1000 [animation-delay:300ms] fill-mode-both">
            {HERO.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-6 duration-1000 [animation-delay:450ms] fill-mode-both">
            <Link href={HERO.primaryCta.href} className={cn(buttonVariants({ size: "lg" }), "group h-12 px-8 text-sm uppercase tracking-widest")}>
              {HERO.primaryCta.label}
              <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href={HERO.secondaryCta.href} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-8 text-sm uppercase tracking-widest")}>
              {HERO.secondaryCta.label}
            </Link>
          </div>

          <dl className="mt-10 flex gap-8 animate-in fade-in duration-1000 [animation-delay:700ms] fill-mode-both">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-3xl text-foreground">{s.value}</dd>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual Column */}
        <div className="relative mx-auto w-full max-w-md animate-in fade-in zoom-in-95 duration-1000 [animation-delay:300ms] fill-mode-both">
          {/* Main Clean Image Frame */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-primary/30 shadow-2xl">
            <Image 
              src={HERO.image} 
              alt={HERO.imageAlt} 
              fill 
              priority 
              sizes="(min-width:768px) 40vw, 90vw" 
              className="object-cover" 
            />
          </div>

          {/* Rotating Sticker */}
          <div className="absolute -right-4 -top-4 grid size-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl animate-spin-slow z-10">
            <span className="text-center text-[11px] font-bold uppercase leading-tight tracking-widest">{HERO.sticker}</span>
          </div>

          {/* Floating Product Card */}
          {featured && (
            <Link href={`/product/${featured.slug}`} className="absolute -bottom-6 -left-6 z-10 flex items-center gap-3 rounded-md border bg-card/95 p-3 shadow-xl backdrop-blur animate-float transition-transform hover:scale-105">
              <div className="relative size-14 overflow-hidden rounded">
                <Image src={featured.image} alt={featured.alt} fill sizes="56px" className="object-cover" />
              </div>
              <div className="pr-2">
                <p className="text-sm font-medium">{featured.name}</p>
                <p className="text-xs text-primary">{formatPrice(featured.price)}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}