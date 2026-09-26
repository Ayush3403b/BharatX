import { companies } from "../../data/companies";
import { Reveal } from "../common/Reveal";
import { CompanyCard } from "./CompanyCard";

/**
 * Six-company showcase with alternating layouts (Section 14).
 */
export function CompanyGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {companies.map((c, i) => (
        <Reveal key={c.id} delay={(i % 3) * 0.08} className="h-full">
          <CompanyCard
            company={c}
            layout="stacked"
            className="h-full"
          />
        </Reveal>
      ))}
    </div>
  );
}
