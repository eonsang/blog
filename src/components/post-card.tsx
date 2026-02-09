import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { TagBadge } from "./tag-badge";

interface PostCardProps {
  title: string;
  permalink: string;
  date: string;
  description: string;
  tags: string[];
  metadata: { readingTime: number; wordCount: number };
}

export function PostCard({
  title,
  permalink,
  date,
  description,
  tags,
  metadata,
}: PostCardProps) {
  return (
    <article className="group py-5">
      <Link href={permalink} className="block">
        <h2 className="text-lg font-semibold tracking-tight group-hover:underline">
          {title}
        </h2>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted">
          <time dateTime={date}>{formatDate(date)}</time>
          <span>·</span>
          <span>{Math.ceil(metadata.readingTime)}분</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </Link>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
