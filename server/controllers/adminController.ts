import type { Request, Response } from "express";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { isDbReady } from "../config/db";
import { ContactInquiry } from "../models/ContactInquiry";
import { listInquiries } from "../services/memoryStore";
import type { AuthedRequest } from "../middleware/auth";

function timingSafeEqualStr(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

/** POST /api/admin/login */
export function adminLogin(req: Request, res: Response) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    return res.status(503).json({
      message: "Admin access is not configured yet. Set ADMIN_EMAIL and ADMIN_PASSWORD on the backend.",
    });
  }

  const { email, password } = (req.body ?? {}) as { email?: string; password?: string };
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const emailOk = timingSafeEqualStr(email.trim().toLowerCase(), adminEmail.toLowerCase());
  const passOk = timingSafeEqualStr(password, adminPassword);
  if (!emailOk || !passOk) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const secret = process.env.JWT_SECRET ?? "dev-secret";
  const token = jwt.sign({ email: email.trim().toLowerCase(), role: "admin" }, secret, {
    expiresIn: "12h",
  });
  return res.json({ token });
}

/** GET /api/admin/inquiries (auth) */
export async function adminInquiries(req: AuthedRequest, res: Response) {
  try {
    if (isDbReady()) {
      const docs = await ContactInquiry.find().sort({ createdAt: -1 }).limit(100).lean();
      return res.json({ inquiries: docs.map((d) => ({ ...d, _id: String(d._id) })) });
    }
    return res.json({ inquiries: listInquiries().slice(0, 100) });
  } catch (err) {
    console.error("[admin] failed to list inquiries:", err);
    return res.status(500).json({ message: "Could not load inquiries right now." });
  }
}

/** GET /api/admin/stats (auth) */
export async function adminStats(_req: AuthedRequest, res: Response) {
  try {
    if (isDbReady()) {
      const total = await ContactInquiry.countDocuments();
      return res.json({ inquiries: total, source: "mongo" });
    }
    return res.json({ inquiries: listInquiries().length, source: "memory" });
  } catch {
    return res.status(500).json({ message: "Could not load stats." });
  }
}
