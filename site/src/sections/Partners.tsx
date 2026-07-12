import Reveal from "@/components/Reveal";

/**
 * Wordmarks render as monochrome type until official logo files are placed in
 * /public/partners (terrot.svg, nuryildiz.svg, ribana.svg) — swap `mark` for
 * an <Image> then. Descriptors are factual, from signed LoI materials.
 */
const PARTNERS = [
  {
    mark: "Terrot",
    name: "Terrot GmbH",
    line: "Circular knitting machine manufacturer — Germany",
  },
  {
    mark: "Nuryıldız",
    name: "Nuryıldız Tekstil",
    line: "80+ machines, circular knitting & finishing — Çorlu / İstanbul",
  },
  {
    mark: "RibanaTeks",
    name: "Ribana Tekstil",
    line: "150+ circular knitting machines — İstanbul, est. 1990",
  },
] as const;

export default function Partners() {
  return (
    <section
      id="partners"
      className="scroll-mt-14 border-b border-line bg-paper-2"
      aria-label="Industrial pilot partners"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Industrial pilot partners
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-2xl font-semibold tracking-tight md:text-4xl">
            Letters of Intent signed for pilot collaboration.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07} className="bg-paper">
              <div className="flex h-full flex-col px-7 py-9">
                <p className="text-2xl font-bold tracking-tight text-ink/85">
                  {p.mark}
                </p>
                <p className="mt-4 text-sm font-medium text-ink">{p.name}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
                  {p.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Pilot preparation — not customers, not production deployments
          </p>
        </Reveal>
      </div>
    </section>
  );
}
