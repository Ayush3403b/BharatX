import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

export function Breadcrumbs({
  items,
  className,
}: {
  items: { label: string; to?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={11} aria-hidden className="text-ink-600" />}
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-pulse-300">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
