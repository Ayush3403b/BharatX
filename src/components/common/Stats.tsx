import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { IconBadge } from "./IconBadge";

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: string;
  accent?: string;
}

/** Animated stat block with count-up on scroll-into-view (Sections 13, 5B). */
export function Stats({
  items,
  className = "",
}: {
  items: StatItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5",
        className,
      )}
    >
      {items.map((item, i) => {
        const accentColor = item.accent || (i === 3 ? "#f5b84d" : "#00bcd4");
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 40px 0px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-night-850/85 p-6 md:p-7 shadow-[0_6px_24px_-4px_rgba(15,23,42,0.05)] dark:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-slate-300 dark:hover:border-white/25 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Top Accent Hairline */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2.5px] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, ${accentColor}, transparent 80%)`,
              }}
            />

            <div>
              {/* Header: Icon container & sequential index */}
              <div className="flex items-center justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 shadow-sm"
                  style={{
                    backgroundColor: `${accentColor}14`,
                    borderColor: `${accentColor}30`,
                    color: accentColor,
                  }}
                >
                  <Icon name={item.icon} width={20} height={20} strokeWidth={1.8} />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider text-slate-400 dark:text-ink-500">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>0{i + 1}</span>
                </div>
              </div>

              {/* Main Number: Outfit display font, perfectly kerned with no dotted zeros */}
              <div className="mt-5 flex items-baseline gap-0.5">
                <span
                  className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-ink-900 dark:text-ink-50 leading-none select-none tabular-nums"
                  style={{ fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif" }}
                >
                  <AnimatedNumber value={item.value} prefix={item.prefix} />
                </span>
                {item.suffix && (
                  <span
                    className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-none select-none"
                    style={{
                      color: accentColor,
                      fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif",
                    }}
                  >
                    {item.suffix}
                  </span>
                )}
              </div>
            </div>

            {/* Label */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
              <span className="font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-ink-300 block">
                {item.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/** Animated counter — eases to its final value when it enters the viewport. */
export function AnimatedNumber({
  value,
  prefix = "",
  duration = 1700,
  className,
}: {
  value: number;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 50px 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {display}
    </span>
  );
}
