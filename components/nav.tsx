"use client";

import Link from "next/link";
import { getAllTags } from "@/lib/tags";
import { allPosts } from "contentlayer/generated";

export const Nav = ({ tag: tagName }: { tag?: string }) => {
  const tags = getAllTags(allPosts.filter((post) => post.published));
  return (
    <nav>
      <h2 className="text-xl font-bold">Tags</h2>
      <div className="flex flex-row gap-1.5 mt-4">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/?tag=${tag.name}`}
            className={`
              inline-flex items-center rounded-md  px-2 py-1 font-medium ring-1
              ${
                tag.name === tagName
                  ? "bg-green-50 text-green-700 ring-green-600/20 ring-inset"
                  : "bg-gray-50 text-gray-600 ring-gray-500/10 ring-inset"
              }`}
          >
            {tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </nav>
  );
};
