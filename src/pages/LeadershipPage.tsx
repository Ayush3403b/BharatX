import { Button } from "../components/common/Button";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { Link } from "react-router-dom";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";

const governance = [
  { icon: "scale", t: "Clear decision rights", d: "Group-level decisions cover standards, capital and cross-business connections. Everything else belongs to the company — and the boundary is documented, not assumed." },
  { icon: "file-check", t: "Documented standards", d: "Quality, safety, security and documentation standards are written, versioned and applied uniformly. Exceptions are explicit and time-boxed." },
  { icon: "eye", t: "Independent review", d: "Each business is reviewed on its own metrics by the group's standards function — a review of the work, not a review of the managers." },
  { icon: "shield-check", t: "Compliance by default", d: "Regulatory, data and trade compliance is treated as a baseline cost of operating, not a project that happens when an auditor arrives." },
];

const operating = [
  { n: "01", t: "The group sets the standard; the company sets the pace.", d: "Standards are non-negotiable. Execution is owned at company level, with real decision rights and real accountability." },
  { n: "02", t: "Capital discipline, not capital control.", d: "Funding follows thesis and execution — reviewed on evidence, and available to every business in the ecosystem on the same terms." },
  { n: "03", t: "Connections are proposed, not imposed.", d: "Any cross-business opportunity must show value to both parties before it is pursued, and it is reviewed quarterly with both leaders present." },
  { n: "04", t: "Information is shared to the standard, not beyond it.", d: "What is shared across the ecosystem is defined by the data standard. Confidentiality between businesses is respected as a rule, not a courtesy." },
];

