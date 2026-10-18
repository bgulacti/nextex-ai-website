import type { ReactNode } from "react";

/** Turns bare URLs in post text into links. */
export function linkify(text: string): ReactNode[] {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    i % 2 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-ink underline decoration-acid decoration-2 underline-offset-4"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}
