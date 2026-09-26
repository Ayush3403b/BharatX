import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { MaskReveal, Reveal } from "../common/Reveal";

interface CinematicSectionProps {
  image: string;
  alt: string;
  kicker?: string;
  kickerIcon?: string;
  title: string | string[];
  text?: string;
  height?: "tall" | "standard";
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

/**
 * Full-bleed cinematic section (Section 5B): edge-to-edge imagery with
 * parallax drift + subtle Ken-Burns, overlaid heading revealed on scroll.
 */
export function CinematicSection({
  image,
  alt,
  kicker,
  kickerIcon,
  title,
  text,
  height = "tall",
  align = "left",
  children,
  className,
}: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section
      ref={ref}
      className={cn(
        "noise relative flex w-full items-center overflow-hidden",
        height === "tall" ? "min-h-[50vh] py-14 md:py-20" : "min-h-[38vh] py-10 md:py-14",
        className,
      )}
      aria-label={alt}
    >
      {/* Parallax image layer */}
      <motion.div style={{ y }} className="absolute inset-[-9%]">
        <motion.img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover"
          initial={reduced ? false : { scale: 1.14 }}
          animate={reduced ? undefined : { scale: [1.14, 1.2] }}
          transition={
            reduced
              ? undefined
              : { duration: 26, ease: "linear", repeat: Infinity, repeatType: "reverse" }
          }
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-night-950/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-night-950/85 via-night-950/35 to-night-950/60" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-900 to-transparent" />

      {/* Content */}
      <div
        className={cn(
          "container-x relative z-10",
          align === "center" && "flex flex-col items-center text-center",
        )}
      >
        {kicker && (
          <Reveal>
            <div
              className={cn(
                "mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-400",
                align === "center" && "justify-center",
              )}
            >
              {kickerIcon && <Icon name={kickerIcon} width={14} height={14} strokeWidth={1.6} />}
              <span>{kicker}</span>
              <span aria-hidden className="h-px w-12 bg-gold-400/50" />
            </div>
          </Reveal>
        )}
        <h2 className="font-display font-semibold leading-[1.08] sm:leading-[1.02] tracking-tight text-ink-50 text-[1.85rem] xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
          {lines.map((line, i) => (
            <MaskReveal key={i} delay={0.06 * i} className="text-balance">
              {line}
            </MaskReveal>
          ))}
        </h2>
        {text && (
          <Reveal delay={0.25}>
            <p
              className={cn(
                "mt-7 max-w-xl text-base leading-relaxed text-ink-300 md:text-lg",
                align === "center" && "mx-auto",
              )}
            >
              {text}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.35}>
            <div className={cn("mt-9", align === "center" && "flex flex-wrap items-center justify-center gap-4")}>
              {children}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
