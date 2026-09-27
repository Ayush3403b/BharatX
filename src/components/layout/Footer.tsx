import { Link } from "react-router-dom";
import { brandConfig } from "../../config/brand";
import { companies } from "../../data/companies";
import { footerColumns } from "../../data/navigation";
import { Icon } from "../../utils/icons";
import { Logo } from "./Logo";
import FooterOrbScene from "../three/FooterOrbScene";

const columnMeta: { key: "explore" | "company" | "ecosystem"; icon: string; title: string }[] = [
  { key: "explore", icon: "compass", title: "Explore" },
  { key: "company", icon: "users", title: "Company" },
  { key: "ecosystem", icon: "orbit", title: "Ecosystem" },
];

const socialIcons: Record<string, string> = {
  LinkedIn: "arrow-up-right",
  Instagram: "arrow-up-right",
  YouTube: "arrow-up-right",
  X: "arrow-up-right",
};

export function FooterCTA() {
  return (
    <section className="gold-glow relative overflow-hidden border-t border-slate-200/80 dark:border-white/5 py-14 sm:py-16 md:py-20">
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40 dark:opacity-60" />
      <div className="container-x relative flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-gold-500/20 bg-gold-500/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.28em] text-gold-600 dark:text-gold-400">
            <Icon name="sparkles" width={12} height={12} />
            <span>Connect with the ecosystem</span>
          </div>
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl md:text-5xl lg:text-6xl">
            READY TO BUILD
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-amber-400 to-pulse-400">
              WHAT COMES NEXT?
            </span>
          </h2>
          <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-ink-600 dark:text-ink-400">
            Ventures, technology systems, infrastructure, industrial mobility, advanced agro &amp; deeptech — start a conversation with the group.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              to="/contact"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gold-500 px-8 py-4 text-[15px] font-semibold text-white shadow-md shadow-gold-500/25 transition-all duration-300 hover:bg-gold-600 hover:shadow-[0_10px_35px_-8px_rgba(217,119,6,0.45)] dark:bg-gold-400 dark:text-night-950 dark:hover:bg-gold-300 dark:hover:shadow-[0_10px_44px_-10px_rgba(245,184,77,0.55)]"
            >
              Talk to BharatX
              <Icon
                name="arrow-right"
                width={16}
                height={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/ecosystem"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-slate-300/80 bg-white/70 px-8 py-4 text-[15px] font-semibold text-ink-900 shadow-sm transition-all duration-300 hover:border-slate-400 hover:bg-white hover:shadow-md dark:border-white/15 dark:bg-transparent dark:text-ink-100 dark:hover:border-white/35 dark:hover:bg-white/5 dark:shadow-none"
            >
              Explore Ecosystem
            </Link>
          </div>
        </div>

        {/* 3D Footer ecosystem scene (Section 33 & 34) */}
        <div className="flex shrink-0 items-center justify-center">
          <FooterOrbScene className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64" />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 dark:border-white/5 bg-night-950/60">
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-30" />
      <div className="container-x relative z-10 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-8 md:pt-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Brand */}
          <div className="w-full max-w-sm lg:w-[280px] xl:w-[320px] shrink-0">
            <Link to="/" aria-label="BharatX Group home">
              <Logo />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ink-400">
              BharatX Group is a connected ecosystem of six businesses
              operating across technology, AI, infrastructure, manufacturing,
              agriculture, food systems and venture building — one group, one
              shared direction.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {brandConfig.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 text-slate-500 bg-white/60 transition-all duration-300 hover:border-gold-400 hover:text-gold-600 hover:bg-white shadow-sm dark:border-white/10 dark:text-ink-400 dark:bg-transparent dark:hover:border-white/30 dark:hover:text-ink-100 dark:shadow-none"
                >
                  <Icon name={socialIcons[s.label] ?? "arrow-up-right"} width={14} height={14} />
                </a>
              ))}
            </div>

            {/* Location & Contact */}
            <div className="mt-5 space-y-2 border-t border-slate-200/70 dark:border-white/5 pt-4 font-mono text-[11px] text-ink-400">
              <div className="flex items-start gap-2">
                <Icon name="map-pin" width={13} height={13} className="shrink-0 mt-0.5 text-gold-400" />
                <span className="leading-snug">{brandConfig.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="phone" width={13} height={13} className="shrink-0 text-gold-400" />
                <a
                  href={`tel:${brandConfig.contact.phoneTel}`}
                  className="transition-colors hover:text-gold-400"
                >
                  {brandConfig.contact.phoneFormatted}
                </a>
              </div>
            </div>
          </div>

          {/* Columns in the same row */}
          <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:gap-8 xl:gap-12">
            {/* Nav Columns */}
            {columnMeta.map((col) => {
              const items =
                col.key === "ecosystem"
                  ? companies.map((c) => ({ label: c.name, to: `/companies/${c.slug}` }))
                  : footerColumns[col.key];
              return (
                <nav key={col.key} aria-label={col.title}>
                  <div className="mb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-ink-500">
                    <Icon name={col.icon} width={13} height={13} className="text-gold-400" />
                    {col.title}
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="group inline-flex items-center gap-2 text-[13.5px] text-ink-400 transition-colors hover:text-ink-50"
                        >
                          <span
                            aria-hidden
                            className="h-px w-0 bg-pulse-400 transition-all duration-300 group-hover:w-3"
                          />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>
        </div>

        {/* Signature watermark */}
        <div
          aria-hidden
          className="pointer-events-none mt-12 select-none overflow-hidden"
        >
          <div className="whitespace-nowrap text-center font-display text-[15vw] font-extrabold leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900/15 via-slate-900/6 to-transparent dark:from-white/25 dark:via-pulse-300/15 dark:to-transparent lg:text-[10.5rem] transition-all duration-300">
            BHARATX GROUP
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 dark:border-white/5 pt-6 md:flex-row">
          <p className="text-center sm:text-left font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            © {new Date().getFullYear()} BharatX Group. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy" className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-ink-200">
              Privacy
            </Link>
            <Link to="/terms" className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-ink-200">
              Terms
            </Link>
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              <span className="h-1.5 w-1.5 rounded-full bg-pulse-400/70" />
              Made in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
