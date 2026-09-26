import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../../utils/icons";
import { companies } from "../../data/companies";
import { navigation } from "../../data/navigation";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Prevent background scrolling when search modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        companies: companies.slice(0, 4),
        pages: navigation.slice(0, 5),
      };
    }

    return {
      companies: companies.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      ),
      pages: navigation.filter((p) => p.label.toLowerCase().includes(q)),
    };
  }, [query]);

  const handleSelect = (to: string) => {
    onClose();
    navigate(to);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-night-900/95"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-slate-200/80 px-4 py-3.5 dark:border-white/10">
              <Icon name="search" width={18} height={18} className="text-gold-500 dark:text-gold-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search BharatX enterprises, industries, capabilities..."
                className="w-full bg-transparent text-[15px] font-medium text-ink-100 placeholder:text-ink-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-full p-1 text-ink-400 hover:text-ink-100"
                >
                  <Icon name="x" width={14} height={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-block rounded border border-slate-200 px-2 py-0.5 font-mono text-[10px] text-ink-400 dark:border-white/15">
                ESC
              </kbd>
            </div>

            {/* Content Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
              {/* Companies Section */}
              {results.companies.length > 0 && (
                <div>
                  <div className="mb-2.5 px-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                    Enterprises & Subsidiaries
                  </div>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {results.companies.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelect(`/companies/${c.slug}`)}
                        className="group flex items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-slate-100/80 dark:hover:bg-white/[0.05]"
                      >
                        {c.logo ? (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm border border-slate-100 dark:border-white/10">
                            <img src={c.logo} alt={c.name} className="h-full w-full object-contain" />
                          </span>
                        ) : (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/15 font-mono text-[11px] font-bold text-gold-500">
                            {c.monogram}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-[13.5px] font-semibold text-ink-100 group-hover:text-gold-500 dark:group-hover:text-gold-400 truncate">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-ink-400 truncate">
                            {c.category}
                          </div>
                        </div>
                        <Icon
                          name="arrow-up-right"
                          width={14}
                          height={14}
                          className="shrink-0 text-ink-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages & Portals */}
              {results.pages.length > 0 && (
                <div>
                  <div className="mb-2.5 px-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                    Corporate Navigation & Portals
                  </div>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {results.pages.map((p) => (
                      <button
                        key={p.to}
                        type="button"
                        onClick={() => handleSelect(p.to)}
                        className="group flex items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-slate-100/80 dark:hover:bg-white/[0.05]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-ink-500 group-hover:text-pulse-500 dark:bg-white/[0.06] dark:text-ink-400">
                          <Icon name={p.icon} width={15} height={15} />
                        </span>
                        <div className="font-display text-[13.5px] font-medium text-ink-100 group-hover:text-pulse-500 truncate">
                          {p.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.companies.length === 0 && results.pages.length === 0 && (
                <div className="py-12 text-center">
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-400">
                    No matching results found for "{query}"
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/70 px-4 py-2.5 font-mono text-[10px] text-ink-500 dark:border-white/10 dark:bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <span>Select ↵</span>
                <span>Navigate ↑↓</span>
              </div>
              <span>BharatX Group Unified Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
