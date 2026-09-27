import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

function IntelligenceCoreMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // 4 clean, purposeful orbital nodes that smoothly trace mathematical paths
  const nodes = useMemo(() => [
    { radius: 1.22, speed: 0.9, phase: 0, tilt: [Math.PI / 4, 0, 0] as const, color: "#00f0ff" },
    { radius: 1.22, speed: 0.9, phase: Math.PI, tilt: [Math.PI / 4, 0, 0] as const, color: "#38bdf8" },
    { radius: 1.46, speed: -0.65, phase: Math.PI / 2, tilt: [-Math.PI / 3, Math.PI / 6, 0] as const, color: "#a855f7" },
    { radius: 1.46, speed: -0.65, phase: (3 * Math.PI) / 2, tilt: [-Math.PI / 3, Math.PI / 6, 0] as const, color: "#38bdf8" },
  ], []);

  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Gentle global levitation and slow turnaround
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.y = t * 0.12;
    }

    // Polished crystal core rotation & subtle breathing pulse
    if (crystalRef.current) {
      crystalRef.current.rotation.x = t * 0.35;
      crystalRef.current.rotation.z = t * 0.25;
      const pulse = 1 + Math.sin(t * 2.2) * 0.04;
      crystalRef.current.scale.setScalar(pulse);
    }

    // Inner radiant nucleus counter-rotation
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.5;
      innerRef.current.rotation.y = -t * 0.6;
      const innerPulse = 1 + Math.cos(t * 3.0) * 0.08;
      innerRef.current.scale.setScalar(innerPulse);
    }

    // Razor-thin precision gimbal rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.3;
      ring2Ref.current.rotation.y += delta * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.2;
    }

    // Orbiting nodes glide seamlessly along their trajectories
    nodes.forEach((node, i) => {
      const mesh = nodeRefs.current[i];
      if (mesh) {
        const angle = t * node.speed + node.phase;
        const x = Math.cos(angle) * node.radius;
        const z = Math.sin(angle) * node.radius;
        mesh.position.set(x, 0, z);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* ── CENTRAL POLISHED QUANTUM CRYSTAL ────────────────── */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshPhysicalMaterial
          color="#0a192f"
          emissive="#00f0ff"
          emissiveIntensity={0.65}
          roughness={0.12}
          metalness={0.88}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Inner Radiant Core Star */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* ── GYROSCOPIC PRECISION RINGS (SLEEK & MINIMAL) ────── */}
      {/* Inner Cyan Orbit Ring */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.22, 0.009, 16, 96]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.75} />
        </mesh>
        {/* Nodes bound to Ring 1 */}
        <mesh ref={(el) => { nodeRefs.current[0] = el; }}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh ref={(el) => { nodeRefs.current[1] = el; }}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Outer Violet Orbit Ring */}
      <group rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.46, 0.008, 16, 96]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.65} />
        </mesh>
        {/* Nodes bound to Ring 2 */}
        <mesh ref={(el) => { nodeRefs.current[2] = el; }}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        <mesh ref={(el) => { nodeRefs.current[3] = el; }}>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Subtle Horizontal Horizon Equatorial Ring */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.68, 0.005, 12, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>

      {/* Soft Luminous Lighting */}
      <pointLight color="#00f0ff" intensity={8} distance={5} decay={2} />
      <pointLight color="#a855f7" intensity={5} distance={5} decay={2} />
    </group>
  );
}

export function InnovationCore({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="innovation" className={className}>
      <IntelligenceCoreMesh />
    </ThreeScene>
  );
}
export default InnovationCore;
