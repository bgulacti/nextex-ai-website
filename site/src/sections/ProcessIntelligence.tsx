import Image from "next/image";
import Reveal from "@/components/Reveal";

const PARAMETERS = [
  "Machine speed",
  "Temperature",
  "Pressure",
  "Recipe parameters",
  "Production stability",
  "Energy consumption",
  "Water consumption",
  "Chemical usage",
  "Waste reduction",
  "Throughput",
  "Machine efficiency",
] as const;

export default function ProcessIntelligence() {
  return (
    <section id="process" className="scroll-mt-14 border-b border-line bg-paper" aria-label="AI process intelligence">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 md:grid-cols-2 md:py-36">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              AI process intelligence
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              The process learns where its optimum lives.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              NexTex AI correlates machine behavior with quality and resource
              outcomes, then recommends the parameter window that produces
              first-quality fabric with less energy, water and chemistry.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-8 flex max-w-md flex-wrap gap-2">
              {PARAMETERS.map((p) => (
                <li
                  key={p}
                  className="border border-line bg-paper-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/80"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 max-w-md border-l-2 border-acid bg-paper-2 px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Human-in-the-loop by design
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                NexTex AI recommends. Operators decide. No process parameter
                changes without explicit, logged operator approval — ever.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden border border-line">
            <Image
              src="/img/macro_fabric.jpg"
              alt="Macro view of knitted fabric with a single toxic green thread — generated for NexTex AI"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={90}
              className="object-cover"
            />
          </div>
          <div className="relative z-10 -mt-16 ml-6 max-w-sm border border-line bg-paper p-5 shadow-sm md:ml-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Recommendation · illustrative example
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              Stenter M-07 — reduce drying zone 3 by 4 °C. Estimated −6% gas per
              batch; ΔE stability unchanged within tolerance.
            </p>
            <div className="mt-4 flex gap-2" aria-hidden>
              <span className="bg-ink px-3 py-1.5 text-xs font-medium text-paper">
                Approve
              </span>
              <span className="border border-line px-3 py-1.5 text-xs font-medium text-muted">
                Decline
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
