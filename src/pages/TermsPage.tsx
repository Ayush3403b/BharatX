import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";

const sections = [
  {
    t: "1. The service",
    d: "This website presents the BharatX Group ecosystem: the group's six businesses, their capabilities, and the ecosystem viewer that embeds their websites. It is an information platform. Nothing on the site constitutes an offer of securities, investment advice or a binding commercial commitment.",
  },
  {
    t: "2. Use of the site",
    d: "You may use the site for lawful purposes. You agree not to attempt to disrupt the service, gain unauthorised access to any system, or scrape content in a manner that materially burdens the site. Standard browser behaviour is fine; abuse is not.",
  },
  {
    t: "3. Intellectual property",
    d: "The site's design, text, graphics and the BharatX Group branding are owned by BharatX Group or its respective companies. Company logos, product names and website content shown in the ecosystem viewer remain the property of each business. You may not reproduce this material commercially without permission.",
  },
  {
    t: "4. Embedded websites",
    d: "The ecosystem viewer displays third-party websites operated by the group's companies. You are subject to each website's own terms when you interact with it. We do not control and are not responsible for the content, availability or security practices of embedded sites beyond the fallback behaviour described on the ecosystem page.",
  },
  {
    t: "5. No warranties",
    d: "The site is provided on an as-is and as-available basis. We work to keep information accurate and current, but we do not warrant that the site will be uninterrupted, error-free, or that all details about the businesses are complete at any moment. Business information is subject to change as the ecosystem grows.",
  },
  {
    t: "6. Limitation of liability",
    d: "To the maximum extent permitted by law, BharatX Group will not be liable for indirect, incidental or consequential damages arising from your use of, or inability to use, this site. Nothing in these terms limits liability that cannot be limited under applicable law.",
  },
  {
    t: "7. Contact submissions",
    d: "Submitting the contact form creates a record of your inquiry for the purpose of responding to it. By submitting, you confirm the information is accurate to the best of your knowledge and you are of legal age to communicate on your own behalf (or on behalf of an organisation you are authorised to represent).",
  },
  {
    t: "8. Changes to these terms",
    d: "These terms may be updated as the service evolves. The current version is always on this page with an updated date. Continued use of the site after changes constitutes acceptance of the revised terms.",
  },
  {
    t: "9. Governing law",
    d: "These terms are governed by the laws of India, without regard to conflict-of-law rules. Disputes will first be attempted to be resolved through good-faith discussion; the courts of the relevant jurisdiction in India have jurisdiction for matters that cannot be resolved informally.",
  },
];

export default function TermsPage() {
  usePageMeta({
    title: "Terms & Conditions",
    description:
      "The terms governing use of the BharatX Group website and its ecosystem viewer.",
    path: "/terms",
  });
  return (
    <>
      <PageHero
        icon="scale"
        eyebrow="Legal"
        title="Terms & Conditions"
        lede="The ground rules for using this site and its ecosystem viewer. Short, readable, and without surprises."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Terms & Conditions" }]}
      />
      <section className="py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="mb-10 rounded-xl border border-white/8 bg-night-850/70 p-5 text-[13.5px] leading-relaxed text-ink-400">
              Last updated: 25 September 2026. By using this website you agree
              to these terms. If you are acting on behalf of an organisation,
              you confirm you have authority to bind it.
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
                  Registered Headquarters:
                </span>
                <p>BharatX Group · Building no. 511 First Floor, Motilal Nehru Complex, New Delhi 110017, India</p>
                <p className="mt-1">Direct Line: +91 98112 63046 · contact@bharatxgroup.com</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
