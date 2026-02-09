import Link from "next/link";

export function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      href={`/blog/tags/${tag}`}
      className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
    >
      {tag}
    </Link>
  );
}
