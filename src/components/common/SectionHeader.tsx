import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { Reveal } from "./Reveal";

export interface SectionHeaderProps {
  icon?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "dark" | "light";
}

export function SectionHeader({
  icon,
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  tone = "dark",
}: SectionHeaderProps) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-5 md:mb-16",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em]",
            align === "center" && "justify-center",
            light ? "text-[#4e5b67]" : "text-ink-400",
          )}
        >
          {icon && (
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border",
                light
                  ? "border-[#131a22]/15 text-gold-600"
                  : "border-white/10 text-gold-400",
              )}
            >
              <Icon name={icon} width={13} height={13} strokeWidth={1.6} />
            </span>
          )}
          <span>{eyebrow}</span>
          <span
            aria-hidden
            className={cn(
              "h-px w-10",
              light ? "bg-[#131a22]/20" : "bg-gold-400/50",
            )}
          />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "max-w-3xl font-display text-[1.85rem] sm:text-4xl font-semibold leading-[1.08] sm:leading-[1.05] tracking-tight md:text-5xl lg:text-[3.4rem]",
            light ? "text-[#131a22]" : "text-ink-50",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed md:text-lg",
              light ? "text-[#4e5b67]" : "text-ink-400",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
