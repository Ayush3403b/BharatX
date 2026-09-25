let cached: boolean | null = null;

/** Detect WebGL availability for graceful 3D fallback (Section 5A). */
export function webglSupported(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cached = !!gl;
  } catch {
    cached = false;
  }
  return cached;
}

/** Heuristic low-power check to decide whether to render a static fallback. */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  return cores <= 2 || (memory !== undefined && memory < 4) || (coarse && cores <= 4);
}
