import { Reveal } from "../common/Reveal";
import { Icon } from "../../utils/icons";

export function ConglomerateManifesto() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/80 dark:border-white/5 bg-slate-100/60 dark:bg-night-900/60 py-16 md:py-24">
      {/* Background glow & subtle cyber grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.08), transparent 70%), radial-gradient(circle at 80% 100%, rgba(255, 184, 0, 0.06), transparent 70%)",
        }}
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Institutional Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500 dark:text-gold-400 shadow-sm backdrop-blur-md">
              <Icon name="award" width={13} height={13} className="text-gold-500" />
              <span>Sovereign Industrial & Deep-Tech Ecosystem</span>
            </div>
          </Reveal>

          {/* Grand Manifesto Text (Inspired by RIL 'Growth is Life' & 'We Care') */}
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-2xl font-medium leading-[1.35] tracking-tight text-ink-100 dark:text-ink-50 sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              BharatX Group is an integrated powerhouse building{" "}
              <span className="text-gold-500 dark:text-gold-400 font-semibold">
                critical technologies, infrastructure,
              </span>{" "}
              and{" "}
              <span className="text-pulse-500 dark:text-pulse-400 font-semibold">
                sovereign industrial capabilities
              </span>{" "}
              that propel India into the global deep-tech era.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-400 dark:text-ink-400 md:text-lg">
              Operating at the intersection of applied artificial intelligence, precision engineering, heavy infrastructure, and global value chains — built for generational longevity and national impact.
            </p>
          </Reveal>
        </div>

        {/* 4-Pillar Scale Deck */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          {[
            {
              badge: "06 COMPANIES",
              title: "Autonomous Operating Units",
              desc: "Independently steered, interconnected through a unified standard.",
              icon: "building-2",
              accent: "#f5b84d",
            },
            {
              badge: "07 SECTORS",
              title: "Strategic Domains",
              desc: "From neural compute & robotics to food systems and civil infrastructure.",
              icon: "layers",
              accent: "#00f0ff",
            },
            {
              badge: "GLOBAL REACH",
              title: "Cross-Border Corridors",
              desc: "Exporting certified industrial components and agro-commodities worldwide.",
              icon: "globe",
              accent: "#8b5cf6",
            },
            {
              badge: "100% SOVEREIGN",
              title: "Engineered In India",
              desc: "Designed, manufactured and deployed with complete IP integrity.",
              icon: "shield-check",
              accent: "#10b981",
            },
          ].map((item, idx) => (
            <Reveal key={item.badge} delay={0.15 + idx * 0.08}>
              <div className="group relative h-full rounded-2xl border border-slate-200/80 dark:border-white/8 bg-white/80 dark:bg-night-850/80 p-5 md:p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-night-950/80">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: item.accent }}
                  >
                    {item.badge}
                  </span>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                    style={{
                      background: `${item.accent}15`,
                      color: item.accent,
                    }}
                  >
                    <Icon name={item.icon} width={15} height={15} />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink-100 dark:text-ink-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-400">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
