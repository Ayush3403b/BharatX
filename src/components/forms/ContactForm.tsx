import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { companies } from "../../data/companies";
import { ApiError, submitContact } from "../../services/api";
import { track } from "../../services/analytics";
import type { ContactPayload } from "../../types";
import { Icon } from "../../utils/icons";
import { Input, Select, Textarea } from "./Fields";

export const inquiryTypes = [
  { value: "venture-building", label: "Venture building" },
  { value: "ai-automation", label: "AI & automation" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "agriculture", label: "Agriculture" },
  { value: "export", label: "Export" },
  { value: "partnerships", label: "Partnerships" },
  { value: "careers", label: "Careers" },
];

const companyOptions = [
  { value: "", label: "BharatX Group (general)" },
  ...companies.map((c) => ({ value: c.id, label: c.name })),
];

const initial: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  website: "",
  inquiryType: "",
  company: "",
  message: "",
};

type Errors = Partial<Record<keyof ContactPayload, string>>;

function validate(p: ContactPayload): Errors {
  const e: Errors = {};
  if (!p.name.trim() || p.name.trim().length < 2) e.name = "Please enter your full name.";
  if (p.name.length > 80) e.name = "Name must be under 80 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) e.email = "Enter a valid email address.";
  if (p.phone && !/^[+\d][\d\s\-()]{6,19}$/.test(p.phone.trim()))
    e.phone = "Enter a valid phone number.";
  if (p.website && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}([^\s]*)$/i.test(p.website.trim()))
    e.website = "Enter a valid website URL.";
  if (!p.inquiryType) e.inquiryType = "Select an inquiry type.";
  if (!p.message.trim() || p.message.trim().length < 10)
    e.message = "Tell us a little more (at least 10 characters).";
  if (p.message.length > 2000) e.message = "Message must be under 2000 characters.";
  return e;
}

export function ContactForm({
  initialCompany = "",
  initialInquiry = "",
}: {
  initialCompany?: string;
  initialInquiry?: string;
}) {
  const [form, setForm] = useState<ContactPayload>({
    ...initial,
    company: initialCompany || "",
    inquiryType: initialInquiry || "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  // Route-card prefill: update selections when the page changes them.
  useEffect(() => {
    setForm((f) => ({
      ...f,
      company: initialCompany !== "" ? initialCompany : f.company,
      inquiryType: initialInquiry !== "" ? initialInquiry : f.inquiryType,
    }));
  }, [initialCompany, initialInquiry]);

  const set = (key: keyof ContactPayload) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setNetworkError(null);
    try {
      await submitContact(form);
      track("contact_form_submitted", {
        inquiry_type: form.inquiryType,
        company: form.company || "group",
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 0) {
        // Graceful offline queue: save locally if backend is temporarily unreachable
        try {
          const raw = localStorage.getItem("bxg:offline_inquiries") ?? "[]";
          const list = JSON.parse(raw);
          list.push({ ...form, _id: `local_${Date.now()}`, createdAt: new Date().toISOString(), status: "new" });
          localStorage.setItem("bxg:offline_inquiries", JSON.stringify(list));
          track("contact_form_offline_saved", { inquiry_type: form.inquiryType });
          setSubmitted(true);
          return;
        } catch {
          /* ignore storage error */
        }
      }
      setNetworkError(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const options = useMemo(() => inquiryTypes, []);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-pulse-400/25 bg-pulse-400/[0.04] p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-pulse-400/40 bg-pulse-400/10 text-pulse-300"
        >
          <Icon name="check" width={28} height={28} strokeWidth={2} />
        </motion.span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink-50">Thank you.</h3>
        <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink-400">
          Your inquiry has been received. Our team will review it and get back
          to you.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initial);
            setSubmitted(false);
          }}
          className="mt-8 rounded-full border border-white/15 px-6 py-3 text-[13.5px] font-semibold text-ink-100 transition-colors hover:border-white/35"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/8 bg-night-850/80 p-5 sm:p-6 md:p-9">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Full Name"
          requiredMark
          placeholder="Your name"
          value={form.name}
          onChange={(e) => set("name")(e.target.value)}
          error={errors.name}
          autoComplete="name"
          maxLength={80}
        />
        <Input
          label="Email"
          requiredMark
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => set("email")(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="+91 …"
          value={form.phone}
          onChange={(e) => set("phone")(e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
        <Input
          label="Organization"
          placeholder="Company or organisation"
          value={form.organization}
          onChange={(e) => set("organization")(e.target.value)}
          autoComplete="organization"
          maxLength={120}
        />
        <Input
          label="Website"
          type="url"
          placeholder="https://…"
          value={form.website}
          onChange={(e) => set("website")(e.target.value)}
          error={errors.website}
          className="sm:col-span-2"
        />
        <Select
          label="Inquiry Type"
          requiredMark
          placeholder="Select a topic"
          options={options}
          value={form.inquiryType}
          onChange={(e) => set("inquiryType")(e.target.value)}
          error={errors.inquiryType}
        />
        <Select
          label="Company / Business"
          options={companyOptions}
          value={form.company}
          onChange={(e) => set("company")(e.target.value)}
        />
        <Textarea
          label="Message"
          requiredMark
          counterMax={2000}
          placeholder="Tell us about your idea, project or question…"
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          error={errors.message}
          className="sm:col-span-2"
          rows={5}
        />
      </div>

      <AnimatePresence>
        {networkError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-ember-400/30 bg-ember-400/[0.07] p-4 text-[13.5px] text-ember-300"
            >
              <Icon name="triangle-alert" width={16} height={16} className="mt-0.5 shrink-0" />
              {networkError}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="max-w-xs text-[12px] leading-relaxed text-ink-500">
          Your details are used only to respond to this inquiry. See our{" "}
          <Link to="/privacy" className="text-ink-300 underline decoration-white/20 underline-offset-2 hover:text-pulse-300">
            privacy policy
          </Link>.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gold-400 px-8 py-4 text-[15px] font-semibold text-night-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_10px_44px_-10px_rgba(245,184,77,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Icon name="loader-2" width={16} height={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Inquiry
              <Icon
                name="arrow-right"
                width={16}
                height={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
