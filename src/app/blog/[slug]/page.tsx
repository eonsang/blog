import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPublishedPosts,
  getPostBySlug,
  getPostsBySeries,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { MDXContent } from "@/components/mdx-content";
import { TableOfContents } from "@/components/toc";
import { TagBadge } from "@/components/tag-badge";
import { SeriesNav } from "@/components/series-nav";
import Link from "next/link";
import { GiscusComments } from "@/components/giscus-comments";

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getPublishedPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const seriesPosts = post.series ? getPostsBySeries(post.series) : [];

  const relatedPosts = post.tags.length > 0
    ? allPosts
        .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
        .slice(0, 5)
    : [];

  return (
    <div className="relative">
      <article>
        <header className="pb-6">
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{Math.ceil(post.metadata.readingTime)}분</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>

        {post.series && seriesPosts.length > 1 && (
          <div className="mb-8">
            <SeriesNav
              series={post.series}
              posts={seriesPosts}
              currentSlug={post.slug}
            />
          </div>
        )}

        {/* Desktop TOC */}
        <div className="hidden xl:fixed xl:right-[max(0px,calc(50%-40rem))] xl:top-24 xl:block xl:w-56">
          <TableOfContents toc={post.toc} />
        </div>

        {/* Mobile TOC */}
        {post.toc.length > 0 && (
          <details className="mb-8 rounded-lg border border-border p-4 xl:hidden">
            <summary className="cursor-pointer text-sm font-semibold text-muted">
              목차
            </summary>
            <div className="mt-2">
              <TableOfContents toc={post.toc} />
            </div>
          </details>
        )}

        <MDXContent code={post.content} />
      </article>

      <GiscusComments />

      {relatedPosts.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="mb-4 text-lg font-semibold">연관 컨텐츠</h2>
          <ul className="space-y-3">
            {relatedPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.permalink}
                  className="group flex items-baseline justify-between gap-4"
                >
                  <span className="text-sm text-foreground group-hover:underline">
                    {p.title}
                  </span>
                  <time
                    dateTime={p.date}
                    className="shrink-0 text-xs text-muted"
                  >
                    {formatDate(p.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mt-12 flex justify-between border-t border-border pt-6 text-sm">
        {prevPost ? (
          <Link
            href={prevPost.permalink}
            className="text-muted hover:text-foreground"
          >
            &larr; {prevPost.title}
          </Link>
        ) : (
          <span />
        )}
        {nextPost ? (
          <Link
            href={nextPost.permalink}
            className="text-right text-muted hover:text-foreground"
          >
            {nextPost.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
