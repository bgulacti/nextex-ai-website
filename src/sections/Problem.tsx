import Reveal from "@/components/Reveal";

const PROBLEMS = [
  {
    n: "01",
    title: "Quality is inspected too late",
    body: "Most defects are found at rolling or by the customer — hundreds of meters after they were produced. The meters in between are already cost, waste and CO₂.",
  },
  {
    n: "02",
    title: "Machine data stays in the machine",
    body: "PLC signals, recipes, batch context and operator knowledge live in separate systems. No one can connect a machine event to its quality and sustainability outcome.",
  },
  {
    n: "03",
    title: "Reporting pressure is industrial now",
    body: "CSRD, the EU Green Deal and Digital Product Passports ask for machine-level evidence. Spreadsheets assembled once a year cannot carry that burden.",
  },
] as const;

export default function Problem() {
  return (
    <section className="border-b border-line bg-paper" aria-label="The problem">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            The problem
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Textile mills run on machines that see nothing and prove nothing.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="bg-paper">
              <div className="h-full px-6 py-8">
                <span className="font-mono text-[11px] text-acid-dim">{p.n}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-14 max-w-2xl text-xl font-medium tracking-tight text-ink md:text-2xl">
            Manufacturing does not need another dashboard. It needs machines that
            can see, explain and prove what they do.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
