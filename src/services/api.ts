import type { ContactPayload } from "../types";

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) ?? {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(0, "Network error — please check your connection and try again.");
  }

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(res.status, message);
  }
  return (await res.json()) as T;
}

export function submitContact(payload: ContactPayload): Promise<{ ok: boolean; message: string }> {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function adminLogin(
  email: string,
  password: string,
): Promise<{ token: string }> {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export interface StoredInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  website?: string;
  inquiryType: string;
  company?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export function getInquiries(token: string): Promise<{ inquiries: StoredInquiry[] }> {
  return request("/api/admin/inquiries", {}, token);
}

export function getHealth(): Promise<{ ok: boolean; db: string }> {
  return request("/api/health");
}
