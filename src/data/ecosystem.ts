import type { EcosystemSite } from "../types";

/**
 * Centralised ecosystem site configuration (Section 18).
 * Iframe URLs live ONLY here — never inside components.
 */
export const ecosystemSites: EcosystemSite[] = [
  {
    id: "ventures",
    slug: "bharatx-ventures",
    name: "BharatX Ventures",
    url: "https://bharatx.vc/",
    category: "Venture Building & Strategy",
  },
  {
    id: "aixperts",
    slug: "aixperts-labs",
    name: "AIxperts Labs",
    url: "https://aixpertslabs.com/",
    category: "AI & Digital Innovation",
  },
  {
    id: "infratech",
    slug: "bharatx-infratech",
    name: "BharatX Infratech",
    url: "https://bharatxinfratech.com/",
    category: "Infrastructure",
  },
  {
    id: "casters",
    slug: "casters-global",
    name: "Casters Global",
    url: "https://castersglobal.com/",
    category: "Industrial Mobility",
  },
  {
    id: "sumedha",
    slug: "sumedha-agro",
    name: "Sumedha Agro",
    url: "https://sumedhaagro.com/",
    category: "Agriculture & Food",
  },
  {
    id: "bharatx-agro",
    slug: "bharatx-agro",
    name: "BharatX Agro",
    url: "https://bharatxagro.com/",
    category: "Agricultural Exports",
  },
];

export function getEcosystemSite(id: string): EcosystemSite | undefined {
  return ecosystemSites.find((s) => s.id === id);
}
