"use client";

import ScrollScrub, { fade } from "@/components/ScrollScrub";
import { ConceptTag } from "@/components/Labels";
import { FRAMES } from "@/lib/assets";

const KPIS = [
  ["Pilot scope", "Circular knit lines"],
  ["First-quality target", "98.5%"],
  ["Energy view", "kWh/kg per machine"],
  ["Scan coverage target", "100% of web"],
] as const;

export default function Hero() {
  return (
    <div id="top">
      <ScrollScrub
        dir={FRAMES.hero.dir}
        frameCount={FRAMES.hero.count}
        heightVh={520}
        bg="#ecedec"
        eager
        ariaLabel="A circular knitting machine waking up as machine intelligence comes online"
      >
        {(p) => (
          <>
            {/* Opening statement */}
            <div
              className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-[9vh] text-center md:pt-[11vh]"
              style={{ opacity: fade(p, 0, 0.22), pointerEvents: p < 0.22 ? "auto" : "none" }}
            >
              {/* Soft paper halo for readability over the machine hall */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-[10vh] h-[64vh] bg-[radial-gradient(ellipse_60%_55%_at_50%_38%,rgba(246,246,241,0.95),rgba(246,246,241,0.7)_55%,transparent_78%)]"
              />
              <p className="relative text-xl font-bold tracking-tight text-ink">
                NexTex AI
              </p>
              <p className="relative mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                Industrial machine intelligence
              </p>
              <h1 className="relative mt-5 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] text-ink md:text-[4.2rem]">
                Machine Intelligence for Sustainable Textile Manufacturing
              </h1>
              <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12">
                <a
                  href="#contact"
                  className="flex h-12 min-w-[180px] items-center justify-center bg-black px-6 text-base font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Request a pilot
                </a>
                <a
                  href="#platform"
                  className="flex h-12 min-w-[180px] items-center justify-center border border-black bg-white px-6 text-base font-medium text-black transition-colors hover:bg-neutral-100"
                >
                  Explore the platform
                </a>
              </div>
            </div>

            {/* Stage captions as the machine wakes */}
            <Caption p={p} from={0.26} to={0.4} text="The machine wakes." />
            <Caption p={p} from={0.44} to={0.58} text="Vision comes online." />
            <Caption p={p} from={0.62} to={0.76} text="Every meter, understood." />

            {/* AI scan line sweeping the fabric */}
            <div
              aria-hidden
              className="absolute inset-y-0 w-px bg-acid shadow-[0_0_24px_2px_rgba(200,255,0,0.55)]"
              style={{
                left: `${18 + fadeRange(p, 0.44, 0.62) * 64}%`,
                opacity: fade(p, 0.44, 0.62),
              }}
            />

            {/* Defect finding */}
            <div
              aria-hidden
              className="absolute left-[46%] top-[58%] hidden md:block"
              style={{ opacity: fade(p, 0.6, 0.78) }}
            >
              <div className="size-20 border border-acid shadow-[0_0_0_1px_rgba(12,13,11,0.15)]" />
              <div className="mt-2 bg-ink px-2 py-1 font-mono text-[10px] tracking-wide text-acid">
                needle line · conf 0.97
              </div>
            </div>

            {/* Concept-visualization tag while the scrub narrative runs */}
            <div
              className="absolute right-5 top-[4.5rem]"
              style={{ opacity: fade(p, 0.26, 1.01) * 0.9 }}
              aria-hidden
            >
              <ConceptTag className="text-ink/50" />
            </div>

            {/* Machine-level KPIs settle in */}
            <div
              className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-[9vh]"
              style={{ opacity: fade(p, 0.82, 1.01) }}
            >
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                Design targets — validated per mill during pilots
              </p>
              <dl className="grid w-full max-w-4xl grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
                {KPIS.map(([k, v]) => (
                  <div key={k} className="bg-paper/95 px-4 py-3 backdrop-blur">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold tracking-tight text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Scroll hint */}
            <div
              className="absolute inset-x-0 bottom-6 flex justify-center"
              style={{ opacity: fade(p, 0, 0.08) }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Scroll
              </span>
            </div>
          </>
        )}
      </ScrollScrub>
    </div>
  );
}

/** 0→1 linear ramp across [from, to]. */
function fadeRange(p: number, from: number, to: number) {
  return Math.min(1, Math.max(0, (p - from) / (to - from)));
}

function Caption({
  p,
  from,
  to,
  text,
}: {
  p: number;
  from: number;
  to: number;
  text: string;
}) {
  return (
    <div
      className="absolute inset-x-0 bottom-[14vh] flex justify-center px-5 text-center"
      style={{ opacity: fade(p, from, to) }}
    >
      <p className="bg-paper/80 px-4 py-2 text-2xl font-semibold tracking-tight text-ink backdrop-blur-sm md:text-3xl">
        {text}
      </p>
    </div>
  );
}
