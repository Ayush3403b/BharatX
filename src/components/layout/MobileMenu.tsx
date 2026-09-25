import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { companies } from "../../data/companies";
import { brandConfig } from "../../config/brand";
import { navigation } from "../../data/navigation";
import { Logo } from "./Logo";

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
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-ink-100"
              >
                <Icon name="x" width={18} height={18} />
              </button>
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
                    className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-md font-mono text-[10px] font-semibold"
                      style={{
                        color: c.accentColor,
                        background: `${c.accentColor}14`,
                        border: `1px solid ${c.accentColor}33`,
                      }}
                    >
                      {c.monogram}
                    </span>
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
                className="flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-semibold text-night-950"
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-400 transition-colors hover:border-white/30 hover:text-ink-100"
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
    "flex items-center gap-3.5 border-b border-white/5 py-3 sm:py-4 font-display text-[19px] sm:text-[22px] font-medium tracking-tight transition-colors",
    isActive ? "text-gold-400" : "text-ink-100 hover:text-pulse-300",
  );
}
