import { Fragment } from "react";
import { companies } from "../../data/companies";

/**
 * Signature marquee strip: the six businesses scrolling in a hairline band.
 */
export function CompanyMarquee() {
  const items = [...companies, ...companies];
  return (
    <div
      aria-hidden
      className="marquee relative overflow-hidden border-y border-white/5 bg-night-950/60 py-5"
    >
      <div className="marquee-track items-center gap-10 pr-10">
        {items.map((c, i) => (
          <Fragment key={`${c.id}-${i}`}>
            <span className="flex items-center gap-3 whitespace-nowrap">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[11px] font-semibold"
                style={{
                  color: c.accentColor,
                  background: `${c.accentColor}14`,
                  border: `1px solid ${c.accentColor}33`,
                }}
              >
                {c.monogram}
              </span>
              <span className="font-display text-sm font-medium tracking-[0.14em] text-ink-300">
                {c.name.toUpperCase()}
              </span>
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="shrink-0 text-gold-400/60">
              <path d="M1 1 L9 9 M9 1 L1 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Fragment>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night-900 to-transparent" />
    </div>
  );
}
