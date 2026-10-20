import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/home/Reveal";
import { INFO_PAGES } from "@/lib/products";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(INFO_PAGES).map((page) => ({ page }));

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const d = INFO_PAGES[page];
  return d ? { title: d.title, description: d.intro, alternates: { canonical: `/${page}` } } : {};
}

export default async function InfoPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const d = INFO_PAGES[page];
  if (!d) notFound();

  return (
    <article className="wrap max-w-3xl py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">ZAIVAR</p>
      <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700">{d.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{d.intro}</p>
      <div className="mt-12 space-y-10">
        {d.body.map((b, i) => (
          <Reveal key={b.h} delay={i * 80}>
            <h2 className="!mb-3 text-2xl">{b.h}</h2>
            <p className="text-muted-foreground">{b.p}</p>
          </Reveal>
        ))}
      </div>
    </article>
  );
}