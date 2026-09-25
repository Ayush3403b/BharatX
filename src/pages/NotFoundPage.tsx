import { Link } from "react-router-dom";
import { Icon } from "../utils/icons";

export function NotFoundPage() {
  return (
    <section className="aurora noise relative flex min-h-screen items-center overflow-hidden pt-24">
      <div aria-hidden className="grid-bg grid-bg-fade absolute inset-0 opacity-60" />
      <div className="container-x relative text-center">
        <div
          aria-hidden
          className="mx-auto -mb-8 select-none font-display text-[7.5rem] xs:text-[9.5rem] sm:text-[11rem] font-bold leading-none text-white/[0.04] md:text-[18rem]"
        >
          404
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-50 md:text-6xl">
          This route does not exist.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[14.5px] sm:text-[15px] leading-relaxed text-ink-400">
          The page you're looking for has moved, been renamed, or was never
          part of the ecosystem. The rest of it is still here.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gold-400 px-8 py-4 text-[15px] font-semibold text-night-950 transition-all duration-300 hover:bg-gold-300"
          >
            Return to BharatX Group
            <Icon name="arrow-right" width={16} height={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/ecosystem"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-4 text-[15px] font-semibold text-ink-100 transition-colors hover:border-white/35 hover:bg-white/5"
          >
            Explore the ecosystem
          </Link>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-600">
          <Link to="/companies" className="transition-colors hover:text-ink-300">Companies</Link>
          <span aria-hidden>·</span>
          <Link to="/industries" className="transition-colors hover:text-ink-300">Industries</Link>
          <span aria-hidden>·</span>
          <Link to="/contact" className="transition-colors hover:text-ink-300">Contact</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
