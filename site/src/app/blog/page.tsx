import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import BlogIndex, { type BlogCard } from "@/components/BlogIndex";
import {
  getPosts,
  formatDate,
  readingTime,
  getPostAuthors,
  CATEGORIES,
} from "@/content/posts";
import { joinShortNames } from "@/content/team";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, updates and LinkedIn posts from NexTex AI — machine intelligence for sustainable textile manufacturing.",
};

export default function BlogPage() {
  const posts = getPosts();
  const cards: BlogCard[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: formatDate(p.date),
    readTime: readingTime(p),
    author: joinShortNames(getPostAuthors(p)),
    image: p.image?.src,
    featured: !!p.featured,
  }));
  // Only offer filters that have at least one post, in the declared order.
  const categories = CATEGORIES.filter((c) => posts.some((p) => p.category === c));

  return (
    <main>
      <Nav />
      <section className="border-b border-line bg-paper" aria-label="Blog">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:pb-36 md:pt-44">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
              News from the line
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Company news, product updates and what we share on LinkedIn, in
              one place.
            </p>
          </Reveal>

          {posts.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted">No posts yet.</p>
          ) : (
            <BlogIndex posts={cards} categories={categories} />
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
