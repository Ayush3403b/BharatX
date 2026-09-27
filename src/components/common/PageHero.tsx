import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { Breadcrumbs } from "./Breadcrumbs";
import { MaskReveal, Reveal } from "./Reveal";

interface PageHeroProps {
  icon: string;
  eyebrow: string;
  title: string | string[];
  lede?: string;
  breadcrumbs?: { label: string; to?: string }[];
  children?: ReactNode;
  className?: string;
  visual?: ReactNode;
  visualPlacement?: "right" | "left" | "center";
}

/** Standard interior page hero — editorial, with optional 3D visual integration. */
export function PageHero({
  icon,
  eyebrow,
  title,
  lede,
  breadcrumbs,
  children,
  className,
  visual,
  visualPlacement = "right",
}: PageHeroProps) {
  const lines = Array.isArray(title) ? title : [title];

  const contentBlock = (
    <div>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-8" />}
      <Reveal immediate>
        <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10">
            <Icon name={icon} width={13} height={13} strokeWidth={1.6} />
          </span>
          <span>{eyebrow}</span>
          <span aria-hidden className="h-px w-12 bg-gold-400/50" />
        </div>
      </Reveal>
      <h1 className="max-w-4xl font-display text-3xl sm:text-5xl font-semibold leading-[1.02] tracking-tight text-ink-900 dark:text-ink-50 md:text-6xl lg:text-7xl">
        {lines.map((line, i) => (
          <MaskReveal immediate key={i} delay={0.05 * i}>
            {line}
          </MaskReveal>
        ))}
      </h1>
      {lede && (
        <Reveal immediate delay={0.2}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-400 md:text-lg">
            {lede}
          </p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">{children}</div>
        </Reveal>
      )}
    </div>
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-slate-200/80 dark:border-white/5 pb-10 pt-28 md:pb-14 md:pt-36",
        className,
      )}
    >
      <div className="container-x relative">
        {visual ? (
          <div
            className={cn(
              "grid items-center gap-10 lg:gap-14",
              visualPlacement === "left"
                ? "lg:grid-cols-[0.9fr_1.1fr]"
                : "lg:grid-cols-[1.1fr_0.9fr]"
            )}
          >
            {visualPlacement === "left" ? (
              <>
                <div className="order-2 lg:order-1 flex items-center justify-center">
                  {visual}
                </div>
                <div className="order-1 lg:order-2">{contentBlock}</div>
              </>
            ) : (
              <>
                <div>{contentBlock}</div>
                <div className="flex items-center justify-center">{visual}</div>
              </>
            )}
          </div>
        ) : (
          contentBlock
        )}
      </div>
    </section>
  );
}
