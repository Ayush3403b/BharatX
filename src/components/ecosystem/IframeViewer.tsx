import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { companies } from "../../data/companies";
import { useLenis } from "../scroll/SmoothScrollProvider";
import { track } from "../../services/analytics";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import type { EcosystemSite } from "../../types";

type ViewerStatus = "loading" | "loaded" | "error" | "slow";
const SLOW_MS = 12000;

/**
 * The ecosystem iframe viewer (Sections 17–23).
 * Browser-like toolbar, loading skeleton, slow-load warning for sites that
 * block embedding (X-Frame-Options / CSP), error state, reload,
 * open-in-new-tab and a fullscreen mode with ESC exit.
 */
export function IframeViewer({ site }: { site: EcosystemSite }) {
  const [status, setStatus] = useState<ViewerStatus>("loading");
  const [frameKey, setFrameKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const { stop, start } = useLenis();
  const loadTimer = useRef<number>(0);

  const reload = useCallback(() => {
    setFrameKey((k) => k + 1);
    setStatus("loading");
  }, []);

  // Reset on site change
  useEffect(() => {
    setStatus("loading");
    setFrameKey((k) => k + 1);
  }, [site.id]);

  // Slow-load watchdog — blocked frames usually stay "loading" or show a
  // blank/blocked page; we surface the honest fallback instead of a dead end.
  useEffect(() => {
    window.clearTimeout(loadTimer.current);
    loadTimer.current = window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "slow" : s));
    }, SLOW_MS);
    return () => window.clearTimeout(loadTimer.current);
  }, [site.id, frameKey]);

  const openExternal = () => {
    track("ecosystem_open_external", { company: site.id });
    window.open(site.url, "_blank", "noopener,noreferrer");
  };

  const toggleFullscreen = () => {
    track("ecosystem_fullscreen", { company: site.id });
    setFullscreen((v) => {
      if (v) start();
      else stop();
      return !v;
    });
  };

  useEffect(() => {
    if (!fullscreen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullscreen(false);
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, start]);

  const company = companies.find((c) => c.id === site.id);
  const accent = company?.accentColor ?? "#43e6c5";

  const toolbar = (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 bg-night-850 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "h-2.5 w-2.5 shrink-0 rounded-full",
            status === "loading" && "animate-pulse",
          )}
          style={{
            background:
              status === "error" ? "#e86a4a" : status === "loading" ? accent : "#4ade80",
            boxShadow: `0 0 12px ${
              status === "error" ? "#e86a4a88" : `${accent}88`
            }`,
          }}
        />
        {company && (
          company.logo ? (
            <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white p-0.5 shadow-sm sm:flex">
              <img
                src={company.logo}
                alt={company.name}
                className="h-full w-full object-contain"
              />
            </span>
          ) : (
            <span
              className="hidden h-7 w-7 shrink-0 items-center justify-center font-mono text-[10px] font-semibold text-ink-300 sm:flex"
            >
              {company.monogram}
            </span>
          )
        )}
        <div className="min-w-0">
          <div className="truncate text-[13.5px] font-semibold text-ink-50">{site.name}</div>
          <div className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
            {site.category}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <ToolButton
          label="Reload website"
          onClick={reload}
          icon="refresh-cw"
          spinning={status === "loading"}
        />
        <ToolButton label="Toggle fullscreen" onClick={toggleFullscreen} icon="maximize-2" />
        <ToolButton label="Open in new tab" onClick={openExternal} icon="external-link" primary />
      </div>
    </div>
  );

  const frame = (key: number) => (
    <iframe
      key={key}
      src={site.url}
      title={`${site.name} website`}
      onLoad={() => {
        window.clearTimeout(loadTimer.current);
        setStatus((s) => (s === "error" ? s : "loaded"));
        track("ecosystem_iframe_loaded", { company: site.id });
      }}
      onError={() => {
        setStatus("error");
      }}
      className="h-full w-full border-0 bg-[#f4f6f8]"
      referrerPolicy="no-referrer-when-downgrade"
      allow="fullscreen; clipboard-read; clipboard-write; geolocation; camera; microphone; payment; autoplay"
    />
  );

  return (
    <>
      {/* Inline viewer */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-night-850 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]">
        {toolbar}
        <div className="relative h-[500px] bg-[#f4f6f8] md:h-[600px] xl:h-[800px]">
          {status !== "error" && frame(frameKey)}

          {/* Loading skeleton */}
          {status === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-night-850">
              <div className="w-full max-w-md px-8">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="ml-3 h-2.5 flex-1 rounded-full bg-white/8" />
                </div>
                <div className="skeleton mb-3 h-16 rounded-lg" />
                <div className="skeleton mb-2 h-4 w-2/3 rounded" />
                <div className="skeleton h-4 w-1/2 rounded" />
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                <Icon name="loader-2" width={14} height={14} className="animate-spin text-pulse-300" />
                Loading {site.url.replace("https://", "")}
              </div>
            </div>
          )}

          {/* Slow-load / blocked-embedding notice */}
          {status === "slow" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-x-4 bottom-4 z-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold-400/30 bg-night-950/95 p-4 backdrop-blur-md"
            >
              <div className="flex items-start gap-3">
                <Icon name="triangle-alert" width={18} height={18} className="mt-0.5 shrink-0 text-gold-400" />
                <div>
                  <div className="text-[13.5px] font-semibold text-ink-50">
                    Still loading? This site may not allow embedded viewing.
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-400">
                    Some websites block iframes via browser security headers. You can open
                    the official site in a new tab.
                  </div>
                </div>
              </div>
              <div className="flex w-full sm:w-auto gap-2.5">
                <button
                  type="button"
                  onClick={reload}
                  className="flex-1 sm:flex-none rounded-full border border-white/15 px-4 py-2 text-[12.5px] font-semibold text-ink-100 transition-colors hover:border-white/35 text-center"
                >
                  Reload
                </button>
                <button
                  type="button"
                  onClick={openExternal}
                  className="flex-1 sm:flex-none rounded-full bg-gold-400 px-4 py-2 text-[12.5px] font-semibold text-night-950 transition-colors hover:bg-gold-300 text-center"
                >
                  Open Official Website
                </button>
              </div>
            </motion.div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-night-850 px-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ember-400/30 bg-ember-400/10 text-ember-400">
                <Icon name="triangle-alert" width={26} height={26} />
              </span>
              <div>
                <div className="font-display text-xl font-semibold text-ink-50">
                  This website could not be loaded in the viewer.
                </div>
                <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-ink-400">
                  It may prevent iframe embedding using browser security headers
                  (X-Frame-Options / Content-Security-Policy). Nothing is bypassed —
                  use the official website directly.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={openExternal}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-[13.5px] font-semibold text-night-950 transition-colors hover:bg-gold-300"
                >
                  Open Official Website
                  <Icon name="external-link" width={14} height={14} />
                </button>
                <button
                  type="button"
                  onClick={reload}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[13.5px] font-semibold text-ink-100 transition-colors hover:border-white/35"
                >
                  <Icon name="refresh-cw" width={14} height={14} />
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen mode */}
      {fullscreen && (
        <div className="fixed inset-0 z-[120] flex flex-col bg-night-950 pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
          <div className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col p-2 sm:p-3 md:p-5">
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-white/10">
              {toolbar}
              <div className="relative flex-1 bg-[#f4f6f8]">
                {frame(frameKey)}
                <button
                  type="button"
                  onClick={() => {
                    setFullscreen(false);
                    start();
                  }}
                  aria-label="Exit fullscreen"
                  className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-night-950/90 text-ink-100 shadow-lg backdrop-blur transition-colors hover:bg-night-800"
                >
                  <Icon name="x" width={17} height={17} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between px-2 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-600">
              <span className="hidden sm:inline">Press ESC to exit</span>
              <button
                type="button"
                onClick={() => {
                  setFullscreen(false);
                  start();
                }}
                className="mx-auto sm:ml-auto rounded-full border border-white/10 px-3 py-1 text-ink-400 transition-colors hover:border-white/30 hover:text-ink-100"
              >
                Exit Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToolButton({
  label,
  icon,
  onClick,
  spinning = false,
  primary = false,
}: {
  label: string;
  icon: string;
  onClick: () => void;
  spinning?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
        primary
          ? "border-gold-400/40 bg-gold-400/10 text-gold-300 hover:border-gold-400/70 hover:bg-gold-400/20"
          : "border-white/10 text-ink-300 hover:border-white/30 hover:text-ink-50",
      )}
    >
      <Icon name={icon} width={15} height={15} className={spinning ? "animate-spin" : ""} />
    </button>
  );
}
