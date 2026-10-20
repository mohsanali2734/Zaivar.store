import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { buttonVariants } from "@/components/ui/button";
import { STORY } from "@/lib/products";

export default function BrandStory() {
  return (
    <section aria-labelledby="story-title" className="bg-esp py-24 text-beige">
      <div className="wrap grid items-center gap-14 md:grid-cols-2">
        <Reveal from="left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{STORY.eyebrow}</p>
          <h2 id="story-title" className="!mb-6 text-beige">{STORY.title}</h2>
          <p className="max-w-lg text-beige/75">{STORY.text}</p>
          <ul className="my-8 space-y-2">
            {STORY.points.map((pt) => (
              <li key={pt} className="flex items-center gap-3 text-sm">
                <span className="text-gold" aria-hidden>✦</span> {pt}
              </li>
            ))}
          </ul>
          <Link href={STORY.cta.href} className={buttonVariants({ size: "lg" }) + " h-12 px-8 text-sm uppercase tracking-widest"}>
            {STORY.cta.label}
          </Link>
        </Reveal>

        <Reveal from="right" className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={STORY.image} alt={STORY.imageAlt} fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
          </div>
          <div className="absolute -bottom-8 -left-8 hidden size-40 overflow-hidden border-4 border-esp animate-float sm:block">
            <Image src={STORY.secondImage} alt={STORY.secondImageAlt} fill sizes="160px" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}