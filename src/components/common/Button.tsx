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
    "bg-gold-400 text-night-950 hover:bg-gold-300 hover:shadow-[0_8px_40px_-8px_rgba(245,184,77,0.5)]",
  teal: "bg-pulse-500 text-night-950 hover:bg-pulse-400 hover:shadow-[0_8px_40px_-8px_rgba(34,213,179,0.45)]",
  ghost:
    "border border-white/15 bg-white/[0.02] text-ink-100 hover:border-white/35 hover:bg-white/[0.06]",
  ember:
    "bg-ember-400 text-white hover:bg-ember-300 hover:shadow-[0_8px_40px_-8px_rgba(232,106,74,0.5)]",
  paper:
    "bg-night-900 text-fog-100 hover:bg-night-700 hover:shadow-[0_8px_30px_-8px_rgba(11,15,21,0.5)]",
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
