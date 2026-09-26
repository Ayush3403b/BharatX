import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Stars } from "@react-three/drei";
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

const RING_RADIUS = 3.05;
const nodeAngle = (i: number) => (i / companies.length) * Math.PI * 2 - Math.PI / 2;
const nodePos = (i: number): [number, number, number] => [
  Math.cos(nodeAngle(i)) * RING_RADIUS,
  0,
  Math.sin(nodeAngle(i)) * RING_RADIUS,
];

function Core() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.14;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.06;
    }
    if (inner.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.02;
      inner.current.scale.setScalar(s);
    }
  });
  return (
    <group ref={group}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#101822"
          emissive="#22d5b3"
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.02, 1]} />
        <meshBasicMaterial color="#43e6c5" wireframe transparent opacity={0.32} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color="#f5b84d" wireframe transparent opacity={0.07} />
      </mesh>
      <pointLight color="#43e6c5" intensity={6} distance={7} decay={2} />
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
  const [x, , z] = nodePos(index);
  const isHovered = hovered === company.slug;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      const target = isHovered ? 1.45 : 1;
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.12));
      mesh.current.position.y = Math.sin(t * 0.9 + index * 1.1) * 0.14;
    }
  });

  return (
    <group position={[x, 0, z]}>
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
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={company.accentColor}
          emissive={company.accentColor}
          emissiveIntensity={isHovered ? 1.6 : 0.85}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 20, 20]} />
        <meshBasicMaterial
          color={company.accentColor}
          transparent
          opacity={isHovered ? 0.22 : 0.1}
          depthWrite={false}
        />
      </mesh>
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
  const { camera, pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.05;
      const p = scrollProgress.get();
      group.current.position.y = -p * 1.6;
      const s = 1 - p * 0.25;
      group.current.scale.setScalar(s);
    }
    // Subtle mouse parallax on the camera without pushing orbit out of bounds
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.35, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.4 + pointer.y * -0.25, 0.045);
    camera.lookAt(0, 0, 0);
  });

  const hoverIdx = hovered ? companies.findIndex((c) => c.slug === hovered) : -1;
  const hoverCompany = hoverIdx >= 0 ? companies[hoverIdx] : null;

  return (
    <group ref={group} rotation={[-0.32, 0, 0]}>
      <Core />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RING_RADIUS, 0.011, 8, 140]} />
        <meshBasicMaterial color="#93a1ad" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.006, 8, 110]} />
        <meshBasicMaterial color="#43e6c5" transparent opacity={0.12} />
      </mesh>
      {companies.map((c, i) => (
        <OrbitNode key={c.id} index={i} onHover={onHover} hovered={hovered} />
      ))}
      {hoverCompany && (
        <Line
          points={[[0, 0, 0], nodePos(hoverIdx)]}
          color={hoverCompany.accentColor}
          lineWidth={1.4}
          transparent
          opacity={0.8}
        />
      )}
      <Stars radius={42} depth={22} count={320} factor={2.1} saturation={0} fade speed={0.35} />
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
      <circle cx="260" cy="260" r="190" fill="none" stroke="rgba(147,161,173,0.25)" strokeDasharray="3 7" />
      <circle cx="260" cy="260" r="128" fill="none" stroke="rgba(67,230,197,0.18)" />
      {companies.map((c, i) => {
        const [x, , z] = nodePos(i);
        const px = 260 + (x / RING_RADIUS) * 190;
        const py = 260 + (z / RING_RADIUS) * 190;
        return (
          <g key={c.id}>
            <line x1="260" y1="260" x2={px} y2={py} stroke={`${c.accentColor}55`} strokeWidth="1" />
            <circle cx={px} cy={py} r="15" fill={`${c.accentColor}22`} stroke={c.accentColor} strokeWidth="1.4" />
            <text
              x={px}
              y={py + 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              fill="#eef2f5"
            >
              {c.monogram}
            </text>
          </g>
        );
      })}
      <circle cx="260" cy="260" r="46" fill="url(#orb-core)" stroke="rgba(67,230,197,0.5)" />
      <text x="260" y="256" textAnchor="middle" fontSize="11" fontFamily="Space Grotesk, sans-serif" fontWeight="600" fill="#f5b84d" letterSpacing="2">
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
      <div className="h-24 w-24 animate-spin rounded-full border border-white/10 border-t-pulse-400/70 [animation-duration:1.4s]" />
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
  const hoverCompany = hovered ? getCompaniesById(hovered) : null;

  const onHover = (slug: string | null) => {
    setHovered((prev) => {
      if (slug && slug !== prev) track("hero_3d_node_hover", { company: slug });
      return slug;
    });
  };

  return (
    <div className={cn("relative h-full w-full", className)}>
      {enabled ? (
        <Suspense fallback={<ScenePlaceholder />}>
          <LazyOrb scrollProgress={scrollProgress} hovered={hovered} onHover={onHover} />
        </Suspense>
      ) : (
        <OrbFallback />
      )}

      {/* Company summary overlay on node hover/tap (Section 12) */}
      <motion.div
        aria-hidden={!hoverCompany}
        className={cn(
          "pointer-events-none absolute bottom-2 left-1/2 w-[min(92%,380px)] -translate-x-1/2 md:bottom-6",
        )}
        initial={false}
        animate={
          hoverCompany
            ? { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
            : { opacity: 0, y: 14, transition: { duration: 0.25 } }
        }
      >
        {hoverCompany && (
          <div className="glass pointer-events-auto rounded-xl border border-white/10 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: hoverCompany.accentColor }}
                  />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: hoverCompany.accentColor }}
                  >
                    {hoverCompany.category}
                  </span>
                </div>
                <div className="mt-1.5 font-display text-lg font-semibold text-ink-50">
                  {hoverCompany.name}
                </div>
              </div>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg font-mono text-[11px] font-semibold"
                style={{
                  color: hoverCompany.accentColor,
                  background: `${hoverCompany.accentColor}14`,
                  border: `1px solid ${hoverCompany.accentColor}44`,
                }}
              >
                {hoverCompany.monogram}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-400">
              {hoverCompany.description}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <Link
                to={`/companies/${hoverCompany.slug}`}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-400 transition-colors hover:text-gold-300"
              >
                Explore <Icon name="arrow-right" width={12} height={12} />
              </Link>
              <a
                href={hoverCompany.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400 transition-colors hover:text-ink-100"
              >
                Website <Icon name="external-link" width={12} height={12} />
              </a>
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
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 5]} intensity={0.9} color="#eef2f5" />
      <pointLight position={[-7, 3, -6]} intensity={10} color="#f5b84d" distance={22} decay={2} />
      <pointLight position={[5, -4, 6]} intensity={6} color="#22d5b3" distance={20} decay={2} />
      <Scene hovered={hovered} onHover={onHover} scrollProgress={scrollProgress} />
    </Canvas>
  );
}

export type { ReactNode };
