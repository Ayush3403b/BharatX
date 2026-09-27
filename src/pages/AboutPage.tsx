import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { CompanyCard } from "../components/company/CompanyCard";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { CinematicSection } from "../components/scroll/CinematicSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { companies } from "../data/companies";
import { Icon } from "../utils/icons";

const AboutSphere = lazy(() => import("../components/three/objects/AboutSphere"));

const principles = [
  { icon: "compass", t: "Thesis before tactics", d: "Every capability starts with a clear thesis about the market and the decade." },
  { icon: "cog", t: "Engineering-first", d: "If it can be specified, we specify it. If it can be tested, we test it." },
  { icon: "users", t: "Operators, not owners", d: "The group provides standard and capital discipline; the companies keep the initiative." },
  { icon: "shield-check", t: "Documentation as respect", d: "For the customer, the regulator, the operator and the next generation." },
  { icon: "trending-up", t: "Compound, don't chase", d: "We would rather grow a capability than chase every category." },
  { icon: "scale", t: "Accountability in public", d: "What we claim, we can show. What we cannot measure yet, we say plainly." },
];

const operate = [
  { n: "01", icon: "search", t: "Choose deliberately", d: "A new business enters the group only when the thesis is strong, the team is right and the market is large enough to matter." },
  { n: "02", icon: "pencil-ruler", t: "Set the standard", d: "Shared standards for quality, documentation, safety and security — applied to every business from day one." },
  { n: "03", icon: "workflow", t: "Run independently", d: "Each company keeps its own website, brand and decision rights. The group provides leverage, not interference." },
  { n: "04", icon: "orbit", t: "Connect, deliberately", d: "Shared customers, supply and technology are identified quarterly — and connected only where they create real value." },
];

