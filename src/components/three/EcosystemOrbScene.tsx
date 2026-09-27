import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Stars, Html } from "@react-three/drei";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import {
  Suspense,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { Link } from "react-router-dom";
import { companies, getCompaniesById } from "../../data/companies";
import { markHeroSceneReady } from "../../config/sceneReady";
import { track } from "../../services/analytics";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";
import { isLowPowerDevice, webglSupported } from "./webgl";

/* ── Scene internals ─────────────────────────────────────────── */

const RING_RADIUS = 3.15;
const nodeAngle = (i: number) => (i / companies.length) * Math.PI * 2 - Math.PI / 2;
const nodePos = (i: number): [number, number, number] => [
  Math.cos(nodeAngle(i)) * RING_RADIUS,
  0,
  Math.sin(nodeAngle(i)) * RING_RADIUS,
];

function Core() {
  const group = useRef<THREE.Group>(null);
  const innerOcta = useRef<THREE.Mesh>(null);
  const crystalShell = useRef<THREE.Mesh>(null);
  const outerGeodesic = useRef<THREE.Mesh>(null);
  const gimbal = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.16;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.08;
    }
    if (innerOcta.current) {
      innerOcta.current.rotation.y = -t * 0.35;
      innerOcta.current.rotation.z = t * 0.2;
      const s = 1 + Math.sin(t * 1.6) * 0.04;
      innerOcta.current.scale.setScalar(s);
    }
    if (crystalShell.current) {
      crystalShell.current.rotation.y = t * 0.12;
      crystalShell.current.rotation.z = -t * 0.15;
    }
    if (outerGeodesic.current) {
      outerGeodesic.current.rotation.x = t * 0.09;
      outerGeodesic.current.rotation.y = -t * 0.14;
    }
    if (gimbal.current) {
      gimbal.current.rotation.z = t * 0.22;
    }
  });

  return (
    <group ref={group}>
      {/* Tier 1: Inner Solid Obsidian & Gold Faceted Octahedron */}
      <mesh ref={innerOcta}>
        <octahedronGeometry args={[0.58, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#f59e0b"
          emissiveIntensity={0.65}
          roughness={0.12}
          metalness={0.92}
        />
      </mesh>

      {/* Tier 2: Golden Geodesic Cage */}
      <mesh>
        <icosahedronGeometry args={[0.82, 1]} />
        <meshStandardMaterial
          color="#f5b84d"
          wireframe
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Tier 3: Prismatic Glass Crystal Shell with Physical Refraction */}
      <mesh ref={crystalShell}>
        <icosahedronGeometry args={[1.12, 1]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.68}
          roughness={0.06}
          thickness={1.5}
          ior={1.65}
          transparent
          opacity={0.88}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Tier 4: High-Visibility Dodecahedron Geodesic Shield */}
      <mesh ref={outerGeodesic}>
        <dodecahedronGeometry args={[1.42, 0]} />
        <meshBasicMaterial
          color="#0284c7"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Tier 5: Outer Sovereign Gold Geodesic Envelope */}
      <mesh>
        <icosahedronGeometry args={[1.76, 1]} />
        <meshBasicMaterial
          color="#d97706"
          wireframe
          transparent
          opacity={0.52}
        />
      </mesh>

      {/* Tier 6: Core Equatorial Gimbal Ring */}
      <mesh ref={gimbal} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.95, 0.024, 16, 64]} />
        <meshStandardMaterial
          color="#0284c7"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Intense Core Dual-Tone Illumination */}
      <pointLight color="#f5b84d" intensity={22} distance={10} decay={2} />
      <pointLight color="#00f0ff" intensity={18} distance={8} decay={2} />
    </group>
  );
}

