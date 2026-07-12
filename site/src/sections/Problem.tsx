import Reveal from "@/components/Reveal";

const PROBLEMS = [
  {
    n: "01",
    title: "Inspection misses what machines could see",
    body: (
      <>
        Across peer-reviewed studies, manual fabric inspection catches only
        60–75% of defects — and accuracy falls as the shift wears on.
        <Sup n={1} /> Every missed meter travels downstream as cost, waste and
        customer claims.
      </>
    ),
  },
  {
    n: "02",
    title: "A failed batch burns everything twice",
    body: (
      <>
        Typically 4–8% of dyed metreage is re-processed for off-shade results.
        <Sup n={2} /> With conventional dyeing consuming on the order of
        100–180 litres of water per kilogram of fabric,<Sup n={3} /> every
        re-dye spends that water, energy and chemistry a second time.
      </>
    ),
  },
  {
    n: "03",
    title: "The evidence burden is cascading down the chain",
    body: (
      <>
        From around 2028, textiles sold in the EU are expected to carry a
        Digital Product Passport built from production data.<Sup n={4} /> Brands
        are already asking suppliers for batch-level evidence — long before
        regulators ask them.
      </>
    ),
  },
];

const SOURCES: [string, string, string][] = [
  [
    "Rasheed et al., Mathematical Problems in Engineering (2020) — survey of fabric-defect detection; manual inspection accuracy 60–75%, value loss 45–65%.",
    "Peer-reviewed study",
    "https://onlinelibrary.wiley.com/doi/10.1155/2020/8189403",
  ],
  [
    "Coloration-industry literature on right-first-time dyeing — off-shade rework at 4–8% of metreage.",
    "Industry-reported",
    "https://www.sciencedirect.com/topics/engineering/dyeing-process",
  ],
  [
    "PLOS Sustainability & Transformation (2024) — measured average 164 L water and 449 g chemicals per kg dyed textile; conventional range ~100–180 L/kg.",
    "Peer-reviewed, measured",
    "https://journals.plos.org/sustainabilitytransformation/article?id=10.1371%2Fjournal.pstr.0000072",
  ],
  [
    "EU Ecodesign for Sustainable Products Regulation (2024/1781) — textile delegated act expected ~2027, Digital Product Passport compliance expected from ~2028.",
    "Regulatory timeline (expected)",
    "https://commission.europa.eu/energy-climate-change-environment/standards-tools-and-labels/products-labelling-rules-and-requirements/ecodesign-sustainable-products-regulation_en",
  ],
];

function Sup({ n }: { n: number }) {
  return (
    <sup>
      <a
        href="#sources"
        aria-label={`Source ${n}`}
        className="font-mono text-[10px] text-acid-dim no-underline hover:text-ink"
      >
        {n}
      </a>
    </sup>
  );
}

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
            Manufacturing does not need another dashboard. It needs machines
            that can see, explain and prove what they do.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <details id="sources" className="group mt-10 scroll-mt-20">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
              <span aria-hidden className="text-acid-dim transition-transform group-open:rotate-45">+</span>
              Sources
            </summary>
            <ol className="mt-4 max-w-3xl space-y-2.5 border-t border-line pt-4">
              {SOURCES.map(([text, kind, href], i) => (
                <li key={href} className="flex gap-3 text-xs leading-relaxed text-muted">
                  <span className="font-mono text-acid-dim">{i + 1}</span>
                  <span>
                    {text}{" "}
                    <span className="font-mono text-[10px] uppercase tracking-wide">
                      [{kind}]
                    </span>{" "}
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className="underline decoration-line underline-offset-2 hover:decoration-acid"
                    >
                      source
                    </a>
                  </span>
                </li>
              ))}
            </ol>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
