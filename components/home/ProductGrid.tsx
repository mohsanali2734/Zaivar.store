import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/products";

export default function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-amber-900/20 bg-[#FAF7F2]/60 p-8 text-center">
        <p className="font-serif text-2xl font-bold text-slate-800">No products match these filters.</p>
        <p className="mt-1 text-xs text-slate-500">Try removing a filter or searching for a different keyword.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <li key={p.id} className="h-full list-none">
          <Reveal delay={(i % 3) * 80}>
            <ProductCard p={p} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}