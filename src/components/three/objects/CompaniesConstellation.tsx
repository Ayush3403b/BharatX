import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { ThreeScene } from "../ThreeScene";
import { companies } from "../../../data/companies";
import { cn } from "../../../utils/cn";

function ConstellationMesh() {
  const navigate = useNavigate();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.15;
      coreRef.current.rotation.y = -t * 0.22;
    }
  });

  const radius = 2.8;

  return (
    <group ref={groupRef} rotation={[-0.2, 0, 0]}>
      {/* Central BharatX Nexus Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#f5b84d"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
      <mesh>
        <dodecahedronGeometry args={[0.95, 0]} />
        <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Orbital Geodesic Rail */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 120]} />
        <meshStandardMaterial color="#0284c7" transparent opacity={0.45} />
      </mesh>

      {/* Six Unique Abstract Company Geometries */}
      {companies.map((company, i) => {
        const angle = (i / companies.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isHovered = hovered === company.slug;

        return (
          <group key={company.id} position={[x, 0, z]}>
            {/* Connector Beam to Center */}
            <Line
              points={[[0, 0, 0], [-x, 0, -z]]}
              color={company.accentColor}
              lineWidth={isHovered ? 3.0 : 1.4}
              transparent
              opacity={isHovered ? 0.95 : 0.45}
            />

            {/* Unique Abstract Shape per company */}
            <group
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(company.slug);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHovered(null);
                document.body.style.cursor = "auto";
              }}
              onClick={(e) => {
                e.stopPropagation();
                const dest = company.slug === "bharatx-labs" ? "/bharatx-labs" : `/companies/${company.slug}`;
                navigate(dest);
              }}
              scale={isHovered ? 1.35 : 1}
            >
              {company.id === "ventures" && (
                /* Ventures: Precision Venture Cube Framework */
                <mesh>
                  <boxGeometry args={[0.38, 0.38, 0.38]} />
                  <meshStandardMaterial
                    color={company.accentColor}
                    emissive={company.accentColor}
                    emissiveIntensity={isHovered ? 1.8 : 0.8}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
              )}

              {company.id === "aixperts" && (
                /* AIxperts: Neural Data Octahedron */
                <mesh>
                  <octahedronGeometry args={[0.34, 1]} />
                  <meshStandardMaterial
                    color={company.accentColor}
                    emissive={company.accentColor}
                    emissiveIntensity={isHovered ? 2.0 : 0.9}
                    wireframe={!isHovered}
                  />
                </mesh>
              )}

              {company.id === "infratech" && (
                /* Infratech: Structural Architectural Frame */
                <mesh>
                  <cylinderGeometry args={[0.26, 0.32, 0.4, 6]} />
                  <meshStandardMaterial
                    color={company.accentColor}
                    emissive={company.accentColor}
                    emissiveIntensity={isHovered ? 1.8 : 0.75}
                    metalness={0.9}
                    roughness={0.2}
                  />
                </mesh>
              )}

              {company.id === "casters" && (
                /* Casters: Mechanical Precision Torus Ring */
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                  <torusGeometry args={[0.3, 0.08, 12, 32]} />
                  <meshStandardMaterial
                    color={company.accentColor}
                    emissive={company.accentColor}
                    emissiveIntensity={isHovered ? 1.8 : 0.8}
                    metalness={0.92}
                    roughness={0.15}
                  />
                </mesh>
              )}

              {company.id === "bharatx-labs" && (
                /* BharatX Labs: DeepTech Quantum Icosahedron */
                <mesh>
                  <icosahedronGeometry args={[0.32, 0]} />
                  <meshPhysicalMaterial
                    color={company.accentColor}
                    emissive={company.accentColor}
                    emissiveIntensity={isHovered ? 2.2 : 1.0}
                    metalness={0.95}
                    roughness={0.1}
                  />
                </mesh>
              )}

              {company.id === "bharatx-agro" && (
                /* BharatX Agro: Botanical Seed Geometric Form */
                <mesh rotation={[0, 0, Math.PI / 4]}>
                  <tetrahedronGeometry args={[0.36, 1]} />
                  <meshStandardMaterial
                    color={company.accentColor}
                    emissive={company.accentColor}
                    emissiveIntensity={isHovered ? 1.9 : 0.8}
                    metalness={0.7}
                    roughness={0.25}
                  />
                </mesh>
              )}

              {/* Local Beacon Light */}
              <pointLight color={company.accentColor} intensity={isHovered ? 8 : 3} distance={3} />

              {/* Floating Badge */}
              <Html center distanceFactor={10} position={[0, 0.45, 0]}>
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300 shadow-sm border",
                    isHovered
                      ? "scale-115 shadow-lg border-white/50 text-white"
                      : "scale-100 opacity-90 text-slate-800 bg-white/90 border-black/10"
                  )}
                  style={{
                    backgroundColor: isHovered ? company.accentColor : "rgba(255, 255, 255, 0.92)",
                    borderColor: company.accentColor,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: company.accentColor }} />
                  <span>{company.shortName}</span>
                </div>
              </Html>
            </group>
          </group>
        );
      })}
    </group>
  );
}

export function CompaniesConstellation({ className }: { className?: string }) {
  return (
    <ThreeScene sceneKey="companies" className={className}>
      <ConstellationMesh />
    </ThreeScene>
  );
}
export default CompaniesConstellation;
