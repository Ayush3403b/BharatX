import { Link } from "react-router-dom";
import type { Company } from "../../types";
import { Icon } from "../../utils/icons";
import { Reveal } from "../common/Reveal";

/** Compact cross-link cards used on company pages. */
export function RelatedCompanies({ companies: list }: { companies: Company[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((c, i) => (
        <Reveal key={c.id} delay={i * 0.07}>
          <Link
            to={`/companies/${c.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-white/8 bg-night-850 p-4 transition-all duration-300 hover:border-white/18 hover:bg-night-800"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-mono text-[12px] font-semibold transition-transform duration-300 group-hover:scale-105"
              style={{
                color: c.accentColor,
                background: `${c.accentColor}14`,
                border: `1px solid ${c.accentColor}3a`,
              }}
            >
              {c.monogram}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-[15px] font-semibold text-ink-50">
                {c.name}
              </span>
              <span className="block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
                {c.category}
              </span>
            </span>
            <Icon
              name="arrow-right"
              width={15}
              height={15}
              className="shrink-0 text-ink-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-400"
            />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
