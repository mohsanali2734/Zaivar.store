/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, RotateCcw, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProductGrid from "@/components/home/ProductGrid";
import { PRODUCTS, Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type Sort = "featured" | "new" | "low" | "high";
type Facet = "c" | "t" | "f";
type State = { c: string; t: string; f: string; stock: boolean; q: string };

interface Props {
  cat?: string;
  tag?: string;
  q?: string;
}

const norm = (s?: string) => (s ?? "").trim().toLowerCase();
const uniq = (arr: (string | undefined)[]) => Array.from(new Set(arr.filter(Boolean))) as string[];

// Static option lists (products never change at runtime)
const CATEGORIES = uniq(PRODUCTS.map((p) => p.cat));
const TAGS = uniq(PRODUCTS.map((p) => p.tag));
const FINISHES = uniq(PRODUCTS.map((p) => p.finish as string | undefined));

// Match URL value (any case) to a real option
const resolve = (value: string, options: string[]) =>
  options.find((o) => norm(o) === norm(value)) ?? "";

// Does a product pass the filters? `skip` ignores one facet (used for live counts)
function matches(p: Product, s: State, skip?: Facet) {
  const x = p as Product & { subCat?: string; desc?: string };
  if (skip !== "c" && s.c && p.cat !== s.c) return false;
  if (skip !== "t" && s.t && p.tag !== s.t) return false;
  if (skip !== "f" && s.f && p.finish !== s.f) return false;
  if (s.stock && p.stock <= 0) return false;
  const needle = norm(s.q);
  if (needle) {
    const hay = `${p.name} ${p.cat} ${x.subCat ?? ""} ${p.tag ?? ""} ${p.finish ?? ""} ${p.colour} ${p.material} ${x.desc ?? ""}`.toLowerCase();
    if (!hay.includes(needle)) return false;
  }
  return true;
}

export default function ShopClient({ cat = "", tag = "", q: initialQ = "" }: Props) {
  const [c, setC] = useState(() => resolve(cat, CATEGORIES));
  const [t, setT] = useState(() => resolve(tag, TAGS));
  const [f, setF] = useState("");
  const [stock, setStock] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");
  const [q, setQ] = useState(initialQ);

  // Keep filters in sync when the URL (props) changes
  useEffect(() => {
    setC(resolve(cat, CATEGORIES));
    setT(resolve(tag, TAGS));
    setQ(initialQ);
  }, [cat, tag, initialQ]);

  const state: State = { c, t, f, stock, q };

  // Filtered products
  const items = useMemo(() => {
    const list = PRODUCTS.filter((p) => matches(p, { c, t, f, stock, q }));
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "new") return [...list].reverse();
    return list;
  }, [c, t, f, stock, sort, q]);

  // Live counts: how many results each chip would give with the OTHER filters applied
  const counts = useMemo(() => {
    const s: State = { c, t, f, stock, q };
    const tally = (facet: Facet, get: (p: Product) => string | undefined) => {
      const m = new Map<string, number>();
      PRODUCTS.forEach((p) => {
        const v = get(p);
        if (v && matches(p, s, facet)) m.set(v, (m.get(v) ?? 0) + 1);
      });
      return m;
    };
    return {
      c: tally("c", (p) => p.cat),
      t: tally("t", (p) => p.tag),
      f: tally("f", (p) => p.finish as string | undefined),
    };
  }, [c, t, f, stock, q]);

  const activeFilters = [
    { label: c, clear: () => setC("") },
    { label: t, clear: () => setT("") },
    { label: f, clear: () => setF("") },
    { label: stock ? "In Stock" : "", clear: () => setStock(false) },
    { label: q ? `"${q}"` : "", clear: () => setQ("") },
  ].filter((a) => a.label);
  const activeCount = activeFilters.length;

  const reset = () => {
    setC("");
    setT("");
    setF("");
    setStock(false);
    setQ("");
  };

  const chip = (label: string, count: number, active: boolean, onClick: () => void) => {
    const disabled = !active && count === 0;
    return (
      <Button
        key={label}
        type="button"
        size="sm"
        variant={active ? "default" : "outline"}
        aria-pressed={active}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "h-7 rounded-full px-2.5 text-[11px] font-medium transition-all duration-200 active:scale-95",
          active
            ? "bg-amber-900 text-amber-50 hover:bg-amber-800"
            : "border-slate-200 bg-white/70 text-slate-700 hover:border-amber-700/50 hover:bg-amber-50/50",
          disabled && "opacity-40"
        )}
      >
        {label}
        <span className={cn("ml-1 text-[10px]", active ? "text-amber-200" : "text-slate-400")}>
          {count}
        </span>
      </Button>
    );
  };

  const group = (title: string, content: React.ReactNode) => (
    <div className="rounded-xl border border-amber-900/10 bg-[#FAF7F2]/80 p-3">
      <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-950">{title}</h3>
      <div className="flex flex-wrap gap-1.5">{content}</div>
    </div>
  );

  const renderFilters = (idp: string) => (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <Label htmlFor={`${idp}-q`} className="sr-only">
          Search products
        </Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={`${idp}-q`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jewellery..."
            className="h-9 rounded-lg border-slate-200 bg-white/80 pl-8 pr-8 text-xs focus-visible:ring-amber-800/30"
          />
          {q && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQ("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {CATEGORIES.length > 0 &&
        group(
          "Category",
          CATEGORIES.map((x) => chip(x, counts.c.get(x) ?? 0, c === x, () => setC(c === x ? "" : x)))
        )}

      {TAGS.length > 0 &&
        group(
          "Collection",
          TAGS.map((x) => chip(x, counts.t.get(x) ?? 0, t === x, () => setT(t === x ? "" : x)))
        )}

      {FINISHES.length > 0 &&
        group(
          "Finish",
          FINISHES.map((x) => chip(x, counts.f.get(x) ?? 0, f === x, () => setF(f === x ? "" : x)))
        )}

      {/* Stock */}
      <div className="flex items-center justify-between rounded-xl border border-amber-900/10 bg-[#FAF7F2]/80 p-3">
        <Label htmlFor={`${idp}-stock`} className="cursor-pointer text-xs font-medium text-slate-700">
          In stock only
        </Label>
        <Checkbox
          id={`${idp}-stock`}
          checked={stock}
          onCheckedChange={(v) => setStock(v === true)}
          className="size-4 rounded border-amber-900/30 data-[state=checked]:bg-amber-900"
        />
      </div>

      {activeCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="h-8 w-full rounded-lg border-dashed border-amber-900/30 text-[11px] font-semibold uppercase tracking-wider text-amber-900 hover:bg-amber-100/50"
        >
          <RotateCcw className="mr-1.5 size-3" /> Clear ({activeCount})
        </Button>
      )}
    </div>
  );

  const title = t || c || "Jewellery Collection";

  return (
    <div className="wrap mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 border-b border-amber-900/10 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge
            variant="outline"
            className="mb-1.5 border-amber-900/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900"
          >
            ZAIVAR Collection
          </Badge>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{title}</h1>
          <p className="mt-0.5 text-[11px] uppercase tracking-widest text-slate-500" aria-live="polite">
            Showing <span className="font-semibold text-slate-900">{items.length}</span>{" "}
            {items.length === 1 ? "design" : "designs"}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Sheet>
            {/* If your shadcn uses Base UI instead of Radix, replace asChild with: render={<Button ... />} */}
            <SheetTrigger >
              <Button variant="outline" className="h-9 rounded-lg border-slate-200 text-xs lg:hidden">
                <Filter className="mr-1.5 size-3.5 text-amber-900" /> Filters
                {activeCount > 0 && (
                  <span className="ml-1.5 flex size-4 items-center justify-center rounded-full bg-amber-900 text-[9px] font-bold text-amber-50">
                    {activeCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] max-w-xs overflow-y-auto">
              <SheetHeader className="border-b border-amber-900/10 pb-3 text-left">
                <SheetTitle className="font-serif text-xl text-amber-950">Refine Selection</SheetTitle>
                <SheetDescription className="sr-only">Filter products</SheetDescription>
              </SheetHeader>
              <div className="mt-4 px-4 pb-6">{renderFilters("m")}</div>
            </SheetContent>
          </Sheet>

          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger
              className="h-9 w-[160px] rounded-lg border-slate-200 bg-white text-xs font-semibold uppercase tracking-wider text-slate-700"
              aria-label="Sort products"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="new">Newest</SelectItem>
              <SelectItem value="low">Price: Low to High</SelectItem>
              <SelectItem value="high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active chips */}
      {activeCount > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Active:</span>
          {activeFilters.map((a) => (
            <Badge
              key={a.label}
              variant="secondary"
              className="gap-1 rounded-full border border-amber-900/20 bg-amber-100/70 px-2.5 py-0.5 text-[11px] text-amber-950"
            >
              {a.label}
              <button type="button" aria-label={`Remove ${a.label}`} onClick={a.clear}>
                <X className="size-3 hover:text-amber-700" />
              </button>
            </Badge>
          ))}
          <Button
            variant="link"
            size="sm"
            onClick={reset}
            className="ml-1 h-auto p-0 text-[11px] font-semibold uppercase tracking-widest text-amber-900 underline-offset-4 hover:underline"
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl border border-amber-900/10 bg-[#FAF7F2]/60 p-4 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between border-b border-amber-900/10 pb-3">
              <h2 className="flex items-center gap-1.5 font-serif text-base font-bold text-amber-950">
                <SlidersHorizontal className="size-3.5 text-amber-900" /> Filters
              </h2>
              {activeCount > 0 && (
                <span className="flex size-4 items-center justify-center rounded-full bg-amber-900 text-[9px] font-bold text-amber-50">
                  {activeCount}
                </span>
              )}
            </div>
            {renderFilters("d")}
          </div>
        </aside>

        {/* Products */}
        <div>
          {items.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-amber-900/20 bg-[#FAF7F2]/40 p-8 text-center">
              <div className="mb-3 grid size-12 place-items-center rounded-full bg-amber-100 text-amber-900">
                <Sparkles className="size-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-800">Nothing sparkles here yet</h3>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                We couldn&apos;t find any pieces matching your current filters.
              </p>
              <Button
                onClick={reset}
                className="mt-5 h-9 rounded-lg bg-amber-900 px-6 text-[11px] font-semibold uppercase tracking-widest hover:bg-amber-800"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <ProductGrid items={items} />
          )}
        </div>
      </div>
    </div>
  );
}