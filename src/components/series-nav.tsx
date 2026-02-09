import Link from "next/link";

interface SeriesPost {
  title: string;
  permalink: string;
  seriesOrder?: number;
}

interface SeriesNavProps {
  series: string;
  posts: SeriesPost[];
  currentSlug: string;
}

export function SeriesNav({ series, posts, currentSlug }: SeriesNavProps) {
  const currentIndex = posts.findIndex(
    (p) => p.permalink === `/blog/${currentSlug}`
  );
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="rounded-lg border border-border p-4">
      <Link
        href={`/blog/series/${series}`}
        className="text-sm font-semibold hover:underline"
      >
        시리즈: {series}
      </Link>
      <p className="mt-1 text-xs text-muted">
        {currentIndex + 1} / {posts.length}
      </p>
      <div className="mt-3 flex justify-between gap-4 text-sm">
        {prev ? (
          <Link href={prev.permalink} className="text-muted hover:text-foreground">
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.permalink} className="text-right text-muted hover:text-foreground">
            {next.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
