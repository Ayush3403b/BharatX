import { useState, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Button } from "../components/common/Button";
import { IconBadge } from "../components/common/IconBadge";
import { MaskReveal, Reveal } from "../components/common/Reveal";
import { SectionHeader } from "../components/common/SectionHeader";
import { TiltCard } from "../components/three/TiltCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { Icon } from "../utils/icons";
import { companies } from "../data/companies";

const CompanySpecificObject = lazy(() => import("../components/three/objects/CompanySpecificObject"));

interface ResearchPillar {
  number: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  specs: string[];
}

const researchPillars: ResearchPillar[] = [
  {
    number: "01",
    title: "Sovereign Multilingual Foundation Models",
    icon: "brain-circuit",
    tagline: "Native Pre-Training Across 22 Indian Dialects",
    description:
      "Unlike imported models trained predominantly on Western corpora, BharatX Labs is training foundational LLMs natively on Indian regional vernaculars, technical jurisprudence, and agricultural sciences. Eliminates cultural hallucination while retaining full domain accuracy.",
    specs: [
      "22 Indian Constitution-scheduled languages natively tokenized",
      "Mathematical reasoning tailored for local commerce and legal codices",
      "Full sovereign parameter ownership without external API callbacks",
    ],
  },
  {
    number: "02",
    title: "Physical & Edge Neural Compute",
    icon: "cpu",
    tagline: "Sub-15ms Real-Time Inference on Industrial Edge",
    description:
      "Deep integration of compressed neural networks directly into physical hardware—from robotic handling arms at Casters Global to high-throughput sorting corridors in BharatX Agro. Operates with ultra-low power in high-interference field environments.",
    specs: [
      "Sub-15ms end-to-end edge inference on embedded RISC-V & ARM silicon",
      "Offline-first operational autonomy during connectivity outages",
      "Dynamic quantization and state-space neural pruning",
    ],
  },
  {
    number: "03",
    title: "Agentic Swarm Orchestration",
    icon: "workflow",
    tagline: "Collaborative Multi-Agent Synthesis Engines",
    description:
      "Autonomous systems capable of goal decomposition, distributed consensus, and self-auditing workflows. Swarms coordinate real-time enterprise supply chains, cold-chain logistics, and construction equipment tracking across the BharatX Group ecosystem.",
    specs: [
      "Deterministic guardrails with formal verification proofs",
      "Multi-agent negotiation protocols for enterprise resource dispatch",
      "Immutable cryptographic audit trails for every automated action",
    ],
  },
  {
    number: "04",
    title: "Quantum-Resilient Security & Data Fabrics",
    icon: "shield-check",
    tagline: "Post-Quantum Cryptography & Zero-Knowledge Enclaves",
    description:
      "Hardening India's digital supply lines against future quantum compute adversaries. Developing lattice-based cryptographic algorithms and privacy-preserving multi-party computation protocols for enterprise telemetry and defense-tier workloads.",
    specs: [
      "NIST-compliant Post-Quantum Cryptographic (PQC) standards",
      "Zero-Knowledge (ZK) attestation for cross-enterprise data sharing",
      "Complete data residency guaranteed within sovereign borders",
    ],
  },
];

const roadmapMilestones = [
  {
    phase: "Phase 01",
    timeline: "Q3 2026",
    status: "Active Execution",
    badgeColor: "text-pulse-400 border-pulse-400/30 bg-pulse-400/10",
    title: "Linguistic Tokenization & Multimodal Architecture Formalization",
    description:
      "Finalized tokenizer benchmarks for 22 scheduled Indian languages. Initializing high-speed domestic data pipelines across agricultural, logistics, and infrastructure corpora.",
  },
  {
    phase: "Phase 02",
    timeline: "Q4 2026",
    status: "Upcoming Milestone",
    badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    title: "Sovereign Pre-Training on Domestic Green Compute Clusters",
    description:
      "Initiating pre-training runs on our dedicated high-density GPU/NPU cluster powered by 100% renewable domestic power. Benchmarking against standard global frontier baselines.",
  },
  {
    phase: "Phase 03",
    timeline: "Q1 2027",
    status: "Scheduled Closed Alpha",
    badgeColor: "text-ink-400 border-white/10 bg-white/5",
    title: "Closed Industrial Alpha & Institutional Testbeds",
    description:
      "Deploying model checkpoints across BharatX Group operating companies (Casters Global, BharatX Infratech, AIxperts Labs) for live production stress-testing.",
  },
  {
    phase: "Phase 04",
    timeline: "Q2 2027",
    status: "Strategic Public Launch",
    badgeColor: "text-ink-400 border-white/10 bg-white/5",
    title: "Open Weights Release & Sovereign Enterprise Cloud APIs",
    description:
      "Public release of research papers and open-weights models for academic fellows, alongside sovereign private cloud deployment for enterprise and institutional clients.",
  },
];

