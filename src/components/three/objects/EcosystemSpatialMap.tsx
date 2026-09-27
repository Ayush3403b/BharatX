import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";
import { companies } from "../../../data/companies";
import { cn } from "../../../utils/cn";

interface CapabilityNode {
  label: string;
  pos: [number, number, number];
  color: string;
}

const capabilityNodes: CapabilityNode[] = [
  { label: "AI & COMPUTE", pos: [-1.8, 1.4, -0.6], color: "#00bcd4" },
  { label: "ROBOTICS", pos: [-1.4, -1.2, 0.8], color: "#22d5b3" },
  { label: "INFRASTRUCTURE", pos: [1.6, 1.2, -0.5], color: "#38bdf8" },
  { label: "PRECISION CASTER", pos: [1.9, -1.0, 0.6], color: "#3b82f6" },
  { label: "AGRO-SCIENCE", pos: [-0.4, 1.8, 0.4], color: "#10b981" },
  { label: "VENTURE CAPITAL", pos: [0.3, -1.8, -0.4], color: "#f5b84d" },
];

function SpatialMapMesh({
  onSelectCompany,
}: {
  onSelectCompany?: (slug: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.25, 0, 0]}>
      {/* Central Sovereign Nexus Node */}
      <mesh>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#f5b84d"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.35} />
      </mesh>
      <Html center distanceFactor={10} position={[0, 0.9, 0]}>
        <span className="rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold text-amber-900 bg-amber-200/90 border border-amber-400 shadow-sm">
          BHARATX GROUP
        </span>
      </Html>

      {/* Six Company Nodes with Lines */}
      {companies.map((c, i) => {
        const angle = (i / companies.length) * Math.PI * 2;
        const radius = 2.9;
        const pos: [number, number, number] = [
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.35,
          Math.sin(angle) * radius,
        ];
        const linePoints: [number, number, number][] = [
          [0, 0, 0],
          [-pos[0], -pos[1], -pos[2]],
        ];
        const isHovered = activeNode === c.slug;

        return (
          <group key={c.id} position={pos}>
            <Line
              points={linePoints}
              color={c.accentColor}
              lineWidth={isHovered ? 3.0 : 1.4}
              transparent
              opacity={isHovered ? 0.95 : 0.45}
            />

            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setActiveNode(c.slug);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setActiveNode(null);
                document.body.style.cursor = "auto";
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectCompany) onSelectCompany(c.slug);
              }}
              scale={isHovered ? 1.4 : 1}
            >
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshStandardMaterial
                color={c.accentColor}
                emissive={c.accentColor}
                emissiveIntensity={isHovered ? 2.2 : 1.0}
                roughness={0.15}
                metalness={0.85}
              />
            </mesh>

            <Html center distanceFactor={11} position={[0, 0.42, 0]}>
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md transition-all shadow-sm border whitespace-nowrap",
                  isHovered
                    ? "scale-115 shadow-md border-white/60 text-white"
                    : "scale-100 opacity-90 text-slate-800 bg-white/90 border-black/10"
                )}
                style={{
                  backgroundColor: isHovered ? c.accentColor : "rgba(255, 255, 255, 0.92)",
                  borderColor: c.accentColor,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.accentColor }} />
                <span>{c.shortName}</span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Capability Satellite Nodes */}
      {capabilityNodes.map((cap) => (
        <group key={cap.label} position={cap.pos}>
          <mesh>
            <dodecahedronGeometry args={[0.13, 0]} />
            <meshStandardMaterial
              color={cap.color}
              emissive={cap.color}
              emissiveIntensity={1.4}
              wireframe
            />
          </mesh>
          <Html center distanceFactor={12} position={[0, 0.28, 0]}>
            <span className="rounded-full px-1.5 py-0.5 font-mono text-[8px] font-semibold text-slate-700 bg-white/80 border border-slate-200 shadow-xs">
              {cap.label}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function EcosystemSpatialMap({
  className,
  onSelectCompany,
}: {
  className?: string;
  onSelectCompany?: (slug: string) => void;
}) {
  return (
    <ThreeScene sceneKey="ecosystem" className={className}>
      <SpatialMapMesh onSelectCompany={onSelectCompany} />
    </ThreeScene>
  );
}
export default EcosystemSpatialMap;
