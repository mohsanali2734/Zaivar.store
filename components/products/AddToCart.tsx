"use client";
import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function AddToCart({ id, stock }: { id: string; stock: number }) {
  const { add, wish, toggleWish } = useStore();
  const [n, setN] = useState(1);
  const liked = wish.includes(id);
  const out = stock <= 0;

  return (
    <div className="space-y-4">
      {!out && (
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">Qty</span>
          <div className="flex items-center border">
            <Button variant="ghost" size="icon" aria-label="Decrease quantity" disabled={n <= 1} onClick={() => setN((x) => Math.max(1, x - 1))}><Minus className="size-4" /></Button>
            <span className="w-10 text-center" aria-live="polite">{n}</span>
            <Button variant="ghost" size="icon" aria-label="Increase quantity" disabled={n >= stock} onClick={() => setN((x) => Math.min(stock, x + 1))}><Plus className="size-4" /></Button>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <Button size="lg" disabled={out} onClick={() => add(id, n)} className="h-14 flex-1 text-xs uppercase tracking-widest transition-transform active:scale-[0.98]">
          {out ? "Sold out" : "Add to bag"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          aria-pressed={liked}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWish(id)}
          className="size-14 p-0"
        >
          <Heart key={String(liked)} className={cn("size-5 animate-in zoom-in duration-300", liked && "fill-primary text-primary")} />
        </Button>
      </div>
    </div>
  );
}