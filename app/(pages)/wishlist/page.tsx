// app/wishlist/page.tsx
import type { Metadata } from "next";
import WishlistClient from "@/components/products/WishlistClient";

export const metadata: Metadata = { title: "Your Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return <WishlistClient />;
}