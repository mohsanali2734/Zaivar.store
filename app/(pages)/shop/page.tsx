import type { Metadata } from "next";
import ShopClient from "@/components/products/ShopClient";

type SP = { cat?: string; tag?: string; q?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const s = await searchParams;
  const label = s.tag || s.cat || "All Jewellery";
  return {
    title: `${label} | Shop Artificial Jewellery`,
    description: `Browse ${label.toLowerCase()} from ZAIVAR: anti-tarnish artificial jewellery with cash on delivery across Pakistan.`,
    alternates: { canonical: "/shop" },
  };
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<SP> }) {
  const s = await searchParams;
  return <ShopClient key={`${s.cat ?? ""}|${s.tag ?? ""}|${s.q ?? ""}`} cat={s.cat} tag={s.tag} q={s.q} />;
}