"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STAGES = [
  {
    img: "/img/hero_v1.jpg",
    name: "Knitting",
    line: "Designed to watch loop formation at needle resolution — catching defects as they are knitted, not at rolling.",
  },
  {
    img: "/img/stage_dyeing.jpg",
    name: "Dyeing",
    line: "Bath temperature, dosing and ΔE color development are tracked for every batch.",
  },
  {
    img: "/img/stage_stentering.jpg",
    name: "Stentering",
    line: "Width, tension and drying energy are held inside the optimal window.",
  },
  {
    img: "/img/stage_sanforizing.jpg",
    name: "Sanforizing",
    line: "Shrinkage is compressed to specification — verified by measurement, not habit.",
  },
  {
    img: "/img/stage_finishing.jpg",
    name: "Finishing",
    line: "Surface consistency and roll quality are scored continuously as fabric is wound.",
  },
  {
    img: "/img/stage_quality.jpg",
    name: "Quality Control",
    line: "Designed to grade every meter with machine vision before it leaves the line.",
  },
] as const;

/**
 * Scroll-pinned cinematic pass through the production lifecycle:
 * one sticky viewport, six generated scenes cross-fading with scroll.
 */
export default function Flow() {
  const outerRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState(0); // float in [0, STAGES.length - 1]

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let raf = 0;
    let last = -1;
    const loop = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const v = p * (STAGES.length - 1);
      if (Math.abs(v - last) > 0.002) {
        last = v;
        setPos(v);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const active = Math.round(pos);

  return (
    <section
      id="production"
      ref={outerRef}
      aria-label="The textile production lifecycle"
      className="relative bg-graphite"
      style={{ height: `${STAGES.length * 110}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Scene stack */}
        <div className="absolute inset-0">
          {STAGES.map((s, i) => {
            const d = Math.abs(pos - i);
            const opacity = Math.max(0, 1 - d * 1.6);
            const scale = 1.05 - Math.min(d, 1) * 0.05;
            return (
              <div
                key={s.name}
                className="absolute inset-0"
                style={{ opacity, transform: `scale(${scale})` }}
                aria-hidden={active !== i}
              >
                <Image
                  src={s.img}
                  alt={`${s.name} — generated scene of the ${s.name.toLowerCase()} stage with machine-intelligence overlay`}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            );
          })}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-graphite/30"
          />
        </div>

        {/* Header */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/70">
            The production lifecycle
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-paper md:text-4xl">
            One intelligence layer across the whole line.
          </h2>
        </div>

        {/* Stage rail */}
        <div className="relative z-10 mt-auto w-full">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 pb-10">
            <div key={active} className="max-w-md">
              <div className="border-l-2 border-acid bg-graphite/70 px-4 py-3 backdrop-blur-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-acid">
                  {String(active + 1).padStart(2, "0")} · {STAGES[active].name}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-paper/90">
                  {STAGES[active].line}
                </p>
              </div>
            </div>
            <ol className="flex items-center gap-0 overflow-x-auto">
              {STAGES.map((s, i) => (
                <li key={s.name} className="flex items-center">
                  <span
                    className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                      i === active ? "text-acid" : "text-paper/50"
                    }`}
                  >
                    {s.name}
                  </span>
                  {i < STAGES.length - 1 && (
                    <span aria-hidden className="mx-3 h-px w-6 bg-paper/30 md:w-10" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
