import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/content";
import { PostList } from "@/components/post-list";

export function generateStaticParams() {
  return getAllTags().map(({ name }) => ({ tag: name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `${decoded} 태그가 있는 포스트 목록`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">#{decoded}</h1>
      <p className="mt-2 text-muted">{posts.length}개의 포스트</p>
      <div className="mt-6">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
