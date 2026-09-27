import type { ContactPayload } from "../../src/types";

/** Minimal sanitisation: trim + strip angle brackets (Section 48). */
function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/</g, "‹").replace(/>/g, "›").trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,19}$/;
const URL_RE = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}([^\s]*)$/i;

const INQUIRY_TYPES = new Set([
  "venture-building",
  "ai-automation",
  "infrastructure",
  "manufacturing",
  "agriculture",
  "export",
  "partnerships",
  "careers",
]);

const COMPANY_IDS = new Set([
  "ventures",
  "aixperts",
  "infratech",
  "casters",
  "bharatx-agro",
  "bharatx-labs",
]);

export interface ValidationIssue {
  field: string;
  message: string;
}

export function validateContact(body: Record<string, unknown>): {
  payload: ContactPayload;
  issues: ValidationIssue[];
} {
  const issues: ValidationIssue[] = [];
  const payload: ContactPayload = {
    name: clean(body.name, 80),
    email: clean(body.email, 120).toLowerCase(),
    phone: clean(body.phone, 24),
    organization: clean(body.organization, 120),
    website: clean(body.website, 300),
    inquiryType: clean(body.inquiryType, 40),
    company: clean(body.company, 40),
    message: clean(body.message, 2000),
  };

  if (payload.name.length < 2) issues.push({ field: "name", message: "Please enter your full name." });
  if (!EMAIL_RE.test(payload.email)) issues.push({ field: "email", message: "Enter a valid email address." });
  if (payload.phone && !PHONE_RE.test(payload.phone))
    issues.push({ field: "phone", message: "Enter a valid phone number." });
  if (payload.website && !URL_RE.test(payload.website))
    issues.push({ field: "website", message: "Enter a valid website URL." });
  if (!INQUIRY_TYPES.has(payload.inquiryType))
    issues.push({ field: "inquiryType", message: "Select a valid inquiry type." });
  if (payload.company && !COMPANY_IDS.has(payload.company)) payload.company = "";
  if (payload.message.length < 10)
    issues.push({ field: "message", message: "Message is too short." });

  return { payload, issues };
}
