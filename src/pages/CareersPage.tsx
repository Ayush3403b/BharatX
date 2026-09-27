import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";

const departments = [
  { icon: "compass", t: "Strategy" },
  { icon: "workflow", t: "Operations" },
  { icon: "cpu", t: "Technology" },
  { icon: "brain-circuit", t: "AI" },
  { icon: "pencil-ruler", t: "Engineering" },
  { icon: "factory", t: "Manufacturing" },
  { icon: "sprout", t: "Agriculture" },
  { icon: "trending-up", t: "Sales" },
  { icon: "file-check", t: "Finance" },
  { icon: "lightbulb", t: "Marketing" },
];

const streams = [
  { icon: "rocket", t: "Venture & strategy teams", d: "Business design, capital structure and operating models — with BharatX Ventures.", tag: "Always open" },
  { icon: "brain-circuit", t: "AI & engineering teams", d: "Applied AI, automation and production engineering — with AIxperts Labs.", tag: "Always open" },
  { icon: "hard-hat", t: "Infrastructure teams", d: "Civil design, site management and operations — with BharatX Infratech.", tag: "Project-linked" },
  { icon: "sprout", t: "Agri & food teams", d: "Cultivation, processing, cold chain and rural enterprise — with BharatX Agro.", tag: "Always open" },
  { icon: "cpu", t: "Frontier R&D (BharatX Labs)", d: "Multilingual LLMs, edge silicon integration and sovereign intelligence — with BharatX Labs.", tag: "Research Fellows" },
];

const process = [
  { n: "01", icon: "mail", t: "Introduce yourself", d: "Send a message through the contact form with the Careers inquiry type — or write to the team of the specific business you want to join." },
  { n: "02", icon: "search", t: "A real conversation", d: "A first conversation about your work and your ambitions, not a screening. If the role isn't right, we say so — and keep your profile if you'd like that." },
  { n: "03", icon: "users", t: "Work with the team", d: "Meet the people you'd work with. The bar is competence and character, demonstrated in work, not in interview theatre." },
  { n: "04", icon: "briefcase", t: "Offer & onboarding", d: "A clear offer, a documented onboarding plan, and the same standard the group applies to everything else: expectations stated before day one." },
];

