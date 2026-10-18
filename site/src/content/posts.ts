/**
 * Blog posts. Two sources:
 *  - "linkedin": mirrors a post published on LinkedIn; `linkedinUrl` links back to the original.
 *  - "news": written for the site only.
 * Newest first is handled by `getPosts()`, so order here does not matter.
 * Media lives in /public/blog.
 */
import { getFounders, type Founder, type FounderId } from "@/content/team";

export const CATEGORIES = ["Field test", "Build log", "Technical", "Announcement"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Post = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-10-12" */
  date: string;
  source: "linkedin" | "news";
  category: Category;
  /** Shown in the large "Featured posts" row (first two by date). */
  featured?: boolean;
  /** Founder ids from content/team.ts. Defaults to DEFAULT_AUTHORS. */
  authors?: FounderId[];
  excerpt: string;
  /** Paragraphs of the full post. Single line breaks inside a paragraph are kept. */
  body: string[];
  image?: { src: string; width: number; height: number };
  /** MP4 path; `image` is used as its poster. */
  video?: string;
  linkedinUrl?: string;
};

const POSTS: Post[] = [
  {
    slug: "ribana-tekstil-factory-test",
    title: "From Berlin to the factory floor: testing at Ribana Tekstil",
    date: "2026-10-13",
    source: "linkedin",
    category: "Field test",
    featured: true,
    excerpt:
      "On 22–24 September 2026 we tested NexTex AI's initial prototype at Ribana Tekstil's factory in Türkiye — visual inspection under factory conditions and machine-sound data collection.",
    image: { src: "/blog/ribana.jpg", width: 1280, height: 720 },
    video: "/blog/ribana.mp4",
    linkedinUrl:
      "https://www.linkedin.com/posts/nextexai_industrialai-deeptech-textilemanufacturing-activity-7515734495938019328-pXIn",
    body: [
      "What can we learn when we listen to textile machines and inspect the fabric they produce?",
      "On 22–24 September 2026, we tested NexTex AI's initial prototype at Ribana Tekstil's factory in Türkiye. Ribana is our industrial pilot partner, supporting our collaboration.\nWe tested visual inspection under factory conditions, collected machine-sound data, and learned directly from the people managing production every day.",
      "The challenge: defects can go unnoticed while factories continue consuming yarn, electricity, and machine time. Detecting an anomaly is only part of the solution — operators also need to understand what triggered it and what to check next.",
      "At NexTex AI, we're developing retrofit visual–acoustic AI for existing textile machinery:\n📷 Fabric inspection and visual defect detection\n🎙️ Machine-sound analysis\n🧠 Explainable AI and operator reports\n💻 Edge computing for local processing",
      "Our goal is to detect defects earlier, reduce production waste, and connect quality events to traceable production records. Our business model combines retrofit hardware with annual software and support.",
      "Stay tuned for the combined visual–acoustic system in November 2026.",
      "Based in Berlin, Germany, we're looking to connect with pre-seed VCs, angel investors, and industrial partners across Europe, the US, and China focused on industrial AI, manufacturing, and supply-chain technology.",
      "Meet the founding team: Berk Gulacti · Burak Ünal · Zeynep Öykü Erdem",
      "If this matches your investment focus or you know someone we should meet, let's connect.",
    ],
  },
  {
    slug: "day-1-factory-floor",
    title: "Day 1 — Building the future of textile manufacturing",
    date: "2026-09-23",
    source: "linkedin",
    category: "Build log",
    featured: true,
    excerpt:
      "Not in a meeting room. Not with a polished simulation. The first day of building our MVP in a real textile manufacturing environment.",
    image: { src: "/blog/day1.jpg", width: 1152, height: 1536 },
    linkedinUrl:
      "https://www.linkedin.com/posts/nextexai_artificialintelligence-computervision-textiletechnology-activity-7508492635074887680-dqLk",
    body: [
      "Not in a meeting room.\nNot with a polished simulation.\nRight here, on the factory floor — where real production happens. 🏭🧵",
      "Today marks the first day of building our MVP in a real textile manufacturing environment.",
      "We are developing an AI-powered production solution where computer vision, intelligent software and industrial hardware work together to make textile manufacturing smarter, more reliable and more efficient.",
      "Our goal is ambitious: to transform real-time production data into actionable intelligence, reduce inefficiencies and help manufacturers achieve consistently successful production.",
      "The founding team bringing this vision to life:\n👔 Berk Gulacti — Co-Founder | Management & Business Development\n👁️ Burak Ünal — Co-Founder | Computer Vision & AI Engineer\n💻 Zeynep Öykü Erdem — Co-Founder | Software Engineer",
      "Three different disciplines. One shared vision. One factory floor. And this is only the beginning.",
      "We are building where deep technology meets real industry — not as another laboratory experiment, but as a scalable solution designed for the realities of textile production.",
      "We're excited to connect with visionary manufacturers, strategic partners and angel investors who believe the next industrial transformation will be powered by AI.",
      "Day 1. The machines are running. So are we. 🚀",
    ],
  },
  {
    slug: "retrofitting-textile-machines-with-ai",
    title: "Retrofitting 20-year-old textile machines with AI",
    date: "2026-08-04",
    source: "linkedin",
    category: "Technical",
    excerpt:
      "Most textile factories run on machines that are 15–20 years old. Replacing them costs millions. Retrofitting them with AI doesn't.",
    image: { src: "/blog/retrofit.jpg", width: 800, height: 450 },
    linkedinUrl:
      "https://www.linkedin.com/posts/nextexai_nextex-ai-activity-7490474636430696448--jWB",
    body: [
      "Most textile factories run on machines that are 15–20 years old. Replacing them costs millions. Retrofitting them with AI doesn't.",
      "That's what we're building at NexTex AI: a machine-agnostic platform that adds real-time defect detection and sustainability intelligence — energy, water, CO₂, waste — to existing production lines. No new machines. No production stops.",
      "We put together a short video that shows what this looks like in practice: https://www.youtube.com/watch?v=2tcRuP7Z9Qo",
      "Would love to hear your thoughts — especially from anyone working in textile manufacturing or industrial AI.",
    ],
  },
  {
    slug: "website-launch",
    title: "Our website is live",
    date: "2026-08-04",
    source: "linkedin",
    category: "Announcement",
    excerpt: "NexTex AI — machine intelligence for sustainable textile manufacturing.",
    image: { src: "/blog/website.jpg", width: 800, height: 446 },
    linkedinUrl:
      "https://www.linkedin.com/posts/nextexai_nextex-ai-machine-intelligence-for-sustainable-activity-7490503117336121344-YcnI",
    body: ["Visit our website to learn more: https://www.nextex-ai.com"],
  },
];

