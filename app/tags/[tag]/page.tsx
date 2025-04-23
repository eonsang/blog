import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const tags = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const posts = allPosts
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">태그: {tag}</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post._id} className="border-b pb-6">
            <Link
              href={post.slug}
              className="block hover:text-teal-500 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <time className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("ko-KR")}
              </time>
              {post.description && (
                <p className="mt-2 text-gray-700">{post.description}</p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
