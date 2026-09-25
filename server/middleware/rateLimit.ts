import { rateLimit } from "express-rate-limit";

/** Contact form rate limit (Section 48). */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_MAX ?? 6),
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message:
      "Too many submissions from this address. Please wait a moment and try again.",
  },
});

/** General API rate limit. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests. Please slow down." },
});
