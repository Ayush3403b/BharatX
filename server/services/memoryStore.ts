import type { ContactPayload } from "../../src/types";

/**
 * In-memory fallback store — used only when MongoDB is not configured,
 * so the demo/dev experience stays functional. Data does not persist
 * across server restarts by design.
 */
export interface StoredInquiry extends ContactPayload {
  id: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
}

const inquiries: StoredInquiry[] = [];
const CAP = 200;

export function pushInquiry(p: ContactPayload): StoredInquiry {
  const doc: StoredInquiry = {
    ...p,
    id: `mem_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    status: "new",
    createdAt: new Date(),
  };
  inquiries.unshift(doc);
  if (inquiries.length > CAP) inquiries.pop();
  return doc;
}

export function listInquiries(): StoredInquiry[] {
  return inquiries;
}