export default function CareersPage() {
  usePageMeta({
    title: "Careers",
    description:
      "Build your career across six industries at BharatX Group — strategy, operations, technology, AI, engineering, manufacturing, agriculture, sales, finance and marketing.",
    path: "/careers",
    image: "/assets/backgrounds/skyline-india.jpg",
  });

  return (
    <>
      <PageHero
        icon="briefcase"
        eyebrow="Careers"
        title={["One group.", "Ten kinds of work."]}
        lede="Strategy, operations, technology, AI, engineering, manufacturing, agriculture, sales, finance and marketing — across six businesses, under one standard. This is a place to build depth."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      >
        <Link to="/contact?type=careers" className="w-full sm:w-auto">
          <Button variant="ember" size="lg" withArrow className="w-full sm:w-auto">
            Introduce yourself
          </Button>
        </Link>
      </PageHero>

      {/* ── WHY BHARATX ──────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="target"
            eyebrow="Why BharatX"
            title="Why people join a group, not just a company."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "layers", t: "Depth over rotation", d: "The group is stable enough to let you go deep. Ten functions, six businesses — you can change the industry without changing the standard or your people." },
              { icon: "cog", t: "A standard you can trust", d: "Specifications, tests and documentation are part of the job, not a compliance overlay. The work you do is built to last — and it shows." },
              { icon: "orbit", t: "The ecosystem effect", d: "Every capability you build is visible to the whole group. A good project here is a reference, a promotion and a new internal customer at the same time." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.09}>
                <div className="h-full rounded-2xl border border-white/8 bg-night-850/70 p-7">
                  <IconBadge icon={c.icon} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-50">{c.t}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-400">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURE ──────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              icon="users"
              eyebrow="Culture"
              title="Serious about the work. Light about the theatre."
              lede="The group's culture is a working culture: meetings are short, documents are real, mistakes are examined without blame, and the standard is the same for everyone — including the people who set it."
              className="mb-8"
            />
            <div className="flex flex-col gap-4">
              {[
                { t: "Direct, by default", d: "Disagreement is expected and stated plainly. The hierarchy is about decision rights, not about who is allowed to speak." },
                { t: "Documented, honestly", d: "If it matters, it is written down. And what is written down is what is true — including what we don't know yet." },
                { t: "Built to last", d: "We optimise for the decade. That shows in hiring, in engineering, and in the patience we give hard problems." },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-xl border border-white/8 bg-night-900/70 p-5">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-400" />
                    <div>
                      <h3 className="font-display text-[15px] font-semibold text-ink-50">{c.t}</h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-ink-400">{c.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img
                src="/assets/backgrounds/industrial.jpg"
                alt="Infrastructure work site at dusk"
                loading="lazy"
                className="h-[420px] w-full object-cover md:h-[480px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-400">
                  The work
                </div>
                <div className="mt-2 font-display text-xl font-semibold text-ink-50">
                  Six industries, one working standard.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DEPARTMENTS ──────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="grid-3x3"
            eyebrow="Career paths & departments"
            title="Ten functions, across every business."
            lede="Each function operates inside each company — the same role can look different on a construction site than in an AI lab, and that is the point."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {departments.map((d, i) => (
              <Reveal key={d.t} delay={(i % 5) * 0.05}>
                <Link
                  to="/contact"
                  className="group flex h-full flex-col items-center gap-3.5 rounded-xl border border-white/8 bg-night-850/70 p-6 text-center transition-all duration-300 hover:border-ember-400/40 hover:bg-night-800"
                >
                  <IconBadge icon={d.icon} size="sm" tone={i % 2 ? "teal" : "gold"} />
                  <span className="text-[13.5px] font-semibold text-ink-100 transition-colors group-hover:text-ink-50">
                    {d.t}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS / STREAMS ─────────────────────────── */}
      <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="briefcase"
            eyebrow="Current opportunities"
            title="Where the group is hiring now."
            lede="Live role listings are published on each business's own website and through the careers inbox. These are the standing hiring streams — open to a strong introduction at any time."
          />
          <div className="flex flex-col gap-3">
            {streams.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <div className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-xl border border-white/8 bg-night-900/70 p-5 sm:p-6 transition-colors hover:border-white/18">
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <IconBadge icon={s.icon} />
                    <span className="sm:hidden rounded-full border border-pulse-400/30 bg-pulse-400/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-pulse-300">
                      {s.tag}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[16px] font-semibold text-ink-50">{s.t}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-400">{s.d}</p>
                  </div>
                  <span className="hidden sm:inline-block rounded-full border border-pulse-400/30 bg-pulse-400/10 px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-pulse-300">
                    {s.tag}
                  </span>
                  <Link
                    to="/contact?type=careers"
                    className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-[13px] font-semibold text-ink-100 transition-all duration-300 hover:border-gold-400/50 hover:text-gold-300"
                  >
                    Apply
                    <Icon name="arrow-right" width={13} height={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="mt-6 flex items-start gap-2.5 text-[12.5px] leading-relaxed text-ink-500">
              <Icon name="info" width={14} height={14} className="mt-0.5 shrink-0 text-ink-600" />
              We publish role openings as they are created, per business. If you don't see your
              exact role, introduce yourself anyway — the group keeps profiles for the standing
              streams above and reaches out when a match appears.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── APPLICATION PROCESS ──────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="workflow"
            eyebrow="Application process"
            title="Four steps. No theatre."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09}>
                <div className="relative h-full rounded-2xl border border-white/8 bg-night-850/70 p-7">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={s.icon} accent="#e86a4a" />
                    <span className="font-mono text-3xl font-semibold text-white/8">{s.n}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-50">{s.t}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-400">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <Link to="/contact?type=careers" className="w-full sm:w-auto">
                <Button variant="ember" size="lg" withArrow className="w-full sm:w-auto">
                  Start an application
                </Button>
              </Link>
              <Link to="/ecosystem" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  See which business fits you
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
