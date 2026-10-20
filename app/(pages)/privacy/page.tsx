import type { Metadata } from "next";
import InfoLayout, { Block } from "@/components/about/InfoLayout";
import { CONFIG, SITE } from "@/lib/products";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ZAIVAR collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoLayout title="Privacy Policy" intro="We only collect what we need to deliver your order." eyebrow="Legal">
      <Block title="What we collect">
        <p>Your name, phone number, delivery address and, optionally, your email. Your bag and wishlist are saved in your own browser and never leave your device.</p>
      </Block>
      <Block title="How we use it" delay={80}>
        <ul className="list-disc space-y-1 pl-5">
          <li>To confirm, pack and deliver your order.</li>
          <li>To message you about delivery and returns.</li>
          <li>To send offers, only if you subscribed to our newsletter.</li>
        </ul>
      </Block>
      <Block title="Sharing" delay={120}>
        <p>We share your name, phone and address with our courier partners only so they can deliver. We never sell your data.</p>
      </Block>
      <Block title="Your choices" delay={160}>
        <p>You can ask us to view, correct or delete your data at any time by emailing {CONFIG.email}. Unsubscribe from emails with the link in any message.</p>
      </Block>
      <p className="text-xs text-muted-foreground">Last updated {new Date().getFullYear()} · {SITE.name}</p>
    </InfoLayout>
  );
}