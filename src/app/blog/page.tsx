import type { Metadata } from "next";
import { getPublishedPosts, getAllTags } from "@/lib/content";
import { PostList } from "@/components/post-list";
import { TagBadge } from "@/components/tag-badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "모든 블로그 포스트 목록",
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const tags = getAllTags();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted">전체 {posts.length}개의 포스트</p>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map(({ name }) => (
            <TagBadge key={name} tag={name} />
          ))}
        </div>
      )}
      <div className="mt-6">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
