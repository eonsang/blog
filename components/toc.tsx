"use client";
import React from "react";

type TocItem = {
  title: string;
  id: string;
  depth: number;
};

export function extractTOC(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,})\s+(.*)/); // ## 이상만 매칭
    if (match) {
      const hashes = match[1];
      const title = match[2].trim();
      const depth = hashes.length;

      if (depth <= 3) {
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "") // 특수문자 제거
          .replace(/\s+/g, "-"); // 공백 → 하이픈
        toc.push({ title, id, depth });
      }
    }
  }

  return toc;
}

interface TOCProps {
  markdown: string;
}

export default function TOC({ markdown }: TOCProps) {
  const items = extractTOC(markdown);

  if (!markdown) return <></>;
  if (items.length === 0) return <></>;

  return (
    <div className="toc-container w-full border border-gray-200 rounded-lg">
      <h2 className="text-base font-bold m-0 p-4">목차</h2>
      <nav className="border-t border-gray-200 p-4">
        <ul className="space-y-2 mt-0 mb-0 pl-0 list-none">
          {items.map((item, index) => (
            <li
              key={index}
              className={`${
                item.depth === 2 ? "ml-0" : item.depth === 3 ? "ml-4" : ""
              }`}
            >
              <a
                href={`#${item.id}`}
                className={`block text-sm no-underline hover:underline ${
                  item.depth === 2 ? "text-gray-900" : "text-gray-500"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item.depth === 3 ? "- " : ""}
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
