import { cn } from "../../utils/cn";
import { companies } from "../../data/companies";
import { ecosystemSites } from "../../data/ecosystem";

/**
 * Numbered tab switcher for the ecosystem viewer (Section 21).
 * The selected company is mirrored to ?company= in the URL by the page.
 */
export function EcosystemSwitcher({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Select a company website"
      className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {ecosystemSites.map((site, i) => {
        const c = companies.find((x) => x.id === site.id);
        const active = site.id === activeId;
        return (
          <button
            key={site.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onSelect(site.id)}
            className={cn(
              "group relative flex shrink-0 snap-start items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300",
              active
                ? "border-gold-400/50 bg-gold-400/[0.08]"
                : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
            )}
          >
            <span
              className={cn(
                "font-mono text-[11px] tabular-nums",
                active ? "text-gold-400" : "text-ink-600 group-hover:text-ink-400",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  "block whitespace-nowrap text-[13.5px] font-semibold transition-colors",
                  active ? "text-ink-50" : "text-ink-300 group-hover:text-ink-100",
                )}
              >
                {site.name}
              </span>
              <span
                className={cn(
                  "block whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.14em]",
                  active ? "text-gold-400/80" : "text-ink-600",
                )}
              >
                {c?.shortName ?? site.category}
              </span>
            </span>
            {active && (
              <span
                aria-hidden
                className="absolute -top-px left-4 right-4 h-[2px] bg-gradient-to-r from-pulse-400 to-gold-400"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
