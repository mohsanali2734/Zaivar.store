import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/products";

export default function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="py-20">
      <div className="wrap">
        <SectionHeading id="reviews-title" eyebrow="Loved by you" title="Real Reviews, Real Sparkle" align="center" />
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="text-primary" role="img" aria-label={`${t.rating} out of 5 stars`}>
                    {"★".repeat(t.rating)}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed">“{t.text}”</blockquote>
                  <footer className="flex items-center gap-3">
                    <div className="relative size-10 overflow-hidden rounded-full">
                      <Image src={t.image} alt={`${t.name} from ${t.city}`} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.city}</p>
                    </div>
                  </footer>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}