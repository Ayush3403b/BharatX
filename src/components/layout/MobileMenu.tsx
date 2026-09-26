import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { companies } from "../../data/companies";
import { brandConfig } from "../../config/brand";
import { navigation } from "../../data/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "../common/ThemeToggle";

const socialIcons: Record<string, string> = {
  LinkedIn: "arrow-up-right",
  Instagram: "arrow-up-right",
  YouTube: "arrow-up-right",
  X: "arrow-up-right",
};

/** Full-screen mobile navigation with staggered link reveal (Section 39). */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-night-950/[0.98] backdrop-blur-2xl xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
          <div className="container-x relative flex min-h-full flex-col pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/80 text-ink-100 shadow-xs hover:border-slate-300 dark:border-white/12 dark:bg-white/[0.04] dark:text-ink-100 dark:hover:border-white/30"
                >
                  <Icon name="x" width={18} height={18} />
                </button>
              </div>
            </div>

            <nav aria-label="Mobile" className="mt-12 flex flex-col">
              <NavLink
                to="/"
                end
                className={({ isActive }) => mobileLinkClass(isActive)}
                onClick={onClose}
              >
                <Icon name="orbit" width={16} height={16} /> Home
              </NavLink>
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => mobileLinkClass(isActive)}
                  onClick={onClose}
                >
                  <Icon name={item.icon} width={16} height={16} /> {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                className={({ isActive }) => mobileLinkClass(isActive)}
                onClick={onClose}
              >
                <Icon name="mail" width={16} height={16} /> Contact
              </NavLink>
            </nav>

            <div className="mt-10">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-500">
                The six businesses
              </div>
              <div className="grid grid-cols-2 gap-2">
                {companies.map((c) => (
                  <Link
                    key={c.id}
                    to={`/companies/${c.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-lg border border-slate-200/90 bg-white/80 p-2.5 shadow-xs transition-colors hover:border-gold-300"
                  >
                    {c.logo ? (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white p-0.5 shadow-sm">
                        <img src={c.logo} alt={c.name} className="h-full w-full object-contain" />
                      </span>
                    ) : (
                      <span
                        className="flex h-7 w-7 items-center justify-center font-mono text-[10px] font-semibold text-ink-300"
                      >
                        {c.monogram}
                      </span>
                    )}
                    <span className="truncate text-[12.5px] font-medium text-ink-200">
                      {c.shortName}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-12">
              <Link
                to="/ecosystem"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-gold-500/25 transition-all hover:bg-gold-600"
              >
                Explore the Ecosystem
                <Icon name="arrow-right" width={15} height={15} />
              </Link>
              <div className="mt-8 flex items-center justify-center gap-5">
                {brandConfig.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-ink-400 shadow-xs transition-colors hover:border-gold-400 hover:text-gold-600"
                  >
                    <Icon name={socialIcons[s.label] ?? "arrow-up-right"} width={14} height={14} />
                  </a>
                ))}
              </div>
              <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-600">
                BharatX Group — {location.pathname}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function mobileLinkClass(isActive: boolean): string {
  return cn(
    "flex items-center gap-3.5 border-b border-slate-200/60 py-3 sm:py-4 font-display text-[19px] sm:text-[22px] font-medium tracking-tight transition-colors",
    isActive ? "text-gold-400" : "text-ink-100 hover:text-pulse-400",
  );
}
