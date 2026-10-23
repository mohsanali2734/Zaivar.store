import type { Metadata } from "next";
import ShopClient from "@/components/products/ShopClient";

type SP = { cat?: string; tag?: string; q?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const s = await searchParams;
  
  let label = "All Jewellery";
  if (s.tag) {
    label = s.tag;
  } else if (s.cat) {
    label = s.cat;
  } else if (s.q) {
    label = `Search: "${s.q}"`;
  }

  const title = `${label}  `;
  const description = `Browse ${label.toLowerCase()} from : anti-tarnish artificial jewellery with cash on delivery across Pakistan.`;

  let canonicalPath = "/shop";
  const queryParams = new URLSearchParams();

  if (s.cat) queryParams.set("cat", s.cat);
  if (s.tag) queryParams.set("tag", s.tag);

  if (queryParams.toString()) {
    canonicalPath = `/shop?${queryParams.toString()}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
  
  };
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<SP> }) {
  const s = await searchParams;
  return (
    <ShopClient
      key={`${s.cat ?? ""}|${s.tag ?? ""}|${s.q ?? ""}`}
      cat={s.cat}
      tag={s.tag}
      q={s.q}
    />
  );
}