import { MARQUEE_ITEMS } from "@/lib/products";

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // duplicate for seamless loop
  return (
    <div aria-label="Store highlights" className="group overflow-hidden border-y bg-esp py-3 text-beige">
      <ul className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <li key={i} className="flex items-center gap-10 whitespace-nowrap text-xs uppercase tracking-[0.25em]" aria-hidden={i >= MARQUEE_ITEMS.length}>
            {t}
            <span className="text-gold" aria-hidden>✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}