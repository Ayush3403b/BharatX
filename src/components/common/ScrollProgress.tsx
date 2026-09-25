import { motion, useScroll, useSpring } from "framer-motion";

/** Thin top scroll-progress bar in the brand accent (Section 43). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #22d5b3, #f5b84d)",
      }}
    />
  );
}
