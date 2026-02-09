"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import type { SearchablePost } from "@/lib/content";

interface SearchDialogProps {
  posts: SearchablePost[];
}

export function SearchDialog({ posts }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "excerpt", "headings", "tags"],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 1,
      }),
    [posts],
  );

  const results = useMemo(() => {
    if (!query.trim()) return posts.slice(0, 5);
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, posts]);

  const openDialog = useCallback(() => {
    setOpen(true);
    setQuery("");
    setSelected(0);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  // Global keyboard shortcuts: Cmd+K / Ctrl+K toggle, Escape close
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          closeDialog();
        } else {
          openDialog();
        }
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        closeDialog();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, openDialog, closeDialog]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.children[selected] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  function navigate(permalink: string) {
    closeDialog();
    router.push(permalink);
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      e.preventDefault();
      navigate(results[selected].permalink);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeDialog();
    }
  }

  return (
    <>
      <button
        onClick={openDialog}
        className="p-1 text-muted transition-colors hover:text-foreground"
        aria-label="Search (⌘K)"
      >
        <svg className="pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {open && (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh]"
        onClick={closeDialog}
      >
      <div
        className="w-full max-w-lg rounded-lg border border-border bg-background shadow-2xl"
        role="dialog"
        aria-label="Search posts"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Input */}
          <div className="flex items-center border-b border-border px-4">
            <span className="mr-2 text-muted">⌕</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search posts..."
              className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            />
            <kbd className="ml-2 rounded border border-border px-1.5 py-0.5 text-xs text-muted">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-72 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted">
                No results found.
              </p>
            ) : (
              results.map((post, i) => (
                <button
                  key={post.slug}
                  onClick={() => navigate(post.permalink)}
                  className={`flex w-full flex-col items-start rounded-md px-3 py-2 text-left transition-colors ${
                    i === selected ? "bg-foreground/5" : "hover:bg-foreground/5"
                  }`}
                >
                  <span className="text-sm font-medium text-foreground">
                    {post.title}
                  </span>
                  <span className="line-clamp-1 text-xs text-muted">
                    {post.description}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 border-t border-border px-4 py-2 text-xs text-muted">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>ESC Close</span>
          </div>
      </div>
    </div>
      )}
    </>
  );
}
