import type { MetadataRoute } from "next";
import { SITE } from "@/lib/products";

const BASE = SITE.url.replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/wishlist", "/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}