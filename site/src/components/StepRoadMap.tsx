"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const connector: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
};

export default function StepRoadMap({
  label,
  steps,
  dark = false,
}: {
  label: string;
  steps: readonly { n: string; title: string; body: string }[];
  dark?: boolean;
}) {
  return (
    <div className="mt-10">
      {/* The label sits on the page background, outside the dark box. */}
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{label}</p>
      <motion.div
        className={`mt-4 grid gap-px border md:grid-cols-4 ${
          dark ? "border-graphite-2 bg-graphite-2" : "border-line bg-line"
        }`}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            variants={item}
            className={`relative ${dark ? "bg-graphite" : "bg-paper"}`}
          >
            <div className="h-full px-6 py-8">
              <span className={`font-mono text-[11px] ${dark ? "text-acid" : "text-acid-dim"}`}>
                {step.n}
              </span>
              <h4
                className={`mt-3 text-lg font-semibold tracking-tight ${
                  dark ? "text-paper" : "text-ink"
                }`}
              >
                {step.title}
              </h4>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  dark ? "text-paper/65" : "text-muted"
                }`}
              >
                {step.body}
              </p>
            </div>
            {i < steps.length - 1 && (
              <motion.svg
                aria-hidden
                variants={connector}
                className="absolute -right-[9px] top-1/2 z-10 hidden w-[18px] -translate-y-1/2 md:block"
                width="18"
                height="2"
                viewBox="0 0 18 2"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="18"
                  y2="1"
                  stroke={dark ? "var(--acid)" : "var(--acid-dim)"}
                  strokeWidth="2"
                  className="flow-line"
                />
              </motion.svg>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
