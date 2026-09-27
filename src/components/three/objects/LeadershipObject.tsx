import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";

function CompassMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const azimuthRing = useRef<THREE.Mesh>(null);
  const innerRing = useRef<THREE.Mesh>(null);
  const needleGroup = useRef<THREE.Group>(null);
  const northStar = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (azimuthRing.current) azimuthRing.current.rotation.z = t * 0.08;
    if (innerRing.current) innerRing.current.rotation.z = -t * 0.12;
    if (needleGroup.current) {
      // Gentle orientation search oscillation
      needleGroup.current.rotation.z = Math.sin(t * 0.8) * 0.12;
    }
    if (northStar.current) {
      const s = 1 + Math.sin(t * 2.5) * 0.12;
      northStar.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.2, 0, 0]}>
      {/* Central Keystone Sphere */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#f5b84d"
          emissiveIntensity={0.8}
          metalness={0.92}
          roughness={0.15}
        />
      </mesh>

      {/* Central Vision Crest */}
      <Html center distanceFactor={10} position={[0, 0, 0.6]}>
        <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.25em] text-amber-950 bg-amber-300/90 px-2 py-0.5 rounded-full border border-amber-500 shadow-sm">
          VISION
        </span>
      </Html>

      {/* Outer Azimuth Degree Dial Ring */}
      <mesh ref={azimuthRing} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.2, 0.035, 16, 120]} />
        <meshStandardMaterial color="#f5b84d" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Inner Astrolabe Ring */}
      <mesh ref={innerRing} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.65, 0.022, 16, 90]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Compass Needle Cross / Four Directional Pointer Arms */}
      <group ref={needleGroup}>
        {/* North Pointer (Long, Gold) */}
        <mesh position={[0, 1.3, 0]}>
          <coneGeometry args={[0.18, 1.4, 4]} />
          <meshStandardMaterial
            color="#f5b84d"
            emissive="#f5b84d"
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* The North Star Beacon */}
        <mesh ref={northStar} position={[0, 2.1, 0]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#f5b84d"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* South Pointer */}
        <mesh position={[0, -1.0, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.14, 0.9, 4]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* East Pointer */}
        <mesh position={[1.0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.14, 0.9, 4]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* West Pointer */}
        <mesh position={[-1.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.14, 0.9, 4]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Direction Cardinal Labels */}
      {[
        { t: "N", pos: [0, 2.55, 0], col: "#f5b84d" },
        { t: "S", pos: [0, -2.55, 0], col: "#64748b" },
        { t: "E", pos: [2.55, 0, 0], col: "#64748b" },
        { t: "W", pos: [-2.55, 0, 0], col: "#64748b" },
      ].map((card) => (
        <Html key={card.t} center distanceFactor={10} position={card.pos as [number, number, number]}>
          <span
            className="font-mono text-[11px] font-bold"
            style={{ color: card.col }}
          >
            {card.t}
          </span>
        </Html>
      ))}
    </group>
  );
}

export function LeadershipObject({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="leadership" className={className}>
      <CompassMesh />
    </ThreeScene>
  );
}
export default LeadershipObject;
