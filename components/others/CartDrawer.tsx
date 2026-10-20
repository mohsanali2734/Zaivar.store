"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { byId, CONFIG, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { cart, open, setOpen, change, remove, subtotal, shipping, total, count } = useStore();
  const rows = Object.entries(cart).flatMap(([id, q]) => {
    const p = byId(id);
    return p ? [{ p, q }] : [];
  });
  const remaining = Math.max(0, CONFIG.freeShipping - subtotal);
  const progress = Math.min(100, (subtotal / CONFIG.freeShipping) * 100);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="font-serif text-2xl">Your Bag ({count})</SheetTitle>
          <SheetDescription className="sr-only">Items in your shopping bag</SheetDescription>

          {rows.length > 0 && (
            <div className="pt-2">
              <p className="mb-2 text-xs text-muted-foreground">
                {remaining > 0
                  ? <>Add <strong className="text-foreground">{formatPrice(remaining)}</strong> more for free shipping</>
                  : <strong className="text-primary">You unlocked free shipping ✦</strong>}
              </p>
              <div className="h-1.5 w-full overflow-hidden bg-secondary" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to free shipping">
                <div className="h-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {rows.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="size-12 animate-float text-primary" strokeWidth={1.2} />
              <p className="font-serif text-2xl">Your bag is empty</p>
              <p className="text-sm text-muted-foreground">Your next favourite piece is waiting.</p>
              <Link href="/shop" onClick={() => setOpen(false)} className={cn(buttonVariants(), "h-11 px-8 text-xs uppercase tracking-widest")}>
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y">
              {rows.map(({ p, q }) => (
                <li key={p.id} className="animate-in fade-in slide-in-from-right-4 flex gap-4 py-5 duration-300">
                  <Link href={`/product/${p.slug}`} onClick={() => setOpen(false)} className="relative size-24 shrink-0 overflow-hidden border bg-secondary">
                    <Image src={p.image} alt={p.alt} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/product/${p.slug}`} onClick={() => setOpen(false)} className="text-sm font-medium hover:text-primary">{p.name}</Link>
                    <p className="text-xs text-muted-foreground">{p.finish} · {p.colour}</p>
                    <p className="mt-1 text-sm font-semibold">{formatPrice(p.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border">
                        <Button variant="ghost" size="icon" className="size-8" aria-label={`Decrease ${p.name}`} onClick={() => change(p.id, -1)}><Minus className="size-3" /></Button>
                        <span className="w-8 text-center text-sm" aria-live="polite">{q}</span>
                        <Button variant="ghost" size="icon" className="size-8" aria-label={`Increase ${p.name}`} disabled={q >= p.stock} onClick={() => change(p.id, 1)}><Plus className="size-3" /></Button>
                      </div>
                      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" aria-label={`Remove ${p.name}`} onClick={() => remove(p.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {rows.length > 0 && (
          <div className="space-y-3 border-t bg-secondary/40 p-6">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
            <Separator />
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
            <Link href="/checkout" onClick={() => setOpen(false)} className={cn(buttonVariants({ size: "lg" }), "h-12 w-full text-xs uppercase tracking-widest")}>
              Checkout
            </Link>
            <button onClick={() => setOpen(false)} className="w-full text-center text-xs uppercase tracking-widest text-muted-foreground underline-offset-4 hover:underline">
              Continue shopping
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}