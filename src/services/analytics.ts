/**
 * Analytics service (Section 55).
 * GA4-ready: events are pushed to window.dataLayer when VITE_GA_ID is set.
 * No tracking ID is ever hardcoded.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

interface GAWindow extends Window {
  dataLayer?: unknown[];
}

let initialised = false;

export function initAnalytics(): void {
  if (initialised) return;
  initialised = true;
  const gaId = import.meta.env.VITE_GA_ID as string | undefined;
  const w = window as GAWindow;
  if (!gaId) return;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  // In a deployed environment, load the gtag.js snippet for this id.
  w.dataLayer.push({ event: "pageview", page_location: location.href, gaId });
}

export function trackPageView(path: string): void {
  push("page_view", { page_path: path });
  const w = window as GAWindow;
  if (w.dataLayer && import.meta.env.VITE_GA_ID) {
    w.dataLayer.push({
      event: "pageview",
      page_path: path,
      page_location: `${location.origin}${path}`,
    });
  }
}

export function track(event: string, params?: EventParams): void {
  push(event, params);
}

function push(event: string, params?: EventParams): void {
  const w = window as GAWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...(params ?? {}) });
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params ?? {});
  }
}
