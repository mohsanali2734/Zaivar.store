import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { CONFIG, FOOTER_CARE } from "@/lib/products";
import { cn } from "@/lib/utils";

interface LayoutProps {
  eyebrow?: string;
  title: string;
  intro: string;
  children: ReactNode;
}

export default function InfoLayout({ eyebrow = "Customer care", title, intro, children }: LayoutProps) {
  return (
    <>
      <header className="relative overflow-hidden bg-secondary/60">
        <div aria-hidden className="pointer-events-none absolute -right-16 top-0 size-64 rounded-full bg-primary/25 blur-3xl animate-float" />
        <div className="wrap max-w-4xl py-16 md:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary animate-in fade-in duration-700">{eyebrow}</p>
          <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700">{title}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 [animation-delay:150ms] fill-mode-both">{intro}</p>
        </div>
      </header>

      <div className="wrap grid max-w-6xl gap-12 py-16 lg:grid-cols-[1fr_260px]">
        <div className="space-y-12">{children}</div>

        <aside aria-label="Help links" className="h-fit space-y-6 border bg-secondary/40 p-6 lg:sticky lg:top-24">
          <h2 className="!mb-0 text-xl">More help</h2>
          <ul className="space-y-2 text-sm">
            {FOOTER_CARE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground transition-all hover:pl-1 hover:text-primary">{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Still stuck? Write to <a href={`mailto:${CONFIG.email}`} className="text-foreground underline underline-offset-4 hover:text-primary">{CONFIG.email}</a>
          </p>
          <Link href="/shop" className={cn(buttonVariants(), "w-full text-xs uppercase tracking-widest")}>Back to shop</Link>
        </aside>
      </div>
    </>
  );
}

export function Block({ title, children, delay = 0 }: { title: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <section>
        <h2 className="!mb-4 text-2xl md:text-3xl">{title}</h2>
        <div className="space-y-3 text-muted-foreground">{children}</div>
      </section>
    </Reveal>
  );
}