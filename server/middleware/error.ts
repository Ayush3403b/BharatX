import type { NextFunction, Request, Response } from "express";

/** Friendly error responses — never leak stack traces (Section 47). */
export function notFoundApi(req: Request, res: Response) {
  res.status(404).json({ message: "This API route does not exist." });
}

export function errorHandler(
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("[api]", err);
  }
  const status = err.status ?? 500;
  res.status(status).json({
    message:
      status >= 500 ? "Something went wrong on our side. Please try again." : err.message,
  });
}
