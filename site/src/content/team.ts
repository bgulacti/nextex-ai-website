/** Founding team. Used by the Founders section and as blog post authors. */
export type Founder = {
  id: "berk" | "burak" | "zeynep";
  initials: string;
  name: string;
  /** Short name used on blog cards, e.g. "Berk, Burak & Öykü". */
  shortName: string;
  role: string;
  email?: string;
};

export const FOUNDERS: Founder[] = [
  {
    id: "berk",
    initials: "BG",
    name: "Berk Gülaçtı",
    shortName: "Berk",
    role: "Founder & CEO — Finance, Business Development & Sales",
    email: "berk@nextex-ai.com",
  },
  {
    id: "burak",
    initials: "BÜ",
    name: "Burak Ünal",
    shortName: "Burak",
    role: "Co-Founder — AI & Computer Vision",
    email: "burak@nextex-ai.com",
  },
  {
    id: "zeynep",
    initials: "ÖE",
    name: "Zeynep Öykü Erdem",
    shortName: "Öykü",
    role: "Co-Founder — Backend Infrastructure & Full-Stack Engineering",
  },
];

export type FounderId = Founder["id"];

export function getFounders(ids: readonly FounderId[]): Founder[] {
  return ids.flatMap((id) => FOUNDERS.find((f) => f.id === id) ?? []);
}

/** "Berk", "Berk & Burak", "Berk, Burak & Öykü" */
export function joinShortNames(founders: Founder[]): string {
  const names = founders.map((f) => f.shortName);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`;
}
