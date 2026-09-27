import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { Button } from "../common/Button";
import { Reveal } from "../common/Reveal";
import { SectionHeader } from "../common/SectionHeader";

interface PressRelease {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  publisher: string;
  readTime: string;
  link: string;
  image?: string;
}

const pressReleases: PressRelease[] = [
  {
    id: "lead-1",
    category: "Strategic Growth",
    date: "18 Sep, 2026",
    publisher: "BharatX Group Communications",
    readTime: "4 min read",
    title:
      "BharatX Group announces expansion of sovereign AI compute nodes and integrated agri-export trade corridors for FY2026-27.",
    excerpt:
      "A strategic capital deployment consolidating domestic infrastructure with multilingual agentic automation to accelerate India's deep-tech manufacturing competitiveness.",
    link: "/innovation",
    image: "/assets/backgrounds/hero-field.jpg",
  },
  {
    id: "item-2",
    category: "Deep-Tech & AI",
    date: "04 Sep, 2026",
    publisher: "AIxperts Labs",
    readTime: "3 min read",
    title:
      "AIxperts Labs operationalises production-grade multilingual decision engines for 22 Indian regional dialects.",
    excerpt:
      "Enabling instant voice, document triage, and automated field telemetry for tier-2/3 industrial enterprises without reliance on foreign cloud dependencies.",
    link: "/companies/aixperts-labs",
    image: "/assets/backgrounds/ai-circuit.jpg",
  },
  {
    id: "item-3",
    category: "Agri-Tech & Exports",
    date: "22 Aug, 2026",
    publisher: "BharatX Agro",
    readTime: "3 min read",
    title:
      "BharatX Agro scales farm-gate traceability network to 50,000+ certified smallholder producers.",
    excerpt:
      "Delivering origin-authenticated agricultural commodities and clean value chains directly into EMEA and Southeast Asian export terminals.",
    link: "/companies/bharatx-agro",
    image: "/assets/backgrounds/agri-dusk.jpg",
  },
  {
    id: "item-4",
    category: "Infrastructure",
    date: "11 Aug, 2026",
    publisher: "BharatX Infratech",
    readTime: "2 min read",
    title:
      "BharatX Infratech completes flagship industrial campus with 100% circular water and zero-carbon building protocols.",
    excerpt:
      "Setting a new benchmark for utility-ready industrial estates engineered for generational operational lifespan.",
    link: "/companies/bharatx-infratech",
    image: "/assets/backgrounds/industrial.jpg",
  },
];

export function InstitutionalNewsroom() {
  const lead = pressReleases[0];
  const items = pressReleases.slice(1);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-slate-50/50 dark:bg-night-950/40 border-t border-slate-200/80 dark:border-white/5">
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            icon="newspaper"
            eyebrow="News & Announcements"
            title={
              <>
                Official releases.
                <br />
                <span className="text-pulse-400">Institutional updates.</span>
              </>
            }
            lede="Read the latest corporate announcements, technology milestones, and strategic disclosures from across BharatX Group."
            className="mb-0"
          />

          <Reveal delay={0.15}>
            <Link
              to="/about"
              className="group mb-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
            >
              All announcements
              <Icon
                name="arrow-right"
                width={13}
                height={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Asymmetrical RIL-Style Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left: Spotlight Featured Announcement */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal delay={0.1}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-night-850 p-6 md:p-8 shadow-xl transition-all duration-300 hover:border-gold-400/50">
                {/* Image Header */}
                <div className="relative h-60 w-full overflow-hidden rounded-2xl">
                  <img
                    src={lead.image}
                    alt={lead.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-night-950/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-gold-400 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-night-950 shadow-md">
                      Spotlight
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="mt-6 flex-1">
                  <div className="flex items-center gap-3 font-mono text-xs text-ink-400">
                    <span className="text-gold-500 font-semibold">{lead.category}</span>
                    <span>·</span>
                    <span>{lead.date}</span>
                    <span>·</span>
                    <span>{lead.readTime}</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold leading-snug text-ink-100 dark:text-ink-50 group-hover:text-gold-400 transition-colors">
                    {lead.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink-400">
                    {lead.excerpt}
                  </p>
                </div>

                {/* Bottom Source & Link */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-200/70 dark:border-white/8 pt-4">
                  <span className="font-mono text-[11px] text-ink-500">
                    {lead.publisher}
                  </span>
                  <Link
                    to={lead.link}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-gold-400 hover:text-gold-300"
                  >
                    Read full release <Icon name="arrow-up-right" width={13} height={13} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Chronological Card List */}
          <div className="lg:col-span-6 flex flex-col gap-4 justify-between">
            {items.map((item, idx) => (
              <Reveal key={item.id} delay={0.15 + idx * 0.08}>
                <Link
                  to={item.link}
                  className="group relative flex flex-col sm:flex-row gap-5 rounded-2xl border border-slate-200/80 dark:border-white/8 bg-white dark:bg-night-850 p-5 shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md"
                >
                  <div className="h-28 sm:h-auto sm:w-36 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-night-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[10.5px] text-ink-400">
                        <span className="font-semibold text-pulse-400">{item.category}</span>
                        <span>·</span>
                        <span>{item.date}</span>
                      </div>
                      <h4 className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-ink-100 dark:text-ink-50 group-hover:text-pulse-300 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    <div className="mt-3 flex items-center justify-between font-mono text-[10.5px] text-ink-500">
                      <span>{item.publisher}</span>
                      <span className="inline-flex items-center gap-1 text-gold-400 group-hover:translate-x-0.5 transition-transform">
                        Read <Icon name="arrow-right" width={11} height={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
