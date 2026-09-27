import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";

const sections = [
  {
    t: "1. What we collect",
    d: "We collect information you provide directly — your name, email, phone, organisation and message when you submit the contact form — and limited technical information needed to operate this site securely, such as the pages you visit and the browser you use. We do not purchase third-party data about you.",
  },
  {
    t: "2. How we use it",
    d: "Contact form submissions are used solely to respond to your inquiry and to improve how the group communicates. We do not use your details for unsolicited marketing. If we ever want to contact you about something else, we will ask first.",
  },
  {
    t: "3. Where it is stored",
    d: "Inquiries are stored in the group's database (MongoDB) with access restricted to the teams that need it to respond. The database is hosted with a reputable provider under commercial terms that include security and backup obligations.",
  },
  {
    t: "4. Embedded websites",
    d: "The ecosystem viewer loads the websites of the group's six businesses inside this site. When a website is displayed in the viewer, that website's own privacy practices apply to your interaction with it. We recommend opening any business website directly if you prefer its privacy terms to govern your session.",
  },
  {
    t: "5. Cookies and analytics",
    d: "This site may use basic analytics to understand aggregate usage — which pages are visited and how visitors move between them. Analytics is configured through an environment setting and can be switched off. Where a tracking service is enabled, its provider's privacy policy also applies.",
  },
  {
    t: "6. Sharing",
    d: "We do not sell or rent personal information. Information is shared only with service providers that operate the site (hosting, database, email delivery) under confidentiality obligations, or where required by law.",
  },
  {
    t: "7. Retention and deletion",
    d: "Inquiry records are retained as long as needed to respond and for basic record-keeping. You may request access to, correction of, or deletion of the information you have submitted by writing to the group through the contact page.",
  },
  {
    t: "8. Security",
    d: "Access to stored data is restricted, credentials are protected, and the site uses standard transport encryption. No method of transmission over the internet is perfectly secure; we use reasonable measures appropriate to the sensitivity of the data.",
  },
  {
    t: "9. Changes to this policy",
    d: "This policy is reviewed as the group's services change. Material changes will be reflected on this page with an updated date. Continued use of the site after changes indicates acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  usePageMeta({
    title: "Privacy Policy",
    description:
      "How BharatX Group collects, uses and protects information submitted through its website.",
    path: "/privacy",
  });
  return (
    <>
      <PageHero
        icon="shield-check"
        eyebrow="Legal"
        title="Privacy Policy"
        lede="What we collect, why we collect it, and how we keep it. In plain language."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="mb-10 rounded-xl border border-white/8 bg-night-850/70 p-5 text-[13.5px] leading-relaxed text-ink-400">
              Last updated: 25 September 2026. This policy applies to the BharatX
              Group website. Each company in the ecosystem maintains its own
              privacy terms on its own website where applicable.
            </p>
          </Reveal>
          <div className="flex flex-col gap-8">
            {sections.map((s, i) => (
              <Reveal key={s.t} delay={Math.min(i * 0.04, 0.2)}>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink-50">{s.t}</h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-400">{s.d}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-xl border border-slate-200/80 dark:border-white/8 bg-slate-50/80 dark:bg-night-900/60 p-5 font-mono text-xs text-ink-400">
                <span className="font-semibold text-ink-200 dark:text-ink-100 uppercase tracking-wider block mb-1">
                  Official Communication Address:
                </span>
                <p>BharatX Group · Building no. 511 First Floor, Motilal Nehru Complex, New Delhi 110017</p>
                <p className="mt-1">Direct Contact: +91 98112 63046 · contact@bharatxgroup.com</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
