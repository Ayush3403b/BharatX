import mongoose from "mongoose";

/**
 * Future-ready collections (Section 32).
 * Kept minimal on purpose — data shapes only, no speculative fields.
 */
const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortName: { type: String, trim: true },
    category: { type: String, trim: true },
    description: { type: String, trim: true },
    website: { type: String, trim: true },
    accentColor: { type: String, trim: true, default: "#43e6c5" },
    iframeEnabled: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    companyId: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true },
);

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "reviewing", "interview", "offer", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const Company = mongoose.models.Company ?? mongoose.model("Company", companySchema);
export const Job = mongoose.models.Job ?? mongoose.model("Job", jobSchema);
export const JobApplication =
  mongoose.models.JobApplication ?? mongoose.model("JobApplication", jobApplicationSchema);
export const SiteSettings =
  mongoose.models.SiteSettings ?? mongoose.model("SiteSettings", siteSettingsSchema);
