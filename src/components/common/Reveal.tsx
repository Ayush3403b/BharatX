import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/** Staggered scroll reveal — the site's section choreography (Section 5B). */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -6% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Line-mask reveal for display headings. */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block will-change-transform"
        initial={reduced ? undefined : { y: "112%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
