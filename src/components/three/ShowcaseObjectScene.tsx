import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { cn } from "../../utils/cn";
import { isLowPowerDevice, webglSupported } from "./webgl";

/**
 * Abstract capability showcase object (Section 5A, item 2).
 * Nested gyroscopic rings around a faceted core — studio-lit, with a
 * gold rim light. Rotation is idle + scroll-linked.
 */

function Rings({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const sat = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollProgress.get();
    if (root.current) {
      const target = 0.45 + scroll * Math.PI * 1.35;
      root.current.rotation.y = THREE.MathUtils.lerp(
        root.current.rotation.y,
        target,
        0.05,
      );
      root.current.position.y = Math.sin(t * 0.6) * 0.06;
    }
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.16;
      ring1.current.rotation.y = t * 0.07;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * -0.13;
      ring2.current.rotation.z = t * 0.09;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * -0.1;
      ring3.current.rotation.x = t * 0.05;
    }
    if (core.current) {
      core.current.rotation.y = t * 0.22;
      core.current.rotation.x = t * 0.11;
    }
    if (sat.current) {
      sat.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group ref={root}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.66, 0]} />
        <meshStandardMaterial
          color="#141c26"
          emissive="#22d5b3"
          emissiveIntensity={0.28}
          metalness={0.75}
          roughness={0.28}
          flatShading
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.86, 1]} />
        <meshBasicMaterial color="#43e6c5" wireframe transparent opacity={0.14} />
      </mesh>

      <mesh ref={ring1} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.55, 0.045, 20, 120]} />
        <meshStandardMaterial color="#c9d4de" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.8, 0.4, 0]}>
        <torusGeometry args={[1.18, 0.038, 20, 110]} />
        <meshStandardMaterial
          color="#123a34"
          emissive="#22d5b3"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={ring3} rotation={[0.5, Math.PI / 2.4, 0.2]}>
        <torusGeometry args={[0.9, 0.032, 18, 100]} />
        <meshStandardMaterial
          color="#3a2a12"
          emissive="#f5b84d"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      <group ref={sat}>
        <mesh position={[1.55, 0, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial
            color="#f5b84d"
            emissive="#f5b84d"
            emissiveIntensity={0.9}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[-1.18, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#43e6c5"
            emissive="#43e6c5"
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

function ShowcaseFallback() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="h-full w-full"
      role="img"
      aria-label="Abstract 3D capability object rendered statically"
    >
      <defs>
        <linearGradient id="sc-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#43e6c5" />
          <stop offset="100%" stopColor="#f5b84d" />
        </linearGradient>
      </defs>
      <ellipse cx="240" cy="240" rx="170" ry="64" fill="none" stroke="url(#sc-ring)" strokeWidth="2" transform="rotate(-18 240 240)" />
      <ellipse cx="240" cy="240" rx="130" ry="48" fill="none" stroke="rgba(201,212,222,0.5)" strokeWidth="1.5" transform="rotate(24 240 240)" />
      <ellipse cx="240" cy="240" rx="92" ry="34" fill="none" stroke="rgba(245,184,77,0.65)" strokeWidth="1.5" transform="rotate(-52 240 240)" />
      <polygon
        points="240,180 292,210 292,270 240,300 188,270 188,210"
        fill="#141c26"
        stroke="rgba(67,230,197,0.6)"
        strokeWidth="1.5"
      />
      <circle cx="410" cy="212" r="7" fill="#f5b84d" />
      <circle cx="86" cy="262" r="5.5" fill="#43e6c5" />
    </svg>
  );
}

export default function ShowcaseObjectScene({
  scrollProgress,
  className,
}: {
  scrollProgress: MotionValue<number>;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const enabled = webglSupported() && !isLowPowerDevice() && !reduced;

  return (
    <div className={cn("relative h-full w-full", className)}>
      {enabled ? (
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border border-white/10 border-t-gold-400/70 [animation-duration:1.4s]" />
            </div>
          }
        >
          <LazyShowcase scrollProgress={scrollProgress} />
        </Suspense>
      ) : (
        <ShowcaseFallback />
      )}
    </div>
  );
}

function LazyShowcase({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 5.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#eef2f5" />
      <pointLight position={[-6, 2, -5]} intensity={12} color="#f5b84d" distance={20} decay={2} />
      <pointLight position={[5, -3, 4]} intensity={7} color="#22d5b3" distance={18} decay={2} />
      <Rings scrollProgress={scrollProgress} />
    </Canvas>
  );
}
