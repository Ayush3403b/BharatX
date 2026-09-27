import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

interface BranchPoint {
  start: [number, number, number];
  end: [number, number, number];
  label?: string;
  color: string;
}

function GrowthNetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const rootSphere = useRef<THREE.Mesh>(null);

  // Organic branching structure
  const branches: BranchPoint[] = useMemo(() => [
    // Main stems
    { start: [0, -1.8, 0], end: [0, -0.6, 0], color: "#10b981" },
    { start: [0, -0.6, 0], end: [-1.2, 0.4, 0.4], label: "COMMUNITIES", color: "#059669" },
    { start: [0, -0.6, 0], end: [1.2, 0.5, -0.3], label: "WORKFORCE", color: "#047857" },
    { start: [0, -0.6, 0], end: [0, 0.8, 0.2], label: "SYSTEMS", color: "#10b981" },

    // Secondary branches
    { start: [-1.2, 0.4, 0.4], end: [-1.8, 1.4, 0.6], label: "EDUCATION", color: "#34d399" },
    { start: [-1.2, 0.4, 0.4], end: [-0.8, 1.6, -0.2], label: "HEALTH", color: "#10b981" },
    { start: [1.2, 0.5, -0.3], end: [1.9, 1.3, -0.1], label: "SUSTAINABILITY", color: "#f5b84d" },
    { start: [1.2, 0.5, -0.3], end: [1.0, 1.7, 0.5], label: "INFRASTRUCTURE", color: "#0284c7" },
    { start: [0, 0.8, 0.2], end: [-0.2, 1.9, 0.1], label: "AGRICULTURE", color: "#10b981" },
  ], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    }
    if (rootSphere.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.05;
      rootSphere.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Root Seed Node */}
      <mesh ref={rootSphere} position={[0, -1.8, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color="#064e3b"
          emissive="#10b981"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Branch Lines */}
      {branches.map((b, i) => (
        <Line
          key={i}
          points={[b.start, b.end]}
          color={b.color}
          lineWidth={2.2}
          transparent
          opacity={0.7}
        />
      ))}

      {/* Terminal Impact Growth Nodes */}
      {branches.filter(b => b.label).map((b) => (
        <group key={b.label} position={b.end}>
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={1.3}
              metalness={0.8}
              roughness={0.15}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[0.26, 0.012, 8, 24]} />
            <meshBasicMaterial color={b.color} transparent opacity={0.6} />
          </mesh>
          <Html center distanceFactor={11} position={[0, 0.35, 0]}>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[8px] font-bold tracking-wider text-slate-800 bg-white/90 border shadow-xs whitespace-nowrap"
              style={{ borderColor: b.color }}
            >
              {b.label}
            </span>
          </Html>
        </group>
      ))}

      {/* Organic Halo Rings */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 12, 80]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function ImpactNetwork({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="impact" className={className}>
      <GrowthNetworkMesh />
    </ThreeScene>
  );
}
export default ImpactNetwork;
