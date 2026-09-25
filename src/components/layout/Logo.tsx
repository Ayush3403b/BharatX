import { cn } from "../../utils/cn";

/**
 * Brand mark: the BharatX "X" monogram — two crossing strokes forming a
 * node-connection mark, with the second stroke in the gold accent.
 * The full logo is composed (mark + wordmark) so it can be reskinned by
 * swapping the SVG in /public/assets/brand/ later.
 */
export function LogoMark({
  size = 30,
  tone = "gold",
  className,
}: {
  size?: number;
  tone?: "gold" | "white" | "mono";
  className?: string;
}) {
  const stroke1 = tone === "white" ? "#f4f7f9" : tone === "mono" ? "#eef2f5" : "#f5b84d";
  const stroke2 = tone === "white" ? "#86f0d8" : tone === "mono" ? "#93a1ad" : "#43e6c5";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <rect x="1" y="1" width="46" height="46" rx="11" stroke="rgba(255,255,255,0.14)" />
      <path
        d="M14 14 L34 34"
        stroke={stroke1}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M34 14 L14 34"
        stroke={stroke2}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="3" fill={stroke1} />
    </svg>
  );
}

export function Logo({
  className,
  markSize = 30,
  tone = "light",
  compact = false,
}: {
  className?: string;
  markSize?: number;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={markSize} tone="gold" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[15px] font-semibold tracking-[0.18em]",
              tone === "light" ? "text-ink-50" : "text-night-900",
            )}
          >
            BHARATX
          </span>
          <span
            className={cn(
              "mt-1 font-mono text-[8.5px] uppercase tracking-[0.52em]",
              tone === "light" ? "text-ink-500" : "text-ink-600",
            )}
          >
            Group
          </span>
        </span>
      )}
    </span>
  );
}
