import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { CinematicSection } from "../components/scroll/CinematicSection";
import { usePageMeta } from "../hooks/usePageMeta";

const pillars = [
  { icon: "users", t: "Employment", d: "Skilled and semi-skilled roles across six businesses — from civil sites and production floors to engineering teams and agri operations." },
  { icon: "cpu", t: "Technology access", d: "Production-grade AI and automation capabilities made available to businesses that could not build them alone." },
  { icon: "landmark", t: "Infrastructure", d: "Physical systems built to last decades — assets that keep working long after the project is closed." },
  { icon: "sprout", t: "Agriculture", d: "Cultivation science and enterprise training that turn short-cycle crops into family businesses." },
  { icon: "leaf", t: "Sustainability", d: "Low-waste growing, durable construction and supply chains designed to shrink, not shrink-wrapped." },
  { icon: "map-pin", t: "Local development", d: "Procurement, training and operations rooted in the regions the businesses serve." },
];

export default function ImpactPage() {
  usePageMeta({
    title: "Impact",
    description:
      "How BharatX Group measures what matters — employment, technology access, infrastructure, agriculture, sustainability and local economic development.",
    path: "/impact",
    image: "/assets/backgrounds/agri-dusk.jpg",
  });

  return (
    <>
      <PageHero
        icon="leaf"
        eyebrow="Impact"
        title={["Growth you can stand on."]}
        lede="The group reports impact the way it builds infrastructure: what is real, is stated; what is not yet measurable, is named honestly. This page is that standard in practice."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Impact" }]}
      />

      {/* ── PILLARS ──────────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="scale"
            eyebrow="Impact pillars"
            title="Six dimensions, reported qualitatively."
            lede="Until measurement systems mature in every business, the group reports impact qualitatively — by what is true, not by what is convenient."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-white/8 bg-night-850/70 p-7 transition-all duration-300 hover:border-pulse-400/25">
                  <IconBadge icon={p.icon} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-50">{p.t}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-400">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-start gap-3.5 rounded-xl border border-gold-400/25 bg-gold-400/[0.05] p-5">
              <IconBadge icon="info" size="sm" tone="gold" withReveal={false} />
              <p className="text-[13.5px] leading-relaxed text-ink-300">
                <strong className="text-gold-200">A note on numbers:</strong> the group does not
                publish statistics it cannot substantiate. Quantitative disclosures — employment
                figures, output, supply volumes — will be published business by business as
                reporting systems mature.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CINEMATIC ────────────────────────────────────────── */}
      <CinematicSection
        image="/assets/backgrounds/agri-dusk.jpg"
        alt="Farmland at golden hour in rural India"
        kicker="From the ground up"
        kickerIcon="sprout"
        title={["The measure of a group", "is the field it leaves behind."]}
        text="Agriculture and rural enterprise sit at the heart of the ecosystem — because livelihoods that compound are the strongest impact there is."
      />

      {/* ── SUSTAINABILITY NARRATIVE ─────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeader
              icon="leaf"
              eyebrow="Sustainability"
              title="Built to be maintained, not replaced."
              className="mb-8"
            />
            <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-ink-300">
              <Reveal>
                <p>
                  Sustainability at BharatX is an engineering property, not a
                  marketing one. Infrastructure is designed for a service life,
                  not a ribbon-cutting. Manufacturing is specified for the duty
                  cycle, not a sample. Farms are run for the soil, not just the
                  season.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  The practical consequences: low-waste cultivation, durable
                  materials, documented maintenance regimes, and supply chains
                  where a lot can be traced from origin to destination. When a
                  capability can be measured, it is measured — and the
                  measurement is published here.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "recycle", t: "Low-waste by design", d: "Growing rooms, production lines and site works are designed so waste is a specified input, not an accident." },
              { icon: "hard-hat", t: "Service-life thinking", d: "Assets are engineered for decades of use, with maintenance documentation handed over at completion." },
              { icon: "file-check", t: "Traceability as policy", d: "Lots, loads and documents are traceable from origin to buyer — a standard that supports both quality and environmental accountability." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08}>
                <div className="flex gap-5 rounded-xl border border-white/8 bg-night-850/70 p-6">
                  <IconBadge icon={c.icon} size="sm" />
                  <div>
                    <h3 className="font-display text-[15px] font-semibold text-ink-50">{c.t}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-400">{c.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL DEVELOPMENT ────────────────────────────────── */}
      <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="map-pin"
            eyebrow="Local economic development"
            title="Impact is local before it is a headline."
            lede="The group's businesses hire, train and procure in the regions they operate in. The multiplier is the point."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "graduation-cap",
                t: "Skills that stay",
                d: "Training in cultivation, construction, manufacturing and digital operations is built so the capability remains in the community after a project closes.",
              },
              {
                icon: "handshake",
                t: "Local supply first",
                d: "Where specification allows, procurement favours local suppliers and cooperatives — with the documentation discipline that makes that relationship durable.",
              },
              {
                icon: "building-2",
                t: "Enterprise formation",
                d: "The agri businesses are structured to create owner-operated enterprises at farm level, not just jobs — small food companies run by the families who grow the crop.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.09}>
                <div className="h-full rounded-2xl border border-white/8 bg-night-900/70 p-7">
                  <IconBadge icon={c.icon} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-50">{c.t}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-400">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATEMENT ────────────────────────────────────────── */}
      <section className="noise relative overflow-hidden border-t border-white/5 bg-night-950/60 py-24 md:py-32">
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        <div className="container-x relative text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink-50 md:text-5xl">
            <MaskReveal>“We would rather publish</MaskReveal>
            <MaskReveal delay={0.12}>
              <span className="text-pulse-400">one verified number</span>
            </MaskReveal>
            <MaskReveal delay={0.24}>than ten unverified ones.”</MaskReveal>
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-xl text-[14.5px] leading-relaxed text-ink-400">
              That is the group's impact policy in one sentence — and it applies
              to this page, to every company profile, and to every future
              disclosure.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
