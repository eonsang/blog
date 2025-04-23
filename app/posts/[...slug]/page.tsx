import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import Giscus from "@/components/giscus";
import TOC from "@/components/toc";
import Link from "next/link";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-10 prose dark:prose-invert max-w-full">
      <div className="sticky top-4 float-right mr-[-332px]">
        <TOC markdown={post.body.raw} />
      </div>
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200 mb-0">
          {post.description}
        </p>
      )}
      <div className="flex flex-wrap gap-1 mt-2">
        {post.tags.map((tag) => (
          <Link href={`/?tag=${tag}`} key={tag}>
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
              {tag}
            </span>
          </Link>
        ))}
      </div>
      <hr className="my-4" />
      <Mdx code={post.body.code} />
      <Giscus />
    </article>
  );
}
