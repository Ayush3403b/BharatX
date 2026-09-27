import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideItem {
  id: string;
  image: string;
  sector: string;
  company: string;
  tagline: string;
}

const slides: SlideItem[] = [
  {
    id: "infra",
    image: "/assets/slides/infra.png",
    sector: "Infrastructure & Heavy Engineering",
    company: "BharatX Infratech",
    tagline: "Connecting India's core corridors with precision civil engineering",
  },
  {
    id: "ai",
    image: "/assets/slides/indauto.png",
    sector: "AI & Industrial Automation",
    company: "AIxperts Labs",
    tagline: "Deploying intelligent autonomous systems in mission-critical industries",
  },
  {
    id: "agro",
    image: "/assets/slides/agro.png",
    sector: "Agri-Tech & Food Systems",
    company: "BharatX Agro",
    tagline: "Sustainable agrarian supply chains from seed to global export",
  },
  {
    id: "ventures",
    image: "/assets/slides/h1.png",
    sector: "Venture Architecture & Capital",
    company: "BharatX Ventures",
    tagline: "Building resilient enterprises that power India's industrial backbone",
  },
  {
    id: "manuf",
    image: "/assets/slides/manuf.png",
    sector: "Precision Mobility & Manufacturing",
    company: "Casters Global",
    tagline: "High-spec industrial mobility and advanced manufacturing",
  },
  {
    id: "msme",
    image: "/assets/slides/msme.png",
    sector: "Enterprise & Institutional Scale",
    company: "BharatX Group",
    tagline: "Empowering next-generation enterprises across 5+ key sectors",
  },
  {
    id: "deeptech",
    image: "/companies/aixperts-labs/hero.jpg",
    sector: "Digital Transformation & Cloud",
    company: "AIxperts Labs",
    tagline: "Engineering bespoke AI models and enterprise digital infrastructure",
  },
  {
    id: "ecosystem",
    image: "/assets/slides/h4.png",
    sector: "Connected Conglomerate Operations",
    company: "One Connected Ecosystem",
    tagline: "Six autonomous companies operating with a single unified purpose",
  },
];

export function HeroBackgroundSlideshow() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const current = slides[index];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Dynamic Slide Background with Smooth Wipe & Cross-fade (Zero Blank Spots) */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1.0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
            transition={{
              duration: 1.4,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={current.image}
              alt=""
              className="h-full w-full object-cover object-center"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Wipe Shimmer Sweep effect on slide change */}
      <motion.div
        key={`shimmer-${index}`}
        initial={{ x: "-100%", opacity: 0.5 }}
        animate={{ x: "100%", opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-pulse-400/10 to-transparent pointer-events-none"
      />

      {/* Atmospheric Scrim Gradients (Light & Dark dual-mode) ensuring maximum legibility of text */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 dark:from-night-950/95 dark:via-night-950/80 dark:to-night-950/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-night-950 dark:via-night-950/40 dark:to-transparent" />
      <div className="absolute inset-0 bg-radial at-center from-transparent via-transparent to-white/60 dark:to-night-950/80" />

      {/* Ambient Cyber Color Highlights */}
      <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-pulse-400/15 dark:bg-pulse-400/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-gold-400/15 dark:bg-gold-400/10 blur-[130px]" />

      {/* Corporate Slide Sector Ticker Badge in Bottom Left of Hero */}
      <div className="pointer-events-auto absolute bottom-5 left-6 lg:bottom-7 lg:left-12 z-20 hidden sm:flex items-center gap-3.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs backdrop-blur-xl shadow-lg dark:border-white/10 dark:bg-night-900/80">
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400 hover:scale-110 transition-transform"
          aria-label={isPaused ? "Resume slide loop" : "Pause slide loop"}
        >
          <span className="block h-2 w-2 rounded-full bg-current animate-pulse" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10.5px] font-bold text-gold-600 dark:text-gold-400">
            0{index + 1} / 0{slides.length}
          </span>
          <span className="h-3 w-px bg-slate-300 dark:bg-white/20" />
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-100 font-semibold truncate max-w-[240px]">
            {current.sector}
          </span>
        </div>

        {/* Slide navigation dots */}
        <div className="flex items-center gap-1.5 ml-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-5 bg-gold-500 dark:bg-gold-400"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/40"
              }`}
              aria-label={`Jump to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
