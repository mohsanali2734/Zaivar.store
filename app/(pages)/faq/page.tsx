import type { Metadata } from "next";
import InfoLayout from "@/components/about/InfoLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/products";

export const metadata: Metadata = {
  title: "FAQ: Artificial Jewellery Questions Answered",
  description: "Answers about anti-tarnish plating, cash on delivery, delivery times, returns and jewellery care at ZAIVAR.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <InfoLayout title="FAQ" intro="Quick answers to the things people ask us most.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Accordion className="border-t">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`q${i}`}>
            <AccordionTrigger className="py-5 text-left text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </InfoLayout>
  );
}