import type { Request, Response } from "express";
import { isDbReady } from "../config/db";
import { Company } from "../models/Models";

/**
 * GET /api/companies — database-ready company listing (Section 33).
 * Serves the MongoDB collection when populated; otherwise echoes the
 * canonical seed so clients always get a consistent shape.
 */
const seedCompanies = [
  { id: "ventures", slug: "bharatx-ventures", name: "BharatX Ventures", website: "https://bharatx.vc/" },
  { id: "aixperts", slug: "aixperts-labs", name: "AIxperts Labs", website: "https://aixpertslabs.com/" },
  { id: "infratech", slug: "bharatx-infratech", name: "BharatX Infratech", website: "https://bharatxinfratech.com/" },
  { id: "casters", slug: "casters-global", name: "Casters Global", website: "https://castersglobal.com/" },
  { id: "sumedha", slug: "sumedha-agro", name: "Sumedha Agro", website: "https://sumedhaagro.com/" },
  { id: "bharatx-agro", slug: "bharatx-agro", name: "BharatX Agro", website: "https://bharatxagro.com/" },
];

export async function listCompanies(_req: Request, res: Response) {
  try {
    if (isDbReady()) {
      const docs = await Company.find().lean();
      if (docs.length > 0) {
        return res.json({ companies: docs, source: "mongo" });
      }
    }
    return res.json({ companies: seedCompanies, source: "seed" });
  } catch (err) {
    console.error("[companies] failed:", err);
    return res.json({ companies: seedCompanies, source: "seed" });
  }
}
