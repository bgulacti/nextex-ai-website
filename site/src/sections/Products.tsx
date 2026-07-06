import Reveal from "@/components/Reveal";

const FABRIC = [
  "Real-time defect detection",
  "Industrial cameras + edge AI",
  "Machine monitoring & alerts",
  "Cloud dashboard",
  "Quality KPIs per machine",
  "Energy & water KPIs",
  "CO₂ & fabric-waste KPIs",
] as const;

const FABRIC_PRO = [
  "Everything in Fabric",
  "Industrial sensors + PLC / SCADA integration",
  "Predictive & process-optimization AI",
  "Digital twin & multi-sensor intelligence",
  "Human-in-the-loop, explainable AI",
  "Enterprise & multi-factory dashboards",
  "Machine-level sustainability intelligence",
  "Advanced CSRD-oriented reporting",
  "Digital Product Passport readiness",
  "Audit-ready compliance reports",
  "API integrations",
] as const;

export default function Products() {
  return (
    <section id="products" className="scroll-mt-14 border-b border-line bg-paper" aria-label="Products">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Products
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            One platform. Two products.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article
              id="fabric"
              className="flex h-full scroll-mt-20 flex-col border border-line bg-paper px-7 py-9 transition-colors duration-300 hover:border-ink/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Product 01
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">Fabric</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                AI-powered machine monitoring for textile manufacturers starting
                digital transformation — see your quality and resource footprint
                in weeks, not years.
              </p>
              <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                {FABRIC.map((f) => (
                  <li key={f} className="flex items-baseline gap-2.5 text-sm text-ink/85">
                    <span aria-hidden className="size-1.5 shrink-0 translate-y-[-1px] bg-acid" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Start monitoring · retrofit install
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article
              id="fabric-pro"
              className="flex h-full scroll-mt-20 flex-col border border-graphite bg-graphite px-7 py-9 text-paper transition-colors duration-300 hover:border-acid/60"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
                Product 02
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">
                Fabric&nbsp;Pro
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">
                The complete industrial intelligence platform — process
                optimization, digital twin and audit-ready sustainability
                intelligence across factories.
              </p>
              <ul className="mt-7 space-y-2.5 border-t border-paper/15 pt-6">
                {FABRIC_PRO.map((f) => (
                  <li key={f} className="flex items-baseline gap-2.5 text-sm text-paper/90">
                    <span aria-hidden className="size-1.5 shrink-0 translate-y-[-1px] bg-acid" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-acid">
                Scale intelligence · factory-wide
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <p className="mt-8 text-sm text-muted">
            Fabric upgrades to Fabric Pro without replacing hardware — the same
            cameras, sensors and edge devices carry both.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
