"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
      <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show image ${idx + 1}`}
            aria-pressed={i === idx}
            className={cn("relative size-20 overflow-hidden border-2 transition-all", i === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100")}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="group relative order-1 aspect-square overflow-hidden border bg-secondary sm:order-2">
        <Image key={images[i]} src={images[i]} alt={alt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="animate-in fade-in object-cover duration-500 group-hover:scale-110 group-hover:duration-[1200ms]" />
      </div>
    </div>
  );
}