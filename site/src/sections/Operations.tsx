import Reveal from "@/components/Reveal";

const LOOP = [
  ["Detect", "Models flag defects and process drift in real time."],
  ["Validate", "Operators confirm or correct every finding — human-in-the-loop."],
  ["Retrain", "Validated findings become training signal for the next model."],
  ["Deploy", "Improved models will roll to the edge with full version history."],
  ["Monitor", "Detection quality and false-alarm rates are tracked like any KPI."],
] as const;

const PILOT_POINTS = [
  "Retrofit cameras and sensors install without stopping the line",
  "One machine first, then the line, then the factory",
  "Success criteria agreed upfront: detection rate, false alarms, KPI baseline",
  "Typical pilot scope: 8–12 weeks in a running mill",
  "Pilot environments: knitting, dyeing and finishing lines",
] as const;

const ROADMAP = [
  {
    phase: "Now",
    title: "Quality foundation",
    items: [
      "Defect detection in validation",
      "First pilot mills onboarding (LoIs signed)",
      "Core KPI baselines defined with partners",
    ],
  },
  {
    phase: "Next",
    title: "Process intelligence",
    items: [
      "Operator-approved process recommendations",
      "Multi-factory dashboards",
      "CSRD-oriented report packs",
    ],
  },
  {
    phase: "Later",
    title: "Industrial scale",
    items: [
      "Digital twin scenario planning",
      "Digital Product Passport data exports",
      "Cross-mill benchmarking",
    ],
  },
] as const;

export default function Operations() {
  return (
    <>
      {/* Continuous learning loop */}
      <section className="border-b border-line bg-paper" aria-label="Continuous learning loop">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Continuous learning loop
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Every shift makes the models better.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-5">
            {LOOP.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.06} className="bg-paper">
                <div className="relative h-full px-5 py-7">
                  <span className="font-mono text-[11px] text-acid-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-base font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-sm text-muted">
              The loop is closed by people, not around them: operator validation
              is what turns detections into ground truth.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pilot environments */}
      <section id="pilots" className="scroll-mt-14 border-b border-line bg-paper-2" aria-label="Pilot environments">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Pilot environments
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Piloted in running mills, not in a lab.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              A NexTex AI pilot is an engineering engagement with defined
              success criteria — measured against your fabric, your machines
              and your baseline, before any rollout decision.
            </p>
            <div className="mt-8 max-w-md border-l-2 border-acid bg-paper px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Current status
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Letters of Intent signed with three industrial partners.
                First pilot mills onboarding for 2026–27. No commercial
                deployments yet — and we say so.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4 border-l border-line pl-6">
              {PILOT_POINTS.map((point) => (
                <li key={point} className="flex items-baseline gap-3 text-sm leading-relaxed text-ink/85">
                  <span aria-hidden className="size-1.5 shrink-0 translate-y-[-1px] bg-acid" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="scroll-mt-14 border-b border-line bg-paper" aria-label="Roadmap">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Roadmap
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Sequenced with pilot partners.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            {ROADMAP.map((r, i) => (
              <Reveal key={r.phase} delay={i * 0.07} className="bg-paper">
                <div className="h-full px-6 py-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-acid-dim">
                    {r.phase}
                  </p>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight">{r.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-2.5 text-sm text-muted">
                        <span aria-hidden className="size-1 shrink-0 translate-y-[-2px] bg-ink/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