export function getPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * "2026-09-23" → "23 Sep 2026". Hand-rolled rather than toLocaleDateString,
 * whose output depends on the runtime's ICU data (e.g. "Sept" vs "Sep").
 * Throws on anything that isn't a real calendar date, so a typo in a post's
 * date fails the build instead of rendering "Invalid Date".
 */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  const d = m && new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (!m || !d || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) {
    throw new Error(`Invalid post date: "${iso}" (expected YYYY-MM-DD)`);
  }
  return `${m[3]} ${MONTHS[d.getUTCMonth()]} ${m[1]}`;
}

/**
 * Minutes at ~200 words per minute. Returns 0 for a post with no words,
 * so callers can hide the read time instead of showing "1 min read".
 */
export function readingTime(post: Post): number {
  const words = post.body.join(" ").split(/\s+/).filter(Boolean).length;
  if (words === 0) return 0;
  return Math.max(1, Math.round(words / 200));
}

/** Authors used when a post does not set `authors`. */
export const DEFAULT_AUTHORS: FounderId[] = ["berk", "burak", "zeynep"];

export function getPostAuthors(post: Post): Founder[] {
  return getFounders(post.authors ?? DEFAULT_AUTHORS);
}

export const SOURCE_LABEL: Record<Post["source"], string> = {
  linkedin: "LinkedIn",
  news: "News",
};
