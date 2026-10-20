"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function ProductCard({ p }: { p: Product }) {
  const { wish, toggleWish, add } = useStore();
  const liked = wish.includes(p.id);
  const soldOut = p.stock <= 0;
  const discount = p.comparePrice ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100) : 0;

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden border bg-secondary">
        <Link href={`/product/${p.slug}`} aria-label={p.name} className="absolute inset-0">
          <Image src={p.image} alt={p.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className={cn("object-cover transition-opacity duration-500 group-hover:opacity-0", soldOut && "grayscale")} />
          <Image src={p.hoverImage} alt="" aria-hidden fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1">
          {p.tag && <Badge className={cn("rounded-none text-[10px] uppercase tracking-widest", p.tag === "Sale" && "bg-destructive text-destructive-foreground")}>{p.tag}</Badge>}
          {discount > 0 && <Badge variant="secondary" className="rounded-none text-[10px] font-bold">-{discount}%</Badge>}
        </div>

        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          onClick={() => toggleWish(p.id)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90 shadow transition-transform hover:scale-110 active:scale-90"
        >
          <Heart key={String(liked)} className={cn("size-4 animate-in zoom-in duration-300", liked ? "fill-primary text-primary" : "text-foreground")} />
        </button>

        <Button
          type="button"
          disabled={soldOut}
          onClick={() => add(p.id)}
          className="absolute inset-x-3 bottom-3 translate-y-4 text-xs uppercase tracking-widest opacity-0 transition-all duration-300 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
        >
          {soldOut ? "Sold out" : "Quick add"}
        </Button>
      </div>

      <div className="pt-4">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.cat}</p>
        <h3 className="mt-1 !font-sans text-base font-medium">
          <Link href={`/product/${p.slug}`} className="hover:text-primary">{p.name}</Link>
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground" aria-label={`Rated ${p.rating} out of 5 from ${p.reviews} reviews`}>
          <span className="text-primary">★</span> {p.rating.toFixed(1)} <span>({p.reviews})</span>
        </div>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{formatPrice(p.price)}</span>
          {p.comparePrice && <s className="text-sm text-muted-foreground">{formatPrice(p.comparePrice)}</s>}
        </p>
      </div>
    </article>
  );
}