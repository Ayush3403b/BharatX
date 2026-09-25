export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  logo: string;
  logoLight: string;
  favicon: string;
  social: {
    label: string;
    href: string;
  }[];
}

export const brandConfig: BrandConfig = {
  name: "BharatX Group",
  shortName: "BharatX",
  tagline: "One group. Six businesses. One connected ecosystem.",
  logo: "/assets/brand/logo.svg",
  logoLight: "/assets/brand/logo-light.svg",
  favicon: "/assets/brand/favicon.svg",
  // Placeholders — replace with real profiles when available.
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/bharatx-group" },
    { label: "Instagram", href: "https://www.instagram.com/bharatxgroup" },
    { label: "YouTube", href: "https://www.youtube.com/@bharatxgroup" },
    { label: "X", href: "https://x.com/bharatxgroup" },
  ],
};

export const siteConfig = {
  name: brandConfig.name,
  domain: "https://www.bharatxgroup.com",
  region: "India",
  foundedNote:
    "BharatX Group is a group company of six businesses operating from India.",
};
