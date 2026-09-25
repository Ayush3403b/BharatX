import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

/** Optional SMTP notification (Nodemailer). No-op when not configured. */
export function initMailer(): void {
  const host = process.env.MAIL_HOST;
  if (!host) return;
  const port = Number(process.env.MAIL_PORT ?? 587);
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.MAIL_USER
      ? { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD }
      : undefined,
  });
  console.log("[mail] SMTP configured.");
}

export async function sendInquiryEmail(inq: {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType: string;
  company?: string;
  message: string;
}): Promise<void> {
  if (!transporter || !process.env.MAIL_TO) return;
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM ?? "BharatX Group <no-reply@bharatxgroup.local>",
      to: process.env.MAIL_TO,
      subject: `New inquiry — ${inq.inquiryType} (${inq.name})`,
      text: [
        `New contact inquiry from the BharatX Group website.`,
        ``,
        `Name: ${inq.name}`,
        `Email: ${inq.email}`,
        `Phone: ${inq.phone || "—"}`,
        `Organization: ${inq.organization || "—"}`,
        `Inquiry type: ${inq.inquiryType}`,
        `Company: ${inq.company || "group"}`,
        ``,
        `Message:`,
        inq.message,
      ].join("\n"),
    });
  } catch (err) {
    console.warn("[mail] failed to send notification:", err instanceof Error ? err.message : err);
  }
}