export default function BharatXLabsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    domain: "Foundation Models",
    note: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  usePageMeta({
    title: "BharatX Labs — Frontier AI & Sovereign Neural Systems (Upcoming)",
    description:
      "BharatX Labs is the stealth frontier deep-technology R&D division of BharatX Group, architecting sovereign foundation models, edge neural compute, and agentic orchestration.",
    path: "/bharatx-labs",
    image: "/assets/backgrounds/ai-circuit.jpg",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="relative">
      {/* ── HERO BANNER ────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background Visual Matrix */}
        <div className="absolute inset-0 bg-night-950">
          <img
            src="/assets/backgrounds/ai-circuit.jpg"
            alt="BharatX Labs Neural Circuit"
            className="h-full w-full object-cover opacity-25 mix-blend-screen scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-950/90 to-night-950" />
          <div className="grid-bg grid-bg-fade absolute inset-0 opacity-40" />
        </div>

        {/* Ambient Glow Orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[650px] rounded-full bg-pulse-400/15 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-1/4 bottom-10 h-[380px] w-[450px] rounded-full bg-gold-400/10 blur-[130px]"
        />

        <div className="container-x relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Innovation", to: "/innovation" },
                { label: "BharatX Labs (Upcoming)" },
              ]}
            />
          </div>

          {/* Stealth Status Pill */}
          <Reveal immediate>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
                Frontier R&D Division · In Stealth
              </span>
            </div>
          </Reveal>

          {/* Main Headline */}
          <h1 className="mt-8 font-display font-bold uppercase tracking-tight text-white text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.04]">
            <MaskReveal>SOVEREIGN ARTIFICIAL</MaskReveal>
            <MaskReveal delay={0.15}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-400 via-white to-gold-400">
                INTELLIGENCE & SILICON.
              </span>
            </MaskReveal>
          </h1>

          {/* Subtitle */}
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-ink-300">
              <strong className="text-white">BharatX Labs</strong> is our dedicated deep-technology skunkworks.
              We are engineering indigenous foundational models, quantum-resilient cryptographic fabrics, and physical edge neural compute to eliminate dependency on foreign black-box architectures.
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#waitlist">
                <Button variant="primary" size="lg" withArrow>
                  Request Early Researcher Access
                </Button>
              </a>
              <a href="#roadmap">
                <Button variant="ghost" size="lg">
                  Explore Research Roadmap
                </Button>
              </a>
            </div>
          </Reveal>

          {/* 3D DeepTech Quantum Lattice Showcase */}
          <Reveal delay={0.5}>
            <div className="relative mx-auto mt-8 h-[380px] sm:h-[460px] lg:h-[520px] w-full">
              <CompanySpecificObject slug="bharatx-labs" />
            </div>
          </Reveal>

          {/* Quantitative HUD Metrics Bar */}
          <Reveal delay={0.6}>
            <div className="mt-16 mx-auto max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl border border-white/10 bg-night-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
              <div className="border-r border-white/10 pr-4 last:border-r-0">
                <div
                  className="text-3xl md:text-4xl font-bold text-pulse-400 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif" }}
                >
                  22+
                </div>
                <div className="mt-1 font-display text-[11px] font-medium uppercase tracking-wider text-ink-400">
                  Scheduled Languages
                </div>
              </div>
              <div className="border-r border-white/10 pr-4 last:border-r-0">
                <div
                  className="text-3xl md:text-4xl font-bold text-gold-400 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif" }}
                >
                  &lt; 15ms
                </div>
                <div className="mt-1 font-display text-[11px] font-medium uppercase tracking-wider text-ink-400">
                  Edge Inference Target
                </div>
              </div>
              <div className="border-r border-white/10 pr-4 last:border-r-0">
                <div
                  className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif" }}
                >
                  100%
                </div>
                <div className="mt-1 font-display text-[11px] font-medium uppercase tracking-wider text-ink-400">
                  Sovereign Domestic IP
                </div>
              </div>
              <div>
                <div
                  className="text-3xl md:text-4xl font-bold text-emerald-400 tracking-tight"
                  style={{ fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif" }}
                >
                  PQC
                </div>
                <div className="mt-1 font-display text-[11px] font-medium uppercase tracking-wider text-ink-400">
                  Post-Quantum Security
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STRATEGIC MISSION & MANIFESTO ───────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-night-900/50">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                icon="cpu"
                eyebrow="The Sovereign Imperative"
                title={
                  <>
                    Why BharatX Labs?
                    <br />
                    <span className="text-gold-400">Technological sovereignty</span> is national sovereignty.
                  </>
                }
                lede="Global AI advancement cannot remain an imported commodity governed by external jurisdictions and black-box weights."
              />
              <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-600 dark:text-ink-300">
                <p>
                  Modern artificial intelligence powers civil infrastructure, logistics routing, national communication corridors, and autonomous industry. Relying exclusively on offshore models introduces systemic vulnerabilities—from abrupt service revocations and data sovereignty leaks to linguistic biases.
                </p>
                <p>
                  BharatX Labs is architected to change that equation. Incubated within BharatX Group's industrial ecosystem, the lab operates with direct access to physical industrial testbeds across civil engineering, precision casting, and agro-commodity supply networks.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-night-850 p-8 shadow-xl">
                <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-white/10 pb-4">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-ink-400">bharatx_labs_protocol_manifesto.md</span>
                </div>
                <div className="mt-6 space-y-4 font-mono text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                  <p className="text-pulse-400 font-semibold">// BHARATX LABS FIRST PRINCIPLES</p>
                  <p>1. DOMESTIC PRE-TRAINING: Every weight is computed on Indian soil, subject strictly to domestic jurisprudence.</p>
                  <p>2. PHYSICAL TESTBED REINFORCEMENT: Models are fine-tuned on real industrial telemetry, not synthetic web-scrape alone.</p>
                  <p>3. OPEN SCIENTIFIC ENGAGEMENT: Collaborative fellowship programs with India&apos;s leading technical institutes and researchers.</p>
                  <p>4. HARDENED EDGE SILICON: Intelligence must survive zero-connectivity nodes in rural farm gates and manufacturing floors.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-ink-400">
                  <span>STATUS: STEALTH INCUBATION</span>
                  <span className="text-gold-400 font-semibold">PHASE 01 COMPLIANT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE RESEARCH PILLARS ──────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-slate-200/80 dark:border-white/5">
        <div className="container-x">
          <SectionHeader
            icon="brain-circuit"
            eyebrow="Frontier Disciplines"
            title={
              <>
                Four pillars of
                <br />
                <span className="text-pulse-400">foundational deep-tech.</span>
              </>
            }
            lede="Focusing strictly on unsolved foundational challenges with long-term technological and economic compounding."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {researchPillars.map((p) => (
              <TiltCard
                key={p.number}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-night-850/80 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-pulse-400/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <IconBadge icon={p.icon} accent="#00f0ff" />
                    <span className="font-mono text-3xl font-bold text-slate-200 dark:text-white/10 select-none">
                      {p.number}
                    </span>
                  </div>

                  <span className="mt-5 block font-mono text-xs uppercase tracking-widest text-pulse-400">
                    {p.tagline}
                  </span>

                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                    {p.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {p.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-400 block mb-3">
                    Technical Specifications
                  </span>
                  <ul className="space-y-2">
                    {p.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-ink-500 dark:text-ink-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-pulse-400 mt-1.5 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH ROADMAP ────────────────────────────────────────── */}
      <section id="roadmap" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-night-900/40">
        <div className="container-x">
          <SectionHeader
            icon="workflow"
            eyebrow="Execution Milestones"
            title={
              <>
                Phased path to
                <br />
                <span className="text-gold-400">sovereign deployment.</span>
              </>
            }
            lede="Our calculated, four-phase trajectory from mathematical formalization to open industrial deployment."
          />

          <div className="mt-14 space-y-6">
            {roadmapMilestones.map((m, idx) => (
              <div
                key={m.phase}
                className="grid gap-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-night-850 p-6 md:p-8 lg:grid-cols-[180px_1fr_220px] lg:items-center shadow-sm"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-400 block">
                    {m.phase}
                  </span>
                  <span className="font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
                    {m.timeline}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-ink-900 dark:text-ink-50">
                    {m.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {m.description}
                  </p>
                </div>

                <div className="lg:text-right">
                  <span
                    className={`inline-block rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${m.badgeColor}`}
                  >
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARLY RESEARCHER WAITLIST & FELLOWSHIP ─────────────────── */}
      <section id="waitlist" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-white/5">
        <div className="container-x max-w-4xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-pulse-400/40 bg-pulse-400/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-pulse-400">
              Academic & Industrial Fellowship
            </span>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink-900 dark:text-ink-50">
              Join the Sovereign Frontier.
            </h2>
            <p className="mt-4 text-base text-ink-600 dark:text-ink-300 max-w-xl mx-auto">
              Are you an AI researcher, ML systems architect, or institutional partner? Request early closed-alpha model checkpoints or pitch collaborative fellowships.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-night-850 p-8 md:p-12 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Icon name="shield-check" width={32} height={32} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
                  Application Logged into Secure Protocol
                </h3>
                <p className="mt-3 text-sm text-ink-600 dark:text-ink-300 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our research steering committee will review your credential packet for Phase 02 Closed Alpha access.
                </p>
                <div className="mt-8">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", organization: "", domain: "Foundation Models", note: "" });
                    }}
                  >
                    Submit Another Application
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-night-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder-ink-400 focus:border-pulse-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300 mb-2">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@iitd.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-night-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder-ink-400 focus:border-pulse-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300 mb-2">
                      University / Enterprise
                    </label>
                    <input
                      type="text"
                      placeholder="IIT / IISc / Enterprise Research"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-night-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder-ink-400 focus:border-pulse-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300 mb-2">
                      Primary Research Domain
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-night-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 focus:border-pulse-400 focus:outline-none"
                    >
                      <option value="Foundation Models">Foundation Models & Multilingual LLMs</option>
                      <option value="Edge Silicon">Edge Neural Compute & Silicon</option>
                      <option value="Agentic Swarms">Agentic Swarms & Decision Intelligence</option>
                      <option value="Cryptography">Post-Quantum Cryptography</option>
                      <option value="Institutional Fellowship">PhD / Academic Fellowship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300 mb-2">
                    Research Abstract or Collaboration Focus
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly outline your research background, publication interests, or proposed testbed deployment..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-night-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder-ink-400 focus:border-pulse-400 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-xs text-ink-400">
                    Encrypted submission. Subject to BharatX Data Governance.
                  </span>
                  <Button type="submit" variant="primary" size="lg" withArrow>
                    Submit Access Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── BHARATX ECOSYSTEM SYNERGY ──────────────────────────────── */}
      <section className="py-16 border-t border-slate-200/80 dark:border-white/5 bg-slate-100/50 dark:bg-night-950">
        <div className="container-x text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-400">
            Backed by BharatX Group Conglomerate Infrastructure
          </span>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {companies
              .filter((c) => c.slug !== "bharatx-labs")
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/companies/${c.slug}`}
                  className="rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-night-900 px-4 py-2 text-xs font-medium text-ink-600 dark:text-ink-300 hover:border-gold-400 hover:text-gold-400 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