export default function LeadershipPage() {
  usePageMeta({
    title: "Leadership",
    description:
      "Leadership philosophy, group-level responsibility, company-level autonomy, governance and operating principles at BharatX Group.",
    path: "/leadership",
  });

  return (
    <>
      <PageHero
        icon="users"
        eyebrow="Leadership"
        title={["Led like an institution.", "Run like a builder."]}
        lede="The leadership of BharatX Group is organised around one question: what decisions must stay together to make the ecosystem work — and what decisions belong to each business, full stop?"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Leadership" }]}
      />

      {/* ── PROFILE ─────────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="user-round"
            eyebrow="Group leadership"
            title="The people behind the standard."
            lede="BharatX Group is founded and led by a team of operators, engineers and technologists. Detailed leadership profiles are published here with each leader's consent."
          />
          <Reveal>
            <div className="grid gap-6 overflow-hidden rounded-3xl border border-white/8 bg-night-850/70 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-night-950 p-10">
                <div aria-hidden className="grid-bg absolute inset-0 opacity-50" />
                <div aria-hidden className="absolute inset-0 aurora" />
                <div className="relative flex flex-col items-center gap-5 text-center">
                  <span className="flex h-24 w-24 items-center justify-center rounded-3xl border border-gold-400/40 bg-night-950/80 font-display text-3xl font-bold text-gold-400 shadow-[0_0_60px_-12px_rgba(245,184,77,0.4)]">
                    BX
                  </span>
                  <div>
                    <div className="font-display text-lg font-semibold text-ink-50">
                      Founder & Group Chief Executive
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                      BharatX Group
                    </div>
                  </div>
                  <p className="max-w-xs text-[12.5px] leading-relaxed text-ink-500">
                    Profile to be published. We share leadership bios with the
                    consent of each leader — this space is reserved, not
                    decorative.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
                {[
                  { icon: "compass", t: "A founder's question", d: "“What would this business look like in ten years — and is today's decision still correct on that timeline?” That question is the group's default mode." },
                  { icon: "cog", t: "An engineer's habit", d: "The founding team thinks in systems: what is the specification, what is the test, who operates it, and what happens when it fails?" },
                  { icon: "handshake", t: "A builder's respect", d: "Every business in the group is led by its own people. The group's role is to remove friction and set the standard — never to stand between a company and its customers." },
                ].map((b, i) => (
                  <div key={b.t} className="flex gap-5">
                    <IconBadge icon={b.icon} size="sm" tone={i === 0 ? "gold" : "teal"} withReveal={false} />
                    <div>
                      <h3 className="font-display text-[15px] font-semibold text-ink-50">{b.t}</h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-400">{b.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────── */}
      <section className="noise relative overflow-hidden border-t border-white/5 bg-night-950/60 py-24 md:py-32">
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="mb-8 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-400">
                <Icon name="compass" width={13} height={13} />
                <span>Leadership philosophy</span>
                <span aria-hidden className="h-px w-12 bg-gold-400/50" />
              </div>
            </Reveal>
            <h2 className="text-center font-display font-semibold leading-[1.1] tracking-tight text-ink-50 text-3xl sm:text-4xl md:text-6xl">
              <MaskReveal>Power at a group level is</MaskReveal>
              <MaskReveal delay={0.12}>
                <span className="text-gold-400">a liability</span>
              </MaskReveal>
              <MaskReveal delay={0.24}>unless it is constrained.</MaskReveal>
            </h2>
            <Reveal delay={0.3}>
              <p className="mx-auto mt-9 max-w-2xl text-center text-base leading-relaxed text-ink-400 md:text-lg">
                The group deliberately holds only what the ecosystem needs:
                standards, capital discipline and the connections that create
                real value for more than one business. Everything else —
                customers, product, pace, pride — stays with the companies.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GROUP RESPONSIBILITY vs AUTONOMY ─────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="scale"
            eyebrow="The division of power"
            title="Group responsibility vs. company autonomy."
            lede="The line between the two is the most important design decision the group made."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-gold-400/25 bg-gold-400/[0.04] p-8">
                <div className="flex items-center gap-3">
                  <IconBadge icon="orbit" tone="gold" />
                  <h3 className="font-display text-xl font-semibold text-ink-50">Held by the group</h3>
                </div>
                <ul className="mt-6 flex flex-col gap-4">
                  {[
                    "The shared standard: quality, safety, security, documentation",
                    "Capital discipline and funding reviews",
                    "Cross-business connections, proposed and reviewed",
                    "The ecosystem itself: this platform, the viewer, the identity",
                    "Long-horizon strategy and the ten-year view",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-300">
                      <Icon name="check" width={15} height={15} className="mt-0.5 shrink-0 text-gold-400" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-pulse-400/25 bg-pulse-400/[0.04] p-8">
                <div className="flex items-center gap-3">
                  <IconBadge icon="rocket" />
                  <h3 className="font-display text-xl font-semibold text-ink-50">Kept by each company</h3>
                </div>
                <ul className="mt-6 flex flex-col gap-4">
                  {[
                    "Brand, website and public identity",
                    "Product, engineering and delivery decisions",
                    "Customers, pricing and commercial terms",
                    "Hiring, teams and company culture",
                    "Daily pace, priorities and experimentation",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-300">
                      <Icon name="check" width={15} height={15} className="mt-0.5 shrink-0 text-pulse-400" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GOVERNANCE ───────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="shield-check"
            eyebrow="Governance"
            title="Governance as infrastructure."
            lede="Four mechanisms keep the division of power honest as the ecosystem grows."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {governance.map((g, i) => (
              <Reveal key={g.t} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-5 rounded-2xl border border-white/8 bg-night-900/70 p-7">
                  <IconBadge icon={g.icon} size="sm" />
                  <div>
                    <h3 className="font-display text-[16px] font-semibold text-ink-50">{g.t}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-400">{g.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPERATING PRINCIPLES ─────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            icon="target"
            eyebrow="Operating principles"
            title="Four principles, applied every day."
            lede="Printed on no wall. Enforced in every review."
            className="mb-0 lg:mb-8"
          />
          <div className="flex flex-col divide-y divide-white/8">
            {operating.map((p, i) => (
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
        <div className="container-x">
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-6 rounded-2xl border border-white/8 bg-night-950/60 p-6 sm:p-8">
              <p className="max-w-xl text-[14.5px] leading-relaxed text-ink-400">
                Leadership profiles are published here as they are shared with
                the group's consent. In the meantime, the operating model above
                is the honest description of how BharatX is actually run.
              </p>
              <Link to="/careers" className="w-full sm:w-auto">
                <Button variant="teal" withArrow className="w-full sm:w-auto justify-center">
                  Work with this model
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
