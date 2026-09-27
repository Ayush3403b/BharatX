import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../../utils/icons";
import { Reveal } from "../common/Reveal";
import { Button } from "../common/Button";

const transcriptChapters = [
  {
    id: "chapter-1",
    number: "01",
    title: "National Imperative & Vision",
    content: [
      "Distinguished partners, innovators, and members of the BharatX family: We stand at a pivotal juncture in India's industrial and technological evolution. The mandate before our generation is unequivocal — we must build sovereign capability in every critical layer of the modern economy.",
      "Self-reliance is no longer merely an economic preference; it is a foundational prerequisite for national resilience. At BharatX Group, our mission from inception has been to engineer systems that do not merely consume global technologies, but originate them directly on Indian soil for generational longevity.",
    ],
  },
  {
    id: "chapter-2",
    number: "02",
    title: "Multi-Vertical Ecosystem Scaling",
    content: [
      "Over the past fiscal year, our six autonomous operating enterprises have demonstrated the extraordinary compounding power of a connected ecosystem. Rather than fragmented growth, our businesses reinforce one another at every node.",
      "BharatX Infratech has set unprecedented benchmarks in durable civil engineering; Casters Global has expanded precision mobility exports into high-spec global markets; while BharatX Agro has established traceable, origin-certified agri-supply corridors that empower over 50,000 rural families, supported by frontier research at BharatX Labs.",
    ],
  },
  {
    id: "chapter-3",
    number: "03",
    title: "Sovereign Deep-Tech & AI Backbone",
    content: [
      "In artificial intelligence, AIxperts Labs has taken a decisive leap. We reject the notion that Indian enterprises must remain dependent on imported black-box compute. We are actively deploying production-grade, multilingual neural workflows natively capable across 22 Indian regional languages.",
      "By integrating real-world automation directly into supply chains, document intelligence, and manufacturing telemetry, BharatX is delivering AI that works in the field — with complete data residency and sub-millisecond reliability.",
    ],
  },
  {
    id: "chapter-4",
    number: "04",
    title: "2030 Roadmap & Long-Term Ownership",
    content: [
      "As we chart our course toward 2030, BharatX Group will continue to adhere to three non-negotiable principles: long-term ownership, engineering rigor, and transparent, honest value creation.",
      "We do not build for the next quarter's headlines. We build for the next decade of Indian prosperity. When ambition is aligned with the collective aspirations of 1.4 billion citizens, there is no limit to what can be accomplished.",
    ],
  },
];

export function LeadershipKeynote() {
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-t border-slate-200/80 dark:border-white/5 bg-slate-900/[0.02] dark:bg-night-900/40">
      <div className="container-x relative">
        {/* Section Tag */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-500 dark:text-gold-400">
              <Icon name="briefcase" width={13} height={13} />
              <span>Annual Leadership Address</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-100 dark:text-ink-50 sm:text-4xl md:text-5xl">
              “Building sovereign capabilities to propel growth for a{" "}
              <span className="text-pulse-500 dark:text-pulse-400">Viksit Bharat</span>.”
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-400">
              Executive Statement · Annual Ecosystem Conclave FY2026-27
            </p>
          </Reveal>
        </div>

        {/* Video / Keynote Teaser Card (RIL AGM Video Section Style) */}
        <div className="mx-auto mt-12 max-w-5xl">
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-night-950 shadow-2xl">
              {/* Teaser Backdrop */}
              <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full">
                <img
                  src="/assets/backgrounds/hero-field.jpg"
                  alt="Annual Keynote Address"
                  className="h-full w-full object-cover opacity-60 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />

                {/* Play Button & Center Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gold-400 text-night-950 shadow-[0_0_40px_rgba(245,184,77,0.5)] transition-transform duration-300 hover:scale-110 active:scale-95"
                    aria-label="Play keynote video"
                  >
                    <span className="animate-ping absolute inset-0 rounded-full bg-gold-400 opacity-40" />
                    <Icon name="play" width={26} height={26} className="ml-1 fill-night-950" />
                  </button>

                  <h3 className="mt-6 font-display text-xl sm:text-2xl font-semibold text-white">
                    Watch the Complete Conclave Keynote (38 mins)
                  </h3>
                  <p className="mt-2 max-w-lg text-sm text-slate-300">
                    Featuring the 2030 multi-vertical roadmap, deep-tech milestones, and sovereign infrastructure rollout.
                  </p>
                </div>

                {/* Bottom Bar: Action & Transcript Toggle */}
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-night-950/90 p-5 md:px-8 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <span className="font-mono text-xs text-slate-200">
                      High-Definition Video + Interactive Multi-Chapter Transcript
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowTranscript((prev) => !prev)}
                      className="inline-flex items-center gap-2 rounded-lg border border-gold-400/40 bg-gold-400/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gold-300 transition-colors hover:bg-gold-400 hover:text-night-950"
                    >
                      <Icon name="file-text" width={14} height={14} />
                      {showTranscript ? "Hide Transcript" : "Read Full Transcript"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Interactive Collapsible Transcript Drawer (RIL Styled Panel) */}
          <AnimatePresence>
            {showTranscript && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-night-850 p-6 md:p-10 shadow-2xl">
                  {/* Top Drawer Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/8 pb-5">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-400">
                        Official Record
                      </span>
                      <h4 className="mt-1 font-display text-xl font-bold text-ink-100 dark:text-ink-50">
                        Executive Keynote Transcript
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const text = transcriptChapters.map(c => `${c.title}\n${c.content.join('\n')}`).join('\n\n');
                          navigator.clipboard?.writeText(text);
                          alert("Transcript copied to clipboard!");
                        }}
                      >
                        <Icon name="clipboard-list" width={13} height={13} className="mr-1.5" />
                        Copy Text
                      </Button>
                      <button
                        onClick={() => setShowTranscript(false)}
                        className="rounded-lg p-2 text-ink-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-ink-100"
                        aria-label="Close transcript"
                      >
                        <Icon name="x" width={18} height={18} />
                      </button>
                    </div>
                  </div>

                  {/* Chapter Navigation Tabs */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {transcriptChapters.map((chap, idx) => (
                      <button
                        key={chap.id}
                        onClick={() => setActiveChapter(idx)}
                        className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all ${
                          activeChapter === idx
                            ? "bg-gold-400 text-night-950 font-semibold shadow-sm"
                            : "bg-slate-100 dark:bg-white/5 text-ink-400 hover:text-ink-100 hover:bg-slate-200 dark:hover:bg-white/10"
                        }`}
                      >
                        {chap.number}. {chap.title}
                      </button>
                    ))}
                  </div>

                  {/* Chapter Content Body */}
                  <div className="mt-8 rounded-2xl border border-slate-200/60 dark:border-white/5 bg-slate-50/70 dark:bg-night-900/60 p-6 md:p-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-gold-500 dark:text-gold-400">
                      Chapter {transcriptChapters[activeChapter].number}
                    </span>
                    <h5 className="mt-2 font-display text-xl font-bold text-ink-100 dark:text-ink-50">
                      {transcriptChapters[activeChapter].title}
                    </h5>

                    <div className="mt-5 space-y-4 font-serif text-base leading-relaxed text-ink-300 dark:text-ink-200">
                      {transcriptChapters[activeChapter].content.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
