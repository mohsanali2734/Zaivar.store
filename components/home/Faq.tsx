import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FAQS } from "@/lib/products";

export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-secondary/50 py-20">
      <div className="wrap max-w-3xl">
        <SectionHeading id="faq-title" eyebrow="Good to know" title="Frequently Asked Questions" align="center" />
        <div className="divide-y border-y">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  <h3 className="!font-sans text-base">{f.q}</h3>
                  <span aria-hidden className="text-2xl text-primary transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}