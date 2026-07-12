import Reveal from "@/components/Reveal";

const KPIS = [
  { k: "Energy", v: "0.42", u: "kWh/kg", d: "−8% vs target", spark: "M0,18 L10,14 L20,16 L30,10 L40,12 L50,7 L60,9 L70,4" },
  { k: "Water", v: "62", u: "L/kg", d: "−12% YoY", spark: "M0,16 L10,17 L20,12 L30,13 L40,9 L50,10 L60,6 L70,5" },
  { k: "CO₂e", v: "1.9", u: "kg/kg", d: "scope 1+2", spark: "M0,14 L10,15 L20,11 L30,12 L40,10 L50,8 L60,8 L70,6" },
  { k: "Waste", v: "1.8", u: "%", d: "−0.6 pt since pilot", spark: "M0,12 L10,14 L20,10 L30,11 L40,8 L50,9 L60,5 L70,6" },
  { k: "Quality", v: "98.5", u: "%", d: "first quality", spark: "M0,16 L10,12 L20,13 L30,9 L40,10 L50,6 L60,7 L70,3" },
] as const;

const DETAIL_KPIS = [
  ["Machine efficiency", "84%", "event-based OEE"],
  ["Rework", "0.9%", "root-caused"],
  ["ΔE color stability", "0.4 avg", "per-batch drift"],
] as const;

const FRAMEWORKS = [
  "CSRD-oriented reporting",
  "Digital Product Passport readiness",
  "EU Green Deal metrics",
  "TÜV-oriented documentation",
  "ESG dashboards",
  "Exportable PDF report packs",
] as const;

const REPORT_BARS = [34, 40, 37, 44, 41, 48, 46, 52, 50, 57, 55, 61] as const;

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
            Five numbers tell the story. Everything beneath them stays
            traceable to machine events. Figures shown are illustrative pilot
            telemetry.
          </p>
        </Reveal>

        {/* Headline KPIs — big number, short label, one sparkline */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {KPIS.map((kpi, i) => (
            <Reveal key={kpi.k} delay={i * 0.05}>
              <div className="border border-line bg-paper px-6 py-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {kpi.k}
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  {kpi.v}
                </p>
                <p className="mt-1 text-sm text-muted">{kpi.u}</p>
                <svg aria-hidden viewBox="0 0 70 20" className="mt-6 h-5 w-full overflow-visible">
                  <path d={kpi.spark} fill="none" stroke="var(--acid-dim)" strokeWidth="1.5" />
                </svg>
                <p className="mt-3 text-[11px] text-muted">{kpi.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Secondary metrics live behind a disclosure, not on the page */}
        <Reveal delay={0.1}>
          <details className="group mt-6">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
              <span aria-hidden className="text-acid-dim transition-transform group-open:rotate-45">+</span>
              View detailed KPIs
            </summary>
            <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
              {DETAIL_KPIS.map(([k, v, d]) => (
                <div key={k}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{k}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{v}</p>
                  <p className="mt-1 text-[11px] text-muted">{d}</p>
                </div>
              ))}
            </div>
          </details>
        </Reveal>

        {/* One minimal report page */}
        <div className="mt-20 grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="border border-line bg-white px-8 py-10 shadow-[0_1px_2px_rgba(12,13,11,0.06)] md:px-10 md:py-12">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Sustainability report
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Q2 · Factory 1
                </p>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">
                Machine-verified performance
              </h3>
              <dl className="mt-8 grid grid-cols-3 gap-6">
                {[
                  ["Energy", "−8%"],
                  ["Water", "−12%"],
                  ["CO₂e", "−9%"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                    <dd className="mt-1.5 text-2xl font-semibold tracking-tight">{v}</dd>
                  </div>
                ))}
              </dl>
              <svg aria-hidden viewBox="0 0 288 72" className="mt-10 h-20 w-full">
                {REPORT_BARS.map((h, i) => (
                  <rect
                    key={i}
                    x={i * 24 + 4}
                    y={72 - h}
                    width={12}
                    height={h}
                    fill={i === REPORT_BARS.length - 1 ? "var(--acid)" : "var(--line)"}
                  />
                ))}
              </svg>
              <p className="mt-8 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Every figure traces to machine events · Export PDF
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Reports your auditor can interrogate.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              One page, five numbers, a trend — and behind every line, the
              machine events that produced it. Drill from report figure to
              timestamp when the question comes.
            </p>
            <ul className="mt-8 space-y-3">
              {FRAMEWORKS.map((f) => (
                <li key={f} className="flex items-baseline gap-3 text-sm text-ink/85">
                  <span aria-hidden className="size-1.5 shrink-0 translate-y-[-1px] bg-acid" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