function OrbitNode({
  index,
  onHover,
  hovered,
}: {
  index: number;
  onHover: (slug: string | null) => void;
  hovered: string | null;
}) {
  const company = companies[index];
  const mesh = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [x, , z] = nodePos(index);
  const isHovered = hovered === company.slug;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      const target = isHovered ? 1.5 : 1;
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.12));
      mesh.current.position.y = Math.sin(t * 1.2 + index * 1.05) * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 1.5;
      ringRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* Precision Metallic Satellite Core */}
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(company.slug);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onHover(company.slug);
        }}
      >
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color={company.accentColor}
          emissive={company.accentColor}
          emissiveIntensity={isHovered ? 2.4 : 1.2}
          metalness={0.88}
          roughness={0.16}
        />
      </mesh>

      {/* Orbiting Gyro Gimbal Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.42, 0.018, 8, 32]} />
        <meshBasicMaterial
          color={company.accentColor}
          transparent
          opacity={isHovered ? 0.95 : 0.75}
        />
      </mesh>

      {/* Luminous Energy Halo */}
      <mesh>
        <sphereGeometry args={[0.54, 20, 20]} />
        <meshBasicMaterial
          color={company.accentColor}
          transparent
          opacity={isHovered ? 0.35 : 0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Local Spotlight */}
      <pointLight
        color={company.accentColor}
        intensity={isHovered ? 9 : 4}
        distance={4.5}
        decay={2}
      />

      {/* Interactive 3D Company Identifier Badge */}
      <Html
        center
        distanceFactor={11}
        position={[0, 0.54, 0]}
        className="pointer-events-none select-none"
      >
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300 whitespace-nowrap shadow-md border",
            isHovered
              ? "scale-115 shadow-xl ring-2"
              : "scale-100 opacity-95"
          )}
          style={{
            backgroundColor: isHovered
              ? company.accentColor
              : "rgba(255, 255, 255, 0.92)",
            color: isHovered ? "#ffffff" : "#0f172a",
            borderColor: company.accentColor,
            boxShadow: `0 4px 14px -2px ${company.accentColor}55`,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: isHovered ? "#ffffff" : company.accentColor }}
          />
          <span>{company.shortName}</span>
        </div>
      </Html>
    </group>
  );
}

function Scene({
  hovered,
  onHover,
  scrollProgress,
}: {
  hovered: string | null;
  onHover: (slug: string | null) => void;
  scrollProgress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const { camera, pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.045;
      const p = scrollProgress.get();
      group.current.position.y = -p * 1.5;
      const s = 1 - p * 0.22;
      group.current.scale.setScalar(s);
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.08;
    if (ring2.current) ring2.current.rotation.z = -t * 0.06;

    // Subtle mouse parallax on the camera
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.45, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.35 + pointer.y * -0.25, 0.045);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group} rotation={[-0.32, 0, 0]}>
      <Core />

      {/* Primary Equatorial Orbit Rings */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RING_RADIUS, 0.028, 16, 160]} />
        <meshStandardMaterial
          color="#0284c7"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.2, 0.15, 0.25]}>
        <torusGeometry args={[2.45, 0.018, 12, 120]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inter-Node Geodesic Network Lines (Section 4 Signature Construction) */}
      {companies.map((c, i) => {
        const nextIdx = (i + 1) % companies.length;
        return (
          <Line
            key={`network-${c.id}`}
            points={[nodePos(i), nodePos(nextIdx)]}
            color="#0284c7"
            lineWidth={1.8}
            transparent
            opacity={0.45}
          />
        );
      })}

      {/* Radial Hub Connectors (From Center Core to Each Node) */}
      {companies.map((c, i) => {
        const isHovered = hovered === c.slug;
        return (
          <Line
            key={`radial-${c.id}`}
            points={[[0, 0, 0], nodePos(i)]}
            color={c.accentColor}
            lineWidth={isHovered ? 3.5 : 2.0}
            transparent
            opacity={isHovered ? 1.0 : 0.65}
          />
        );
      })}

      {/* The 6 Orbiting Business Nodes */}
      {companies.map((c, i) => (
        <OrbitNode key={c.id} index={i} onHover={onHover} hovered={hovered} />
      ))}

      {/* Ambient Data Particles Cloud */}
      <Stars radius={40} depth={20} count={260} factor={1.8} saturation={0} fade speed={0.3} />
    </group>
  );
}

/* ── Static fallback (no WebGL / reduced motion / low power) ── */

function OrbFallback() {
  return (
    <svg
      viewBox="0 0 520 520"
      className="h-full w-full"
      role="img"
      aria-label="BharatX Group ecosystem diagram: six companies connected to the group core"
    >
      <defs>
        <radialGradient id="orb-core" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#1a2330" />
          <stop offset="100%" stopColor="#0b0f15" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="260" r="190" fill="none" stroke="rgba(147,161,173,0.35)" strokeDasharray="3 7" strokeWidth="1.5" />
      <circle cx="260" cy="260" r="128" fill="none" stroke="rgba(2,132,199,0.3)" strokeWidth="1.5" />
      {companies.map((c, i) => {
        const [x, , z] = nodePos(i);
        const px = 260 + (x / RING_RADIUS) * 190;
        const py = 260 + (z / RING_RADIUS) * 190;
        return (
          <g key={c.id}>
            <line x1="260" y1="260" x2={px} y2={py} stroke={`${c.accentColor}88`} strokeWidth="1.6" />
            <circle cx={px} cy={py} r="16" fill={`${c.accentColor}25`} stroke={c.accentColor} strokeWidth="1.8" />
            <text
              x={px}
              y={py + 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fill={c.accentColor}
            >
              {c.monogram}
            </text>
          </g>
        );
      })}
      <circle cx="260" cy="260" r="48" fill="url(#orb-core)" stroke="rgba(2,132,199,0.7)" strokeWidth="2" />
      <text x="260" y="256" textAnchor="middle" fontSize="11" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fill="#f5b84d" letterSpacing="2">
        BHARATX
      </text>
      <text x="260" y="272" textAnchor="middle" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fill="#93a1ad" letterSpacing="4">
        GROUP
      </text>
    </svg>
  );
}

/* ── Exported component ──────────────────────────────────────── */

function ScenePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-24 w-24 animate-spin rounded-full border-2 border-slate-300 border-t-gold-500 [animation-duration:1.4s]" />
    </div>
  );
}

