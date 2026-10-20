import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({ id, eyebrow, title, subtitle, align = "left", className }: Props) {
  return (
    <Reveal className={cn("mb-10", align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      )}
      <h2 id={id} className="!mb-3">{title}</h2>
      {subtitle && (
        <p className={cn("max-w-xl text-muted-foreground", align === "center" && "mx-auto")}>{subtitle}</p>
      )}
    </Reveal>
  );
}