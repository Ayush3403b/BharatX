import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

function ShieldMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const coreMesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.05;
    }
    if (coreMesh.current) {
      coreMesh.current.rotation.z = -t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Hexagonal Security Prism Shield */}
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 6]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.7}
          roughness={0.1}
          thickness={1.2}
          ior={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Titanium Rim Bezel */}
      <mesh>
        <cylinderGeometry args={[1.55, 1.55, 0.18, 6]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Central Quantum Lock Core */}
      <mesh ref={coreMesh}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#0284c7"
          emissiveIntensity={1.0}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Concentric Guard Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.02, 12, 48]} />
        <meshBasicMaterial color="#f5b84d" transparent opacity={0.65} />
      </mesh>

      <pointLight color="#0284c7" intensity={12} distance={5} />
    </group>
  );
}

export function SecurityShield({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="legal" heightClass="h-[220px] sm:h-[260px] w-full" className={className}>
      <ShieldMesh />
    </ThreeScene>
  );
}
export default SecurityShield;
