import Reveal from "@/components/Reveal";

const DISCIPLINES = [
  {
    t: "Machine vision & edge AI",
    b: "Engineers who ship models that hold up at line speed, in mill light, on real fabric.",
  },
  {
    t: "Textile process engineering",
    b: "People who have run knitting, dyeing and finishing lines — and know where quality is actually lost.",
  },
  {
    t: "Industrial data & compliance",
    b: "Builders of measurement chains and reporting tooling designed to survive an audit.",
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
      {/* Team */}
      <section id="team" className="scroll-mt-14 border-b border-line bg-paper" aria-label="Team">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Team
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Built where textile engineering meets machine intelligence.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
              NexTex AI is a European DeepTech team. We publish claims we can
              defend — the same standard we apply to every report the platform
              produces.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            {DISCIPLINES.map((d, i) => (
              <Reveal key={d.t} delay={i * 0.07} className="bg-paper">
                <div className="h-full px-6 py-8">
                  <h3 className="text-base font-semibold tracking-tight">{d.t}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{d.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="mt-8 text-sm text-muted">
              We hire engineers who have stood next to the machines they model.{" "}
              <a
                href="mailto:careers@nextex-ai.com"
                className="text-ink underline decoration-acid decoration-2 underline-offset-4"
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

          <Reveal delay={0.1}>
            <dl className="mt-16 border-t border-line">
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
