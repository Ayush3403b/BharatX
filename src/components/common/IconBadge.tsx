import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";

/**
 * IconBadge — the single, consistent wrapper for every icon that appears
 * inside a stat block, step, card or route (Section 40A).
 */
export function IconBadge({
  icon,
  size = "md",
  accent,
  tone = "teal",
  className,
  withReveal = true,
}: {
  icon: string;
  size?: "sm" | "md" | "lg";
  accent?: string;
  tone?: "teal" | "gold" | "ember" | "plain";
  className?: string;
  withReveal?: boolean;
}) {
  const reduced = useReducedMotion();
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };
  const iconSizes = { sm: 14, md: 18, lg: 24 };

  const color =
    tone === "gold"
      ? "text-gold-400"
      : tone === "ember"
        ? "text-ember-400"
        : "text-pulse-300";

  const inner = (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 shadow-xs dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none",
        sizes[size],
        className,
      )}
      style={
        accent
          ? {
              borderColor: `${accent}44`,
              color: accent,
              background: `${accent}12`,
            }
          : undefined
      }
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${
            accent ?? (tone === "gold" ? "#f5b84d" : "#22d5b3")
          }26, transparent 65%)`,
        }}
      />
      <Icon
        name={icon}
        width={iconSizes[size]}
        height={iconSizes[size]}
        strokeWidth={1.6}
        className={cn("relative", !accent && color)}
      />
    </span>
  );

  if (!withReveal) return inner;

  return (
    <motion.span
      initial={reduced ? undefined : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px 50px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex"
    >
      {inner}
    </motion.span>
  );
}
