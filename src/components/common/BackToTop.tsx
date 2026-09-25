import { AnimatePresence, motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLenis } from "../scroll/SmoothScrollProvider";
import { Icon } from "../../utils/icons";

/** Floating back-to-top control (Section 44). */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  const { scrollTo, active } = useLenis();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));

  const goTop = () => {
    if (active) scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-[calc(1.5rem+env(safe-area-inset-right,0px))] z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-night-800/90 text-ink-300 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:border-gold-400/40 hover:text-gold-400"
        >
          <Icon name="chevron-up" width={18} height={18} strokeWidth={1.8} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
