import Reveal from "@/components/Reveal";
import StepRoadMap from "@/components/StepRoadMap";

// Steps for the labelling and GAN tools
const LABELLING_STEPS = [
  { n: "01", title: "Pre-label defects", body: "AI pre-labels each defect image." },
  { n: "02", title: "Review and confirm", body: "Operators review and confirm the proposed labels." },
  { n: "03", title: "Correct if necessary", body: "Operators correct labels when needed." },
  { n: "04", title: "Feed corrections back into the training loop", body: "Corrections become new training signals." },
] as const;

const GAN_STEPS = [
  { n: "01", title: "Generate synthetic defects", body: "Create realistic examples of rare defects." },
  { n: "02", title: "Review and validate", body: "Human reviewers check the generated imagery." },
  { n: "03", title: "Integrate into training set", body: "Validated examples are added to the training data." },
  { n: "04", title: "Monitor model performance", body: "Track performance as the model improves." },
] as const;


// Descriptions for the labelling and GAN tools
const LABELLING = [
  "Pre-labelled bounding boxes + defect class",
  "Confidence-ranked review queue",
  "One-click confirm / correct / reject",
  "Corrections written back as training signal",
  "Full annotation history and audit trail",
] as const;

const GAN = [
  "Synthetic defects matched to real fabric texture and lighting",
  "Targets underrepresented classes (contamination, start/stop anomalies)",
  "Human-reviewed before entering the training set",
  "Configurable per fabric type and machine",
  "Reduces time-to-accuracy for new defect types",
] as const;

export default function Tools() {
  return (
    <section id="tools" className="scroll-mt-14 border-b border-line bg-paper" aria-label="AI tooling">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            AI tooling
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            The tools that keep the models honest.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            Detection models are only as good as the data behind them. NexTex
            AI builds the tooling to create and balance that data, not just
            the models that consume it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col border border-line bg-paper px-7 py-9 transition-colors duration-300 hover:border-ink/40">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Tool 01
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">
                Automatic Labelling
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                AI-assisted annotation that pre-labels every defect image —
                class, bounding box, confidence — so operators confirm or
                correct instead of annotating from scratch.
              </p>
              <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                {LABELLING.map((f) => (
                  <li key={f} className="flex items-baseline gap-2.5 text-sm text-ink/85">
                    <span aria-hidden className="size-1.5 shrink-0 translate-y-[-1px] bg-acid" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Feeds the Validate step · continuous learning loop
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="flex h-full flex-col border border-graphite bg-graphite px-7 py-9 text-paper transition-colors duration-300 hover:border-acid/60">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
                Tool 02
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">
                GAN Anomaly Generation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">
                A generative model that synthesizes realistic rare-defect
                imagery, so classes that are real but infrequent on the floor
                still have enough examples to train on.
              </p>
              <ul className="mt-7 space-y-2.5 border-t border-paper/15 pt-6">
                {GAN.map((f) => (
                  <li key={f} className="flex items-baseline gap-2.5 text-sm text-paper/90">
                    <span aria-hidden className="size-1.5 shrink-0 translate-y-[-1px] bg-acid" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-acid">
                Balances training data · continuous learning loop
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-xl text-sm text-muted">
            Both tools exist to close the same gap — real, labelled, balanced
            defect data — so the models in production keep improving without
            waiting months for enough real-world examples.
          </p>
        </Reveal>

        <StepRoadMap label="Labelling pipeline" steps={LABELLING_STEPS} />
        <StepRoadMap label="GAN pipeline" steps={GAN_STEPS} dark />

      </div>
    </section>
  );
}
