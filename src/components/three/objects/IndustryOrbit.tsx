import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

interface SectorMarker {
  title: string;
  ring: number;
  angle: number;
  color: string;
}

const sectors: SectorMarker[] = [
  { title: "DEEPTECH & AI", ring: 1.6, angle: 0.2, color: "#00bcd4" },
  { title: "INFRASTRUCTURE", ring: 2.2, angle: 1.8, color: "#38bdf8" },
  { title: "INDUSTRIAL MOBILITY", ring: 2.2, angle: 4.2, color: "#3b82f6" },
  { title: "AGRICULTURE & TRADE", ring: 2.8, angle: 3.1, color: "#10b981" },
  { title: "VENTURE BUILDING", ring: 2.8, angle: 5.6, color: "#f5b84d" },
];

function IndustryOrbitMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.05;
    if (ring1.current) ring1.current.rotation.z = t * 0.12;
    if (ring2.current) ring2.current.rotation.z = -t * 0.09;
    if (ring3.current) ring3.current.rotation.z = t * 0.07;
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.15;
      coreRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.35, 0, 0]}>
      {/* Central Industrial Keystone */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#f5b84d"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Orbit Ring 1: Technology & Compute */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.024, 16, 100]} />
        <meshStandardMaterial color="#00bcd4" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Orbit Ring 2: Infrastructure & Mobility */}
      <mesh ref={ring2} rotation={[Math.PI / 2.1, 0.2, 0]}>
        <torusGeometry args={[2.2, 0.026, 16, 120]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Orbit Ring 3: Agriculture, Food & Venture */}
      <mesh ref={ring3} rotation={[Math.PI / 2.3, -0.2, 0.3]}>
        <torusGeometry args={[2.8, 0.028, 16, 140]} />
        <meshStandardMaterial color="#f5b84d" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sector Nodes */}
      {sectors.map((sec) => {
        const x = Math.cos(sec.angle) * sec.ring;
        const z = Math.sin(sec.angle) * sec.ring;
        return (
          <group key={sec.title} position={[x, 0, z]}>
            <mesh>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={sec.color}
                emissive={sec.color}
                emissiveIntensity={1.4}
                metalness={0.85}
                roughness={0.2}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[0.26, 0.012, 8, 24]} />
              <meshBasicMaterial color={sec.color} transparent opacity={0.7} />
            </mesh>
            <Html center distanceFactor={11} position={[0, 0.42, 0]}>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[8.5px] font-bold tracking-wider text-slate-800 bg-white/90 border shadow-xs whitespace-nowrap"
                style={{ borderColor: sec.color }}
              >
                {sec.title}
              </span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export function IndustryOrbit({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="industries" className={className}>
      <IndustryOrbitMesh />
    </ThreeScene>
  );
}
export default IndustryOrbit;
