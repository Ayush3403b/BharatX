import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

function BridgeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const leftPylon = useRef<THREE.Mesh>(null);
  const rightPylon = useRef<THREE.Mesh>(null);
  const centralNexus = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.08;
    if (leftPylon.current) leftPylon.current.rotation.y = t * 0.15;
    if (rightPylon.current) rightPylon.current.rotation.y = -t * 0.15;
    if (centralNexus.current) {
      centralNexus.current.rotation.x = t * 0.3;
      centralNexus.current.rotation.z = t * 0.25;
      const s = 1 + Math.sin(t * 3.0) * 0.08;
      centralNexus.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.15, 0, 0]}>
      {/* Left Structure (Partner / Visitor) */}
      <group position={[-2.2, 0, 0]}>
        <mesh ref={leftPylon}>
          <boxGeometry args={[0.7, 1.6, 0.7]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.85, 1.8, 0.85]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.35} />
        </mesh>
        <Html center distanceFactor={10} position={[0, 1.25, 0]}>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-800 bg-white/95 px-2 py-0.5 rounded-full border border-sky-400 shadow-sm">
            YOUR VISION
          </span>
        </Html>
      </group>

      {/* Right Structure (BharatX Group Ecosystem) */}
      <group position={[2.2, 0, 0]}>
        <mesh ref={rightPylon}>
          <boxGeometry args={[0.7, 1.6, 0.7]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#f5b84d"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.85, 1.8, 0.85]} />
          <meshBasicMaterial color="#f5b84d" wireframe transparent opacity={0.35} />
        </mesh>
        <Html center distanceFactor={10} position={[0, 1.25, 0]}>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-950 bg-amber-200/95 px-2 py-0.5 rounded-full border border-amber-500 shadow-sm">
            BHARATX GROUP
          </span>
        </Html>
      </group>

      {/* The Central Illuminated Bridge Cables */}
      <Line
        points={[[-2.2, 0.5, 0], [0, 0.1, 0], [2.2, 0.5, 0]]}
        color="#f5b84d"
        lineWidth={3.0}
        transparent
        opacity={0.9}
      />
      <Line
        points={[[-2.2, -0.5, 0], [0, -0.1, 0], [2.2, -0.5, 0]]}
        color="#0284c7"
        lineWidth={3.0}
        transparent
        opacity={0.9}
      />
      <Line
        points={[[-2.2, 0, 0.3], [0, 0, 0], [2.2, 0, 0.3]]}
        color="#10b981"
        lineWidth={2.2}
        transparent
        opacity={0.8}
      />

      {/* Central Convergence Node (Partnership Nexus) */}
      <group position={[0, 0, 0]}>
        <mesh ref={centralNexus}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#f5b84d"
            emissiveIntensity={2.0}
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.5} />
        </mesh>
        <Html center distanceFactor={10} position={[0, -0.65, 0]}>
          <span className="font-mono text-[8px] font-bold tracking-widest text-slate-800 bg-white/90 px-2 py-0.5 rounded-full border border-emerald-400 shadow-xs">
            PARTNERSHIP
          </span>
        </Html>
      </group>

      <pointLight position={[0, 0, 0.5]} intensity={18} color="#f5b84d" distance={6} />
      <pointLight position={[-2.2, 0, 0.5]} intensity={12} color="#0284c7" distance={5} />
      <pointLight position={[2.2, 0, 0.5]} intensity={12} color="#f5b84d" distance={5} />
    </group>
  );
}

export function ContactBridge({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="contact" className={className}>
      <BridgeMesh />
    </ThreeScene>
  );
}
export default ContactBridge;
