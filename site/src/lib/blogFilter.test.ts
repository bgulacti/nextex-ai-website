import { describe, expect, it } from "vitest";
import { ALL, MAX_FEATURED, filterPosts } from "@/lib/blogFilter";

const post = (slug: string, category: string, featured = false) => ({ slug, category, featured });

const POSTS = [
  post("a", "Field test", true),
  post("b", "Build log", true),
  post("c", "Technical"),
  post("d", "Technical", true),
  post("e", "Announcement"),
];

const slugs = (posts: { slug: string }[]) => posts.map((p) => p.slug);

describe("filterPosts", () => {
  it('"All" lists every post, featured ones included', () => {
    expect(slugs(filterPosts(POSTS, ALL).list)).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("a category lists all of its posts, featured ones included", () => {
    expect(slugs(filterPosts(POSTS, "Technical").list)).toEqual(["c", "d"]);
    expect(slugs(filterPosts(POSTS, "Field test").list)).toEqual(["a"]);
  });

  it("returns an empty list for a category with no posts", () => {
    expect(filterPosts(POSTS, "Pilot").list).toEqual([]);
  });

  it(`features at most ${MAX_FEATURED} posts, in order`, () => {
    expect(slugs(filterPosts(POSTS, ALL).featured)).toEqual(["a", "b"]);
  });

  it("keeps the featured row the same whatever the filter", () => {
    expect(filterPosts(POSTS, "Announcement").featured).toEqual(filterPosts(POSTS, ALL).featured);
  });

  it("has no featured row when no post is featured", () => {
    expect(filterPosts([post("x", "Technical")], ALL).featured).toEqual([]);
  });

  it("handles no posts", () => {
    expect(filterPosts([], ALL)).toEqual({ featured: [], list: [] });
  });
});
