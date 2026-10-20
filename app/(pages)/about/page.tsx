import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { STORY, TRUST_POINTS } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us | Our Story",
  description: STORY.text,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-esp py-20 text-beige md:py-28">
        <div className="wrap grid items-center gap-14 md:grid-cols-2">
          <Reveal from="left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{STORY.eyebrow}</p>
            <h1 className="text-beige">{STORY.title}</h1>
            <p className="mt-6 max-w-lg text-beige/75">{STORY.text}</p>
            <ul className="mt-8 space-y-2">
              {STORY.points.map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-sm"><span className="text-gold" aria-hidden>✦</span>{pt}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right" className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={STORY.image} alt={STORY.imageAlt} fill priority sizes="(min-width:768px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden size-40 overflow-hidden border-4 border-esp animate-float sm:block">
              <Image src={STORY.secondImage} alt={STORY.secondImageAlt} fill sizes="160px" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap">
          <h2 className="text-center">Why people choose us</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((t, i) => (
              <li key={t.title}>
                <Reveal delay={i * 100} className="h-full border p-6 text-center transition-all hover:-translate-y-1 hover:border-primary">
                  <span aria-hidden className="text-2xl text-primary">{t.icon}</span>
                  <h3 className="mt-3 !font-sans text-sm font-semibold uppercase tracking-wider">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-xs uppercase tracking-widest")}>Shop the collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}