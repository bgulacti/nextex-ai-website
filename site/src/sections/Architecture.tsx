import Reveal from "@/components/Reveal";

const LAYERS = [
  {
    name: "Machine layer",
    items: ["Industrial cameras", "Retrofit sensors", "PLC / SCADA", "Machine events"],
  },
  {
    name: "Edge layer",
    items: ["Edge AI inference", "Event capture", "On-prem buffering", "Line-speed latency"],
  },
  {
    name: "Intelligence layer",
    items: ["Defect models", "Process models", "Digital twin", "Sustainability database"],
  },
  {
    name: "Application layer",
    items: ["Dashboards", "Operator alerts", "Audit-ready reports", "API"],
  },
] as const;

export default function Architecture() {
  return (
    <section id="architecture" className="scroll-mt-14 border-b border-line bg-paper-2" aria-label="Industrial AI architecture">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Industrial AI architecture
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Built like the machinery it watches.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            Inference runs at the edge, meters from the fabric. The cloud holds
            the intelligence and the evidence. Every layer is replaceable
            without stopping production.
          </p>
        </Reveal>

        <div className="mt-14">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.name} delay={i * 0.07}>
              <div className="relative">
                <div className="grid gap-px border border-line bg-line md:grid-cols-5">
                  <div className="bg-ink px-5 py-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-paper">{layer.name}</p>
                  </div>
                  {layer.items.map((item) => (
                    <div key={item} className="flex items-center bg-paper px-5 py-5">
                      <p className="text-sm text-ink/85">{item}</p>
                    </div>
                  ))}
                </div>
                {i < LAYERS.length - 1 && (
                  <div aria-hidden className="flex justify-center py-1.5">
                    <svg width="2" height="22" viewBox="0 0 2 22">
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="22"
                        stroke="var(--acid-dim)"
                        strokeWidth="2"
                        className="flow-line"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-xl text-sm text-muted">
            Data sovereignty by default: fabric imagery can stay on premises —
            only events, KPIs and model updates cross the boundary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
