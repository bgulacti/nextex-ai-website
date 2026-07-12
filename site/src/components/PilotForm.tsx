"use client";

import { useState, type FormEvent } from "react";

const PROCESSES = ["Knitting", "Dyeing", "Finishing", "Quality control"] as const;
const SIZES = ["< 20 machines", "20–50 machines", "50–150 machines", "150+ machines"] as const;

/**
 * Zero-backend pilot request: composes a structured email in the visitor's
 * own mail client. Keeps the contact ledger below as the direct channel.
 */
export default function PilotForm() {
  const [processes, setProcesses] = useState<string[]>([]);

  const toggle = (p: string) =>
    setProcesses((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Pilot request — ${data.get("company") || "textile manufacturer"}`;
    const body = [
      `Name: ${data.get("name") || "-"}`,
      `Company / mill: ${data.get("company") || "-"}`,
      `Email: ${data.get("email") || "-"}`,
      `Processes: ${processes.join(", ") || "-"}`,
      `Scale: ${data.get("size") || "-"}`,
      "",
      `${data.get("message") || ""}`,
    ].join("\n");
    window.location.href = `mailto:info@nextex-ai.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-acid";
  const label = "font-mono text-[10px] uppercase tracking-[0.2em] text-muted";

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2" aria-label="Pilot request form">
      <div className="space-y-2">
        <label htmlFor="pf-name" className={label}>Name</label>
        <input id="pf-name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <label htmlFor="pf-company" className={label}>Company / mill</label>
        <input id="pf-company" name="company" required autoComplete="organization" className={field} placeholder="Mill name, location" />
      </div>
      <div className="space-y-2">
        <label htmlFor="pf-email" className={label}>Work email</label>
        <input id="pf-email" name="email" type="email" required autoComplete="email" className={field} placeholder="name@company.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="pf-size" className={label}>Scale</label>
        <select id="pf-size" name="size" className={field} defaultValue="">
          <option value="" disabled>Select machine count</option>
          {SIZES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <fieldset className="md:col-span-2">
        <legend className={label}>Processes</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROCESSES.map((p) => {
            const active = processes.includes(p);
            return (
              <button
                key={p}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(p)}
                className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-ink/70 hover:border-ink/40"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className="space-y-2 md:col-span-2">
        <label htmlFor="pf-message" className={label}>Message (optional)</label>
        <textarea id="pf-message" name="message" rows={4} className={field} placeholder="Current inspection setup, fabrics, timeline…" />
      </div>
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button
          type="submit"
          className="bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-graphite-2"
        >
          Request a pilot
        </button>
        <p className="text-xs text-muted">
          Opens in your email client — or write to us directly below.
        </p>
      </div>
    </form>
  );
}
