import { allPosts } from "@/.contentlayer/generated";
import { Nav } from "@/components/nav";
import Link from "next/link";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) {
  const { tag } = await searchParams;
  const posts = (
    tag ? allPosts.filter((post) => post.tags.includes(tag)) : allPosts
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="grid grid-cols-[1fr_240px] gap-x-10 py-10">
      <div className="flex flex-col">
        {posts.map((post, index) => (
          <React.Fragment key={post._id}>
            <Link href={post.slug}>
              <article className="">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                {post.description && <p className="mt-2">{post.description}</p>}
              </article>
            </Link>
            {index < posts.length - 1 && <hr className="my-6" />}
          </React.Fragment>
        ))}
      </div>
      <Nav tag={tag} />
    </div>
  );
}
