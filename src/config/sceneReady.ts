/**
 * Simple readiness registry.
 * The branded preloader waits (with a hard timeout) for the hero 3D scene
 * to report itself ready via `markHeroSceneReady()`.
 */
let resolveReady: (() => void) | null = null;

const heroSceneReady = new Promise<void>((resolve) => {
  resolveReady = resolve;
});

export function markHeroSceneReady(): void {
  if (resolveReady) {
    resolveReady();
    resolveReady = null;
  }
}

export function heroSceneReadyTimeout(ms: number): Promise<void> {
  return Promise.race([
    heroSceneReady,
    new Promise<void>((resolve) => setTimeout(resolve, ms)),
  ]);
}
