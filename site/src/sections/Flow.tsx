"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fade } from "@/components/ScrollScrub";

type Stage = {
  img: string;
  name: string;
  line: string;
  /** Autoplay loop(s) for this stage; knitting has two story beats. */
  videos?: string[];
};

const STAGES: Stage[] = [
  {
    img: "/img/knitting_smartex.jpg",
    name: "Knitting",
    line: "Designed to watch loop formation at needle resolution — catching defects as they are knitted, not at rolling.",
    videos: ["/video/stages/knitting_start.mp4", "/video/stages/knitting_needle.mp4"],
  },
  {
    img: "/img/stage_dyeing.jpg",
    name: "Dyeing",
    line: "Bath temperature, dosing and ΔE color development are tracked for every batch.",
    videos: ["/video/stages/dyeing.mp4"],
  },
  {
    img: "/img/stage_stentering.jpg",
    name: "Stentering",
    line: "Width, tension and drying energy are held inside the optimal window.",
    videos: ["/video/stages/stentering.mp4"],
  },
  {
    img: "/img/stage_sanforizing.jpg",
    name: "Sanforizing",
    line: "Shrinkage is compressed to specification — verified by measurement, not habit.",
    videos: ["/video/stages/sanforizing.mp4"],
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
    videos: ["/video/stages/quality.mp4"],
  },
];

const CLOSING_KPIS = [
  ["Energy", "0.42 kWh/kg"],
  ["Water", "62 L/kg"],
  ["CO₂e", "1.9 kg/kg"],
] as const;

