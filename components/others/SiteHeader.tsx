"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV, SITE } from "@/lib/products";
import { useStore } from "@/lib/store";

/* --- Count Badge Component using Shadcn Primary tokens --- */
function CountBadge({ n }: { n: number }) {
  if (!n) return null;
  return (
    <span
      key={n}
      className="absolute -right-1 -top-1 grid size-4.5 animate-in zoom-in place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-xs duration-300"
    >
      {n}
    </span>
  );
}

/* --- Main Site Header Component --- */
export default function SiteHeader() {
  const { count, wish, setOpen } = useStore();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [searching, setSearching] = useState(false);

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") || "").trim();
    setSearching(false);
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 text-foreground backdrop-blur-md">
      <div className="bg-primary/95 px-4 py-1.5 text-center text-[11px] font-medium tracking-widest text-primary-foreground uppercase">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="size-3 shrink-0 text-primary-foreground/80" />
          Complimentary Luxury Gift Box On All Orders
          <Sparkles className="hidden size-3 shrink-0 text-primary-foreground/80 sm:inline-block" />
        </span>
      </div>

      <div className="mx-auto flex h-20 items-center justify-between gap-6 px-4 md:px-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-90"
            aria-label={`${SITE?.name || "ZAIVAR JEWELLERY"} home`}
          >
            <Image
              src="/img/logo.png"
              alt="ZAIVAR JEWELLERY Logo"
              width={180}
              height={45}
              className="h-8 md:h-11 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center Section: Primary Desktop Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7 xl:gap-9">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="group relative text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Right Section: Actions + Mobile Menu Button on Far Right */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search products"
            aria-expanded={searching}
            onClick={() => setSearching((s) => !s)}
            className="text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {searching ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>

          {/* Wishlist Link (a single <a> styled as a button, no nested interactive elements) */}
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={<Link href="/wishlist" aria-label={`Wishlist, ${wish.length} items`} />}
            className="relative text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Heart className="size-5" />
            <CountBadge n={wish.length} />
          </Button>

          {/* Shopping Bag Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label={`Open shopping bag, ${count} items`}
            onClick={() => setOpen(true)}
          >
            <ShoppingBag className="size-5" />
            <CountBadge n={count} />
          </Button>

          {/* Mobile Navigation Drawer Toggle (Positioned at Far Right) */}
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-foreground hover:bg-accent hover:text-accent-foreground"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[85%] max-w-xs border-l border-border bg-card text-card-foreground">
              <SheetHeader className="border-b border-border pb-4 text-left">
                <SheetTitle>
                  <Link href="/" onClick={() => setMenu(false)} className="inline-block">
                    <Image
                      src="/img/logo.png"
                      alt="ZAIVAR JEWELLERY Logo"
                      width={160}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Drawer Menu Links */}
              <nav aria-label="Mobile Navigation" className="mt-6 flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <Link
                    key={n.label}
                    href={n.href}
                    onClick={() => setMenu(false)}
                    style={{ animationDelay: `${i * 60}ms` }}
                    className="animate-in fade-in slide-in-from-right-4 rounded-lg px-3 py-3 font-serif text-base font-semibold tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground text-left"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searching && (
        <form
          onSubmit={onSearch}
          role="search"
          className="animate-in fade-in slide-in-from-top-2 border-t border-border bg-background duration-200"
        >
          <div className="container mx-auto flex items-center gap-3 px-4 py-3 md:px-8">
            <Search className="size-4.5 text-muted-foreground shrink-0" />
            <label htmlFor="header-search-input" className="sr-only">
              Search jewellery
            </label>
            <Input
              id="header-search-input"
              name="q"
              autoFocus
              placeholder="Search jhumka, kundan, gold studs..."
              className="h-10 border-0 bg-transparent text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              size="sm"
              className="rounded-lg bg-primary text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 px-6"
            >
              Search
            </Button>
          </div>
        </form>
      )}
    </header>
  );
}