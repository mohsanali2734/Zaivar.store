import type { MetadataRoute } from "next";
import { PRODUCTS, SITE } from "@/lib/products";

const BASE = SITE.url.replace(/\/+$/, "");

const LAST_UPDATED = new Date("2026-10-23");

export default function sitemap(): MetadataRoute.Sitemap {
 
  const pages: {
    path: string;
    priority: number;
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/shop", priority: 0.9, changeFrequency: "daily" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
    { path: "/shipping", priority: 0.4, changeFrequency: "yearly" },
    { path: "/returns", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: LAST_UPDATED,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}