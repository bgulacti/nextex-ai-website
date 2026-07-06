const COLS: [string, [string, string][]][] = [
  [
    "Platform",
    [
      ["How it works", "#platform"],
      ["Defect intelligence", "#defects"],
      ["Process intelligence", "#process"],
      ["Data intelligence", "#data"],
      ["Sustainability & reporting", "#sustainability"],
    ],
  ],
  [
    "Products",
    [
      ["Fabric", "#fabric"],
      ["Fabric Pro", "#fabric-pro"],
      ["Architecture", "#architecture"],
      ["Roadmap", "#roadmap"],
    ],
  ],
  [
    "Company",
    [
      ["Team", "#team"],
      ["Pilot environments", "#pilots"],
      ["Contact", "#contact"],
    ],
  ],
];

export default function Footer() {
  return (
    <footer className="bg-graphite text-paper" aria-label="Footer">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="text-lg font-bold tracking-tight">NexTex AI</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
              Machine intelligence for sustainable textile manufacturing —
              quality, process, data and sustainability intelligence in one
              platform.
            </p>
          </div>
          {COLS.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
                {title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-paper/80 transition-colors hover:text-acid"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-paper/50">
            © 2026 NexTex AI. All rights reserved.
          </p>
          <p className="max-w-md text-xs leading-relaxed text-paper/40">
            NexTex AI prepares audit-ready data and documentation; certification
            and assurance remain with accredited bodies. All process
            recommendations are operator-approved.
          </p>
        </div>
      </div>
    </footer>
  );
}
