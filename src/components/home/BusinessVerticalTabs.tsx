import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { companies } from "../../data/companies";
import { Icon } from "../../utils/icons";
import { Button } from "../common/Button";
import { Reveal } from "../common/Reveal";
import { SectionHeader } from "../common/SectionHeader";

export function BusinessVerticalTabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeCompany = companies[activeTab] ?? companies[0];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-night-950/20 dark:bg-night-950/40">
      {/* Background radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ background: activeCompany.accentColor }}
      />

      <div className="container-x relative">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            icon="layers"
            eyebrow="Our Businesses"
            title={
              <>
                Autonomous enterprises.
                <br />
                <span className="text-pulse-400">One connected group.</span>
              </>
            }
            lede="Explore each operating business within BharatX Group — spanning strategy, artificial intelligence, heavy infrastructure, precision engineering, bioscience, and global trade."
            className="mb-0"
          />

          <Reveal delay={0.15}>
            <Link
              to="/companies"
              className="group mb-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
            >
              View directory
              <Icon
                name="arrow-right"
                width={13}
                height={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Main Interactive Tab Container (Balanced 50/50 equal-size layout) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 xl:gap-10 items-stretch">
          {/* Left Vertical Tab Selector Deck */}
          <div className="flex flex-col justify-between gap-3 h-full">
            {companies.map((c, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative flex flex-1 items-center justify-between rounded-2xl border p-4 sm:px-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-slate-300 dark:border-white/20 bg-white dark:bg-night-850 shadow-md ring-1 ring-gold-400/20"
                      : "border-slate-200/70 dark:border-white/5 bg-white/40 dark:bg-night-900/40 hover:border-slate-300 dark:hover:border-white/10 hover:bg-white/80 dark:hover:bg-night-850/60"
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  {/* Left Accent indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="vertical-tab-indicator"
                      className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full"
                      style={{ backgroundColor: c.accentColor }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-4 pl-1">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-night-900 p-2 transition-transform group-hover:scale-105 shadow-sm"
                    >
                      {c.logo ? (
                        <img
                          src={c.logo}
                          alt={c.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Icon name={c.icon} width={20} height={20} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[15px] font-semibold text-ink-100 dark:text-ink-50">
                          {c.name}
                        </span>
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: c.accentColor }}
                        />
                      </div>
                      <span className="block font-mono text-[11px] text-ink-400">
                        {c.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pr-1">
                    <span className="font-mono text-[11px] text-ink-500">
                      0{idx + 1}
                    </span>
                    <Icon
                      name="chevron-right"
                      width={14}
                      height={14}
                      className={`text-ink-400 transition-transform duration-300 ${
                        isActive
                          ? "translate-x-1 text-gold-400"
                          : "group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Synchronized Tab Content Display (Equal 50% match) */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-night-850 p-6 sm:p-8 md:p-9 shadow-xl backdrop-blur-xl h-full min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCompany.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 dark:border-white/8 pb-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em]"
                        style={{ color: activeCompany.accentColor }}
                      >
                        VERTICAL · 0{activeCompany.order}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-ink-600" />
                      <span className="font-mono text-[11px] text-ink-400">
                        {activeCompany.category}
                      </span>
                    </div>

                    <a
                      href={activeCompany.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] text-gold-400 hover:text-gold-300"
                    >
                      <span>{activeCompany.domain}</span>
                      <Icon name="external-link" width={12} height={12} />
                    </a>
                  </div>

                  {/* Main Company Title & Narrative */}
                  <div className="mt-6">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink-100 dark:text-ink-50 sm:text-3xl md:text-4xl">
                      {activeCompany.name}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-ink-300 dark:text-ink-300 md:text-[15px]">
                      {activeCompany.longDescription[0]}
                    </p>
                    {activeCompany.longDescription[1] && (
                      <p className="mt-3 text-sm leading-relaxed text-ink-400">
                        {activeCompany.longDescription[1]}
                      </p>
                    )}
                  </div>

                  {/* Vision Quote Banner */}
                  {activeCompany.vision && (
                    <div className="mt-6 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50/80 dark:bg-night-900/60 p-4">
                      <div className="flex items-start gap-3">
                        <Icon
                          name="target"
                          width={16}
                          height={16}
                          className="shrink-0 mt-0.5"
                          style={{ color: activeCompany.accentColor }}
                        />
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                            Operating North Star
                          </span>
                          <p className="mt-1 font-display text-[13.5px] italic text-ink-200 dark:text-ink-100">
                            “{activeCompany.vision}”
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Capabilities Chips */}
                  <div className="mt-6">
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500 mb-3">
                      Core Specialisations
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeCompany.capabilities.slice(0, 5).map((cap) => (
                        <span
                          key={cap.title}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 dark:border-white/8 bg-slate-100/70 dark:bg-white/[0.03] px-3 py-1 text-[12px] font-medium text-ink-200 dark:text-ink-200"
                        >
                          <Icon name={cap.icon} width={12} height={12} className="text-gold-400" />
                          {cap.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA & Direct Launch Actions */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70 dark:border-white/8 pt-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link to={`/companies/${activeCompany.slug}`}>
                      <Button variant="primary" size="md" withArrow>
                        Deep-Dive {activeCompany.shortName}
                      </Button>
                    </Link>

                    <Link to={`/ecosystem?company=${activeCompany.slug}`}>
                      <Button variant="ghost" size="md">
                        <Icon name="orbit" width={14} height={14} className="mr-1.5 text-gold-400" />
                        Open in Ecosystem Viewer
                      </Button>
                    </Link>
                  </div>

                  <span className="font-mono text-[11px] text-ink-500">
                    Live Status: <span className="text-emerald-500 font-semibold">● ACTIVE</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
