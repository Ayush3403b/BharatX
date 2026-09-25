import { Router } from "express";
import { contactLimiter, apiLimiter } from "../middleware/rateLimit";
import { requireAdmin } from "../middleware/auth";
import { createContact, countContact } from "../controllers/contactController";
import { adminInquiries, adminLogin, adminStats } from "../controllers/adminController";
import { listCompanies } from "../controllers/companiesController";
import { isDbReady } from "../config/db";

const router = Router();

router.get("/api/health", (_req, res) => {
  res.json({ ok: true, db: isDbReady() ? "mongo" : "memory", time: new Date().toISOString() });
});

router.use("/api", apiLimiter);

// Contact
router.post("/api/contact", contactLimiter, createContact);
router.get("/api/contact", countContact);

// Companies (database-ready)
router.get("/api/companies", listCompanies);

// Admin (JWT-protected)
router.post("/api/admin/login", adminLogin);
router.get("/api/admin/inquiries", requireAdmin, adminInquiries);
router.get("/api/admin/stats", requireAdmin, adminStats);

export default router;
