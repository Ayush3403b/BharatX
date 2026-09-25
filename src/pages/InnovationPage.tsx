import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { CinematicSection } from "../components/scroll/CinematicSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";

const pillars = [
  { icon: "brain-circuit", t: "Applied AI", d: "Models that work inside production workflows, evaluated on real data and owned by the teams that use them." },
  { icon: "workflow", t: "Automation", d: "Boring work removed from human hands — documents, scheduling, reconciliation, inspection — with exceptions handled honestly." },
  { icon: "database", t: "Digital infrastructure", d: "The data pipelines, identity and integration layers that make every other capability dependable." },
  { icon: "factory", t: "Manufacturing innovation", d: "Tolerance discipline, process control and quality-by-design in physical products." },
  { icon: "sprout", t: "Agricultural technology", d: "Cultivation science, cold chain and traceability applied as industrial systems, not afterthoughts." },
  { icon: "gauge", t: "Process innovation", d: "The unglamorous work: measuring how things run, then redesigning the process against the numbers." },
];

const timeline = [
  {
    phase: "Foundations",
    icon: "database",
    t: "Data and process foundations",
    d: "The first and unglamorous layer: clean data, documented processes, reliable integration. Every capability in the group is built on this substrate — and it is what makes the rest auditable.",
  },
  {
    phase: "Production",
    icon: "brain-circuit",
    t: "Intelligence in production",
    d: "AI and automation move from pilots to production systems: document intelligence, process automation, predictive maintenance — each with monitoring, ownership and documented decisions.",
  },
  {
    phase: "Scale",
    icon: "factory",
    t: "Industrial-scale capability",
    d: "Capabilities are industrialised: manufacturing tolerances, infrastructure-grade reliability, cold chains and supply systems that hold at volume, season after season.",
  },
  {
    phase: "Integration",
    icon: "orbit",
    t: "Cross-business integration",
    d: "Where the group's model pays: shared data standards, shared logistics, shared customers — connected deliberately, reviewed quarterly, never forced.",
  },
  {
    phase: "Frontier",
    icon: "rocket",
    t: "New ventures, built to standard",
    d: "The next businesses the group builds inherit every standard above. A new venture starts at production-grade, not zero — that is the compounding effect of the ecosystem.",
  },
];

const principles = [
  { n: "01", t: "Production or nothing", d: "If a capability cannot run in production with an owner and a metric, it is a demo — and demos are not shipped as products." },
  { n: "02", t: "Measure the baseline first", d: "Every innovation project starts by measuring how the process runs today. The improvement is only real if the baseline was honest." },
  { n: "03", t: "The team must own it", d: "Technology transferred is technology that survives. Handovers include documentation, training and a supported exit for the vendor." },
  { n: "04", t: "Boring is a feature", d: "The most valuable innovation is the one no one notices — the process that simply works, every time, without a hero involved." },
];

