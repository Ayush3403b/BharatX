import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { cn } from "../../utils/cn";
import { pageScenes, type PageSceneConfig } from "./data/pageScenes";
import { isLowPowerDevice, webglSupported } from "./webgl";

function SceneCameraController({
  targetPos = [0, 0, 0],
}: {
  targetPos?: [number, number, number];
}) {
  const { camera, pointer } = useThree();
  const initPos = useRef<[number, number, number] | null>(null);

  useEffect(() => {
    initPos.current = [camera.position.x, camera.position.y, camera.position.z];
  }, [camera]);

  useFrame(() => {
    if (!initPos.current) return;
    // Gentle mouse parallax that keeps objects well within canvas boundaries
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      initPos.current[0] + pointer.x * 0.22,
      0.04
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      initPos.current[1] + pointer.y * 0.18,
      0.04
    );
    camera.lookAt(targetPos[0], targetPos[1], targetPos[2]);
  });

  return null;
}

function SceneLighting({ config }: { config: PageSceneConfig }) {
  const { lighting } = config;
  return (
    <>
      <ambientLight intensity={lighting.ambient} />
      <directionalLight position={[6, 9, 6]} intensity={2.0} color={lighting.keyColor} />
      <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#e0f2fe" />
      <pointLight
        position={[-8, 4, -6]}
        intensity={lighting.pointIntensity}
        color={lighting.rimColor}
        distance={26}
        decay={2}
      />
      <pointLight position={[7, -4, 7]} intensity={16} color="#00f0ff" distance={24} decay={2} />
    </>
  );
}

function DefaultFallback({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-slate-300/40 dark:border-white/10 bg-white/40 dark:bg-night-900/40 backdrop-blur-md">
        <div className="h-28 w-28 rounded-full border border-dashed border-gold-500/50 animate-spin [animation-duration:12s]" />
        <span className="absolute font-mono text-[10px] uppercase tracking-widest text-ink-500">
          {name}
        </span>
      </div>
    </div>
  );
}

export interface ThreeSceneProps {
  sceneKey: keyof typeof pageScenes | string;
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  heightClass?: string;
  lookAt?: [number, number, number];
}

export function ThreeScene({
  sceneKey,
  children,
  className,
  fallback,
  heightClass = "h-[360px] sm:h-[440px] lg:h-[500px] w-full",
  lookAt = [0, 0, 0],
}: ThreeSceneProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const config = pageScenes[sceneKey] || pageScenes.about;
  const isEnabled = webglSupported() && !isLowPowerDevice() && !reduced;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center overflow-visible", heightClass, className)}
    >
      {/* Luminous high-contrast ambient pedestal for Light & Dark modes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] rounded-full blur-3xl opacity-75 dark:opacity-30 transition-opacity"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.92) 0%, rgba(224,242,254,0.6) 45%, rgba(245,184,77,0.15) 70%, transparent 85%)",
        }}
      />

      {isEnabled && inView ? (
        <Suspense fallback={fallback || <DefaultFallback name={config.name} />}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: config.camera.position, fov: config.camera.fov }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            aria-hidden
          >
            <SceneLighting config={config} />
            <SceneCameraController targetPos={lookAt} />
            {children}
          </Canvas>
        </Suspense>
      ) : (
        fallback || <DefaultFallback name={config.name} />
      )}
    </div>
  );
}
