import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CATEGORIES } from "@/lib/products";
import { cn } from "@/lib/utils";

type Category = {
  slug: string;
  name: string;
  image: string;
  alt?: string;
  blurb?: string;
};

export default function CategoryGrid() {
  return (
    <section aria-labelledby="cat-title" className="py-12 bg-background text-foreground">
      <div className=" mx-auto  px-6">
        <SectionHeading
          id="cat-title"
          eyebrow="Curated Collections"
          title="Shop by Category"
          subtitle="From everyday minimal studs to statement bridal masterpieces, find the perfect piece for every occasion."
        />

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {(CATEGORIES as unknown as Category[]).map((c, i) => {
            const isLarge = i === 0 || i === 3;
            const gridColClass = isLarge ? "lg:col-span-7" : "lg:col-span-5";

            return (
              <li key={c.slug} className={cn("list-none h-full", gridColClass)}>
                <Reveal delay={i * 100} from="scale" className="h-full w-full">
                  <Link
                    href={`/shop?cat=${encodeURIComponent(c.name)}`}
                    className="group relative flex h-[420px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl"
                    aria-label={`Explore ${c.name} collection`}
                  >
                    {/* Background Image Container */}
                    <div className="absolute inset-0 z-0 h-full w-full">
                      <Image
                        src={c.image}
                        alt={c.alt || c.name}
                        fill
                        priority={i < 2}
                        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-widest text-white/90 uppercase backdrop-blur-md">
                        Collection
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-20 p-6 md:p-8">
                      <h3 className="font-serif text-2xl font-bold tracking-tight text-white md:text-3xl">
                        {c.name}
                      </h3>

                      {c.blurb && (
                        <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/80">
                          {c.blurb}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          Explore Collection
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-base transition-transform duration-300 group-hover:translate-x-2"
                        >
                          →
                        </span>
                      </div>
                    </div>

                    {/* Golden Accent Line */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 z-20 h-1 w-0 bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-500 group-hover:w-full"
                    />
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}