export default function AboutPage() {
  usePageMeta({
    title: "About BharatX Group",
    description:
      "Why BharatX exists, how the six businesses operate, the principles behind the group and its long-term vision.",
    path: "/about",
    image: "/assets/backgrounds/industrial.jpg",
  });

  return (
    <>
      <PageHero
        icon="info"
        eyebrow="About the group"
        title={["Built like infrastructure.", "Run like a startup."]}
        lede="BharatX Group is a connected ecosystem of six businesses. This page explains why the group exists, how it operates, and the standard it holds itself to."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        visual={<AboutSphere />}
        visualPlacement="left"
      />

      {/* Who we are */}
      <section className="py-24 md:py-28">
        <div className="container-x grid items-stretch gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-between h-full">
            <div>
              <SectionHeader
                icon="building-2"
                eyebrow="Who we are"
                title="A group company with a venture's nerve."
                className="mb-6 lg:mb-8"
              />
            </div>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-night-900/80 p-6 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-gold-400">Operating Thesis</span>
                  <span className="rounded-full bg-pulse-500/10 px-2.5 py-0.5 font-mono text-[10px] text-pulse-300 border border-pulse-500/20">
                    Institutional Standard
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                    <div className="font-display text-xl font-bold text-pulse-400">6</div>
                    <div className="mt-0.5 text-[11px] text-ink-400">Businesses</div>
                  </div>
                  <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                    <div className="font-display text-xl font-bold text-gold-400">1</div>
                    <div className="mt-0.5 text-[11px] text-ink-400">Standard</div>
                  </div>
                  <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                    <div className="font-display text-xl font-bold text-emerald-400">100%</div>
                    <div className="mt-0.5 text-[11px] text-ink-400">Sovereign</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-between gap-6 text-[15.5px] leading-relaxed text-ink-300 rounded-2xl border border-white/8 bg-night-900/50 p-6 md:p-8 backdrop-blur-sm">
            <Reveal>
              <p>
                BharatX Group brings together six businesses across technology,
                infrastructure, manufacturing, agriculture, food systems and
                venture building. What they share is not a logo — it is a way of
                working: specify, build, test, document, and then make it
                last.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                The group acts as an institutional backbone. It sets standards,
                provides capital discipline and connects its businesses where
                real value exists. It does not micromanage. The companies keep
                their brands, their teams and their decision rights — that is
                deliberate.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                The result is an ecosystem: six independent companies whose
                websites, capabilities and customers are one click apart, and
                whose standards move with them.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why BharatX exists */}
      <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="target"
            eyebrow="Why BharatX exists"
            title="Three gaps the group is built to close."
            lede="Most capability in India sits in isolated companies. BharatX exists to build capability that compounds across domains."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { n: "01", t: "Capability without scale", d: "Strong engineering, agronomy and industrial skills rarely meet the capital, standards and documentation discipline that national and global markets demand. The group applies that discipline where the capability already exists." },
              { n: "02", t: "Growth without continuity", d: "Startups grow fast and fragile. Enterprises are durable and slow. BharatX businesses are built to combine both — venture speed with infrastructure-grade rigor." },
              { n: "03", t: "Origins without reach", d: "Indian agriculture, manufacturing and technology rarely reach global buyers on their own terms. The group builds the traceability, certification and logistics that make origin competitive." },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 0.09}>
                <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-night-900/70 p-7">
                  <span className="font-mono text-sm text-gold-400">{c.n}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink-50">{c.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-400">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic story */}
      <CinematicSection
        image="/assets/backgrounds/industrial.jpg"
        alt="Infrastructure construction at dusk"
        kicker="The story"
        kickerIcon="landmark"
        title={["India's next decade", "is built in layers."]}
        text="Code and concrete. Farms and factories. The group exists to be present in every layer of that build — with the same standard in each."
      >
        <Link to="/industries" className="w-full sm:w-auto">
          <Button variant="ghost" size="lg" withArrow className="w-full sm:w-auto justify-center">
            Explore the industries
          </Button>
        </Link>
      </CinematicSection>

      {/* Ecosystem grid */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="orbit"
            eyebrow="Our ecosystem"
            title="Six businesses, six directions, one standard."
            lede="The full roster of the group — each with its own identity, website and market."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 0.08} className="h-full">
                <CompanyCard company={c} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we operate */}
      <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="workflow"
            eyebrow="How we operate"
            title="The operating model, in four steps."
            lede="A deliberate sequence the group follows — from choosing a business to connecting the ecosystem."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {operate.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09}>
                <div className="group relative h-full rounded-2xl border border-white/8 bg-night-900/70 p-7 transition-colors hover:border-gold-400/30">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={s.icon} accent="#f5b84d" />
                    <span className="font-mono text-3xl font-semibold text-white/8">{s.n}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-50">{s.t}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-400">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="scale"
            eyebrow="Our principles"
            title="Six standards the group does not negotiate."
            align="center"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={(i % 3) * 0.08}>
                <div className="flex h-full gap-4 rounded-xl border border-white/8 bg-night-850/70 p-6 transition-colors hover:border-pulse-400/25">
                  <IconBadge icon={p.icon} size="sm" />
                  <div>
                    <h3 className="font-display text-[15px] font-semibold text-ink-50">{p.t}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Long-term vision */}
      <section className="noise relative overflow-hidden border-t border-white/5 bg-night-950/60 py-28 md:py-36">
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="mb-8 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-400">
                <Icon name="compass" width={13} height={13} />
                <span>Long-term vision</span>
                <span aria-hidden className="h-px w-12 bg-gold-400/50" />
              </div>
            </Reveal>
            <h2 className="text-center font-display font-semibold leading-[1.08] tracking-tight text-ink-50 text-3xl sm:text-4xl md:text-6xl">
              <MaskReveal>The goal is not six companies.</MaskReveal>
              <MaskReveal delay={0.12}>
                <span className="text-gold-400">The goal is one standard</span>
              </MaskReveal>
              <MaskReveal delay={0.24}>that outgrows all of them.</MaskReveal>
            </h2>
            <Reveal delay={0.3}>
              <p className="mx-auto mt-9 max-w-2xl text-center text-base leading-relaxed text-ink-400 md:text-lg">
                BharatX wants to become the reference point for how Indian
                businesses are built: with engineering discipline, public
                accountability and a horizon measured in decades. New businesses
                will join the ecosystem over time — the architecture is already
                built for them.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                <Link to="/leadership" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" withArrow className="w-full sm:w-auto justify-center">
                    Meet the leadership
                  </Button>
                </Link>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" withArrow className="w-full sm:w-auto justify-center">
                    Talk to the group
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
