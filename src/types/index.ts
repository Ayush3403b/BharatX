export interface CompanyCapability {
  icon: string;
  title: string;
  description: string;
}

export interface CompanyApplication {
  title: string;
  description: string;
}

export interface CompanyStep {
  title: string;
  description: string;
}

export interface Company {
  id: string;
  order: number;
  slug: string;
  name: string;
  shortName: string;
  monogram: string;
  category: string;
  /** Lucide icon key for the company's domain */
  icon: string;
  description: string;
  longDescription: string[];
  website: string;
  domain: string;
  logo?: string;
  favicon?: string;
  heroImage: string;
  cinematicImage: string;
  accentColor: string;
  capabilities: CompanyCapability[];
  applications: CompanyApplication[];
  focusAreas: string[];
  howWeWork: CompanyStep[];
  vision: string;
  industries: string[];
  iframeEnabled: boolean;
}

export interface Industry {
  slug: string;
  order: number;
  name: string;
  icon: string;
  description: string;
  detail: string;
  companySlugs: string[];
}

export interface EcosystemSite {
  id: string;
  slug: string;
  name: string;
  url: string;
  category: string;
}

export interface NavItem {
  label: string;
  to: string;
  icon: string;
  mega?: "companies" | "ecosystem";
}

export type InquiryStatus = "new" | "contacted" | "closed";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  website?: string;
  inquiryType: string;
  company?: string;
  message: string;
}
