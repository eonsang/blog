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
  const [activeId, setActiveId] = React.useState("");
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    // Create an observer for each heading
    headingElements.forEach((element) => {
      if (element) {
        const observer = new IntersectionObserver(callback, {
          rootMargin: "0px 0px -60% 0px",
          threshold: 1.0,
        });
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);

  if (!markdown) return <></>;
  if (items.length === 0) return <></>;

  return (
    <div className="toc-container p-4 border border-gray-100 rounded-lg w-[300px]">
      <h2 className="text-base font-bold mt-0 mb-1">목차</h2>
      <hr className="my-2" />
      <nav>
        <ul className="space-y-1 mt-0 list-none pl-0">
          {items.map((item, index) => (
            <li
              key={index}
              className={`${
                item.depth === 2 ? "ml-0" : item.depth === 3 ? "ml-4" : ""
              }`}
            >
              <a
                href={`#${item.id}`}
                className={`transition-colors duration-200 truncate text-ellipsis block text-sm  ${
                  activeId === item.id
                    ? "text-blue-600 font-medium dark:text-blue-400"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
