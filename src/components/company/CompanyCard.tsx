import { Link } from "react-router-dom";
import type { Company } from "../../types";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { TiltCard } from "../three/TiltCard";

interface CompanyCardProps {
  company: Company;
  layout?: "stacked" | "reversed";
  className?: string;
}

/**
 * Large interactive company card (Section 14) with the 3D tilt effect
 * (Section 5A item 3). Accent colour, domain icon and ghost numeral make
 * every card distinct.
 */
export function CompanyCard({ company, layout = "stacked", className }: CompanyCardProps) {
  const reversed = layout === "reversed";
  return (
    <TiltCard
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-300 hover:border-slate-300 hover:shadow-[0_20px_45px_-12px_rgba(15,23,42,0.12)] hover:-translate-y-1 min-w-0 dark:border-white/8 dark:bg-night-850/80 dark:shadow-none dark:hover:border-white/20 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]",
        reversed && "lg:flex-row-reverse",
        className,
      )}
    >
      {/* Accent hairline */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[2.5px]"
        style={{
          background: `linear-gradient(90deg, ${company.accentColor}, transparent 70%)`,
        }}
      />

      {/* Image */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-slate-100 dark:bg-night-800",
          reversed ? "lg:w-[42%]" : "h-52 md:h-56",
          reversed && "lg:h-auto",
        )}
      >
        <img
          src={company.heroImage}
          alt={`${company.name} — ${company.category}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent dark:from-night-950/80 dark:via-night-950/20 dark:to-transparent" />
        {company.logo ? (
          <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-md border border-slate-100 dark:border-white/10">
            <img
              src={company.logo}
              alt={company.name}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <span
            className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl font-mono text-[12px] font-semibold shadow-md bg-white border border-slate-100 dark:bg-night-900/90 dark:border-white/10"
            style={{ color: company.accentColor }}
          >
            {company.monogram}
          </span>
        )}
        <span
          aria-hidden
          className="absolute -bottom-3 right-3 font-display text-[64px] font-bold leading-none text-slate-900/[0.04] dark:text-white/[0.04] select-none pointer-events-none"
        >
          {String(company.order).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6 md:p-7 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ color: company.accentColor, background: `${company.accentColor}14` }}
            >
              <Icon name={company.icon} width={14} height={14} strokeWidth={1.7} />
            </span>
            <span
              className="truncate font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: company.accentColor }}
            >
              {company.category}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink-50 transition-colors group-hover:text-gold-400 break-words">
            {company.name}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-ink-400">
            {company.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
          <Link
            to={`/companies/${company.slug}`}
            className="group/link inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 py-2 text-[13px] font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:border-gold-400 hover:text-gold-600 hover:shadow-md shrink-0 dark:border-white/15 dark:bg-white/[0.04] dark:text-ink-100 dark:hover:border-gold-400/40 dark:hover:text-gold-400 dark:hover:bg-white/[0.08] dark:shadow-none"
          >
            Explore
            <Icon
              name="arrow-right"
              width={14}
              height={14}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-ink-400 dark:hover:text-ink-100"
            >
              Website
              <Icon name="external-link" width={12.5} height={12.5} />
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 dark:text-ink-500">
              {String(company.order).padStart(2, "0")}/06
            </span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
