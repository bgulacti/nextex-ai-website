"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["Platform", "#platform"],
  ["Production", "#production"],
  ["Sustainability", "#sustainability"],
  ["Products", "#products"],
  ["Roadmap", "#roadmap"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="text-[17px] font-bold tracking-tight text-ink">
          NexTex AI
        </a>
        <div className="hidden items-center gap-7 text-sm text-muted md:flex">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="bg-ink px-4 py-1.5 text-sm font-medium text-paper transition-colors hover:bg-graphite-2"
        >
          Request a pilot
        </a>
      </nav>
    </header>
  );
}
