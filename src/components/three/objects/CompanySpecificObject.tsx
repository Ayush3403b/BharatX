import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

interface CompanyObjectProps {
  slug?: string;
  className?: string;
}

function LaunchVectorMesh() {
  // BharatX Ventures: Rising geometric trajectory
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.1;
      group.current.position.y = Math.sin(t * 1.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Upward Trajectory Vector Cone */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.6, 2.2, 4]} />
        <meshStandardMaterial
          color="#f5b84d"
          emissive="#f5b84d"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* Tiered Growth Stages */}
      {[-0.6, 0.0, 0.6, 1.2].map((y, idx) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, idx * 0.4]}>
          <torusGeometry args={[0.8 - idx * 0.15, 0.02, 12, 48]} />
          <meshBasicMaterial color="#f5b84d" transparent opacity={0.6 - idx * 0.1} />
        </mesh>
      ))}
      <pointLight color="#f5b84d" intensity={18} distance={6} />
    </group>
  );
}

function NeuralCoreMesh() {
  // AIxperts Labs: Neural network & compute core
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.14;
    if (core.current) {
      const s = 1 + Math.sin(t * 2.5) * 0.08;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#00bcd4"
          emissive="#00bcd4"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#00bcd4"
          emissiveIntensity={1.0}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00bcd4" transparent opacity={0.7} />
      </mesh>
      <pointLight color="#00bcd4" intensity={20} distance={6} />
    </group>
  );
}

function StructuralArchMesh() {
  // BharatX Infratech: Structural architectural arch & beams
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.07;
  });

  return (
    <group ref={group}>
      {/* Heavy Structural Arch Columns */}
      <mesh position={[-0.8, -0.2, 0]}>
        <boxGeometry args={[0.3, 1.8, 0.3]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.8, -0.2, 0]}>
        <boxGeometry args={[0.3, 1.8, 0.3]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Arch Keystone & Truss */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.0, 0.25, 0.35]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
      {/* Concentric Truss Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.025, 12, 60]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.5} />
      </mesh>
      <pointLight color="#38bdf8" intensity={16} distance={6} />
    </group>
  );
}

function MobilitySystemMesh() {
  // Casters Global: Precision mobility system & bearings
  const group = useRef<THREE.Group>(null);
  const wheel1 = useRef<THREE.Mesh>(null);
  const wheel2 = useRef<THREE.Mesh>(null);
  const axle = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.08;
    if (wheel1.current) wheel1.current.rotation.x = t * 1.5;
    if (wheel2.current) wheel2.current.rotation.x = -t * 1.5;
    if (axle.current) axle.current.rotation.z = t * 0.4;
  });

  return (
    <group ref={group}>
      {/* Center Precision Hub */}
      <mesh ref={axle} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 1.8, 24]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Outer Precision Mobility Rings */}
      <mesh ref={wheel1} position={[-0.7, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.0, 0.12, 16, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh ref={wheel2} position={[0.7, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.0, 0.12, 16, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <pointLight color="#3b82f6" intensity={18} distance={6} />
    </group>
  );
}

function DeepTechLatticeMesh() {
  // BharatX Labs: DeepTech Quantum lattice
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.12;
    if (core.current) {
      core.current.rotation.x = t * 0.25;
      core.current.rotation.z = -t * 0.35;
      const s = 1 + Math.sin(t * 3) * 0.06;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.65, 0]} />
        <meshPhysicalMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>
      <mesh>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial color="#34d399" wireframe roughness={0.15} metalness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.65, 0.02, 16, 64]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.7} />
      </mesh>
      <pointLight color="#10b981" intensity={20} distance={6} />
    </group>
  );
}

function SeedToNetworkMesh() {
  // BharatX Agro: Botanical Seed to Global Network
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.09;
      group.current.position.y = Math.sin(t * 0.9) * 0.08;
    }
  });

  return (
    <group ref={group}>
      {/* Central Botanical Seed Core */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <tetrahedronGeometry args={[0.6, 2]} />
        <meshStandardMaterial
          color="#047857"
          emissive="#10b981"
          emissiveIntensity={0.85}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Global Trade Orbital Rings */}
      <mesh rotation={[Math.PI / 2.2, 0.2, 0]}>
        <torusGeometry args={[1.5, 0.025, 16, 64]} />
        <meshStandardMaterial color="#f5b84d" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Global Node Beacons */}
      {[0, 1.8, 3.6, 5.2].map((ang) => (
        <group key={ang} position={[Math.cos(ang) * 1.5, Math.sin(ang) * 0.4, Math.sin(ang) * 1.5]}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#f5b84d" emissive="#f5b84d" emissiveIntensity={1.5} />
          </mesh>
        </group>
      ))}
      <pointLight color="#10b981" intensity={18} distance={6} />
    </group>
  );
}

export function CompanySpecificObject({ slug, className }: CompanyObjectProps) {
  const renderMesh = () => {
    switch (slug) {
      case "bharatx-ventures":
        return <LaunchVectorMesh />;
      case "aixperts-labs":
        return <NeuralCoreMesh />;
      case "bharatx-infratech":
        return <StructuralArchMesh />;
      case "casters-global":
        return <MobilitySystemMesh />;
      case "bharatx-labs":
        return <DeepTechLatticeMesh />;
      case "bharatx-agro":
      default:
        return <SeedToNetworkMesh />;
    }
  };

  return (
    <ThreeScene sceneKey="companies" className={className}>
      {renderMesh()}
    </ThreeScene>
  );
}
export default CompanySpecificObject;
