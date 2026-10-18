export const ALL = "All";

/** How many posts the "Featured posts" row shows. */
export const MAX_FEATURED = 2;

/**
 * Splits posts for the blog index: the featured row (first MAX_FEATURED
 * flagged posts) and the grid list. "All" lists every post, featured ones
 * included; a category lists all of its posts.
 */
export function filterPosts<T extends { featured: boolean; category: string }>(
  posts: T[],
  active: string,
): { featured: T[]; list: T[] } {
  return {
    featured: posts.filter((p) => p.featured).slice(0, MAX_FEATURED),
    list: active === ALL ? posts : posts.filter((p) => p.category === active),
  };
}
