"use client";

import ScrollScrub, { fade } from "@/components/ScrollScrub";
import { FRAMES } from "@/lib/assets";

const GROUPS: [string, string[]][] = [
  [
    "Machines",
    ["Industrial cameras", "Edge AI devices", "Industrial sensors", "PLC", "SCADA", "Machine controllers"],
  ],
  [
    "Context",
    ["Operator inputs", "Batch information", "Production recipes", "Material properties", "Quality inspection systems"],
  ],
  [
    "Environment",
    ["Energy meters", "Water meters", "Thermal sensors", "Vibration sensors", "Color measurement ΔE", "Machine events"],
  ],
];

export default function DataIntelligence() {
  return (
    <ScrollScrub
      dir={FRAMES.twin.dir}
      frameCount={FRAMES.twin.count}
      heightVh={460}
      bg="#101210"
      ariaLabel="A digital twin of the factory floor with data flowing between machines"
    >
      {(p) => (
        <>
          <div
            className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-5 pt-24"
            style={{ opacity: fade(p, 0.02, 0.35) }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-acid">
              Industrial data intelligence
            </p>
            <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-paper md:text-5xl">
              A digital twin built from every signal on the floor.
            </h2>
          </div>

          {GROUPS.map(([label, items], gi) => {
            const from = 0.3 + gi * 0.16;
            return (
              <div
                key={label}
                className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-[16vh]"
                style={{ opacity: fade(p, from, from + 0.13) }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                  {label}
                </p>
                <ul className="mt-3 flex max-w-2xl flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s}
                      className="border border-paper/20 bg-ink/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/85 backdrop-blur-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div
            className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-[14vh]"
            style={{ opacity: fade(p, 0.82, 1.01) }}
          >
            <div className="max-w-lg border-l-2 border-acid bg-ink/85 px-5 py-4 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                The sustainability intelligence database
              </p>
              <p className="mt-2 text-base leading-relaxed text-paper">
                Every machine event is connected to its quality, process and
                sustainability outcome — one queryable record of how fabric
                actually gets made.
              </p>
            </div>
          </div>
        </>
      )}
    </ScrollScrub>
  );
}
