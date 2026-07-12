import Reveal from "@/components/Reveal";
import PilotForm from "@/components/PilotForm";

const FOUNDERS = [
  {
    initials: "BG",
    name: "Berk Gülaçtı",
    role: "Founder & CEO",
    email: "berk@nextex-ai.com",
  },
  {
    initials: "BÜ",
    name: "Burak Ünal",
    role: "Co-Founder & AI Vision Engineer",
    email: "burak@nextex-ai.com",
  },
] as const;

const CONTACTS = [
  {
    role: "General Inquiries",
    name: "NexTex AI",
    email: "info@nextex-ai.com",
  },
  {
    role: "Founder & CEO",
    name: "Berk Gülaçtı",
    email: "berk@nextex-ai.com",
  },
  {
    role: "Co-Founder & AI Vision Engineer",
    name: "Burak Ünal",
    email: "burak@nextex-ai.com",
  },
] as const;

export default function TeamContact() {
  return (
    <>
      {/* Founders */}
      <section id="team" className="scroll-mt-14 border-b border-line bg-paper" aria-label="Founders">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Founders
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Founder-led, where textile engineering meets machine intelligence.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
              We publish claims we can defend — the same standard we apply to
              every report the platform produces.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <div className="flex items-center gap-6 border border-line bg-paper px-7 py-8">
                  <span
                    aria-hidden
                    className="flex size-16 shrink-0 items-center justify-center border border-line bg-paper-2 text-lg font-bold tracking-tight text-ink"
                  >
                    {f.initials}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{f.name}</h3>
                    <p className="mt-1 text-sm text-muted">{f.role}</p>
                    <a
                      href={`mailto:${f.email}`}
                      className="mt-2 inline-block text-sm text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-acid"
                    >
                      {f.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="mt-8 text-sm text-ink">
              We&rsquo;re hiring a Founding Software Engineer.{" "}
              <a
                href="mailto:careers@nextex-ai.com?subject=Founding%20Software%20Engineer"
                className="underline decoration-acid decoration-2 underline-offset-4"
              >
                careers@nextex-ai.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-14 bg-paper" aria-label="Contact">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Contact
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              See your fabric through machine eyes.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
              Tell us about your lines — machines, fabrics, current inspection
              setup — and we will scope a pilot with measurable success
              criteria.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-14 max-w-3xl">
              <PilotForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-20 border-t border-line">
              {CONTACTS.map((c) => (
                <div
                  key={c.email}
                  className="grid gap-2 border-b border-line py-9 md:grid-cols-3 md:items-baseline md:gap-6"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {c.role}
                  </dt>
                  <dd className="text-lg font-medium tracking-tight text-ink">
                    {c.name}
                  </dd>
                  <dd className="md:text-right">
                    <a
                      href={`mailto:${c.email}`}
                      className="text-lg tracking-tight text-ink underline decoration-line underline-offset-[6px] transition-colors hover:decoration-acid"
                    >
                      {c.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
