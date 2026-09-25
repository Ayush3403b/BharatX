# BharatX Group — Corporate Ecosystem Website

A production-ready corporate ecosystem website for **BharatX Group** — six independent businesses presented as one connected ecosystem, with a live **website ecosystem viewer**, real **3D interactive components**, a premium **inertia smooth-scroll** experience, and a branded **preloader**.

> One Group → Six Businesses → One Connected Ecosystem

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 6, TypeScript, React Router 7, Tailwind CSS 4, Framer Motion 12, Lucide React |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` (lazy-loaded, code-split) |
| Smooth scroll | `lenis` (inertia scrolling, rAF-driven) |
| Backend | Node.js, Express 4, TypeScript (run via `tsx`) |
| Database | MongoDB (Mongoose 8) — Atlas or local; graceful in-memory fallback when unconfigured |
| Email | Nodemailer (optional SMTP) |

---

## Installation

```bash
npm install
```

## Development (frontend + backend)

```bash
npm run dev
```

- Client: `http://localhost:5173` (Vite, proxies `/api` → `:5000`)
- Server: `http://localhost:5000` (Express, `tsx watch`)

Run individually:

```bash
npm run dev:client   # Vite dev server only
npm run dev:server   # Express API only
```

## Production build

```bash
npm run build        # type-checks (tsc) + Vite build → dist/
npm run preview      # serve the production build locally
```

---

