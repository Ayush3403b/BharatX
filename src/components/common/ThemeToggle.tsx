import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 select-none cursor-pointer",
        "border border-slate-200/90 bg-white/80 text-slate-700 shadow-xs hover:border-slate-300 hover:bg-white hover:text-gold-500",
        "dark:border-white/12 dark:bg-white/[0.04] dark:text-ink-200 dark:hover:border-gold-400/40 dark:hover:bg-white/[0.08] dark:hover:text-gold-400",
        className,
      )}
    >
      <div className="relative h-4.5 w-4.5 overflow-hidden">
        {/* Sun Icon (shown in dark mode to switch to light) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "absolute inset-0 h-full w-full transition-all duration-500 ease-out",
            isDark
              ? "rotate-0 scale-100 opacity-100 text-gold-400"
              : "-rotate-90 scale-0 opacity-0",
          )}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        {/* Moon Icon (shown in light mode to switch to dark) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "absolute inset-0 h-full w-full transition-all duration-500 ease-out",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-slate-700 group-hover:text-gold-500",
          )}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>

      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: isDark
            ? "0 0 20px -3px rgba(245, 184, 77, 0.35)"
            : "0 0 16px -3px rgba(6, 182, 212, 0.3)",
        }}
      />
    </button>
  );
}
