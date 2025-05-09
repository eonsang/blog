import { allPosts } from "@/.contentlayer/generated";
import { Nav } from "@/components/nav";
import dayjs from "dayjs";
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
    tag
      ? allPosts
          .filter((post) => post.published)
          .filter((post) => post.tags.includes(tag))
      : allPosts.filter((post) => post.published)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="py-10 flex flex-col gap-10">
        <Nav tag={tag} />

        <div>
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <React.Fragment key={post._id}>
                <Link href={post.slug}>
                  <figure>
                    <div className="w-full aspect-[2/1] border border-slate-200 overflow-hidden">
                      <img
                        src={
                          post.thumbnail ||
                          `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=`
                        }
                        className="object-cover w-full h-full"
                        alt={post.title}
                      />
                    </div>

                    <article className="mt-2">
                      <h2 className="text-2xl font-bold">{post.title}</h2>
                      <p className="mt-2">
                        {dayjs(post.date).format("YYYY-MM-DD")}
                      </p>
                    </article>
                  </figure>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
