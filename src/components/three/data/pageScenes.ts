/**
 * Page-Specific 3D Scene Configurations
 * Defines camera, lighting, and metadata for each major section.
 */

export interface PageSceneConfig {
  id: string;
  name: string;
  concept: string;
  camera: {
    position: [number, number, number];
    fov: number;
  };
  lighting: {
    ambient: number;
    keyColor: string;
    rimColor: string;
    pointIntensity: number;
  };
}

export const pageScenes: Record<string, PageSceneConfig> = {
  about: {
    id: "about-dna",
    name: "DNA Sphere",
    concept: "Identity, Values, Vision, People & Systems",
    camera: { position: [0, 0, 7.8], fov: 42 },
    lighting: {
      ambient: 0.85,
      keyColor: "#ffffff",
      rimColor: "#f5b84d",
      pointIntensity: 18,
    },
  },
  companies: {
    id: "companies-constellation",
    name: "Business Constellation",
    concept: "Six Independent Businesses in One Group",
    camera: { position: [0, 1.2, 9.2], fov: 44 },
    lighting: {
      ambient: 0.9,
      keyColor: "#ffffff",
      rimColor: "#0284c7",
      pointIntensity: 20,
    },
  },
  ecosystem: {
    id: "ecosystem-spatial-map",
    name: "Connected Ecosystem Map",
    concept: "Spatial 3D Network of Companies, Capabilities & Industries",
    camera: { position: [0, 2.2, 10.5], fov: 45 },
    lighting: {
      ambient: 0.9,
      keyColor: "#ffffff",
      rimColor: "#22d5b3",
      pointIntensity: 22,
    },
  },
  industries: {
    id: "industry-orbit",
    name: "Industry Orbit System",
    concept: "Multi-Sector Industrial Architecture",
    camera: { position: [0, 1.5, 8.5], fov: 42 },
    lighting: {
      ambient: 0.85,
      keyColor: "#ffffff",
      rimColor: "#d97706",
      pointIntensity: 18,
    },
  },
  innovation: {
    id: "intelligence-core",
    name: "Intelligence Core",
    concept: "Input → Intelligence → Process → Output",
    camera: { position: [0, 0.8, 8.2], fov: 40 },
    lighting: {
      ambient: 0.9,
      keyColor: "#ffffff",
      rimColor: "#00f0ff",
      pointIntensity: 24,
    },
  },
  impact: {
    id: "growth-network",
    name: "Growth Network",
    concept: "Organic Branching System of Impact",
    camera: { position: [0, 0, 8.0], fov: 42 },
    lighting: {
      ambient: 0.85,
      keyColor: "#ffffff",
      rimColor: "#059669",
      pointIntensity: 16,
    },
  },
  leadership: {
    id: "leadership-compass",
    name: "Leadership Compass / North Star",
    concept: "Vision, Direction, Decision & Long-Term Execution",
    camera: { position: [0, 1.0, 7.8], fov: 40 },
    lighting: {
      ambient: 0.85,
      keyColor: "#ffffff",
      rimColor: "#f5b84d",
      pointIntensity: 20,
    },
  },
  careers: {
    id: "careers-portal",
    name: "Open Horizon Portal",
    concept: "Entering the BharatX Ecosystem",
    camera: { position: [0, 0, 8.4], fov: 42 },
    lighting: {
      ambient: 0.9,
      keyColor: "#ffffff",
      rimColor: "#38bdf8",
      pointIntensity: 20,
    },
  },
  contact: {
    id: "connection-bridge",
    name: "Connection Bridge",
    concept: "Connecting Visitor and BharatX",
    camera: { position: [0, 0.5, 7.8], fov: 40 },
    lighting: {
      ambient: 0.85,
      keyColor: "#ffffff",
      rimColor: "#f5b84d",
      pointIntensity: 18,
    },
  },
  legal: {
    id: "security-shield",
    name: "Security Shield",
    concept: "Trust, Governance & Protection",
    camera: { position: [0, 0, 6.5], fov: 36 },
    lighting: {
      ambient: 0.85,
      keyColor: "#ffffff",
      rimColor: "#0284c7",
      pointIntensity: 14,
    },
  },
};
