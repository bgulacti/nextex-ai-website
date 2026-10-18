"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const LINKS = [
  ["Platform", "/#platform"],
  ["Partners", "/#partners"],
  ["Sustainability", "/#sustainability"],
  ["Products", "/#products"],
  ["Tools", "/#tools"],
  ["Company", "/#team"],
  ["Blog", "/blog"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape (returning focus to the button) and when the viewport
  // grows past the lg breakpoint, where the menu button is hidden. The link
  // bar needs lg (1024 px): at 768 px the seven links don't fit on one line.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-paper/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link href="/#top" className="whitespace-nowrap text-[17px] font-bold tracking-tight text-ink">
          NexTex AI
        </Link>
        <div className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {LINKS.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors hover:text-ink">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="whitespace-nowrap bg-ink px-4 py-1.5 text-sm font-medium text-paper transition-colors hover:bg-graphite-2"
          >
            Request a pilot
          </Link>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex size-11 items-center justify-center text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid lg:hidden"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <ul className="px-5 py-3">
          {LINKS.map(([label, href]) => (
            <li key={href} className="border-b border-line last:border-b-0">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between py-3 text-lg font-medium tracking-tight text-ink"
              >
                {label}
                <span aria-hidden className="text-muted">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