/** Instrument chip in the site's mono register. */
function Chip({ children, tone = "acid" }: { children: React.ReactNode; tone?: "acid" | "alert" }) {
  return (
    <span
      className={`inline-block bg-ink/90 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm ${
        tone === "alert" ? "text-red-400" : "text-acid"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Scroll-pinned cinematic pass through the production lifecycle.
 * Each stage plays a short Higgsfield loop while active (poster = 4K still);
 * a DOM instrument layer tells the story: the unnoticed needle break, the
 * operator approval, ΔE drift, monitored zones, the final scan — closing on
 * machine KPIs and a CSRD / EU Green Deal report handoff. All illustrative.
 */
export default function Flow() {
  const outerRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[][]>(STAGES.map(() => []));
  const [pos, setPos] = useState(0); // float in [0, STAGES.length - 1]
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    setMotionOK(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
  // Local progress within the active stage's window: 0 → 1.
  // Edge stages own half-width windows ([0, 0.5] and [N-1.5+1, N-1]), so map
  // against the clipped window or their t would never leave [0.5, 1] / [0, 0.5].
  const winStart = Math.max(0, active - 0.5);
  const winEnd = Math.min(STAGES.length - 1, active + 0.5);
  const t = Math.min(1, Math.max(0, (pos - winStart) / (winEnd - winStart)));
  // Knitting story beat: 0 = machine start, 1 = the unnoticed needle break
  const knitBeat = active === 0 && t >= 0.45 ? 1 : 0;
  // Meters counter for the needle-break story (0 → 3.2 m as the defect runs)
  const meters = Math.min(1, Math.max(0, (t - 0.5) / 0.32)) * 3.2;

  // Play only the active stage's active beat; pause everything else.
  // Sync runs on every scroll step AND on a slow heartbeat, so a play/pause
  // race during fast scrolling self-heals even if the user stops right on a
  // beat boundary (an interrupted play() would otherwise stay paused).
  const syncRef = useRef<() => void>(() => {});
  syncRef.current = () => {
    videoRefs.current.forEach((stageVids, i) => {
      stageVids.forEach((vid, b) => {
        if (!vid) return;
        const shouldPlay =
          motionOK && i === active && (i === 0 ? b === knitBeat : b === 0);
        if (shouldPlay) {
          if (vid.paused) vid.play().catch(() => {});
        } else if (!vid.paused) {
          vid.pause();
        }
      });
    });
  };
  useEffect(() => {
    syncRef.current();
  }, [pos, active, knitBeat, motionOK]);
  useEffect(() => {
    const id = setInterval(() => syncRef.current(), 700);
    return () => clearInterval(id);
  }, []);

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
            const near = d < 1.2; // mount media only around the viewport
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
                  quality={90}
                  priority={i === 0}
                  className="object-cover"
                />
                {motionOK &&
                  near &&
                  s.videos?.map((src, b) => {
                    const beatVisible = i === 0 ? b === knitBeat : true;
                    return (
                      <video
                        key={src}
                        ref={(el) => {
                          videoRefs.current[i][b] = el;
                        }}
                        src={src}
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster={s.img}
                        aria-hidden
                        className="absolute inset-0 size-full object-cover transition-opacity duration-700"
                        style={{ opacity: i === active && beatVisible ? 1 : 0 }}
                      />
                    );
                  })}
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/70">
                The production lifecycle
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-paper md:text-4xl">
                One intelligence layer across the whole line.
              </h2>
            </div>
            <span
              aria-hidden
              className="mt-1 shrink-0 font-mono text-[9px] uppercase tracking-[0.22em] text-paper/50"
            >
              Concept visualization
            </span>
          </div>
        </div>

        {/* Story instrument layer */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
          {/* 01 · Knitting — machine start, then the unnoticed needle break */}
          {active === 0 && (
            <>
              <div
                className="absolute left-1/2 top-[26%] -translate-x-1/2"
                style={{ opacity: fade(t, 0.12, 0.4) }}
              >
                <Chip>machine start · 08:12:04 · logged</Chip>
              </div>
              <div
                className="absolute left-[38%] top-[42%]"
                style={{ opacity: fade(t, 0.52, 1.01) }}
              >
                <div className="h-28 w-40 border border-red-400/90" />
                <div className="mt-2">
                  <Chip tone="alert">broken needle · 214 · conf 0.97</Chip>
                </div>
              </div>
              <div
                className="absolute left-[38%] top-[68%]"
                style={{ opacity: fade(t, 0.6, 1.01) }}
              >
                <Chip>
                  the machine doesn&apos;t feel it — defect ran {meters.toFixed(1)} m
                </Chip>
              </div>
              <div
                className="absolute left-[38%] top-[76%]"
                style={{ opacity: fade(t, 0.82, 1.01) }}
              >
                <Chip>operator alert sent · approved ✓ · resumed</Chip>
              </div>
            </>
          )}

          {/* 02 · Dyeing — shade drift */}
          {active === 1 && (
            <div
              className="absolute left-[16%] top-[38%]"
              style={{ opacity: fade(t, 0.35, 0.95) }}
            >
              <Chip>ΔE 1.8 · shade drift detected · batch flagged</Chip>
            </div>
          )}

          {/* 03 · Stentering — energy window */}
          {active === 2 && (
            <div
              className="absolute right-[12%] top-[34%]"
              style={{ opacity: fade(t, 0.35, 0.95) }}
            >
              <Chip>zone 3 · temperature &amp; energy monitored</Chip>
            </div>
          )}

          {/* 04 · Sanforizing — tolerance */}
          {active === 3 && (
            <div
              className="absolute left-[14%] top-[30%]"
              style={{ opacity: fade(t, 0.35, 0.95) }}
            >
              <Chip>shrinkage within tolerance</Chip>
            </div>
          )}

          {/* 05 · Finishing — roll scoring */}
          {active === 4 && (
            <div
              className="absolute left-[16%] top-[34%]"
              style={{ opacity: fade(t, 0.35, 0.95) }}
            >
              <Chip>roll quality scored continuously</Chip>
            </div>
          )}

          {/* 06 · Quality — full scan, then the proof handoff */}
          {active === 5 && (
            <>
              <div
                className="absolute left-1/2 top-[30%] -translate-x-1/2"
                style={{ opacity: fade(t, 0.2, 0.6) }}
              >
                <Chip>100% of web scanned</Chip>
              </div>
              <div
                className="absolute inset-x-0 bottom-[24vh] flex justify-center px-5"
                style={{ opacity: fade(t, 0.55, 1.01) }}
              >
                <div className="w-full max-w-2xl">
                  <p className="mb-2 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-paper/50">
                    Illustrative machine KPIs — validated per mill during pilots
                  </p>
                  <dl className="grid grid-cols-3 gap-px border border-paper/20 bg-paper/20">
                    {CLOSING_KPIS.map(([k, v]) => (
                      <div key={k} className="bg-ink/85 px-4 py-3 text-center backdrop-blur-sm">
                        <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/60">
                          {k}
                        </dt>
                        <dd className="mt-1 font-mono text-sm text-acid">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div
                    className="mt-3 text-center"
                    style={{ opacity: fade(t, 0.75, 1.01) }}
                  >
                    <Chip>CSRD / EU Green Deal-aligned report generated → see reporting</Chip>
                  </div>
                </div>
              </div>
            </>
          )}
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
