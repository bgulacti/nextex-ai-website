import Image from "next/image";
import Reveal from "@/components/Reveal";

const KPIS = [
  { k: "Energy intensity", v: "0.42", u: "kWh/kg", d: "−8% vs target", spark: "M0,18 L8,14 L16,16 L24,10 L32,12 L40,7 L48,9 L56,4" },
  { k: "Water intensity", v: "62", u: "L/kg", d: "−12% YoY", spark: "M0,16 L8,17 L16,12 L24,13 L32,9 L40,10 L48,6 L56,5" },
  { k: "CO₂e per batch", v: "1.9", u: "kg/kg", d: "scope 1+2 basis", spark: "M0,14 L8,15 L16,11 L24,12 L32,10 L40,8 L48,8 L56,6" },
  { k: "Fabric waste", v: "1.8", u: "%", d: "−0.6 pt since pilot", spark: "M0,12 L8,14 L16,10 L24,11 L32,8 L40,9 L48,5 L56,6" },
  { k: "First quality", v: "98.5", u: "%", d: "graded per meter", spark: "M0,16 L8,12 L16,13 L24,9 L32,10 L40,6 L48,7 L56,3" },
  { k: "Rework", v: "0.9", u: "%", d: "root-caused", spark: "M0,10 L8,12 L16,9 L24,10 L32,7 L40,8 L48,5 L56,5" },
  { k: "Machine efficiency", v: "84", u: "%", d: "event-based OEE", spark: "M0,17 L8,13 L16,14 L24,11 L32,11 L40,8 L48,9 L56,5" },
  { k: "ΔE color stability", v: "0.4", u: "avg", d: "per-batch drift", spark: "M0,9 L8,11 L16,8 L24,10 L32,7 L40,9 L48,6 L56,7" },
] as const;

const SCOPES = ["Machine-level", "Batch-level", "Factory", "Multi-factory", "ESG / Executive"] as const;

const FRAMEWORKS = [
  {
    t: "CSRD-oriented reporting",
    b: "KPIs structured along CSRD reporting logic, generated from machine events rather than estimates.",
  },
  {
    t: "Digital Product Passport readiness",
    b: "Batch-level material, process and impact data organized so DPP requirements can be met as they land.",
  },
  {
    t: "EU Green Deal metrics",
    b: "Energy, water, chemical and waste intensity tracked continuously against reduction targets.",
  },
  {
    t: "TÜV-oriented documentation",
    b: "Traceable measurement chains and methodology notes prepared for third-party review.",
  },
  {
    t: "Audit-ready evidence",
    b: "Every KPI traces to the machine events behind it — drill down from report line to timestamp.",
  },
  {
    t: "Exportable report packs",
    b: "Management, operations, quality and sustainability reports exported as structured PDF packs.",
  },
] as const;

export default function Sustainability() {
  return (
    <section id="sustainability" className="scroll-mt-14 border-b border-line bg-paper" aria-label="Sustainability intelligence and reporting">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Sustainability intelligence &amp; reporting
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            From machine data to audit-ready sustainability intelligence.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            Reporting is not a dashboard bolted on at the end — it is the
            product of every sensed event. Numbers below are illustrative pilot
            telemetry; in production, each figure drills down to the machine
            events that produced it.
          </p>
        </Reveal>

        {/* Live KPI fabric — native UI, every value traceable */}
        <Reveal delay={0.08}>
          <div className="mt-14 border border-line">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line bg-paper-2 px-5 py-3">
              {SCOPES.map((s, i) => (
                <span
                  key={s}
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                    i === 0 ? "text-ink" : "text-muted"
                  }`}
                >
                  {s}
                </span>
              ))}
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                <span aria-hidden className="size-1.5 rounded-full bg-acid" />
                Live · Factory 1
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
              {KPIS.map((kpi) => (
                <div key={kpi.k} className="bg-paper px-5 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {kpi.k}
                  </dt>
                  <dd className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold tracking-tight">{kpi.v}</span>
                    <span className="text-xs text-muted">{kpi.u}</span>
                  </dd>
                  <svg
                    aria-hidden
                    viewBox="0 0 56 20"
                    className="mt-2 h-5 w-14 overflow-visible"
                  >
                    <path
                      d={kpi.spark}
                      fill="none"
                      stroke="var(--acid-dim)"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <p className="mt-1.5 text-[11px] text-muted">{kpi.d}</p>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Frameworks */}
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {FRAMEWORKS.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05} className="bg-paper">
              <div className="h-full px-6 py-7">
                <h3 className="text-base font-semibold tracking-tight">{f.t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Generated report artifacts */}
        <div className="mt-14 grid gap-8 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <figure>
              <div className="relative aspect-[16/9] overflow-hidden border border-line">
                <Image
                  src="/img/report_audit.jpg"
                  alt="Audit-ready CSRD-oriented sustainability report pages generated for NexTex AI"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Audit pack · exportable PDF
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-2">
            <figure>
              <div className="relative aspect-[16/9] overflow-hidden border border-line">
                <Image
                  src="/img/dashboard_sustainability.jpg"
                  alt="Sustainability intelligence dashboard with energy, water, CO2 and waste KPIs"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Executive dashboard · multi-factory
              </figcaption>
            </figure>
            <p className="mt-6 text-lg font-medium leading-snug tracking-tight text-ink">
              Every KPI traces to a machine event. Every report can be defended
              in an audit.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
