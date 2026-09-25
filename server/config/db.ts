import mongoose from "mongoose";

let ready = false;

/**
 * MongoDB connection (Section 32).
 * When MONGO_URI is unset or unreachable, the API degrades to an
 * in-memory store so the public site stays functional in development.
 */
export async function connectDB(): Promise<void> {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log("[db] MONGO_URI not set — running in memory-only mode.");
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 6000 });
    ready = mongoose.connection.readyState === 1;
    console.log("[db] MongoDB connected.");
  } catch (err) {
    console.warn(
      "[db] MongoDB connection failed — falling back to in-memory mode.",
      err instanceof Error ? err.message : err,
    );
  }
  mongoose.connection.on("disconnected", () => {
    ready = false;
    console.warn("[db] MongoDB disconnected.");
  });
  mongoose.connection.on("reconnected", () => {
    ready = true;
    console.log("[db] MongoDB reconnected.");
  });
}

export const isDbReady = (): boolean => ready;