export default function InnovationPage() {
  usePageMeta({
    title: "Innovation",
    description:
      "Technology that works in the real world — applied AI, automation, digital infrastructure, manufacturing innovation, agri-tech and process innovation at BharatX Group.",
    path: "/innovation",
    image: "/assets/backgrounds/ai-circuit.jpg",
  });

  return (
    <>
      <PageHero
        icon="sparkles"
        eyebrow="Innovation"
        title={["Technology that works", "in the real world."]}
        lede="Innovation at BharatX is not a lab. It is production systems, industrial processes and agricultural technology — built to the same standard: specified, tested, documented, owned."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Innovation" }]}
      />

      {/* ── PILLARS ──────────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="sparkles"
            eyebrow="Innovation pillars"
            title="Six fronts, one discipline."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-white/8 bg-night-850/70 p-7 transition-all duration-300 hover:border-pulse-400/30 hover:bg-night-800">
                  <IconBadge icon={p.icon} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-50">{p.t}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-400">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCROLL-LINKED TIMELINE ───────────────────────────── */}
      <TimelineSection />

      {/* ── CINEMATIC ────────────────────────────────────────── */}
      <CinematicSection
        image="/assets/backgrounds/ai-circuit.jpg"
        alt="Abstract circuitry with glowing traces"
        kicker="Under the surface"
        kickerIcon="cpu"
        title={["The unglamorous layer", "is the moat."]}
        text="Data foundations, integration, governance — the work that is invisible in a product and indispensable behind it."
      />

      {/* ── TECHNOLOGY ECOSYSTEM DIAGRAM ─────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="network"
            eyebrow="Technology ecosystem"
            title="How the capabilities interlock."
            lede="Shared standards sit at the centre. Every capability plugs into them — and every business in the group consumes them."
            align="center"
          />
          <Reveal>
            <div className="relative mx-auto max-w-3xl">
              <div aria-hidden className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
              <div aria-hidden className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
              <div className="relative flex flex-col items-center">
                <div className="glass z-10 flex flex-col items-center gap-2 rounded-2xl border border-gold-400/40 px-8 py-6 shadow-[0_20px_70px_-24px_rgba(245,184,77,0.35)]">
                  <Icon name="shield-check" width={22} height={22} className="text-gold-400" />
                  <div className="font-display text-[15px] font-semibold text-ink-50">Shared Standards</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-500">
                    Quality · Security · Data · Documentation
                  </div>
                </div>
                <div className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
                  {["Applied AI", "Automation", "Data Pipelines", "Manufacturing Systems", "Agri-Tech", "Observability"].map((n, i) => (
                    <Reveal key={n} delay={i * 0.06}>
                      <div className="rounded-xl border border-white/10 bg-night-850/80 px-4 py-4 text-center text-[13px] font-medium text-ink-200 backdrop-blur transition-colors hover:border-pulse-400/30">
                        {n}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRINCIPLES ───────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            icon="scale"
            eyebrow="Innovation principles"
            title="The rules we innovate by."
            lede="Four rules keep innovation honest inside the group. They are as much about what we refuse to do as what we build."
            className="mb-0 lg:mb-10"
          />
          <div className="flex flex-col divide-y divide-white/8">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="group flex gap-6 py-6">
                  <span className="font-mono text-sm text-gold-400">{p.n}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-50 transition-colors group-hover:text-pulse-300">
                      {p.t}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-400">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const lineTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="noise relative overflow-hidden border-t border-white/5 bg-night-950/60 py-24 md:py-32">
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-30" />
      <div className="container-x relative">
        <SectionHeader
          icon="trending-up"
          eyebrow="The innovation arc"
          title="From foundations to frontier."
          lede="The group's innovation path in five phases — the line fills as you scroll."
        />
        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* Track */}
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-white/10 md:left-1/2" />
          <motion.div
            aria-hidden
            className="absolute left-[22px] top-2 w-px origin-top bg-gradient-to-b from-pulse-400 to-gold-400 md:left-1/2"
            style={{ scaleY: lineScale, height: "calc(100% - 16px)" }}
          />
          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={item.phase}
                  className={`relative flex md:items-center ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-[22px] top-1 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-pulse-400/40 bg-night-950 text-pulse-300 shadow-[0_0_24px_-4px_rgba(34,213,179,0.5)]">
                      <Icon name={item.icon} width={16} height={16} />
                    </span>
                  </div>
                  <div
                    className={`ml-12 sm:ml-14 w-[calc(100%-3rem)] sm:w-[calc(100%-3.5rem)] md:ml-0 md:w-[calc(50%-3rem)] ${
                      left ? "" : "md:order-2"
                    }`}
                  >
                    <Reveal delay={0.05}>
                      <div
                        className={`rounded-2xl border border-white/8 bg-night-850/80 p-6 backdrop-blur transition-colors hover:border-pulse-400/25 ${
                          left ? "" : "md:text-right"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-gold-400 ${
                            left ? "" : "md:justify-end"
                          }`}
                        >
                          <span>Phase {String(i + 1).padStart(2, "0")}</span>
                          <span className="text-ink-500">· {item.phase}</span>
                        </div>
                        <h3 className="mt-3 font-display text-xl font-semibold text-ink-50">{item.t}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-ink-400">{item.d}</p>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
