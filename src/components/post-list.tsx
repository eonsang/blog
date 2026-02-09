import { PostCard } from "./post-card";

interface Post {
  title: string;
  permalink: string;
  date: string;
  description: string;
  tags: string[];
  metadata: { readingTime: number; wordCount: number };
}

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="py-8 text-center text-muted">아직 포스트가 없습니다.</p>;
  }
  return (
    <div className="divide-y divide-border">
      {posts.map((post) => (
        <PostCard key={post.permalink} {...post} />
      ))}
    </div>
  );
}
