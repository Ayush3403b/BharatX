import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthedRequest extends Request {
  admin?: { email: string; role: string };
}

/** JWT bearer authentication for protected admin routes. */
export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required." });
  }
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "dev-secret") as {
      email?: string;
      role?: string;
    };
    if (payload.role !== "admin") throw new Error("not admin");
    req.admin = { email: payload.email ?? "", role: "admin" };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session." });
  }
}
