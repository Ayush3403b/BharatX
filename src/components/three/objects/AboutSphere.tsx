import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

function DnaSphereMesh() {
  const outerSphere = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const coreNucleus = useRef<THREE.Mesh>(null);
  const internalGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerSphere.current) {
      outerSphere.current.rotation.y = t * 0.12;
      outerSphere.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    }
    if (internalGroup.current) {
      internalGroup.current.rotation.y = -t * 0.16;
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.18;
    if (ring2.current) ring2.current.rotation.x = t * 0.14;
    if (ring3.current) ring3.current.rotation.y = -t * 0.2;
    if (coreNucleus.current) {
      const s = 1 + Math.sin(t * 1.8) * 0.05;
      coreNucleus.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Outer Transparent Glass DNA Sphere */}
      <mesh ref={outerSphere}>
        <sphereGeometry args={[2.0, 48, 48]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.82}
          roughness={0.08}
          thickness={1.6}
          ior={1.5}
          transparent
          opacity={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Outer Geodesic Meridian Lines */}
      <mesh>
        <icosahedronGeometry args={[2.04, 2]} />
        <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.28} />
      </mesh>

      {/* Internal Rotating Group */}
      <group ref={internalGroup}>
        {/* Layer 1: Core Values Ring */}
        <mesh ref={ring1} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[1.5, 0.024, 16, 80]} />
          <meshStandardMaterial color="#f5b84d" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Layer 2: People & Governance Ring */}
        <mesh ref={ring2} rotation={[0, Math.PI / 2.5, 0.3]}>
          <torusGeometry args={[1.2, 0.022, 16, 70]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Layer 3: Vision & Impact Ring */}
        <mesh ref={ring3} rotation={[0.4, 0.2, Math.PI / 2]}>
          <torusGeometry args={[0.9, 0.02, 14, 60]} />
          <meshStandardMaterial color="#10b981" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Central Luminous Nucleus (BharatX Foundation) */}
        <mesh ref={coreNucleus}>
          <icosahedronGeometry args={[0.46, 1]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#f5b84d"
            emissiveIntensity={0.85}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Internal Connected Strata Nodes */}
        {[
          { label: "VALUES", pos: [1.1, 0.4, 0.3], col: "#f5b84d" },
          { label: "PEOPLE", pos: [-0.9, -0.6, 0.5], col: "#0284c7" },
          { label: "VISION", pos: [0.2, 0.9, -0.6], col: "#10b981" },
          { label: "SYSTEMS", pos: [-0.4, -0.8, -0.7], col: "#8b5cf6" },
        ].map((node) => (
          <group key={node.label} position={node.pos as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color={node.col}
                emissive={node.col}
                emissiveIntensity={1.2}
              />
            </mesh>
            <Html distanceFactor={11} center className="pointer-events-none select-none">
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[8.5px] font-bold tracking-widest text-slate-800 bg-white/90 border shadow-xs"
                style={{ borderColor: `${node.col}66` }}
              >
                {node.label}
              </span>
            </Html>
          </group>
        ))}
      </group>

      {/* Internal illumination */}
      <pointLight color="#f5b84d" intensity={14} distance={6} decay={2} />
      <pointLight color="#0284c7" intensity={12} distance={6} decay={2} />
    </group>
  );
}

export function AboutSphere({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="about" className={className}>
      <DnaSphereMesh />
    </ThreeScene>
  );
}
export default AboutSphere;
