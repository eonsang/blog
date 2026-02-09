import Link from "next/link";
import { getPublishedPosts } from "@/lib/content";
import { PostList } from "@/components/post-list";

export default function Home() {
  const posts = getPublishedPosts().slice(0, 5);

  return (
    <div>
      <section className="pb-8">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted">개발과 기술에 대한 생각을 기록합니다.</p>
      </section>
      <PostList posts={posts} />
      {posts.length >= 5 && (
        <div className="pt-6">
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-foreground"
          >
            모든 글 보기 &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
