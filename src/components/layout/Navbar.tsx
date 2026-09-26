import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { Logo, LogoMark } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { companies } from "../../data/companies";
import { ecosystemSites } from "../../data/ecosystem";
import { contactRoute, navigation } from "../../data/navigation";
import { MagneticButton } from "../common/MagneticButton";
import { Button } from "../common/Button";

type MegaKey = "companies" | "ecosystem" | null;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    setMega(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-500",
          scrolled || mega
            ? "glass border-b border-white/8 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)]"
            : "border-b border-transparent bg-gradient-to-b from-night-950/70 to-transparent",
        )}
        onMouseLeave={() => setMega(null)}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link
            to="/"
            aria-label="BharatX Group — home"
            className="relative z-10 rounded-md"
          >
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {navigation.map((item) => (
              <NavItem
                key={item.to}
                item={item}
                active={
                  location.pathname === item.to ||
                  (item.to !== "/" && location.pathname.startsWith(item.to))
                }
                mega={item.mega}
                onEnter={() => setMega(item.mega ?? null)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticButton
              as="Link"
              className="hidden sm:block"
              buttonProps={{
                to: contactRoute.to,
                className:
                  "inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-5 py-2.5 text-[13px] font-semibold text-gold-300 transition-all hover:border-gold-400/70 hover:bg-gold-400/20",
              }}
            >
              <Icon name="mail" width={14} height={14} strokeWidth={1.8} />
              Contact
            </MagneticButton>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-ink-100 transition-colors hover:border-white/30 xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? "x" : "menu"} width={19} height={19} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        {/* Mega menus */}
        <AnimatePresence>
          {mega && !reduced && (
            <motion.div
              key={mega}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-white/8 bg-night-950/95 backdrop-blur-2xl xl:block"
            >
              <MegaPanel kind={mega} />
            </motion.div>
          )}
        </AnimatePresence>
        {mega && reduced && <MegaPanel kind={mega} className="absolute inset-x-0 top-full hidden border-b border-white/8 bg-night-950/95 xl:block" />}
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavItem({
  item,
  active,
  onEnter,
  mega,
}: {
  item: (typeof navigation)[number];
  active: boolean;
  onEnter: () => void;
  mega?: MegaKey;
}) {
  return (
    <div onMouseEnter={onEnter} className="relative">
      <NavLink
        to={item.to}
        className={cn(
          "group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
          active ? "text-ink-50" : "text-ink-400 hover:text-ink-100",
        )}
      >
        <Icon
          name={item.icon}
          width={13.5}
          height={13.5}
          strokeWidth={1.7}
          className={cn(
            "transition-transform duration-300 group-hover:scale-110",
            active ? "text-gold-400" : "text-ink-500 group-hover:text-pulse-300",
          )}
        />
        {item.label}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gradient-to-r from-pulse-400 to-gold-400 transition-transform duration-300",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </NavLink>
    </div>
  );
}

function MegaPanel({ kind, className }: { kind: Exclude<MegaKey, null>; className?: string }) {
  return (
    <div className={className}>
      {kind === "companies" ? <CompaniesMega /> : <EcosystemMega />}
    </div>
  );
}

function CompaniesMega() {
  const [preview, setPreview] = useState(0);
  return (
    <div className="container-x grid grid-cols-[1fr_300px] gap-10 py-8" onMouseLeave={() => { }}>
      <div className="grid grid-cols-2 gap-1.5">
        {companies.map((c, i) => (
          <Link
            key={c.id}
            to={`/companies/${c.slug}`}
            onMouseEnter={() => setPreview(i)}
            onFocus={() => setPreview(i)}
            className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3.5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]"
          >
            <span
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-[12px] font-semibold transition-transform duration-300 group-hover:scale-105"
              style={{
                color: c.accentColor,
                background: `${c.accentColor}14`,
                border: `1px solid ${c.accentColor}3a`,
              }}
            >
              {c.monogram}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-ink-600">
                  {String(c.order).padStart(2, "0")}
                </span>
                <span className="truncate font-display text-[15px] font-semibold text-ink-50">
                  {c.name}
                </span>
              </span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: c.accentColor }}>
                {c.category}
              </span>
              <span className="mt-1.5 line-clamp-1 block text-[12.5px] text-ink-500">
                {c.description}
              </span>
            </span>
            <Icon
              name="arrow-up-right"
              width={15}
              height={15}
              className="mt-1 shrink-0 text-ink-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-400"
            />
          </Link>
        ))}
      </div>
      <div className="relative hidden h-[290px] overflow-hidden rounded-xl border border-white/10 lg:block">
        {companies.map((c, i) => (
          <img
            key={c.id}
            src={c.heroImage}
            alt=""
            aria-hidden
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-500",
              preview === i ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-300">
          {companies[preview].domain}
        </div>
      </div>
    </div>
  );
}

function EcosystemMega() {
  return (
    <div className="container-x py-8">
      <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-ink-500">
        <LogoMark size={20} />
        The ecosystem viewer — every business, one place
      </div>
      <div className="grid grid-cols-2 gap-1.5 md:grid-cols-3">
        {ecosystemSites.map((s) => {
          const c = companies.find((x) => x.id === s.id);
          return (
            <Link
              key={s.id}
              to={`/ecosystem?company=${s.id}`}
              className="group flex items-center gap-3 rounded-xl border border-transparent p-3.5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-semibold"
                style={{
                  color: c?.accentColor ?? "#93a1ad",
                  background: `${c?.accentColor ?? "#93a1ad"}14`,
                  border: `1px solid ${c?.accentColor ?? "#93a1ad"}3a`,
                }}
              >
                {c?.monogram ?? "•"}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-semibold text-ink-100">
                  {s.name}
                </span>
                <span className="block font-mono text-[10px] text-ink-500">{s.url.replace("https://", "")}</span>
              </span>
              <Icon
                name="orbit"
                width={14}
                height={14}
                className="ml-auto shrink-0 text-ink-600 transition-colors group-hover:text-pulse-300"
              />
            </Link>
          );
        })}
        <Link
          to="/ecosystem"
          className="group flex items-center gap-3 rounded-xl border border-gold-400/25 bg-gold-400/[0.06] p-3.5 transition-all duration-300 hover:border-gold-400/50 hover:bg-gold-400/10"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/15 text-gold-300">
            <Icon name="arrow-up-right" width={15} height={15} />
          </span>
          <span>
            <span className="block text-[14px] font-semibold text-gold-200">Open the Ecosystem Hub</span>
            <span className="block font-mono text-[10px] text-ink-500">All six websites, live</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
