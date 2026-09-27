import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IconBadge } from "../components/common/IconBadge";
import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { ContactForm, inquiryTypes } from "../components/forms/ContactForm";
import { usePageMeta } from "../hooks/usePageMeta";
import { companies } from "../data/companies";
import { Icon } from "../utils/icons";

const routes = [
  { icon: "rocket", t: "Venture building", d: "New businesses, strategy and scale-up", company: "bharatx-ventures", type: "venture-building" },
  { icon: "brain-circuit", t: "AI & automation", d: "Intelligence and process automation", company: "aixperts-labs", type: "ai-automation" },
  { icon: "hard-hat", t: "Infrastructure", d: "Civil engineering and construction", company: "bharatx-infratech", type: "infrastructure" },
  { icon: "cog", t: "Manufacturing", d: "Precision components and mobility", company: "casters-global", type: "manufacturing" },
  { icon: "sprout", t: "Agriculture", d: "Cultivation, food systems and rural enterprise", company: "sumedha-agro", type: "agriculture" },
  { icon: "ship", t: "Export", d: "Ingredients and export-grade supply", company: "bharatx-agro", type: "export" },
  { icon: "handshake", t: "Partnerships", d: "Suppliers, partners and co-development", company: "", type: "partnerships" },
  { icon: "briefcase", t: "Careers", d: "Roles, introductions and opportunities", company: "", type: "careers" },
];

const faqs = [
  {
    q: "Which business should I contact about my inquiry?",
    a: "Pick the route that matches your topic — the form pre-fills the right business and inquiry type. If you're unsure, send it to the group generally and we'll route it.",
  },
  {
    q: "How is my information used?",
    a: "Details from the contact form are used only to respond to your inquiry. We store what is submitted, and we don't use it for anything else without asking. See the privacy policy for the full statement.",
  },
  {
    q: "I want to join a specific business — where do I start?",
    a: "Use the Careers route. Name the business in your message, and the inquiry goes to that team's hiring stream. Standing streams are described on the careers page.",
  },
  {
    q: "Can I visit a company's website from here?",
    a: "Yes — the ecosystem viewer opens any of the six business websites live inside BharatX, or you can open the official site directly from any company profile.",
  },
];

export default function ContactPage() {
  usePageMeta({
    title: "Contact",
    description:
      "Start the right conversation with BharatX Group — venture building, AI & automation, infrastructure, manufacturing, agriculture, export, partnerships or careers.",
    path: "/contact",
  });

  const [params] = useSearchParams();
  const c = params.get("company");
  const t = params.get("type");
  const [prefill, setPrefill] = useState({
    company: c && companies.some((x) => x.id === c) ? c : "",
    type: t && inquiryTypes.some((x) => x.value === t) ? t : "",
  });

  const pickRoute = (company: string, type: string) => {
    setPrefill({ company, type });
    requestAnimationFrame(() => {
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <PageHero
        icon="mail"
        eyebrow="Contact"
        title="Start the right conversation."
        lede="One form, eight routes, six businesses. Tell us what you're trying to do — we'll route it to the people who actually own the answer."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      {/* ── CONTACT ROUTES ───────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeader
            icon="compass"
            eyebrow="Contact routes"
            title="Choose your route."
            lede="Selecting a route pre-fills the form below with the right business and inquiry type."
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {routes.map((r, i) => {
              const co = companies.find((x) => x.id === r.company);
              return (
                <Reveal key={r.t} delay={(i % 4) * 0.06}>
                  <button
                    type="button"
                    onClick={() => pickRoute(r.company, r.type)}
                    className="group flex h-full w-full cursor-pointer flex-col gap-3.5 rounded-xl border border-slate-200/90 bg-white/85 p-5 text-left shadow-2xs transition-all duration-300 hover:border-pulse-400/50 hover:bg-white hover:shadow-md dark:border-white/8 dark:bg-night-850/70 dark:shadow-none dark:hover:border-pulse-400/30 dark:hover:bg-night-800"
                  >
                    <IconBadge icon={r.icon} size="sm" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-[14.5px] font-semibold text-ink-50">{r.t}</h3>
                      </div>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{r.d}</p>
                      {co && (
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: co.accentColor }}>
                          → {co.shortName}
                        </p>
                      )}
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────────── */}
      <section id="contact-form" className="scroll-mt-28 border-t border-slate-200/80 bg-white/40 py-20 md:py-24 dark:border-white/5 dark:bg-night-850/50">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader
              icon="mail"
              eyebrow="Write to the group"
              title="The form, in full."
              lede="Required fields are marked. Everything else is optional — but the more context you give, the better the first reply."
              className="mb-8"
            />
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "map-pin",
                  t: "Corporate Headquarters",
                  d: "Building no. 511 First Floor, Motilal Nehru Complex, New Delhi 110017, India",
                },
                {
                  icon: "phone",
                  t: "Direct Telephone",
                  d: "+91 98112 63046 (Mon – Sat, 9:00 AM – 6:30 PM IST)",
                  link: "tel:+919811263046",
                  linkText: "Call +91 98112 63046",
                },
                {
                  icon: "clock",
                  t: "Executive Routing",
                  d: "Inquiries are routed directly to the leadership and technical leads of the designated operating business.",
                },
                {
                  icon: "shield-check",
                  t: "Secure Communication",
                  d: "Submissions are encrypted and used solely for business correspondence with complete privacy integrity.",
                },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 0.07}>
                  <div className="flex items-start gap-4 rounded-xl border border-slate-200/90 bg-white/85 p-5 shadow-2xs dark:border-white/8 dark:bg-night-900/70 dark:shadow-none">
                    <IconBadge icon={c.icon} size="sm" tone="gold" />
                    <div>
                      <h3 className="font-display text-[14.5px] font-semibold text-ink-50">{c.t}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-400">{c.d}</p>
                      {c.link && (
                        <a
                          href={c.link}
                          className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-gold-400 hover:text-gold-300"
                        >
                          {c.linkText} <Icon name="arrow-up-right" width={12} height={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <ContactForm
              initialCompany={prefill.company}
              initialInquiry={prefill.type}
            />
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeader
            icon="help-circle"
            eyebrow="Before you write"
            title="A few straight answers."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 0.07}>
                <div className="h-full rounded-2xl border border-slate-200/90 bg-white/85 p-7 shadow-xs dark:border-white/8 dark:bg-night-850/70 dark:shadow-none">
                  <div className="flex items-start gap-4">
                    <IconBadge icon="check" size="sm" tone="gold" withReveal={false} />
                    <div>
                      <h3 className="font-display text-[15.5px] font-semibold text-ink-50">{f.q}</h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-400">{f.a}</p>
                    </div>
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


