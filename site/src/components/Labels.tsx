/** Micro-labels that mark illustrative content — part of the trust system. */

export function ConceptTag({
  className = "",
  text = "Concept visualization",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <span
      className={`pointer-events-none font-mono text-[9px] uppercase tracking-[0.22em] ${className}`}
    >
      {text}
    </span>
  );
}

export function IllustrativeTag({
  className = "",
  text = "Illustrative targets — validated per mill during pilots",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <p
      className={`font-mono text-[9px] uppercase tracking-[0.22em] text-muted ${className}`}
    >
      {text}
    </p>
  );
}
