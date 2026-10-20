import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { NEWSLETTER } from "@/lib/products";

const base =
  "inline-flex h-12 items-center justify-center gap-2 px-8 text-xs font-medium uppercase tracking-widest transition-colors";

export default function Newsletter() {
  return (
    <section aria-labelledby="nl-title" className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
      <div aria-hidden className="absolute -left-10 top-0 size-56 rounded-full bg-white/20 blur-3xl animate-float" />
      <div className="wrap relative text-center">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]">{NEWSLETTER.perk}</p>
          <h2 id="nl-title" className="!mb-3">{NEWSLETTER.title}</h2>
          <p className="mx-auto max-w-md opacity-80">{NEWSLETTER.text}</p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
            <Link href={NEWSLETTER.shopHref} className={`${base} bg-esp text-beige hover:bg-obs`}>
              {NEWSLETTER.shopLabel} <ArrowRight className="size-4" />
            </Link>
            <a
              href={NEWSLETTER.secondHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${base} border border-current hover:bg-white/10`}
            >
              <MessageCircle className="size-4" /> {NEWSLETTER.secondLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}