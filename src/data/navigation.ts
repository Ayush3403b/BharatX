import type { NavItem } from "../types";

export const navigation: NavItem[] = [
  { label: "About", to: "/about", icon: "info" },
  { label: "Companies", to: "/companies", icon: "building-2", mega: "companies" },
  { label: "Ecosystem", to: "/ecosystem", icon: "orbit", mega: "ecosystem" },
  { label: "Industries", to: "/industries", icon: "factory" },
  { label: "Innovation", to: "/innovation", icon: "sparkles" },
  { label: "Impact", to: "/impact", icon: "leaf" },
  { label: "Leadership", to: "/leadership", icon: "users" },
  { label: "Careers", to: "/careers", icon: "briefcase" },
];

export const contactRoute = {
  label: "Contact",
  to: "/contact",
  icon: "mail",
};

export const footerColumns = {
  explore: [
    { label: "About", to: "/about" },
    { label: "Companies", to: "/companies" },
    { label: "Ecosystem", to: "/ecosystem" },
    { label: "Industries", to: "/industries" },
    { label: "Innovation", to: "/innovation" },
    { label: "Impact", to: "/impact" },
  ],
  company: [
    { label: "Leadership", to: "/leadership" },
    { label: "Careers", to: "/careers" },
    { label: "Start an inquiry", to: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
  ],
};
