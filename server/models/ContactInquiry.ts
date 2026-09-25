import mongoose from "mongoose";

/**
 * ContactInquiry (Section 31 schema).
 */
export const contactInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 24, default: "" },
    organization: { type: String, trim: true, maxlength: 120, default: "" },
    website: { type: String, trim: true, maxlength: 300, default: "" },
    inquiryType: { type: String, required: true, trim: true, maxlength: 40 },
    company: { type: String, trim: true, maxlength: 40, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

export const ContactInquiry =
  mongoose.models.ContactInquiry ??
  mongoose.model("ContactInquiry", contactInquirySchema);
