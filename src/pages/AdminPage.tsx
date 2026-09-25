import { useEffect, useState } from "react";
import { Icon } from "../utils/icons";
import {
  adminLogin,
  getInquiries,
  type StoredInquiry,
} from "../services/api";

/**
 * Minimal admin console (Section 34).
 * JWT-protected; only functional when ADMIN_EMAIL/ADMIN_PASSWORD are set on
 * the backend. The public site never exposes admin functionality.
 */
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("bxg:admin-token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [inquiries, setInquiries] = useState<StoredInquiry[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getInquiries(token)
      .then((r) => setInquiries(r.inquiries))
      .catch((err: unknown) => {
        const e = err as { message?: string; status?: number };
        setLoadError(e?.message ?? "Could not load inquiries.");
        if (e?.status === 401) {
          localStorage.removeItem("bxg:admin-token");
          setToken(null);
        }
      });
  }, [token]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await adminLogin(email, password);
      localStorage.setItem("bxg:admin-token", r.token);
      setToken(r.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-5 pt-28 pb-16">
      <div className="w-full max-w-2xl">
        {!token ? (
          <form
            onSubmit={login}
            className="rounded-2xl border border-white/10 bg-night-850/80 p-6 sm:p-8 md:p-10"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-400/40 bg-gold-400/10 text-gold-400">
                <Icon name="shield-check" width={20} height={20} />
              </span>
              <div>
                <h1 className="font-display text-xl font-semibold text-ink-50">Admin console</h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                  JWT-protected · internal
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="admin-email" className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-400">
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-night-800/70 px-4 py-3 text-base md:text-[14.5px] text-ink-50 outline-none transition-all focus:border-pulse-400/60 focus:ring-2 focus:ring-pulse-400/15"
                  placeholder="admin@…"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-400">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-night-800/70 px-4 py-3 text-base md:text-[14.5px] text-ink-50 outline-none transition-all focus:border-pulse-400/60 focus:ring-2 focus:ring-pulse-400/15"
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <p role="alert" className="flex items-center gap-2 text-[13px] text-ember-300">
                  <Icon name="triangle-alert" width={14} height={14} /> {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full sm:w-auto self-start rounded-full bg-gold-400 px-7 py-3.5 text-[14px] font-semibold text-night-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
              >
                {busy ? "Signing in…" : "Sign in"}
              </button>
              <p className="text-[12px] leading-relaxed text-ink-500">
                Admin access is enabled by setting ADMIN_EMAIL and ADMIN_PASSWORD
                on the backend. Without them, this console remains locked — by
                design.
              </p>
            </div>
          </form>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-night-850/80 p-5 sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="font-display text-xl font-semibold text-ink-50">
                Contact inquiries
                {inquiries && (
                  <span className="ml-3 font-mono text-[11px] text-ink-500">
                    {inquiries.length} total
                  </span>
                )}
              </h1>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("bxg:admin-token");
                  setToken(null);
                  setInquiries(null);
                }}
                className="self-start sm:self-auto rounded-full border border-white/15 px-5 py-2 text-[13px] font-semibold text-ink-200 transition-colors hover:border-white/35"
              >
                Sign out
              </button>
            </div>
            {loadError && (
              <p role="alert" className="mb-4 flex items-center gap-2 text-[13px] text-ember-300">
                <Icon name="triangle-alert" width={14} height={14} /> {loadError}
              </p>
            )}
            {!inquiries && !loadError && (
              <div className="flex items-center gap-3 py-10 text-[14px] text-ink-400">
                <Icon name="loader-2" width={16} height={16} className="animate-spin" />
                Loading inquiries…
              </div>
            )}
            {inquiries && inquiries.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <Icon name="mail" width={26} height={26} className="text-ink-600" />
                <p className="text-[14px] text-ink-400">No inquiries yet.</p>
                <p className="text-[12.5px] text-ink-600">
                  Submissions from the contact form will appear here.
                </p>
              </div>
            )}
            {inquiries && inquiries.length > 0 && (
              <>
                {/* Mobile card view (< sm) */}
                <div className="flex flex-col gap-3 sm:hidden">
                  {inquiries.map((q) => (
                    <div key={q._id} className="rounded-xl border border-white/10 bg-night-900/60 p-4 text-[13px]">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-ink-100">{q.name}</div>
                          <div className="text-[12px] text-ink-400 break-all">{q.email}</div>
                        </div>
                        <span className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-300">
                          {q.status}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-400">
                        <span><strong className="font-normal text-ink-500">Type:</strong> {q.inquiryType}</span>
                        {q.company && <span><strong className="font-normal text-ink-500">Company:</strong> {q.company}</span>}
                      </div>
                      <div className="mt-2 text-right font-mono text-[10.5px] text-ink-500">
                        {new Date(q.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop/tablet table view (>= sm) */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                        <th className="py-3 pr-4">Name</th>
                        <th className="py-3 pr-4">Contact</th>
                        <th className="py-3 pr-4">Type</th>
                        <th className="py-3 pr-4">Company</th>
                        <th className="py-3 pr-4">Status</th>
                        <th className="py-3">Received</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((q) => (
                        <tr key={q._id} className="border-b border-white/5 align-top text-ink-300">
                          <td className="py-3.5 pr-4 font-medium text-ink-100">{q.name}</td>
                          <td className="py-3.5 pr-4">{q.email}</td>
                          <td className="py-3.5 pr-4">{q.inquiryType}</td>
                          <td className="py-3.5 pr-4">{q.company || "—"}</td>
                          <td className="py-3.5 pr-4">
                            <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">
                              {q.status}
                            </span>
                          </td>
                          <td className="py-3.5 font-mono text-[11px] text-ink-500">
                            {new Date(q.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
