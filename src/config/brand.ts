export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  logo: string;
  logoLight: string;
  favicon: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    pincode: string;
    full: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    phoneTel: string;
    email: string;
  };
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
  address: {
    line1: "Building no. 511 First Floor",
    line2: "Motilal Nehru Complex",
    city: "New Delhi",
    pincode: "110017",
    full: "Building no. 511 First Floor, Motilal Nehru Complex, New Delhi 110017",
  },
  contact: {
    phone: "9811263046",
    phoneFormatted: "+91 98112 63046",
    phoneTel: "+919811263046",
    email: "contact@bharatxgroup.com",
  },
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
  address: brandConfig.address.full,
  phone: brandConfig.contact.phoneFormatted,
  phoneTel: brandConfig.contact.phoneTel,
  foundedNote:
    "BharatX Group is a group company of six businesses operating from India.",
};

