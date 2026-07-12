"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  dir: string;
  frameCount: number;
  heightVh?: number;
  bg?: string;
  eager?: boolean;
  ariaLabel?: string;
  children?: (progress: number) => ReactNode;
};

/** Opacity for an overlay visible in the [from, to] progress window. */
export function fade(p: number, from: number, to: number, feather = 0.06) {
  if (p <= from - feather || p >= to + feather) return 0;
  if (p < from) return (p - (from - feather)) / feather;
  if (p > to) return 1 - (p - to) / feather;
  return 1;
}

/**
 * Canvas image-sequence scrubber: a sticky full-viewport canvas whose frame
 * is chosen by scroll progress through the (tall) outer section.
 */
export default function ScrollScrub({
  dir,
  frameCount,
  heightVh = 420,
  bg = "#0c0d0b",
  eager = false,
  ariaLabel,
  children,
}: Props) {
  const outerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = outerRef.current;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;

    const imgs: (HTMLImageElement | undefined)[] = new Array(frameCount);
    let rafId = 0;
    let lastFrame = -1;
    let lastP = -1;
    let loading = false;
    let disposed = false;

    const src = (i: number) =>
      `${dir}/frame_${String(i + 1).padStart(4, "0")}.jpg`;

    const ready = (im?: HTMLImageElement) =>
      !!im && im.complete && im.naturalWidth > 0;

    const nearest = (i: number) => {
      for (let d = 0; d < frameCount; d++) {
        if (ready(imgs[i - d])) return imgs[i - d];
        if (ready(imgs[i + d])) return imgs[i + d];
      }
      return undefined;
    };

    const draw = (i: number) => {
      const img = nearest(i);
      if (!img) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = el.clientWidth;
      const h = window.innerHeight;
      if (cv.width !== w * dpr || cv.height !== h * dpr) {
        cv.width = w * dpr;
        cv.height = h * dpr;
        cv.style.width = `${w}px`;
        cv.style.height = `${h}px`;
      }
      const s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.drawImage(img, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh);
    };

    const load = () => {
      if (loading) return;
      loading = true;
      // On small screens, load every 6th frame (~1/6 payload); nearest()
      // bridges the gaps so the scrub stays smooth without the full download.
      const step = window.matchMedia("(max-width: 767px)").matches ? 6 : 1;
      for (let i = 0; i < frameCount; i += step) {
        const im = new Image();
        im.decoding = "async";
        im.onload = () => {
          // Repaint when the frame we are parked on (or frame 0) arrives.
          if (!disposed && (Math.abs(i - Math.max(lastFrame, 0)) < step || lastFrame < 0)) {
            draw(Math.max(lastFrame, 0));
          }
        };
        im.src = src(i);
        imgs[i] = im;
      }
    };

    if (eager) load();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" }
    );
    io.observe(el);

    const loop = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const idx = Math.min(frameCount - 1, Math.round(p * (frameCount - 1)));
      if (idx !== lastFrame) {
        lastFrame = idx;
        draw(idx);
      }
      if (Math.abs(p - lastP) > 0.0015) {
        lastP = p;
        setProgress(p);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onResize = () => draw(Math.max(lastFrame, 0));
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [dir, frameCount, bg, eager]);

  return (
    <section
      ref={outerRef}
      aria-label={ariaLabel}
      className="relative"
      style={{ height: `${heightVh}vh`, background: bg }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0" />
        {children?.(progress)}
      </div>
    </section>
  );
}
