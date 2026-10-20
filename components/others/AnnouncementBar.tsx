"use client";
import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/products";

export default function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % CONFIG.announce.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-esp text-beige" role="region" aria-label="Announcements">
      <p
        key={i}
        aria-live="polite"
        className="wrap animate-in fade-in slide-in-from-bottom-2 py-2 text-center text-[11px] uppercase tracking-[0.25em] duration-500"
      >
        <span className="mr-2 text-gold" aria-hidden>✦</span>
        {CONFIG.announce[i]}
      </p>
    </div>
  );
}