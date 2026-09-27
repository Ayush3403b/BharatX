import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

function PortalMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const portalRing1 = useRef<THREE.Mesh>(null);
  const portalRing2 = useRef<THREE.Mesh>(null);
  const portalRing3 = useRef<THREE.Mesh>(null);
  const eventHorizon = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.05;
    if (portalRing1.current) portalRing1.current.rotation.z = t * 0.15;
    if (portalRing2.current) portalRing2.current.rotation.z = -t * 0.22;
    if (portalRing3.current) portalRing3.current.rotation.z = t * 0.1;
    if (eventHorizon.current) {
      const s = 1 + Math.sin(t * 2.0) * 0.04;
      eventHorizon.current.scale.set(s, s, 1);
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.15, 0, 0]}>
      {/* Outer Event Horizon Gateway Ring */}
      <mesh ref={portalRing1}>
        <torusGeometry args={[2.2, 0.045, 20, 120]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Mid Accelerator Ring */}
      <mesh ref={portalRing2} position={[0, 0, 0.2]}>
        <torusGeometry args={[1.8, 0.035, 16, 90]} />
        <meshStandardMaterial
          color="#f5b84d"
          emissive="#f5b84d"
          emissiveIntensity={0.8}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Inner Horizon Ring */}
      <mesh ref={portalRing3} position={[0, 0, 0.4]}>
        <torusGeometry args={[1.4, 0.025, 14, 80]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#34d399"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Shimmering Event Horizon Disc */}
      <mesh ref={eventHorizon} position={[0, 0, -0.1]}>
        <circleGeometry args={[1.35, 48]} />
        <meshPhysicalMaterial
          color="#0284c7"
          transmission={0.65}
          roughness={0.1}
          thickness={1.5}
          ior={1.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Tunnel Depth Rings (Looking into the BharatX Future) */}
      {[0.5, 0.9, 1.3].map((depth, idx) => (
        <mesh key={depth} position={[0, 0, -depth]}>
          <torusGeometry args={[1.2 - idx * 0.25, 0.018, 12, 60]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6 - idx * 0.15} />
        </mesh>
      ))}

      {/* Central Opportunity Singularity */}
      <mesh position={[0, 0, -1.5]}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <pointLight position={[0, 0, 0.5]} intensity={18} color="#38bdf8" distance={8} />
      <pointLight position={[0, 0, -1.2]} intensity={22} color="#f5b84d" distance={10} />
    </group>
  );
}

export function CareersPortal({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="careers" className={className}>
      <PortalMesh />
    </ThreeScene>
  );
}
export default CareersPortal;
