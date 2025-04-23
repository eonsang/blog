"use client";

import Link from "next/link";
import { getAllTags } from "@/lib/tags";
import { allPosts } from "contentlayer/generated";

export const Nav = ({ tag: tagName }: { tag?: string }) => {
  const tags = getAllTags(allPosts);
  return (
    <nav>
      <h2 className="text-orange-500 font-bold mb-2 px-2">태그</h2>
      <div className="flex flex-col gap-1">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/?tag=${tag.name}`}
            className={`hover:bg-gray-50 transition-colors py-1.5 px-2 rounded-md text-base ${
              tag.name === tagName ? "bg-gray-100" : ""
            }`}
          >
            {tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </nav>
  );
};
