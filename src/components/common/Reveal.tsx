import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  immediate?: boolean;
}

/** Staggered scroll reveal — the site's section choreography (Section 5B). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  immediate = false,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      animate={immediate ? { opacity: 1, y: 0 } : undefined}
      whileInView={immediate ? undefined : { opacity: 1, y: 0 }}
      viewport={immediate ? undefined : { once, margin: "0px 0px 50px 0px" }}
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
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  return (
    <motion.span
      className={cn("block overflow-hidden", className)}
      initial="hidden"
      animate={immediate ? "visible" : undefined}
      whileInView={immediate ? undefined : "visible"}
      viewport={{ once: true, margin: "0px 0px 50px 0px" }}
    >
      <motion.span
        className="block will-change-transform"
        variants={{
          hidden: { y: "112%" },
          visible: { y: "0%" },
        }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
