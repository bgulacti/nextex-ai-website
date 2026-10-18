import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  getPosts,
  getPost,
  formatDate,
  readingTime,
  getPostAuthors,
  SOURCE_LABEL,
} from "@/content/posts";
import { linkify } from "@/lib/linkify";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      ...(post.image && { images: [{ url: post.image.src, width: post.image.width, height: post.image.height }] }),
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const minutes = readingTime(post);
  const authors = getPostAuthors(post);

  return (
    <main>
      <Nav />
      <article className="border-b border-line bg-paper">
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:pb-32 md:pt-40">
          <Link
            href="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
          >
            ← All posts
          </Link>
          <p className="mt-10 flex items-center gap-2 text-sm font-medium text-ink">
            <span aria-hidden className="size-1.5 bg-acid" />
            {post.category}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {minutes > 0 && ` · ${minutes} min read`}
            {post.source === "linkedin" && ` · via ${SOURCE_LABEL.linkedin}`}
          </p>

          {post.video ? (
            <video
              src={post.video}
              poster={post.image?.src}
              controls
              playsInline
              preload="metadata"
              className="mt-10 w-full border border-line bg-graphite"
            />
          ) : (
            post.image && (
              <Image
                src={post.image.src}
                width={post.image.width}
                height={post.image.height}
                alt=""
                priority
                sizes="(min-width: 768px) 720px, 100vw"
                className="mt-10 max-h-[80vh] w-auto border border-line bg-paper-2"
              />
            )
          )}

          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink/85">
            {post.body.map((para, i) => (
              <p key={i} className="whitespace-pre-line">
                {linkify(para)}
              </p>
            ))}
          </div>

          {authors.length > 0 && (
            <section className="mt-14 border-t border-line pt-8" aria-label="Authors">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Written by
              </p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {authors.map((a) => (
                  <li key={a.id} className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="flex size-12 shrink-0 items-center justify-center border border-line bg-paper-2 text-sm font-bold tracking-tight text-ink"
                    >
                      {a.initials}
                    </span>
                    <div>
                      <p className="font-semibold tracking-tight">{a.name}</p>
                      <p className="text-sm text-muted">{a.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {post.linkedinUrl && (
            <a
              href={post.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-block bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-graphite-2"
            >
              View on LinkedIn ↗
            </a>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
