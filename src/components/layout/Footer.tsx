import { Link } from "react-router-dom";
import { brandConfig } from "../../config/brand";
import { companies } from "../../data/companies";
import { footerColumns } from "../../data/navigation";
import { Icon } from "../../utils/icons";
import { Logo } from "./Logo";

const columnMeta: { key: "explore" | "company" | "ecosystem" | "legal"; icon: string; title: string }[] = [
  { key: "explore", icon: "compass", title: "Explore" },
  { key: "company", icon: "users", title: "Company" },
  { key: "ecosystem", icon: "orbit", title: "Ecosystem" },
  { key: "legal", icon: "scale", title: "Legal" },
];

const socialIcons: Record<string, string> = {
  LinkedIn: "arrow-up-right",
  Instagram: "arrow-up-right",
  YouTube: "arrow-up-right",
  X: "arrow-up-right",
};

export function FooterCTA() {
  return (
    <section className="gold-glow relative overflow-hidden border-t border-white/5 py-16 sm:py-24 md:py-32">
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-60" />
      <div className="container-x relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-400">
            <Icon name="sparkles" width={13} height={13} />
            <span>Start a conversation</span>
          </div>
          <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-4xl md:text-5xl lg:text-6xl">
            Have an idea
            <br />
            worth building?
          </h2>
          <p className="mt-5 max-w-md text-[15px] sm:text-base leading-relaxed text-ink-400">
            Ventures, partnerships, suppliers, talent — the right conversation
            starts with one message to the group.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full md:w-auto">
          <Link
            to="/contact"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gold-400 px-8 py-4 text-[15px] font-semibold text-night-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_10px_44px_-10px_rgba(245,184,77,0.55)]"
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
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-4 text-[15px] font-semibold text-ink-100 transition-colors hover:border-white/35 hover:bg-white/5"
          >
            Explore the ecosystem
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-night-950/40">
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-20" />
      <div className="container-x relative z-10 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" aria-label="BharatX Group home">
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-400">
              BharatX Group is a connected ecosystem of six businesses
              operating across technology, AI, infrastructure, manufacturing,
              agriculture, food systems and venture building — one group, one
              shared direction.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {brandConfig.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-400 transition-all duration-300 hover:border-pulse-400/50 hover:text-pulse-300"
                >
                  <Icon name={socialIcons[s.label] ?? "arrow-up-right"} width={14} height={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {columnMeta.map((col) => {
            const items =
              col.key === "ecosystem"
                ? companies.map((c) => ({ label: c.name, to: `/companies/${c.slug}` }))
                : footerColumns[col.key];
            return (
              <nav key={col.key} aria-label={col.title} className="col-span-1 lg:col-span-2">
                <div className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-ink-500">
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

          {/* Contact mini */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <div className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-ink-500">
              <Icon name="mail" width={13} height={13} className="text-gold-400" />
              Contact
            </div>
            <ul className="flex flex-col gap-2.5 text-[13.5px] text-ink-400">
              <li className="flex items-center gap-2.5">
                <Icon name="map-pin" width={13} height={13} className="shrink-0 text-ink-500" />
                India
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2.5 transition-colors hover:text-ink-50">
                  <Icon name="arrow-up-right" width={13} height={13} className="shrink-0 text-ink-500" />
                  Start an inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Ghost wordmark */}
        <div
          aria-hidden
          className="pointer-events-none mt-16 select-none overflow-hidden"
        >
          <div className="whitespace-nowrap text-center font-display text-[17vw] font-bold leading-[0.85] tracking-tight text-white/[0.028] lg:text-[11.5rem]">
            BHARATX GROUP
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 md:flex-row">
          <p className="text-center sm:text-left font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-600">
            © {new Date().getFullYear()} BharatX Group. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy" className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-ink-200">
              Privacy
            </Link>
            <Link to="/terms" className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-ink-200">
              Terms
            </Link>
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-600">
              <span className="h-1.5 w-1.5 rounded-full bg-pulse-400/70" />
              Made in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
