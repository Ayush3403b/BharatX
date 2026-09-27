import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { Button } from "../common/Button";
import { Reveal } from "../common/Reveal";
import { SectionHeader } from "../common/SectionHeader";

interface TriadItem {
  id: string;
  tabTitle: string;
  badge: string;
  headline: string;
  description: string[];
  metrics: { label: string; value: string }[];
  image: string;
  route: string;
  cta: string;
  accent: string;
}

const triadData: TriadItem[] = [
  {
    id: "deep-tech",
    tabTitle: "Deep-Tech & AI",
    badge: "SOVEREIGN INTELLIGENCE",
    headline: "Building India's Sovereign AI & Autonomous Software Infrastructure.",
    description: [
      "Innovation at BharatX Group is engineered from the ground up for real-world reliability. We build foundational AI workflows, multilingual intelligence systems, and agentic decision engines that operate directly within core enterprise operations.",
      "By eliminating dependence on imported black-box models, we guarantee complete data sovereignty, cryptographic security, and sub-millisecond production inference tailored to India's diverse operational landscape.",
    ],
    metrics: [
      { label: "Multilingual Intelligence", value: "22+ Dialects" },
      { label: "Production Reliability", value: "99.98% SLA" },
      { label: "Inference Latency", value: "< 28ms" },
    ],
    image: "/assets/backgrounds/ai-circuit.jpg",
    route: "/innovation",
    cta: "Explore Innovation & R&D",
    accent: "#00f0ff",
  },
  {
    id: "sustainability",
    tabTitle: "Sustainability & Net-Zero",
    badge: "ECOLOGICAL RESPONSIBILITY",
    headline: "Engineering Sustainable Physical Assets & Circular Manufacturing.",
    description: [
      "Our growth philosophy is inseparable from environmental stewardship. Across our civil projects and precision manufacturing lines, BharatX Group integrates carbon-conscious materials, recycled feedstocks, and energy-efficient lifecycle protocols.",
      "From regenerative circular agri-processing that nourishes rural soils to long-lifecycle heavy caster alloys, we engineer products and infrastructure built to outlast economic and climate cycles.",
    ],
    metrics: [
      { label: "Recyclable Compounds", value: "100% Certified" },
      { label: "Lifecycle Durability", value: "10+ Years" },
      { label: "Circular Operations", value: "Zero-Waste" },
    ],
    image: "/assets/backgrounds/craft-metal.jpg",
    route: "/about",
    cta: "Discover Sustainability Standards",
    accent: "#10b981",
  },
  {
    id: "impact",
    tabTitle: "Societal Impact",
    badge: "NATION BUILDING",
    headline: "Creating Durable Livelihoods & Empowering Grassroots Producers.",
    description: [
      "At BharatX, corporate success is measured by the tangible prosperity created across communities. We partner directly with smallholder farmers, local fabricators, and regional artisans, converting informal labor into formalized, high-yielding micro-enterprises.",
      "Through farm-in-a-box incubation, cold-chain market access, and technical upskilling, we build economic self-reliance that compounds across generations.",
    ],
    metrics: [
      { label: "Farmer Networks", value: "50,000+ Reach" },
      { label: "Rural Micro-Enterprises", value: "100+ Incubated" },
      { label: "Export Traceability", value: "100% Origin" },
    ],
    image: "/assets/backgrounds/agri-dusk.jpg",
    route: "/impact",
    cta: "View Impact Reports",
    accent: "#f5b84d",
  },
];

