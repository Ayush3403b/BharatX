import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { errorHandler, notFoundApi } from "./middleware/error";
import { initMailer } from "./services/mailer";
import apiRoutes from "./routes";

const app = express();
const PORT = Number(process.env.PORT ?? 5000);

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: false, // JSON API — CSP headers only make sense for documents
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN ?? "http://localhost:5173").split(","),
    credentials: true,
  }),
);
app.use(express.json({ limit: "100kb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Routes
app.use(apiRoutes);
app.get("/", (_req, res) =>
  res.json({ name: "BharatX Group API", status: "ok", docs: "/api/health" }),
);

// Error handling (never leak stack traces)
app.use(notFoundApi);
app.use(errorHandler);

async function main() {
  await connectDB();
  initMailer();
  app.listen(PORT, () => {
    console.log(`[server] BharatX Group API listening on http://localhost:${PORT}`);
  });
}

void main();
