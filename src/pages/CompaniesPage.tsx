import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { Stats } from "../components/common/Stats";
import { CompanyGrid } from "../components/company/CompanyGrid";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";

export default function CompaniesPage() {
  usePageMeta({
    title: "Companies",
    description:
      "Meet the six businesses of BharatX Group — venture building, AI, infrastructure, precision mobility, agri science and global agricultural trade.",
    path: "/companies",
  });

  return (
    <>
      <PageHero
        icon="building-2"
        eyebrow="The businesses"
        title={["Six companies.", "One direction."]}
        lede="Each company below is an independent business with its own website, teams and markets — and a member of a single connected ecosystem. Explore the profiles, or open every website live in the ecosystem viewer."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Companies" }]}
      >
        <Link to="/ecosystem">
          <Button variant="primary" size="lg" withArrow>
            Open the Ecosystem Viewer
          </Button>
        </Link>
      </PageHero>

      {/* Grid */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.26em] text-ink-500">
              <span className="text-gold-400">01–06</span>
              <span aria-hidden className="h-px flex-1 bg-white/8" />
              <span>Full roster</span>
            </div>
          </Reveal>
          <CompanyGrid />
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-t border-white/5 bg-night-850/50 py-20">
        <div className="container-x">
          <Stats
            items={[
              { value: 6, label: "Independent businesses", icon: "building-2" },
              { value: 6, label: "Live company websites", icon: "globe" },
              { value: 5, suffix: "+", label: "Industry domains", icon: "network" },
              { value: 1, label: "Shared ecosystem standard", icon: "orbit", accent: "#f5b84d" },
            ]}
          />
        </div>
      </section>

      {/* What connects them */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="network"
            eyebrow="What connects them"
            title="Not a portfolio. A working system."
            lede="The group adds value through shared standards — not shared management. Three commitments apply to every business, today and to every company that joins later."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "shield-check",
                t: "A shared standard",
                d: "Quality, documentation, safety and security baselines that apply across technology and concrete alike. If a capability is in the group, it meets the standard.",
              },
              {
                icon: "orbit",
                t: "Deliberate connection",
                d: "Customers, supply chains and technology are shared only where it creates real value — reviewed quarterly, never forced. The ecosystem viewer is how the outside world sees it.",
              },
              {
                icon: "rocket",
                t: "Room to grow",
                d: "The architecture — this site, the data model, the viewer — is built to add more businesses without restructuring. The seventh company gets the same stage.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.09}>
                <div className="h-full rounded-2xl border border-white/8 bg-night-850/70 p-7">
                  <IconBadge icon={c.icon} />
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-50">{c.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-400">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/8 bg-night-950/60 p-8">
              <div className="flex items-center gap-4">
                <IconBadge icon="orbit" size="lg" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-50">
                    See all six websites, live, in one place
                  </h3>
                  <p className="mt-1 text-[13.5px] text-ink-400">
                    The ecosystem viewer loads each company's real website inside BharatX.
                  </p>
                </div>
              </div>
              <Link to="/ecosystem">
                <Button variant="teal" withArrow>
                  Enter the ecosystem
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statement */}
      <section className="noise relative overflow-hidden border-t border-white/5 bg-night-950/60 py-24 md:py-28">
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        <div className="container-x relative text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink-50 md:text-5xl">
            <MaskReveal>“Independent in the market.</MaskReveal>
            <MaskReveal delay={0.12}>
              <span className="text-pulse-400">Connected by design.”</span>
            </MaskReveal>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-500">
              <span aria-hidden className="h-px w-8 bg-gold-400/50" />
              BharatX Group
              <span aria-hidden className="h-px w-8 bg-gold-400/50" />
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link to="/ecosystem" className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300">
                <Icon name="orbit" width={13} height={13} />
                Open the ecosystem
                <Icon name="arrow-right" width={13} height={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
