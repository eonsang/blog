"use client";

import { useEffect, useState } from "react";

interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll("h2[id], h3[id]");
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  function renderItems(items: TocEntry[], depth = 0) {
    return (
      <ul className={depth > 0 ? "ml-3 mt-1" : "space-y-1"}>
        {items.map((item) => {
          const id = item.url.replace("#", "");
          return (
            <li key={item.url}>
              <a
                href={item.url}
                className={`block py-0.5 text-sm transition-colors ${
                  activeId === id
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.title}
              </a>
              {item.items && renderItems(item.items, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
        목차
      </p>
      {renderItems(toc)}
    </nav>
  );
}
