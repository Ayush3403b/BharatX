import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { companies } from "../../data/companies";
import { webglSupported, isLowPowerDevice } from "./webgl";

interface NodeData {
  slug: string;
  name: string;
  color: string;
  radius: number;
  speed: number;
  offset: number;
  inclination: number;
}

function FooterScene() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Mouse tracking
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const nodeConfigs: NodeData[] = useMemo(() => {
    return companies.slice(0, 6).map((c, i) => {
      const radius = 2.2 + (i % 2) * 0.35;
      const speed = 0.24 + (i % 3) * 0.06;
      const offset = (i / 6) * Math.PI * 2;
      const inclination = ((i % 3) - 1) * 0.22;
      return {
        slug: c.slug,
        name: c.name,
        color: c.accentColor,
        radius,
        speed,
        offset,
        inclination,
      };
    });
  }, []);

  // Meshes for the 6 nodes
  const nodeMeshes = useRef<(THREE.Group | THREE.Mesh | null)[]>([]);

  // Line segments geometry
  const linePositions = useMemo(() => new Float32Array(6 * 2 * 3), []);
  const lineColors = useMemo(() => {
    const arr = new Float32Array(6 * 2 * 3);
    nodeConfigs.forEach((node, i) => {
      const c = new THREE.Color(node.color);
      // Hub vertex
      arr[i * 6] = 0.96;
      arr[i * 6 + 1] = 0.72;
      arr[i * 6 + 2] = 0.3;
      // Node vertex
      arr[i * 6 + 3] = c.r;
      arr[i * 6 + 4] = c.g;
      arr[i * 6 + 5] = c.b;
    });
    return arr;
  }, [nodeConfigs]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    return geo;
  }, [linePositions, lineColors]);

  useFrame((state, delta) => {
    // Smooth mouse lerp
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = mouse.current.y * 0.2;
      groupRef.current.rotation.z = -mouse.current.x * 0.15;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.4;
      coreRef.current.rotation.x += delta * 0.25;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
      coreRef.current.scale.set(s, s, s);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
    }

    const t = state.clock.elapsedTime;
    const posAttr = lineGeo.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    nodeConfigs.forEach((node, i) => {
      const angle = t * node.speed + node.offset;
      const x = Math.cos(angle) * node.radius;
      const z = Math.sin(angle) * node.radius;
      const y = Math.sin(angle * 2 + node.offset) * 0.35 + Math.sin(node.inclination) * x * 0.4;

      const mesh = nodeMeshes.current[i];
      if (mesh) {
        mesh.position.set(x, y, z);
      }

      // Line: center (0,0,0) to node (x,y,z)
      const baseIdx = i * 6;
      posArr[baseIdx] = 0;
      posArr[baseIdx + 1] = 0;
      posArr[baseIdx + 2] = 0;
      posArr[baseIdx + 3] = x;
      posArr[baseIdx + 4] = y;
      posArr[baseIdx + 5] = z;
    });

    posAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing core representing BharatX */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color="#f5b84d"
          emissive="#f5b84d"
          emissiveIntensity={0.85}
          roughness={0.15}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe outer halo around core */}
      <mesh>
        <icosahedronGeometry args={[0.98, 1]} />
        <meshBasicMaterial color="#f5b84d" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Inner crystal octahedron */}
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <octahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial color="#0284c7" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Primary Equatorial subtle orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.3, 0.016, 16, 80]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} transparent opacity={0.65} />
      </mesh>

      {/* Secondary tilted golden orbital ring */}
      <mesh rotation={[Math.PI / 2.8, 0.25, 0]}>
        <torusGeometry args={[2.55, 0.014, 16, 80]} />
        <meshBasicMaterial color="#f5b84d" transparent opacity={0.4} />
      </mesh>

      {/* Connecting laser lines */}
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.55} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Six Orbiting Company Nodes */}
      {nodeConfigs.map((node, i) => (
        <group
          key={node.slug}
          ref={(el) => {
            nodeMeshes.current[i] = el;
          }}
        >
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.2}
              roughness={0.15}
              metalness={0.7}
            />
          </mesh>
          {/* Subtle node energy halo */}
          <mesh>
            <torusGeometry args={[0.34, 0.014, 8, 32]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.65} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FallbackFooterOrb() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full opacity-60">
      <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(245,184,77,0.2)" strokeDasharray="3 4" />
      <circle cx="100" cy="100" r="20" fill="rgba(245,184,77,0.15)" stroke="#f5b84d" strokeWidth="1.2" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 100 + 60 * Math.cos(rad);
        const y = 100 + 60 * Math.sin(rad);
        const c = companies[i]?.accentColor || "#22d5b3";
        return (
          <g key={deg}>
            <line x1="100" y1="100" x2={x} y2={y} stroke="rgba(245,184,77,0.25)" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="6" fill={c} />
          </g>
        );
      })}
    </svg>
  );
}

export default function FooterOrbScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const supported = webglSupported() && !isLowPowerDevice() && !reduced;

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className ?? "relative h-[340px] w-full md:h-[440px]"}>
      {/* High-contrast ambient glow pedestal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full blur-3xl opacity-75 dark:opacity-30 transition-opacity"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(224,242,254,0.55) 45%, rgba(245,184,77,0.18) 70%, transparent 85%)",
        }}
      />

      {supported && inView ? (
        <Suspense fallback={<FallbackFooterOrb />}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 1.2, 8.8], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[6, 9, 6]} intensity={1.8} color="#ffffff" />
            <pointLight position={[4, 5, 4]} intensity={16} color="#f5b84d" distance={18} decay={2} />
            <pointLight position={[-4, -4, -4]} intensity={14} color="#00f0ff" distance={18} decay={2} />
            <FooterScene />
          </Canvas>
        </Suspense>
      ) : (
        <FallbackFooterOrb />
      )}
    </div>
  );
}