export function StrategicTriadTabs() {
  const [activeId, setActiveId] = useState<string>("deep-tech");
  const current = triadData.find((t) => t.id === activeId) ?? triadData[0];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-t border-slate-200/80 dark:border-white/5">
      <div className="container-x relative">
        <SectionHeader
          icon="orbit"
          eyebrow="Strategic Pillars"
          title={
            <>
              Deep-tech. Sustainability.
              <br />
              <span className="text-gold-400">National impact.</span>
            </>
          }
          lede="How BharatX aligns technological ambition with ecological responsibility and national development."
        />

        {/* Tab Navigation Pill Bar (RIL Triad Style) */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-slate-200/90 dark:border-white/10 bg-white/70 dark:bg-night-850/80 p-1.5 shadow-md backdrop-blur-md">
            {triadData.map((item) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`relative rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "text-ink-900 dark:text-ink-50 shadow-sm"
                      : "text-ink-400 hover:text-ink-200"
                  }`}
                  role="tab"
                  aria-selected={active}
                >
                  {active && (
                    <motion.div
                      layoutId="triad-tab-pill"
                      className="absolute inset-0 rounded-full bg-slate-200 dark:bg-white/10 border border-slate-300/80 dark:border-white/15"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    {item.tabTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid gap-10 lg:grid-cols-2 lg:items-center rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-night-850/90 p-8 md:p-12 shadow-xl backdrop-blur-md"
            >
              {/* Left Details */}
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em]"
                    style={{ color: current.accent }}
                  >
                    {current.badge}
                  </span>
                  <span className="h-px w-8 bg-slate-300 dark:bg-white/20" />
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-100 dark:text-ink-50 sm:text-3xl md:text-[2.1rem] leading-tight">
                  {current.headline}
                </h3>

                <div className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-ink-300 dark:text-ink-300">
                  {current.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Quantitative Metric Badges */}
                <div className="mt-8 grid grid-cols-3 gap-3 border-y border-slate-200/70 dark:border-white/8 py-5">
                  {current.metrics.map((m) => (
                    <div key={m.label}>
                      <span
                        className="text-xl font-bold text-ink-100 dark:text-ink-50 md:text-2xl tracking-tight"
                        style={{ fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif" }}
                      >
                        {m.value}
                      </span>
                      <span className="mt-1 block font-display text-[11px] font-medium uppercase tracking-wider text-ink-400">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BharatX Labs Spotlight for Deep-Tech */}
                {current.id === "deep-tech" && (
                  <div className="mt-6 rounded-2xl border border-pulse-400/30 bg-pulse-400/5 dark:bg-pulse-400/10 p-4.5 backdrop-blur-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse-400 opacity-75" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pulse-400" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold text-ink-900 dark:text-ink-50">
                              BharatX Labs
                            </span>
                            <span className="rounded-full bg-gold-400/15 border border-gold-400/40 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-gold-400">
                              Upcoming · Stealth R&D
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-300">
                            Frontier sovereign AI, neural compute architecture, and autonomous reasoning agents.
                          </p>
                        </div>
                      </div>
                      <Link to="/bharatx-labs" className="shrink-0">
                        <span className="inline-flex items-center gap-1.5 rounded-xl border border-pulse-400/40 bg-pulse-400/15 px-3 py-1.5 font-mono text-xs font-semibold text-pulse-400 hover:bg-pulse-400/25 transition-all">
                          Preview Labs <span>→</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* CTA Action */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to={current.route}>
                    <Button variant="primary" size="lg" withArrow>
                      {current.cta}
                    </Button>
                  </Link>
                  {current.id === "deep-tech" && (
                    <Link to="/bharatx-labs">
                      <Button variant="secondary" size="lg">
                        BharatX Labs (Upcoming)
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Visual / Cinematic Showcase with Overlay Badge */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-2xl h-[340px] sm:h-[420px] lg:h-[480px]">
                <img
                  src={current.image}
                  alt={current.headline}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-transparent" />

                {/* Floating Status Chip */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/10 bg-night-950/80 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-3 w-3 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${current.accent}33` }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: current.accent }}
                      />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white">
                      {current.id === "deep-tech"
                        ? "BharatX Labs · Frontier R&D"
                        : "BharatX Active Protocol"}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-gold-400">
                    {current.id === "deep-tech" ? "Upcoming Phase" : "Verified"}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
