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
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-night-850",
        reversed && "lg:flex-row-reverse",
        className,
      )}
    >
      {/* Accent hairline */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${company.accentColor}, transparent 70%)`,
        }}
      />

      {/* Image */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
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
        <div className="absolute inset-0 bg-gradient-to-t from-night-850 via-night-850/25 to-transparent" />
        <span
          className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl font-mono text-[12px] font-semibold shadow-lg"
          style={{
            color: company.accentColor,
            background: "rgba(7,10,15,0.82)",
            border: `1px solid ${company.accentColor}55`,
            backdropFilter: "blur(8px)",
          }}
        >
          {company.monogram}
        </span>
        <span
          aria-hidden
          className="absolute -bottom-3 right-3 font-display text-[64px] font-bold leading-none text-white/[0.05]"
        >
          {String(company.order).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ color: company.accentColor, background: `${company.accentColor}14` }}
          >
            <Icon name={company.icon} width={14} height={14} strokeWidth={1.7} />
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: company.accentColor }}
          >
            {company.category}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink-50 transition-colors group-hover:text-white">
          {company.name}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-ink-400">
          {company.description}
        </p>

        <div className="mt-6 flex flex-1 items-end gap-5">
          <Link
            to={`/companies/${company.slug}`}
            className="group/link inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-[13px] font-semibold text-ink-100 transition-all duration-300 hover:border-pulse-400/50 hover:text-pulse-300"
          >
            Explore
            <Icon
              name="arrow-right"
              width={14}
              height={14}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-500 transition-colors hover:text-ink-100"
          >
            Website
            <Icon name="external-link" width={12.5} height={12.5} />
          </a>
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-600 md:block">
            {String(company.order).padStart(2, "0")}/06
          </span>
        </div>
      </div>
    </TiltCard>
  );
}
