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
      className={`grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 ${className}`}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 50px 0px" }}
          transition={{
            duration: 0.65,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <IconBadge icon={item.icon} accent={item.accent} />
            <div>
              <div className="font-mono text-4xl sm:text-5xl font-medium tracking-tight text-ink-50 md:text-6xl">
                <AnimatedNumber value={item.value} prefix={item.prefix} />
                {item.suffix && (
                  <span className="text-gold-400">{item.suffix}</span>
                )}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400">
                {item.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
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
