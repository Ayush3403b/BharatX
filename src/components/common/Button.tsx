import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "teal" | "ghost" | "ember" | "paper";
type ButtonSize = "md" | "lg" | "sm";

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  withArrow?: boolean;
  [key: string]: unknown;
}

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 ease-out cursor-pointer select-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-white font-semibold shadow-md shadow-gold-500/20 hover:bg-gold-600 hover:shadow-[0_8px_30px_-4px_rgba(217,119,6,0.45)] dark:bg-gold-400 dark:text-night-950 dark:hover:bg-gold-300 dark:hover:shadow-[0_8px_40px_-8px_rgba(245,184,77,0.5)]",
  teal: "bg-pulse-500 text-white font-semibold shadow-md shadow-pulse-500/20 hover:bg-pulse-600 hover:shadow-[0_8px_30px_-4px_rgba(8,145,178,0.45)] dark:bg-pulse-500 dark:text-night-950 dark:hover:bg-pulse-400 dark:hover:shadow-[0_8px_40px_-8px_rgba(34,213,179,0.45)]",
  ghost:
    "border border-slate-300/80 bg-white/75 text-ink-100 backdrop-blur-sm shadow-sm hover:border-slate-400 hover:bg-white hover:shadow-md dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-white/40 dark:hover:bg-white/[0.08] dark:shadow-none",
  ember:
    "bg-ember-500 text-white font-semibold shadow-md shadow-ember-500/20 hover:bg-ember-600 hover:shadow-[0_8px_30px_-4px_rgba(124,58,237,0.45)] dark:bg-ember-400 dark:text-white dark:hover:bg-ember-300 dark:hover:shadow-[0_8px_40px_-8px_rgba(232,106,74,0.5)]",
  paper:
    "bg-slate-900 text-white font-semibold shadow-md hover:bg-slate-800 hover:shadow-lg dark:bg-night-900 dark:text-fog-100 dark:hover:bg-night-700",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[15px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {withArrow && (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </span>
    </button>
  );
}
