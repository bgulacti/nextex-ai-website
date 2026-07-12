import Reveal from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Sense",
    body: "Industrial cameras, retrofit sensors and PLC / SCADA taps capture every machine event — without stopping the line.",
  },
  {
    n: "02",
    title: "Understand",
    body: "Edge AI models detect defects and contextualize machine behavior in real time, meters from where it happens.",
  },
  {
    n: "03",
    title: "Recommend",
    body: "The platform proposes process improvements. Operators review, approve or decline — no autonomous machine control.",
  },
  {
    n: "04",
    title: "Prove",
    body: "Every event lands in the sustainability intelligence database and becomes a traceable KPI — audit-ready by design.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="platform" className="scroll-mt-14 border-b border-line bg-paper" aria-label="How NexTex AI works">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            How NexTex AI works
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            From photons to proof, in four moves.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="bg-paper">
              <div className="relative h-full px-6 py-8">
                <span className="font-mono text-[11px] text-acid-dim">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-[3px] top-1/2 z-10 hidden size-1.5 -translate-y-1/2 rotate-45 border-r border-t border-acid-dim md:block"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
