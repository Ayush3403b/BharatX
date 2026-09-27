import { lazy, Suspense, useRef } from "react";
import { useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { CinematicSection } from "../components/scroll/CinematicSection";
import { Button } from "../components/common/Button";
import { CompanyMarquee } from "../components/common/Marquee";
import { CompanyGrid } from "../components/company/CompanyGrid";
import { IconBadge } from "../components/common/IconBadge";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { Stats } from "../components/common/Stats";
import { TiltCard } from "../components/three/TiltCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { companies } from "../data/companies";
import { industries } from "../data/industries";
import { Icon } from "../utils/icons";
import { ConglomerateManifesto } from "../components/home/ConglomerateManifesto";
import { BusinessVerticalTabs } from "../components/home/BusinessVerticalTabs";
import { StrategicTriadTabs } from "../components/home/StrategicTriadTabs";
import { LeadershipKeynote } from "../components/home/LeadershipKeynote";
import { InstitutionalNewsroom } from "../components/home/InstitutionalNewsroom";
// import { HeroBackgroundSlideshow } from "../components/home/HeroBackgroundSlideshow";

const EcosystemOrbScene = lazy(() => import("../components/three/EcosystemOrbScene"));

export default function HomePage() {
  usePageMeta({
    title: "One Group. Six Businesses. One Connected Ecosystem.",
    description:
      "BharatX Group is a connected ecosystem of six businesses operating across technology, AI, infrastructure, manufacturing, agriculture, food systems and venture building.",
    path: "/",
  });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] lg:min-h-0 lg:h-screen lg:max-h-[920px] items-center overflow-hidden pt-20 md:pt-24 lg:pt-16 lg:pb-4"
      >
        {/* Dynamic Background Slideshow (Home page only) */}
        {/* <HeroBackgroundSlideshow /> */}

        <div className="container-x relative z-10 grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 xl:gap-12 w-full">
          {/* Copy */}
          <div>
            <Reveal immediate>
              <div className="mb-4 lg:mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-400">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10">
                  <Icon name="orbit" width={13} height={13} strokeWidth={1.6} />
                </span>
                The BharatX Group Ecosystem
                <span aria-hidden className="h-px w-12 bg-gold-400/50" />
              </div>
            </Reveal>
            <h1 className="font-display font-semibold leading-[1.03] tracking-tight text-ink-50 text-[2.4rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.5rem] 2xl:text-[4rem]">
              <MaskReveal immediate delay={0.05}>Building the</MaskReveal>
              <MaskReveal immediate delay={0.12}>businesses,</MaskReveal>
              <MaskReveal immediate delay={0.19}>systems and</MaskReveal>
              <MaskReveal immediate delay={0.26}>
                <span className="text-gold-400">technologies</span>
              </MaskReveal>
              <MaskReveal immediate delay={0.33}>that move India</MaskReveal>
              <MaskReveal immediate delay={0.4}>
                <span className="text-pulse-400">forward.</span>
              </MaskReveal>
            </h1>
            {/*<Reveal immediate delay={0.45}>
              <p className="mt-4 lg:mt-5 max-w-xl text-base leading-relaxed text-ink-400 lg:text-[15px] xl:text-lg">
                BharatX Group is six independent businesses — venture building,
                AI, infrastructure, precision manufacturing, agri science and
                global agri-trade — operating as one connected ecosystem with a
                single shared direction.
              </p>
            </Reveal>*/}
            <Reveal immediate delay={0.55}>
              <div className="mt-6 lg:mt-7 flex flex-wrap items-center gap-3.5">
                <Link to="/ecosystem" aria-label="Explore BharatX Ecosystem">
                  <Button variant="primary" size="lg" withArrow>
                    Explore BharatX Ecosystem
                  </Button>
                </Link>
                <Link to="/about" aria-label="Discover BharatX Group">
                  <Button variant="ghost" size="lg">
                    Discover BharatX Group
                  </Button>
                </Link>
              </div>
            </Reveal>

            {/* Mini facts row */}
            <Reveal immediate delay={0.65}>
              <div className="mt-6 lg:mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                {[
                  { k: "150+", l: "Enterprise Deployments" },
                  { k: "480+", l: "Engineered Systems" },
                  { k: "850+", l: "Specialists & Workforce" },
                  { k: "100%", l: "Sovereign Standards" },
                ].map((f) => (
                  <div key={f.l} className="flex items-baseline gap-2.5">
                    <span
                      className="text-xl xl:text-2xl font-bold tracking-tight text-ink-50"
                      style={{ fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif" }}
                    >
                      {f.k}
                    </span>
                    <span className="font-display text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-400">
                      {f.l}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* 3D ecosystem scene */}
          <div className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[420px] lg:h-[460px] xl:h-[540px] 2xl:h-[600px] xl:max-w-[640px]">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-24 w-24 animate-spin rounded-full border border-white/10 border-t-pulse-400/70 [animation-duration:1.4s]" />
                </div>
              }
            >
              <EcosystemOrbScene scrollProgress={scrollYProgress} />
            </Suspense>

            {/* Floating company chips */}
            {[0, 3, 5].map((idx, i) => {
              const c = companies[idx];
              const pos = [
                "right-0 top-6",
                "-left-2 top-1/3",
                "right-4 bottom-24",
              ][i];
              return (
                <MotionChip
                  key={c.id}
                  to={`/companies/${c.slug}`}
                  name={c.shortName}
                  logo={c.logo}
                  accent={c.accentColor}
                  className={pos}
                  delay={i * 1.6}
                />
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-3 lg:bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.34em] text-ink-500">
            Scroll
          </span>
          <span className="relative h-8 w-px overflow-hidden bg-white/10">
            <span className="animate-scroll-hint absolute inset-0 bg-gradient-to-b from-pulse-400 to-gold-400" />
          </span>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <CompanyMarquee />

      {/* ── CONGLOMERATE SCALE MANIFESTO (RIL STYLE) ──────────── */}
      <ConglomerateManifesto />

      {/* ── GROUP INTRODUCTION ───────────────────────────────── */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-50" />
        <div className="container-x relative">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Reveal>
                <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-400">
                  <Icon name="layers" width={13} height={13} />
                  <span>One group. Multiple capabilities.</span>
                  <span aria-hidden className="h-px w-10 bg-gold-400/50" />
                </div>
              </Reveal>
              <h2 className="font-display font-semibold leading-[1.02] tracking-tight text-ink-50 text-5xl md:text-6xl lg:text-[4rem]">
                <MaskReveal>ONE GROUP.</MaskReveal>
                <MaskReveal delay={0.1}>
                  <span className="text-ink-400">MULTIPLE</span>
                </MaskReveal>
                <MaskReveal delay={0.2}>
                  <span className="text-ink-400">CAPABILITIES.</span>
                </MaskReveal>
                <MaskReveal delay={0.3}>
                  <span className="text-pulse-400">ONE DIRECTION.</span>
                </MaskReveal>
              </h2>
            </div>
            <Reveal delay={0.2}>
              <p className="text-base leading-relaxed text-ink-400 md:text-lg">
                BharatX Group operates across technology, AI, infrastructure,
                manufacturing, agriculture, food, venture building and global
                trade. Each business is independently run — and every one is
                built to reinforce the others.
              </p>
            </Reveal>
          </div>

          <Stats
            className="mt-12 md:mt-16"
            items={[
              { value: 150, suffix: "+", label: "Enterprise Deployments", icon: "building-2", accent: "#00bcd4" },
              { value: 480, suffix: "+", label: "Engineered Systems", icon: "layers", accent: "#34e0c5" },
              { value: 850, suffix: "+", label: "Specialists & Workforce", icon: "users", accent: "#8b5cf6" },
              { value: 100, suffix: "%", label: "Sovereign Standards", icon: "orbit", accent: "#f5b84d" },
            ]}
          />
        </div>
      </section>

      {/* ── INTERACTIVE BUSINESS VERTICALS (RIL TABBED BLOCK) ─── */}
      <BusinessVerticalTabs />

      {/* ── COMPANIES DIRECTORY GRID ─────────────────────────── */}
      <section className="relative border-t border-white/5 bg-night-950/20 py-14 md:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              icon="building-2"
              eyebrow="The six businesses"
              title={
                <>
                  Independent companies.
                  <br />
                  <span className="text-pulse-400">One ecosystem.</span>
                </>
              }
              lede="Each business runs its own website, its own teams and its own markets. Explore them here — or open them live inside the BharatX ecosystem viewer."
              className="mb-0"
            />
            <Reveal delay={0.15}>
              <Link
                to="/companies"
                className="group mb-1 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
              >
                View all companies
                <Icon name="arrow-right" width={13} height={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 md:mt-12">
            <CompanyGrid />
          </div>
        </div>
      </section>

      {/* ── HOW THE ECOSYSTEM WORKS ──────────────────────────── */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="container-x">
          <SectionHeader
            icon="orbit"
            eyebrow="How it works"
            title="The ecosystem, in three moves."
            lede="BharatX is not a directory of logos. It is a viewer, a network and a standard — here is how visitors move through it."
          />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="flex flex-col gap-5">
              {[
                {
                  n: "01",
                  icon: "compass",
                  t: "Pick a business",
                  d: "Start from the company relevant to you — venture, AI, infrastructure, mobility, agriculture or trade.",
                },
                {
                  n: "02",
                  icon: "orbit",
                  t: "Open it inside BharatX",
                  d: "Every website loads live in the ecosystem viewer — browser chrome, loading states and security fallbacks included.",
                },
                {
                  n: "03",
                  icon: "external-link",
                  t: "Explore without losing the thread",
                  d: "Switch between all six businesses without leaving, and jump to any official site in one click.",
                },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1}>
                  <div className="flex gap-5 rounded-xl border border-white/8 bg-night-850/70 p-6">
                    <span className="font-mono text-sm text-gold-400">{s.n}</span>
                    <div>
                      <div className="flex items-center gap-3">
                        <IconBadge icon={s.icon} size="sm" />
                        <h3 className="font-display text-lg font-semibold text-ink-50">{s.t}</h3>
                      </div>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-ink-400">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Browser mockup */}
            <Reveal delay={0.15}>
              <TiltCard className="relative overflow-hidden rounded-2xl border border-white/10 bg-night-850 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-pulse-400/70" />
                  <span className="ml-4 flex-1 truncate rounded-md bg-night-950/80 px-3.5 py-1.5 font-mono text-[10.5px] text-ink-500">
                    bharatxgroup.com/ecosystem?company=bharatx-agro
                  </span>
                </div>
                <div className="relative p-6">
                  <img
                    src="/assets/backgrounds/agri-dusk.jpg"
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-44 w-full rounded-lg object-cover md:h-56"
                  />
                  <div className="absolute inset-x-6 top-6 h-44 rounded-lg bg-night-950/35 md:top-6 md:h-56" />
                  <div className="absolute left-10 top-10 flex items-center gap-2.5 rounded-full bg-night-950/85 px-3.5 py-2 backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-gold-400" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-200">
                      BharatX Agro
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between rounded-lg border border-white/8 bg-night-900/90 px-4 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                      36 services · one viewer
                    </span>
                    <Link
                      to="/ecosystem"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold-400 hover:text-gold-300"
                    >
                      Open viewer <Icon name="arrow-up-right" width={13} height={13} />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC ────────────────────────────────────────── */}
      <CinematicSection
        image="/assets/backgrounds/hero-field.jpg"
        alt="Abstract field of connected ecosystem nodes"
        kicker="The BharatX standard"
        kickerIcon="network"
        title={["From the boardroom to the field,", "one group moves as one system."]}
        text="Technology and concrete, code and crops — the six businesses share a standard: engineered, documented, and built to outlast the cycle."
      >
        <Link to="/about">
          <Button variant="ghost" size="lg" withArrow>
            Why BharatX exists
          </Button>
        </Link>
      </CinematicSection>

      {/* ── STRATEGIC PILLARS TRIAD (RIL SUSTAINABILITY/INNOVATION/IMPACT) ── */}
      <StrategicTriadTabs />

      {/* ── INDUSTRIES PREVIEW ───────────────────────────────── */}
      <section className="relative py-14 md:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              icon="factory"
              eyebrow="Industries"
              title="Seven industries, deliberately chosen."
              lede="Every domain the group operates in was chosen for scale, impact and the ability to compound."
              className="mb-0"
            />
            <Reveal delay={0.15}>
              <Link
                to="/industries"
                className="group mb-1 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
              >
                All industries
                <Icon name="arrow-right" width={13} height={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 md:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.slice(0, 4).map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 0.08}>
                <Link
                  to="/industries"
                  className="group flex h-full flex-col rounded-xl border border-white/8 bg-night-850 p-6 transition-all duration-300 hover:border-pulse-400/30 hover:bg-night-800"
                >
                  <div className="flex items-center justify-between">
                    <IconBadge icon={ind.icon} />
                    <span className="font-mono text-[11px] text-ink-600">
                      {String(ind.order).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-50 transition-colors group-hover:text-pulse-300">
                    {ind.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-400">{ind.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ANNUAL KEYNOTE & TRANSCRIPT (RIL AGM STYLE) ── */}
      <LeadershipKeynote />

      {/* ── INSTITUTIONAL NEWSROOM & ANNOUNCEMENTS (RIL STYLE) ── */}
      <InstitutionalNewsroom />

      {/* ── PRINCIPLES STATEMENT ─────────────────────────────── */}
      <section className="noise relative overflow-hidden border-t border-white/5 bg-night-950/60 py-14 md:py-20">
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        <div className="container-x relative">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center font-display text-3xl font-medium leading-[1.25] tracking-tight text-ink-100 md:text-[2.6rem]">
              “We build companies that <span className="text-gold-400">outlast trends</span> —
              engineered like infrastructure, governed like institutions, and
              run like startups that respect their customers.”
            </p>
          </Reveal>
          <div className="mx-auto mt-10 md:mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              { icon: "compass", t: "Long-term ownership", d: "Decisions are made for the decade, not the quarter." },
              { icon: "target", t: "Engineering rigor", d: "Every capability is specified, tested and documented." },
              { icon: "scale", t: "Honest growth", d: "We publish what is real. No invented numbers, no theatre." },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <IconBadge icon={p.icon} size="lg" tone="gold" />
                  <h3 className="font-display text-[15px] font-semibold text-ink-50">{p.t}</h3>
                  <p className="text-[13px] leading-relaxed text-ink-400">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREERS TEASER ───────────────────────────────────── */}
      <section className="relative py-12 md:py-16">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-ember-400/25 bg-gradient-to-br from-ember-400/[0.09] via-night-850 to-night-850 p-8 md:p-11">
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ember-400/10 blur-3xl"
              />
              <div className="relative flex flex-wrap items-center justify-between gap-8">
                <div className="max-w-xl">
                  <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ember-300">
                    <Icon name="briefcase" width={13} height={13} />
                    Careers at BharatX
                  </div>
                  <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink-50 md:text-4xl">
                    Build your career across six industries, under one roof.
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-400">
                    Strategy, operations, technology, AI, engineering,
                    manufacturing, agriculture, sales, finance and marketing —
                    the group hires for depth, not breadth.
                  </p>
                </div>
                <Link to="/careers">
                  <Button variant="ember" size="lg" withArrow>
                    Explore careers
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Floating company chip over the 3D hero */
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

function MotionChip({
  to,
  name,
  logo,
  accent,
  className,
  delay,
}: {
  to: string;
  name: string;
  logo?: string;
  accent: string;
  className: string;
  delay: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-20 hidden lg:block ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 + delay * 0.2 }}
    >
      <Link
        to={to}
        className="glass flex items-center gap-2 rounded-full border border-slate-200/90 py-1.5 pl-2 pr-3.5 shadow-[0_10px_25px_-8px_rgba(15,23,42,0.12)] transition-all hover:border-gold-400 hover:scale-105"
        style={reduced ? undefined : { animation: `float-y ${5 + delay}s ease-in-out ${delay * 0.4}s infinite` }}
      >
        {logo ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-sm">
            <img src={logo} alt={name} className="h-full w-full object-contain" />
          </span>
        ) : (
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 10px ${accent}aa` }}
          />
        )}
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-200">{name}</span>
      </Link>
    </motion.div>
  );
}
