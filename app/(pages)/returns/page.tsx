import type { Metadata } from "next";
import InfoLayout, { Block } from "@/components/about/InfoLayout";
import { CONFIG } from "@/lib/products";

export const metadata: Metadata = {
  title: "Returns & Exchange Policy",
  description: "Return or exchange unworn ZAIVAR jewellery within 7 days of delivery. Simple steps, no stress.",
  alternates: { canonical: "/returns" },
};

const STEPS = [
  { t: "Contact us", d: `Email ${CONFIG.email} within 7 days of delivery with your order number and photos.` },
  { t: "We confirm", d: "Our team replies within 24 hours and arranges a pickup or tells you where to send it." },
  { t: "Get your fix", d: "Choose an exchange or a refund. Refunds are processed within 5 to 7 working days." },
];

export default function ReturnsPage() {
  return (
    <InfoLayout title="Returns & Exchange" intro="Changed your mind or got the wrong size? You have 7 days.">
      <Block title="How it works">
        <ol className="space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">{i + 1}</span>
              <div>
                <p className="font-medium text-foreground">{s.t}</p>
                <p className="text-sm">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="What can be returned" delay={80}>
        <ul className="list-disc space-y-1 pl-5">
          <li>Unworn items in original packaging with all tags.</li>
          <li>Items that arrived damaged or different from your order (we cover the return shipping).</li>
        </ul>
      </Block>

      <Block title="What cannot be returned" delay={120}>
        <ul className="list-disc space-y-1 pl-5">
          <li>Earrings, for hygiene reasons, unless damaged on arrival.</li>
          <li>Items that were worn, altered or exposed to perfume or water.</li>
          <li>Sale items marked as final sale.</li>
        </ul>
      </Block>
    </InfoLayout>
  );
}