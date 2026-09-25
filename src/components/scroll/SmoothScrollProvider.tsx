import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

interface LenisApi {
  scrollTo: (
    to: number | string | HTMLElement,
    opts?: { offset?: number; duration?: number; immediate?: boolean },
  ) => void;
  stop: () => void;
  start: () => void;
  active: boolean;
}

const LenisContext = createContext<LenisApi>({
  scrollTo: () => undefined,
  stop: () => undefined,
  start: () => undefined,
  active: false,
});

/**
 * Premium inertia scrolling (Section 5B).
 * Lenis is initialised after first paint, driven by rAF, and fully
 * disabled when `prefers-reduced-motion` is set.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reduced) return;
    // Defer until after first paint so the preloader never fights the wheel.
    const id = window.setTimeout(() => {
      const lenis = new Lenis({
        lerp: 0.095,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      });
      lenisRef.current = lenis;
      const frame = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(frame);
      };
      rafRef.current = requestAnimationFrame(frame);
    }, 60);
    return () => {
      window.clearTimeout(id);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const lenis = lenisRef.current;
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const api = useMemo<LenisApi>(
    () => ({
      active: !reduced,
      scrollTo: (to, opts) => {
        const l = lenisRef.current;
        if (l) {
          l.scrollTo(to, opts);
        } else if (typeof to === "number") {
          window.scrollTo({ top: to, behavior: "auto" });
        } else if (typeof to === "string" || to instanceof Element) {
          (typeof to === "string"
            ? document.querySelector(to)
            : to
          )?.scrollIntoView({ behavior: "auto", block: "start" });
        }
      },
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [reduced],
  );

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}

export function useLenis(): LenisApi {
  return useContext(LenisContext);
}
