import { lazy, Suspense, useRef } from "react";
import { useScroll } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Button } from "../components/common/Button";
import { IconBadge } from "../components/common/IconBadge";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { RelatedCompanies } from "../components/company/RelatedCompanies";
import { IframeViewer } from "../components/ecosystem/IframeViewer";
import { CinematicSection } from "../components/scroll/CinematicSection";
import { TiltCard } from "../components/three/TiltCard";
import { NotFoundPage } from "./NotFoundPage";
import { usePageMeta } from "../hooks/usePageMeta";
import { companies, getCompany, relatedCompanies } from "../data/companies";
import { getEcosystemSite } from "../data/ecosystem";
import { Icon } from "../utils/icons";

const ShowcaseObjectScene = lazy(() => import("../components/three/ShowcaseObjectScene"));

export default function CompanyDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const company = getCompany(slug);

  usePageMeta(
    company
      ? {
          title: company.name,
          description: company.description,
          path: `/companies/${company.slug}`,
          image: company.heroImage,
        }
      : {
          title: "Company not found",
          description: "This company profile does not exist.",
          path: "/companies",
        },
  );

  if (!company) return <NotFoundPage />;

  return (
    <CompanyProfile company={company} />
  );
}

function CompanyProfile({ company }: { company: (typeof companies)[number] }) {
  const site = getEcosystemSite(company.id);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[86vh] items-end overflow-hidden pb-16 pt-36 md:pb-20">
        <img
          src={company.heroImage}
          alt={`${company.name} — ${company.category}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-950/50 to-night-950/70" />

        <div className="container-x relative z-10 w-full">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Companies", to: "/companies" },
              { label: company.shortName },
            ]}
            className="mb-8"
          />
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-2xl">
              <Reveal>
                <div className="mb-6 flex items-center gap-4">
                  {company.logo ? (
                    <div className="flex h-16 w-auto min-w-[70px] max-w-[180px] shrink-0 items-center justify-center rounded-2xl bg-white px-3.5 py-2 shadow-xl">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-auto max-h-12 object-contain"
                      />
                    </div>
                  ) : (
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-[15px] font-semibold shadow-lg backdrop-blur"
                      style={{
                        color: company.accentColor,
                        background: "rgba(7,10,15,0.75)",
                        border: `1px solid ${company.accentColor}66`,
                      }}
                    >
                      {company.monogram}
                    </span>
                  )}
                  <span
                    className="flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] backdrop-blur"
                    style={{
                      color: company.accentColor,
                      borderColor: `${company.accentColor}44`,
                      background: "rgba(7,10,15,0.6)",
                    }}
                  >
                    <Icon name={company.icon} width={13} height={13} />
                    {company.category}
                  </span>
                </div>
              </Reveal>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.02] tracking-tight text-ink-50 md:text-7xl">
                <MaskReveal>{company.name}</MaskReveal>
              </h1>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300 md:text-lg">
                  {company.description}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.25} className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href={company.website} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" withArrow className="w-full sm:w-auto">
                    Visit Website
                  </Button>
                </a>
                <Link to={`/ecosystem?company=${company.id}`} className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                    <span className="flex items-center gap-2.5">
                      <Icon name="orbit" width={15} height={15} />
                      Open Inside BharatX
                    </span>
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              icon="info"
              eyebrow={`About ${company.shortName}`}
              title="What this business does."
              className="mb-6"
            />
            <div
              className="hidden h-px w-full lg:block"
              style={{ background: `linear-gradient(90deg, ${company.accentColor}, transparent)` }}
            />
          </div>
          <div className="flex flex-col gap-6 text-[15.5px] leading-relaxed text-ink-300">
            {company.longDescription.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="mt-2 grid grid-cols-2 gap-6 rounded-2xl border border-white/8 bg-night-850/70 p-7 sm:grid-cols-3">
                <MetaStat icon="globe" label="Website" value={company.domain} />
                <MetaStat icon="network" label="Ecosystem ID" value={String(company.order).padStart(2, "0")} />
                <MetaStat icon="building-2" label="Group" value="BharatX" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="cog"
            eyebrow="Capabilities"
            title="What we build."
            lede={`The core capabilities of ${company.name} — each one a working discipline, not a slogan.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={(i % 3) * 0.07}>
                <TiltCard className="group h-full overflow-hidden rounded-2xl border border-white/8 bg-night-900/70 p-6 transition-colors duration-300 hover:border-white/18">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={cap.icon} accent={company.accentColor} size="sm" />
                    <span className="font-mono text-[11px] text-ink-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[16.5px] font-semibold text-ink-50">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-400">{cap.description}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC ────────────────────────────────────────── */}
      <CinematicSection
        image={company.cinematicImage}
        alt={`${company.name} — cinematic view`}
        kicker={`${company.shortName} in focus`}
        kickerIcon={company.icon}
        title={company.vision.split(" ").length > 12 ? [company.vision] : [company.vision]}
        height="standard"
        text={`A look at the world ${company.shortName} works in.`}
      />

      {/* ── APPLICATIONS ─────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="boxes"
            eyebrow="Applications & solutions"
            title="Where this capability goes to work."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {company.applications.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 0.08}>
                <div
                  className="group flex h-full items-start gap-5 rounded-2xl border border-white/8 bg-night-850/70 p-7 transition-all duration-300 hover:bg-night-800"
                  style={{ borderLeftColor: `${company.accentColor}66`, borderLeftWidth: 2 }}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                    style={{
                      color: company.accentColor,
                      background: `${company.accentColor}12`,
                      border: `1px solid ${company.accentColor}33`,
                    }}
                  >
                    <Icon name={company.icon} width={18} height={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-50">{a.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-400">{a.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOCUS + SHOWCASE 3D ──────────────────────────────── */}
      <section ref={showcaseRef} className="relative overflow-hidden border-t border-white/5 bg-night-950/70 py-24 md:py-28">
        <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              icon="target"
              eyebrow="Focus areas"
              title="What we will not compromise."
              className="mb-10"
            />
            <div className="flex flex-col divide-y divide-white/8">
              {company.focusAreas.map((f, i) => (
                <Reveal key={f} delay={i * 0.08}>
                  <div className="group flex items-center gap-6 py-6">
                    <span className="font-mono text-sm text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-xl font-medium tracking-tight text-ink-100 transition-colors group-hover:text-white md:text-2xl">
                      {f}
                    </h3>
                    <span className="ml-auto h-px w-16 bg-white/10 transition-all duration-500 group-hover:w-24 group-hover:bg-gold-400/50" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="relative h-[380px] md:h-[460px]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ background: `${company.accentColor}14` }}
            />
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-16 w-16 animate-spin rounded-full border border-white/10 border-t-gold-400/70 [animation-duration:1.4s]" />
                </div>
              }
            >
              <ShowcaseObjectScene scrollProgress={showcaseProgress} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="workflow"
            eyebrow="How we work"
            title="The sequence, start to finish."
            lede={`Every engagement at ${company.name} follows the same disciplined sequence.`}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {company.howWeWork.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.09}>
                <div className="relative h-full rounded-2xl border border-white/8 bg-night-850/70 p-7">
                  <span
                    className="font-mono text-4xl font-semibold"
                    style={{ color: `${company.accentColor}55` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-50">{s.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-400">{s.description}</p>
                  {i < company.howWeWork.length - 1 && (
                    <span aria-hidden className="absolute -right-4 top-1/2 hidden h-px w-4 bg-white/15 lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ───────────────────────────────────────────── */}
      <section className="noise relative overflow-hidden border-t border-white/5 bg-night-950/60 py-24 md:py-32">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-40 w-[40rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `${company.accentColor}12` }}
        />
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border font-display text-2xl"
                style={{ color: company.accentColor, borderColor: `${company.accentColor}44` }}
              >
                “
              </span>
            </Reveal>
            <h2 className="mt-8 font-display text-3xl font-semibold leading-[1.2] tracking-tight text-ink-50 md:text-[2.6rem]">
              <MaskReveal>{company.vision}</MaskReveal>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.26em] text-ink-500">
                The vision — {company.name}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── RELATED ──────────────────────────────────────────── */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeader
            icon="orbit"
            eyebrow="Stay in the ecosystem"
            title="Other businesses in the group."
          />
          <RelatedCompanies companies={relatedCompanies(company.slug, 3)} />
        </div>
      </section>

      {/* ── WEBSITE VIEWER ───────────────────────────────────── */}
      {site && (
        <section className="border-t border-white/5 bg-night-850/50 py-24 md:py-28">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeader
                icon="orbit"
                eyebrow="Explore this business"
                title={`The ${company.shortName} website, live.`}
                lede="Embedded here so you can explore without leaving BharatX. If the site restricts embedding, we say so and open the official site for you instead."
                className="mb-0"
              />
              <Reveal delay={0.15}>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[13.5px] font-semibold text-ink-100 transition-colors hover:border-gold-400/50 hover:text-gold-300"
                >
                  Open Full Website
                  <Icon name="external-link" width={14} height={14} />
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="mt-12">
              <IframeViewer site={site} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

function MetaStat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-500">
        <Icon name={icon} width={12} height={12} />
        {label}
      </div>
      <div className="mt-1.5 text-[14px] font-semibold text-ink-100">{value}</div>
    </div>
  );
}
