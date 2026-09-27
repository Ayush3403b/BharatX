import { lazy } from "react";
import { Button } from "../components/common/Button";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { Link } from "react-router-dom";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";

const LeadershipObject = lazy(() => import("../components/three/objects/LeadershipObject"));

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
        visual={<LeadershipObject />}
        visualPlacement="right"
      />

      {/* ── PROFILE ─────────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="user-round"
            eyebrow="Group Leadership"
            title="The visionary behind the standard."
            lede="BharatX Group is founded on institutional rigor, sovereign engineering, and long-term national economic leadership."
          />
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night-850/80 backdrop-blur-2xl shadow-2xl">
              {/* Ambient atmospheric lighting */}
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold-400/[0.08] blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-pulse-500/[0.06] blur-3xl" />

              <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                {/* Portrait Column */}
                <div className="relative flex flex-col justify-end overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] rounded-2xl m-3 sm:m-4 border border-white/10 bg-night-950">
                  <img
                    src="/leadership/pradeep-kumar.png"
                    alt="Pradeep Kumar — Founder & Leader, BharatX Group"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/20 to-transparent opacity-90" />
                  
                  {/* Floating Identity Card on Image */}
                  <div className="relative z-10 p-6 sm:p-8 backdrop-blur-md bg-night-950/70 border-t border-white/10 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-gold-400">
                        Founder &amp; Visionary
                      </span>
                    </div>
                    <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Pradeep Kumar
                    </div>
                    <div className="mt-1 text-xs font-mono uppercase tracking-wider text-ink-300">
                      BharatX Group · Institutional Founder
                    </div>
                  </div>
                </div>

                {/* Narrative & Quote Column */}
                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:pl-4">
                  <div>
                    {/* Vision Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-gold-400 mb-6">
                      <Icon name="sparkles" width={13} height={13} />
                      <span>National Economic Vision</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                      Architecting India’s Next Economic Decade.
                    </h3>

                    {/* Featured Decorated Quote Block */}
                    <div className="relative mt-6 rounded-2xl border-l-4 border-gold-400 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-md">
                      <div aria-hidden className="absolute -top-3 right-6 font-serif text-7xl font-bold text-gold-400/20 select-none">
                        “
                      </div>
                      <blockquote className="relative z-10 text-[15.5px] sm:text-[17px] font-medium leading-relaxed text-ink-100 italic">
                        “Aligned with the national vision of <strong className="text-gold-400 not-italic font-semibold">Viksit Bharat 2047</strong>, he is committed to building sustainable, technology-driven enterprises that strengthen India’s industrial ecosystem and contribute to the country’s long-term economic leadership.”
                      </blockquote>
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/8 text-xs font-mono text-ink-400">
                        <span className="text-gold-400 font-semibold">— Pradeep Kumar</span>
                        <span>BharatX Group</span>
                      </div>
                    </div>

                    {/* Three Core Leadership Mandates */}
                    <div className="mt-8 space-y-4">
                      {[
                        {
                          icon: "compass",
                          tone: "gold" as const,
                          title: "Sovereign Industrial Capacity",
                          desc: "Engineering domestic manufacturing, resilient infrastructure, and high-duty cycle systems designed for decades of compounding value.",
                        },
                        {
                          icon: "cpu",
                          tone: "teal" as const,
                          title: "Indigenous Technology & Silicon",
                          desc: "Fostering frontier AI foundational models, robotics, and deeptech skunkworks to eliminate reliance on foreign black-box dependencies.",
                        },
                        {
                          icon: "orbit",
                          tone: "gold" as const,
                          title: "Interconnected Economic Engine",
                          desc: "Unifying six cross-sector operating businesses under one institutional standard of quality, capital discipline, and governance.",
                        },
                      ].map((item) => (
                        <div key={item.title} className="flex items-start gap-4 rounded-xl border border-white/6 bg-night-900/60 p-4 transition-all hover:border-gold-400/20">
                          <IconBadge icon={item.icon} size="sm" tone={item.tone} withReveal={false} />
                          <div>
                            <div className="font-display text-sm font-semibold text-white">{item.title}</div>
                            <p className="mt-1 text-xs text-ink-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust & Alignment Footer Bar */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-ink-400">
                    <span className="flex items-center gap-2 text-ink-300">
                      <Icon name="shield-check" width={14} height={14} className="text-emerald-400" />
                      Constitutional Governance Standard
                    </span>
                    <span className="text-gold-400 font-semibold">Viksit Bharat 2047 Committed</span>
                  </div>
                </div>
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
        <div className="container-x grid items-stretch gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left Column: Header + Decision Architecture Card */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <SectionHeader
                icon="target"
                eyebrow="Operating principles"
                title="Four principles, applied every day."
                lede="Printed on no wall. Enforced in every review."
                className="mb-6 lg:mb-8"
              />
            </div>

            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-night-900/80 p-6 md:p-7 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <span className="font-mono text-xs uppercase tracking-widest text-gold-400">
                    Decision Rights Framework
                  </span>
                  <span className="rounded-full bg-pulse-500/10 px-2.5 py-0.5 font-mono text-[10px] text-pulse-300 border border-pulse-500/20">
                    Institutional Standard
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-400/10 text-gold-400">
                      <Icon name="compass" width={15} height={15} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Local Autonomy, Shared Discipline</div>
                      <p className="mt-1 text-xs text-ink-400 leading-relaxed">
                        Operating business CEOs hold full tactical execution rights; the group governs risk, balance-sheet allocation, and core quality standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pulse-400/10 text-pulse-400">
                      <Icon name="workflow" width={15} height={15} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Documented Accountability</div>
                      <p className="mt-1 text-xs text-ink-400 leading-relaxed">
                        Every material decision is written with clear owners, assumptions, and measurable test criteria before resources are deployed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-ink-400">
                  <span>Operating Protocol</span>
                  <span className="text-gold-400">Group Constitution Certified</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 4 Principle Cards */}
          <div className="flex flex-col justify-between divide-y divide-white/8 rounded-2xl border border-white/8 bg-night-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl">
            {operating.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="group flex gap-5 py-5 first:pt-0 last:pb-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold-400/30 bg-gold-400/10 font-mono text-xs font-semibold text-gold-400">
                    {p.n}
                  </span>
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
