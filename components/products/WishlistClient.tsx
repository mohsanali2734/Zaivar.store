// components/WishlistClient.tsx
"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import ProductGrid from "@/components/home/ProductGrid";
import { PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function WishlistClient() {
  const { wish } = useStore();
  const items = PRODUCTS.filter((p) => wish.includes(p.id));

  return (
    <div className="wrap py-12">
      <h1 className="mb-10">Your Wishlist</h1>
      {items.length ? (
        <ProductGrid items={items} />
      ) : (
        <div className="grid place-items-center gap-4 py-24 text-center">
          <Heart className="size-12 animate-float text-primary" strokeWidth={1.2} />
          <p className="font-serif text-3xl">Nothing saved yet</p>
          <p className="text-sm text-muted-foreground">Tap the heart on any piece to save it here.</p>
          <Link href="/shop" className={cn(buttonVariants(), "h-11 px-8 text-xs uppercase tracking-widest")}>Explore the shop</Link>
        </div>
      )}
    </div>
  );
}