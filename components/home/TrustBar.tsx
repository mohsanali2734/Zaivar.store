import Reveal from "./Reveal";
import { TRUST_POINTS } from "@/lib/products";

export default function TrustBar() {
  return (
    <section aria-label="Why shop with ZAIVAR" className="border-y bg-secondary/50 py-10">
      <ul className="wrap grid grid-cols-2 gap-8 md:grid-cols-4">
        {TRUST_POINTS.map((t, i) => (
          <Reveal key={t.title} delay={i * 100}>
            <li className="group flex flex-col items-center text-center list-none">
              <span aria-hidden className="mb-3 grid size-12 place-items-center rounded-full border border-primary/50 text-xl text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:animate-wiggle">
                {t.icon}
              </span>
              <h3 className="!font-sans text-sm font-semibold uppercase tracking-wider">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}