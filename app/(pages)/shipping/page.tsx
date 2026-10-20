import type { Metadata } from "next";
import InfoLayout, { Block } from "@/components/about/InfoLayout";
import { CONFIG, formatPrice } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shipping & Delivery in Pakistan",
  description: "ZAIVAR delivers across Pakistan in 2 to 6 working days. Free shipping over Rs. 3,000 and cash on delivery available.",
  alternates: { canonical: "/shipping" },
};

const RATES = [
  { zone: "Lahore, Karachi, Islamabad, Rawalpindi", time: "2 to 4 working days" },
  { zone: "Other major cities", time: "3 to 5 working days" },
  { zone: "Towns and remote areas", time: "4 to 6 working days" },
];

export default function ShippingPage() {
  return (
    <InfoLayout title="Shipping" intro="Tracked delivery to your door anywhere in Pakistan, with cash on delivery.">
      <Block title="Delivery times">
        <div className="overflow-x-auto border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-foreground">
              <tr><th className="p-3 font-semibold">Area</th><th className="p-3 font-semibold">Estimated time</th></tr>
            </thead>
            <tbody className="divide-y">
              {RATES.map((r) => (
                <tr key={r.zone}><td className="p-3">{r.zone}</td><td className="p-3">{r.time}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm">Orders placed before 2 PM are dispatched the same working day.</p>
      </Block>

      <Block title="Shipping cost" delay={80}>
        <ul className="list-disc space-y-1 pl-5">
          <li>Free on orders over <strong className="text-foreground">{formatPrice(CONFIG.freeShipping)}</strong>.</li>
          <li>A flat <strong className="text-foreground">{formatPrice(CONFIG.shippingFee)}</strong> on smaller orders.</li>
        </ul>
      </Block>

      <Block title="Payment on delivery" delay={120}>
        <p>Pay the rider in cash when your parcel arrives. Please keep the exact amount ready and check the parcel before the rider leaves.</p>
      </Block>

      <Block title="Tracking your order" delay={160}>
        <p>We message your tracking number on WhatsApp or SMS as soon as your order is dispatched. If you have not heard from us within 48 hours, email {CONFIG.email}.</p>
      </Block>
    </InfoLayout>
  );
}