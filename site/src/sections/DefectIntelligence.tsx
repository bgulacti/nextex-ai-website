"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { fade } from "@/components/ScrollScrub";

const DEFECTS = [
  "Needle defects",
  "Needle lines",
  "Broken yarn",
  "Fabric holes",
  "Oil stains",
  "Lycra distortion",
  "Shade variation",
  "Color deviation ΔE",
  "Surface anomalies",
  "Texture anomalies",
  "Contamination",
  "Seam irregularities",
  "Start / stop anomalies",
] as const;

/**
 * Scroll-pinned inspection scene: the generated quality-control still is
 * scanned live by a DOM laser line, findings and alerts keyed to progress.
 */
export default function DefectIntelligence() {
  const outerRef = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let raf = 0;
    let last = -1;
    const loop = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const v = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      if (Math.abs(v - last) > 0.0015) {
        last = v;
        setP(v);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scanX = 8 + Math.min(1, Math.max(0, (p - 0.2) / 0.5)) * 84;

  return (
    <section id="defects" aria-label="AI defect intelligence" className="bg-graphite">
      <div ref={outerRef as React.RefObject<HTMLDivElement>} className="relative" style={{ height: "380vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <Image
            src="/img/stage_quality.jpg"
            alt="Machine-vision inspection station scanning toxic green fabric — generated for NexTex AI"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ transform: `scale(${1.02 + p * 0.06})` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-transparent to-graphite/40"
          />

          <div
            className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-5 pt-24"
            style={{ opacity: fade(p, 0.02, 0.3) }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-acid">
              AI defect intelligence
            </p>
            <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-paper md:text-5xl">
              Every meter is graded the moment it exists.
            </h2>
          </div>

          {/* Laser scan line riding scroll progress */}
          <div
            aria-hidden
            className="absolute inset-y-0 w-px bg-acid shadow-[0_0_28px_3px_rgba(200,255,0,0.5)]"
            style={{ left: `${scanX}%`, opacity: fade(p, 0.2, 0.7) }}
          />

          {/* Heatmap bloom */}
          <div
            aria-hidden
            className="absolute left-[40%] top-[55%] size-44 rounded-full"
            style={{
              opacity: fade(p, 0.38, 0.64) * 0.75,
              background:
                "radial-gradient(closest-side, rgba(200,255,0,0.45), rgba(200,255,0,0.1) 60%, transparent)",
            }}
          />

          {/* Bounding box + classification */}
          <div
            className="absolute left-[36%] top-[50%]"
            style={{ opacity: fade(p, 0.42, 0.72) }}
            aria-hidden
          >
            <div className="h-24 w-36 border border-acid" />
            <div className="mt-2 inline-block bg-ink px-2 py-1 font-mono text-[10px] tracking-wide text-acid">
              oil stain · conf 0.94
            </div>
          </div>

          {/* Operator alert */}
          <div
            className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-[10vh]"
            style={{ opacity: fade(p, 0.66, 0.95) }}
          >
            <div className="max-w-sm border-l-2 border-acid bg-ink/85 px-4 py-3 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                Operator alert · line 2
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-paper/90">
                Recurring needle line, machine M-12, needle 214. Root cause
                flagged — inspection recommended before the next batch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Taxonomy */}
      <div className="border-t border-graphite-2">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Reveal>
            <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-paper md:text-3xl">
              Detection and classification, not just anomaly flags.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/60">
              Each finding carries a class, a confidence score, machine context
              and position on the web — so quality teams act on causes, not
              symptoms. Validated findings feed the continuous learning loop.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {DEFECTS.map((d) => (
                <li
                  key={d}
                  className="border border-paper/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/80"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
