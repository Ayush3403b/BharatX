import type { Industry } from "../types";

export const industries: Industry[] = [
  {
    slug: "ai-technology",
    order: 1,
    name: "AI & Technology",
    icon: "brain-circuit",
    description:
      "Applied intelligence, automation and the digital systems that make businesses run.",
    detail:
      "From production AI to the data foundations underneath, the group's technology work is judged by one test: does the business run better with it, tomorrow, without the vendor in the room?",
    companySlugs: ["aixperts-labs", "bharatx-ventures", "bharatx-labs"],
  },
  {
    slug: "infrastructure",
    order: 2,
    name: "Infrastructure",
    icon: "landmark",
    description:
      "Civil engineering and the physical systems a growing country depends on.",
    detail:
      "India's next decade of growth is mostly concrete, steel and utility. The group's infrastructure work is built to be measured in decades of service, not quarters of visibility.",
    companySlugs: ["bharatx-infratech"],
  },
  {
    slug: "manufacturing",
    order: 3,
    name: "Manufacturing",
    icon: "factory",
    description:
      "Precision components and industrial products engineered to specification.",
    detail:
      "Small parts carry big responsibility. The group's manufacturing is about tolerances, traceability and the discipline to test what you make before the customer has to.",
    companySlugs: ["casters-global"],
  },
  {
    slug: "agriculture",
    order: 4,
    name: "Agriculture",
    icon: "sprout",
    description:
      "Farming that is scientific, enterprise-grade and rural-first.",
    detail:
      "Agriculture at BharatX is treated as industry: inputs are specified, yields are measured, and the people doing the work are trained to run it as a business.",
    companySlugs: ["bharatx-agro"],
  },
  {
    slug: "food-systems",
    order: 5,
    name: "Food Systems",
    icon: "wheat",
    description:
      "From field to finished product: cultivation, processing and nutrition.",
    detail:
      "Food work is a chain — cultivation, handling, processing, cold chain, market. The group builds the whole chain, so quality is a design choice at every link.",
    companySlugs: ["bharatx-agro"],
  },
  {
    slug: "global-trade",
    order: 6,
    name: "Global Trade",
    icon: "ship",
    description:
      "Export-grade supply chains that connect Indian origin with global demand.",
    detail:
      "Export is a discipline of documentation as much as logistics. The group's trade businesses are built so that a lot can be traced from farm or factory floor to foreign buyer.",
    companySlugs: ["bharatx-agro", "casters-global"],
  },
  {
    slug: "venture-building",
    order: 7,
    name: "Venture Building",
    icon: "rocket",
    description:
      "Designing and building new businesses with long-term ownership.",
    detail:
      "The group does not just invest in businesses — it builds them. Venture building at BharatX is slow, deliberate and founder-respecting, optimised for companies that compound.",
    companySlugs: ["bharatx-ventures"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