export default function EcosystemOrbScene({
  scrollProgress,
  className,
}: {
  scrollProgress: MotionValue<number>;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const enabled = webglSupported() && !isLowPowerDevice() && !reduced;
  const hoverCompany = hovered
    ? companies.find((c) => c.slug === hovered || c.id === hovered) ?? null
    : null;

  const onHover = (slug: string | null) => {
    setHovered((prev) => {
      if (slug && slug !== prev) track("hero_3d_node_hover", { company: slug });
      return slug;
    });
  };

  const exploreUrl = hoverCompany?.slug === "bharatx-labs"
    ? "/bharatx-labs"
    : hoverCompany
      ? `/companies/${hoverCompany.slug}`
      : "/companies";

  return (
    <div className={cn("relative h-full w-full flex items-center justify-center", className)}>
      {/* High-contrast ambient pedestal for light mode & dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] rounded-full blur-3xl opacity-80 dark:opacity-30 transition-opacity"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(224,242,254,0.65) 40%, rgba(245,184,77,0.18) 65%, transparent 80%)",
        }}
      />

      {enabled ? (
        <Suspense fallback={<ScenePlaceholder />}>
          <LazyOrb scrollProgress={scrollProgress} hovered={hovered} onHover={onHover} />
        </Suspense>
      ) : (
        <OrbFallback />
      )}

      {/* Company summary overlay on node hover/tap (Section 12 & 13) */}
      <motion.div
        aria-hidden={!hoverCompany}
        className={cn(
          "pointer-events-none absolute bottom-2 left-1/2 w-[min(94%,400px)] -translate-x-1/2 md:bottom-6 z-20",
        )}
        initial={false}
        animate={
          hoverCompany
            ? { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
            : { opacity: 0, y: 14, transition: { duration: 0.25 } }
        }
      >
        {hoverCompany && (
          <div className="glass pointer-events-auto rounded-xl border border-white/20 dark:border-white/10 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl bg-white/90 dark:bg-night-900/90">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: hoverCompany.accentColor }}
                  />
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.22em] font-semibold"
                    style={{ color: hoverCompany.accentColor }}
                  >
                    {hoverCompany.category}
                  </span>
                </div>
                <div className="mt-1 font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
                  {hoverCompany.name}
                </div>
              </div>
              {hoverCompany.logo ? (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm border border-black/5">
                  <img
                    src={hoverCompany.logo}
                    alt={hoverCompany.name}
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : (
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-[11px] font-semibold"
                  style={{
                    borderColor: `${hoverCompany.accentColor}44`,
                    color: hoverCompany.accentColor,
                    background: `${hoverCompany.accentColor}11`,
                  }}
                >
                  {hoverCompany.monogram}
                </span>
              )}
            </div>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-700 dark:text-ink-300">
              {hoverCompany.description}
            </p>
            <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-black/5 dark:border-white/10 pt-3">
              <Link
                to={exploreUrl}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] font-semibold text-gold-600 dark:text-gold-400 transition-colors hover:text-gold-500"
              >
                Explore <Icon name="arrow-right" width={12} height={12} />
              </Link>
              <Link
                to={`/ecosystem?company=${hoverCompany.slug}`}
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100 transition-colors"
              >
                Ecosystem Viewer <Icon name="arrow-up-right" width={11} height={11} />
              </Link>
              {hoverCompany.website && (
                <a
                  href={hoverCompany.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100 transition-colors"
                >
                  Site <Icon name="external-link" width={11} height={11} />
                </a>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function LazyOrb({
  hovered,
  onHover,
  scrollProgress,
}: {
  hovered: string | null;
  onHover: (slug: string | null) => void;
  scrollProgress: MotionValue<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 9.6], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => markHeroSceneReady()}
      aria-hidden
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 9, 6]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#e0f2fe" />
      <pointLight position={[-8, 4, -6]} intensity={20} color="#f5b84d" distance={26} decay={2} />
      <pointLight position={[7, -4, 7]} intensity={18} color="#00f0ff" distance={24} decay={2} />
      <Scene hovered={hovered} onHover={onHover} scrollProgress={scrollProgress} />
    </Canvas>
  );
}

export type { ReactNode };