## MongoDB

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database (e.g. `bharatx`) and a database user with read/write.
3. Copy your connection string into `.env`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/bharatx
```

**Without `MONGO_URI`** the API runs in *memory-only mode*: contact inquiries still validate, respond with the correct success payload, and are viewable at `/admin` during the same server session — they just don't persist across restarts. This is a deliberate dev convenience, not a production path.

### Collections

`companies`, `contactInquiries`, `jobs`, `jobApplications`, `siteSettings`
(future: `admins`, `blogPosts`, `events`, `documents`, `analytics` — created only when needed).

---

## Environment Variables

`.env.example` is committed; **never commit `.env`**.

| Variable | Where | Purpose |
|---|---|---|
| `VITE_API_URL` | frontend | API base URL. Leave empty for same-origin (Vite proxy in dev; reverse proxy in prod). |
| `VITE_GA_ID` | frontend | GA4 measurement ID. When set, events push to `window.dataLayer`. Nothing is hardcoded. |
| `PORT` | server | API port (default `5000`). |
| `MONGO_URI` | server | MongoDB connection string. |
| `JWT_SECRET` | server | Signs admin JWTs. Use a long random string. |
| `CORS_ORIGIN` | server | Comma-separated allowed origins. |
| `RATE_LIMIT_MAX` | server | Max contact submissions / IP / 15 min (default 6). |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | server | Enable the JWT-protected `/admin` console. |
| `MAIL_HOST/PORT/USER/PASSWORD/FROM/TO` | server | Optional SMTP notification for new inquiries. |

---

## Iframe websites — adding a company

All iframe URLs live in **one** place: `src/data/ecosystem.ts`.

```ts
{
  id: "new-company",
  slug: "new-company",
  name: "New Company",
  url: "https://example.com",
  category: "Its domain"
}
```

A full company record (profile, capabilities, images, accent colour) lives in `src/data/companies.ts` — shaped 1:1 with the MongoDB `companies` collection so it can be migrated to the database later without UI changes.

### Important iframe limitation

External websites may prevent embedding via `X-Frame-Options`, `Content-Security-Policy: frame-ancestors` or similar browser security headers. **We never bypass these protections.** The viewer therefore:

- shows a loading skeleton while the site loads,
- surfaces an honest "This site may not allow embedded viewing" notice with **Reload** and **Open Official Website** actions after a 12s watchdog,
- shows a full error state (with **Open Official Website** + **Try Again**) if the frame fails,
- always keeps an **Open ↗** button in the toolbar.

---

## 3D components and performance

Three real 3D elements (WebGL via React Three Fiber):

| Component | Where | Notes |
|---|---|---|
| `EcosystemOrbScene` | Home hero | Central core + six orbiting company nodes; hover/tap a node for its summary card; mouse parallax; recedes on scroll. |
| `ShowcaseObjectScene` | Industries + company pages | Abstract gyroscopic rings + faceted core; studio lighting with gold rim light; idle rotation **plus scroll-linked rotation** (Framer Motion `useScroll` MotionValue read in `useFrame`). |
| `TiltCard` | company/industry/capability cards | CSS 3D perspective tilt following the pointer, with a layered gloss sweep (no WebGL). |

**Fallbacks** — each scene checks, before mounting a `<Canvas>`:

- `webglSupported()` — no WebGL → static SVG fallback,
- `isLowPowerDevice()` — ≤2 cores / <4 GB RAM / low-power mobile → static SVG fallback,
- `prefers-reduced-motion` (Framer Motion) → static SVG fallback, no idle animation.

**Performance rules applied:**

- 3D code is `React.lazy` + code-split (`three` and `r3f` in their own chunks — see `manualChunks` in `vite.config.ts`); the first paint never waits for WebGL.
- `dpr={[1, 1.5]}` caps pixel ratio on high-DPI screens.
- Low polygon counts (spheres ≤ 24 segments, wireframe icosahedra, thin tori); one small `Stars` field (320 points).
- R3F disposes WebGL contexts on unmount automatically.
- The preloader gates on `onCreated` of the hero scene (with a 2.4 s hard cap) before exiting.

**Swapping in branded assets later:** replace the primitive geometry in `ShowcaseObjectScene.tsx` / `EcosystemOrbScene.tsx` with a `useGLTF`-loaded `.glb` model (add `@react-three/drei`'s `useGLTF` + `Suspense`), or drop in a Spline embed. The scene wrappers, lights, scroll linkage and fallback logic all stay the same.

---

## Smooth-scroll system

`src/components/scroll/SmoothScrollProvider.tsx` wraps the app in a Lenis context:

- Lenis is initialised **after first paint** (60 ms deferral) and driven by `requestAnimationFrame`.
- `useLenis()` exposes `scrollTo / stop / start` — used by the back-to-top button, route-change scroll reset, and the ecosystem fullscreen mode (which stops/starts the smoothing around a fixed overlay).
- **Reduced motion:** when `prefers-reduced-motion` is set, Lenis is never instantiated — the site falls back to native scroll, and all parallax/Ken-Burns/magnetic effects are disabled at their call sites.
- **Disabling globally:** delete `<SmoothScrollProvider>` in `src/App.tsx` — every consumer degrades to native scroll automatically.

Scroll-linked animations use Framer Motion's `useScroll` (IntersectionObserver-gated `whileInView` triggers elsewhere) — transform-based only, no `top/left` animation, no scroll-event polling.

---

## Preloader

`src/components/layout/Preloader.tsx` — logo stroke-draw + letter reveal, a real progress value gated on `window.load`, `document.fonts.ready` and the hero 3D scene (with hard caps), a cycling status line, and a sub-second clip-path exit. Shown **once per session** (`sessionStorage`) and skipped entirely under `prefers-reduced-motion`.

---

## Admin console

`/admin` is JWT-protected and only unlocks when `ADMIN_EMAIL` + `ADMIN_PASSWORD` are set on the backend. It lists stored contact inquiries (MongoDB when connected, memory store otherwise) and signs out on invalid tokens. The public site never exposes admin routes.

---

## Deployment

### Frontend — Vercel

- Framework preset: **Vite**. Build: `npm run build`, output: `dist`.
- Set `VITE_API_URL` to your deployed API origin (or leave empty and reverse-proxy `/api` on the same host).
- SPA rewrites: add a `vercel.json` with a `/(.*) → /index.html` rewrite.

### Backend — Render / Railway

- Build: none needed (run source with `tsx`). Start: `npm run server` (or `npx tsx server/server.ts`).
- Set `MONGO_URI`, `JWT_SECRET`, `CORS_ORIGIN` (your Vercel URL), `ADMIN_*`, and optional `MAIL_*`.
- Health check: `GET /api/health` → `{ ok: true, db: "mongo" | "memory" }`.

### MongoDB Atlas

Standard Atlas setup; no special drivers required (Mongoose 8, `mongodb+srv`).

---

## Project structure (abridged)

```
src/
  components/
    common/     buttons, reveals, stats, section headers, preloader pieces…
    layout/     Navbar (mega menus), MobileMenu, Footer, Layout, Preloader, Logo
    scroll/     SmoothScrollProvider (Lenis), CinematicSection (full-bleed parallax)
    three/      EcosystemOrbScene, ShowcaseObjectScene, TiltCard, webgl detection
    company/    CompanyCard (3D tilt), CompanyGrid, RelatedCompanies
    ecosystem/  EcosystemSwitcher, IframeViewer (toolbar, states, fullscreen)
    forms/      ContactForm, Input/Select/Textarea with validation states
  pages/        Home, About, Companies, CompanyDetails, Ecosystem, Industries,
                Innovation, Impact, Leadership, Careers, Contact, Privacy,
                Terms, 404, Admin
  data/         companies, industries, navigation, ecosystem (single sources)
  services/     api (fetch wrapper), analytics (GA4-ready dataLayer)
  hooks/        usePageMeta (per-route SEO metadata)
server/
  config/       db connection (MongoDB + fallback flag)
  models/       ContactInquiry, Company, Job, JobApplication, SiteSettings
  controllers/  contact, admin (JWT), companies
  middleware/   auth (JWT), rate limiting, friendly error handler
  services/     memoryStore (no-Mongo dev fallback), mailer (optional SMTP)
  routes/       /api/health, /api/contact, /api/companies, /api/admin/*
```

## Branding / asset replacement

Logo and favicon live in `public/assets/brand/` and are composed by `src/components/layout/Logo.tsx` (mark + wordmark) — swap the SVGs there without touching components. Company imagery is in `public/companies/<slug>/hero.jpg` and `public/assets/backgrounds/`.

## Analytics events

`page_view`, `company_card_clicked`-style CTA clicks, `ecosystem_company_selected`, `ecosystem_iframe_loaded`, `ecosystem_open_external`, `ecosystem_fullscreen`, `contact_form_submitted`, `career` CTAs, `hero_3d_node_hover`, `preloader_complete` — all via `src/services/analytics.ts`, configured solely by `VITE_GA_ID`.
