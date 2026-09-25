import { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { useScroll } from "framer-motion";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { CinematicSection } from "../components/scroll/CinematicSection";
import { TiltCard } from "../components/three/TiltCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { companies } from "../data/companies";
import { industries } from "../data/industries";
import { Icon } from "../utils/icons";

const ShowcaseObjectScene = lazy(() => import("../components/three/ShowcaseObjectScene"));

export default function IndustriesPage() {
  usePageMeta({
    title: "Industries",
    description:
      "The seven industries BharatX Group operates in — AI & technology, infrastructure, manufacturing, agriculture, food systems, global trade and venture building.",
    path: "/industries",
    image: "/assets/backgrounds/craft-metal.jpg",
  });

  const showcaseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <PageHero
        icon="factory"
        eyebrow="Industries"
        title={["Seven industries.", "One standard."]}
        lede="BharatX Group does not spread thin. It works in a deliberately small set of industries where it can build real depth — and where Indian origin meets global demand."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
      />

      {/* ── INDUSTRY GRID ────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * 0.08} className={i === 0 ? "lg:col-span-1" : ""}>
                <TiltCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-night-850 p-5 sm:p-7 transition-colors duration-300 hover:border-pulse-400/30">
                  <div className="flex items-start justify-between">
                    <IconBadge icon={ind.icon} size="lg" />
                    <span className="font-mono text-4xl font-semibold text-white/6">
                      {String(ind.order).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-[22px] font-semibold tracking-tight text-ink-50">
                    {ind.name}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-400">{ind.description}</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-500">{ind.detail}</p>
                  <div className="mt-auto pt-6">
                    <div className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-600">
                      Businesses in this domain
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ind.companySlugs.map((slug) => {
                        const c = companies.find((x) => x.slug === slug);
                        if (!c) return null;
                        return (
                          <Link
                            key={slug}
                            to={`/companies/${slug}`}
                            className="group/chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12px] font-medium text-ink-200 transition-all duration-300 hover:border-white/25 hover:text-white"
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.accentColor }} />
                            {c.shortName}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}

            {/* Filler CTA card to complete the 3x3 grid */}
            <Reveal delay={0.16}>
              <Link
                to="/companies"
                className="group flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.015] p-7 text-center transition-all duration-300 hover:border-gold-400/40 hover:bg-gold-400/[0.04]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-400 transition-transform duration-300 group-hover:scale-110">
                  <Icon name="plus-circle" width={26} height={26} />
                </span>
                <div>
                  <div className="font-display text-lg font-semibold text-ink-100">
                    The next industry
                  </div>
                  <div className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
                    The architecture is ready for the seventh domain. New
                    industries join the grid when the thesis is strong enough.
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3D SHOWCASE OBJECT ───────────────────────────────── */}
      <section
        ref={showcaseRef}
        className="noise relative overflow-hidden border-t border-white/5 bg-night-950/70 py-24 md:py-32"
      >
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              icon="cog"
              eyebrow="The engineering narrative"
              title="Precision is the common language."
              lede="Whether it is a neural pipeline, a bridge deck, a caster wheel or a spice lot, the group works the same way: specify the load, engineer to it, test what you build, document everything. This object turns with your scroll — as the group's capabilities compound."
              className="mb-8"
            />
            <div className="flex flex-col gap-4">
              {[
                { icon: "target", t: "Specified before built" },
                { icon: "badge-check", t: "Tested before shipped" },
                { icon: "file-check", t: "Documented for the operator" },
              ].map((r, i) => (
                <Reveal key={r.t} delay={i * 0.08}>
                  <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-night-850/70 px-6 py-4">
                    <IconBadge icon={r.icon} size="sm" tone="gold" />
                    <span className="font-display text-[15px] font-medium text-ink-100">{r.t}</span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-ink-600">
                      Standard {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="relative h-[300px] xs:h-[360px] md:h-[520px]">
            <div aria-hidden className="absolute inset-0 rounded-full bg-pulse-500/[0.05] blur-3xl" />
            <div aria-hidden className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-gold-400/[0.06] blur-3xl" />
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-16 w-16 animate-spin rounded-full border border-white/10 border-t-gold-400/70 [animation-duration:1.4s]" />
                </div>
              }
            >
              <ShowcaseObjectScene scrollProgress={scrollYProgress} />
            </Suspense>
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[9.5px] uppercase tracking-[0.3em] text-ink-600">
              Scroll-linked · React Three Fiber
            </div>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC ────────────────────────────────────────── */}
      <CinematicSection
        image="/assets/backgrounds/craft-metal.jpg"
        alt="Precision machined metal components under dramatic light"
        kicker="Made in India"
        kickerIcon="factory"
        title={["Made in India.", "Standard of the world."]}
        text="Our manufacturing and trade businesses exist to close that gap — origin quality, global discipline."
      />

      {/* ── WHY THESE INDUSTRIES ─────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="compass"
            eyebrow="Why these industries"
            title="Chosen for three properties."
            lede="Every industry in the group's portfolio passed the same three-part test before any business was built or acquired."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                icon: "trending-up",
                t: "Structural demand",
                d: "The industry has to grow with India's scale — population, urbanisation, digitalisation — not against it. Cycles welcome; extinction is disqualifying.",
              },
              {
                n: "02",
                icon: "globe",
                t: "Global arbitrage",
                d: "India must hold a genuine advantage in the industry — cost structure, geography, talent or supply — so the business earns in strong currencies or serves a continental market.",
              },
              {
                n: "03",
                icon: "layers",
                t: "Standard leverage",
                d: "The group's engineering, documentation and quality standard must make the business measurably better than an undisciplined competitor. If it can't, the industry doesn't qualify.",
              },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 0.09}>
                <div className="h-full rounded-2xl border border-white/8 bg-night-850/70 p-8">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={c.icon} />
                    <span className="font-mono text-sm text-gold-400">{c.n}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-50">{c.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-400">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS ──────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-night-850/50 py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-50 md:text-3xl">
              The businesses behind these industries
            </h2>
            <Link
              to="/companies"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
            >
              All companies
              <Icon name="arrow-right" width={13} height={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {companies.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.05}>
                <Link
                  to={`/companies/${c.slug}`}
                  className="group flex h-full flex-col items-center gap-3 rounded-xl border border-white/8 bg-night-900/70 p-5 text-center transition-all duration-300 hover:border-white/20"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl font-mono text-[13px] font-semibold transition-transform duration-300 group-hover:scale-105"
                    style={{
                      color: c.accentColor,
                      background: `${c.accentColor}14`,
                      border: `1px solid ${c.accentColor}3a`,
                    }}
                  >
                    {c.monogram}
                  </span>
                  <span className="text-[12.5px] font-semibold text-ink-200">{c.shortName}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
