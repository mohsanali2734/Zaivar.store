"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function ProductCard({ p }: { p: Product }) {
  const { wish, toggleWish, add } = useStore();
  const liked = wish.includes(p.id);
  const soldOut = p.stock <= 0;

  const discount =
    p.comparePrice && p.comparePrice > p.price
      ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)
      : 0;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-900/10 bg-[#FBF8F3] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="relative aspect-square w-full overflow-hidden bg-background">
  <Link href={`/product/${p.slug}`} aria-label={p.name} className="absolute inset-0 block h-full w-full">
    <Image
      src={p.image}
      alt={p.alt || p.name}
      fill
      priority
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className={cn(
        "h-full w-full object-cover object-center scale-125 transition-transform duration-700 ease-out group-hover:scale-150",
        soldOut && "grayscale"
      )}
    />
  </Link>

  {/* Tags / Badges - Positioned on top of image using z-20 */}
  <div className="absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5 pointer-events-none">
    {p.tag && (
      <span className="inline-flex items-center rounded-full bg-[#523B23] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
        {p.tag}
      </span>
    )}
    {discount > 0 && !soldOut && (
      <span className="inline-flex items-center rounded-full bg-[#E6004C] px-2.5 py-0.5 text-[11px] font-extrabold text-white shadow-md">
        -{discount}%
      </span>
    )}
  </div>

  {/* Wishlist Heart Button - Positioned on top right using z-20 */}
  <button
    type="button"
    aria-pressed={liked}
    aria-label={liked ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
    onClick={() => toggleWish(p.id)}
    className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full bg-white text-slate-800 shadow-md transition-transform hover:scale-110 active:scale-90"
  >
    <Heart
      className={cn(
        "size-4.5 transition-colors duration-200",
        liked ? "fill-rose-500 text-rose-500" : "text-slate-700"
      )}
    />
  </button>

  {/* Sold Out Overlay */}
  {soldOut && (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none">
      <span className="rounded-md bg-black/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
        Sold Out
      </span>
    </div>
  )}
</div>

        {/* ===== Bottom Clean Content Area ===== */}
        <div className="p-4 pt-3">
          {/* Category */}
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#9E733B]">
            {p.cat}
          </p>

          {/* Title */}
          <h3 className="mt-1 font-serif text-lg font-bold text-[#2A1E17] transition-colors group-hover:text-[#9E733B]">
            <Link href={`/product/${p.slug}`}>{p.name}</Link>
          </h3>

          {/* Rating */}
          <div className="mt-1.5 flex items-center gap-1.5 text-xs">
            <Star className="size-4 fill-amber-500 text-amber-500" />
            <span className="font-extrabold text-slate-900">{p.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-medium">({p.reviews})</span>
          </div>

          {/* Price */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-[#2A1E17]">
              {formatPrice(p.price)}
            </span>
            {p.comparePrice && (
              <s className="text-xs text-slate-400 font-medium">{formatPrice(p.comparePrice)}</s>
            )}
          </div>
        </div>
      </div>

      {/* ===== Bottom Add To Cart Button ===== */}
      <div className="px-4 pb-4">
        <Button
          type="button"
          disabled={soldOut}
          onClick={() => add(p.id)}
          className="w-full rounded-xl bg-[#9E733B] py-3 text-xs font-bold uppercase tracking-widest text-white shadow-xs transition-colors hover:bg-[#855E2E] disabled:bg-slate-300"
        >
          <ShoppingBag className="mr-2 size-4" />
          {soldOut ? "Sold Out" : "Add To Cart"}
        </Button>
      </div>
    </article>
  );
}