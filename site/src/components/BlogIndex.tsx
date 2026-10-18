"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ALL, filterPosts } from "@/lib/blogFilter";

export type BlogCard = {
  slug: string;
  title: string;
  category: string;
  /** Pre-formatted, e.g. "13 Oct 2026" */
  date: string;
  /** Minutes; 0 hides the read time. */
  readTime: number;
  author: string;
  image?: string;
  featured: boolean;
};

function Meta({ items }: { items: (string | false)[] }) {
  return (
    <p className="text-sm text-muted">
      {items.filter(Boolean).join(" · ")}
    </p>
  );
}

export default function BlogIndex({
  posts,
  categories,
}: {
  posts: BlogCard[];
  categories: string[];
}) {
  const [active, setActive] = useState(ALL);

  const { featured, list } = filterPosts(posts, active);

  return (
    <>
      {featured.length > 0 && (
        <div className="mt-20">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-4xl">Featured posts</h2>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[7/5] overflow-hidden rounded-2xl bg-graphite">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 560px, 100vw"
                        className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <p className="text-sm font-medium text-acid">{p.category}</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-paper transition-colors group-hover:text-acid md:text-[32px] md:leading-tight">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Meta
                      items={[p.date, p.readTime > 0 && `${p.readTime} min read`, p.author]}
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 flex flex-wrap gap-3" role="group" aria-label="Filter by category">
        {[ALL, ...categories].map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${
                on ? "bg-ink text-paper" : "bg-paper-2 text-ink hover:bg-line"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No posts in this category yet.</p>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={`${active}-${p.slug}`} delay={(i % 3) * 0.06}>
              <Link href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-paper-2">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink">
                  <span aria-hidden className="size-1.5 bg-acid" />
                  {p.category}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-acid">
                  {p.title}
                </h3>
                <div className="mt-2">
                  <Meta items={[p.date, p.author]} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
