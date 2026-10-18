import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  DEFAULT_AUTHORS,
  formatDate,
  getPost,
  getPostAuthors,
  getPosts,
  readingTime,
  type Post,
} from "@/content/posts";
import { FOUNDERS } from "@/content/team";

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    slug: "test",
    title: "Test",
    date: "2026-01-01",
    source: "news",
    category: "Technical",
    excerpt: "",
    body: [],
    ...overrides,
  };
}

const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");

describe("getPosts", () => {
  it("returns posts newest first", () => {
    const dates = getPosts().map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("keeps declared order for posts on the same date", () => {
    const sameDay = getPosts()
      .filter((p) => p.date === "2026-08-04")
      .map((p) => p.slug);
    expect(sameDay).toEqual(["retrofitting-textile-machines-with-ai", "website-launch"]);
  });

  it("returns a new array each call, so callers can't reorder the source", () => {
    const first = getPosts();
    first.reverse();
    expect(getPosts()[0].slug).toBe("ribana-tekstil-factory-test");
  });
});

describe("getPost", () => {
  it("finds a post by slug", () => {
    expect(getPost("day-1-factory-floor")?.title).toMatch(/^Day 1/);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPost("does-not-exist")).toBeUndefined();
  });
});

describe("formatDate", () => {
  it.each([
    ["2026-10-13", "13 Oct 2026"],
    ["2026-09-23", "23 Sep 2026"],
    ["2026-01-01", "01 Jan 2026"],
    ["2026-12-31", "31 Dec 2026"],
    ["2028-02-29", "29 Feb 2028"],
  ])("%s → %s", (iso, expected) => {
    expect(formatDate(iso)).toBe(expected);
  });

  it.each(["", "2026-13-01", "2026-02-30", "2027-02-29", "13.10.2026", "2026-1-5", "2026-10-13T10:00"])(
    "throws on invalid date %j",
    (iso) => {
      expect(() => formatDate(iso)).toThrow(/Invalid post date/);
    },
  );
});

describe("readingTime", () => {
  it("is 0 for a post with no words", () => {
    expect(readingTime(makePost({ body: [] }))).toBe(0);
    expect(readingTime(makePost({ body: [""] }))).toBe(0);
    expect(readingTime(makePost({ body: ["   ", "\n\t"] }))).toBe(0);
  });

  it("is at least 1 minute for a post with any words", () => {
    expect(readingTime(makePost({ body: ["Hello"] }))).toBe(1);
    expect(readingTime(makePost({ body: [words(99)] }))).toBe(1);
  });

  it("rounds at 200 words per minute", () => {
    expect(readingTime(makePost({ body: [words(200)] }))).toBe(1);
    expect(readingTime(makePost({ body: [words(299)] }))).toBe(1);
    expect(readingTime(makePost({ body: [words(300)] }))).toBe(2);
    expect(readingTime(makePost({ body: [words(500)] }))).toBe(3);
  });

  it("counts words across paragraphs and line breaks", () => {
    expect(readingTime(makePost({ body: [words(150), `${words(100)}\n${words(50)}`] }))).toBe(2);
  });
});

describe("getPostAuthors", () => {
  it("falls back to the default authors", () => {
    expect(getPostAuthors(makePost()).map((a) => a.id)).toEqual(DEFAULT_AUTHORS);
  });

  it("uses the post's own authors in their order", () => {
    const post = makePost({ authors: ["zeynep", "berk"] });
    expect(getPostAuthors(post).map((a) => a.id)).toEqual(["zeynep", "berk"]);
  });
});

// Guards src/content/posts.ts as people add posts by hand.
describe("post content", () => {
  const posts = getPosts();
  const publicDir = join(__dirname, "../../public");

  it("has unique, URL-safe slugs", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: has a valid date", (_, p) => {
    expect(() => formatDate(p.date)).not.toThrow();
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: media files exist in public/", (_, p) => {
    for (const src of [p.image?.src, p.video]) {
      if (src) expect(existsSync(join(publicDir, src)), `${src} is missing`).toBe(true);
    }
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: has a known category", (_, p) => {
    expect(CATEGORIES).toContain(p.category);
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: authors are founders", (_, p) => {
    const ids = FOUNDERS.map((f) => f.id);
    for (const id of p.authors ?? []) expect(ids).toContain(id);
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: has a title, excerpt and body", (_, p) => {
    expect(p.title.trim()).not.toBe("");
    expect(p.excerpt.trim()).not.toBe("");
    expect(p.body.length).toBeGreaterThan(0);
  });

  it("has at most two featured posts", () => {
    expect(posts.filter((p) => p.featured).length).toBeLessThanOrEqual(2);
  });

  it("LinkedIn posts link to linkedin.com without tracking parameters", () => {
    for (const p of posts.filter((p) => p.source === "linkedin")) {
      const url = new URL(p.linkedinUrl ?? "");
      expect(url.hostname).toBe("www.linkedin.com");
      // `rcm` identifies the sharer's personal account.
      expect(url.search, p.slug).toBe("");
    }
  });
});
