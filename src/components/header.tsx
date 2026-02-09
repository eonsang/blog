import Link from "next/link";
import { SearchDialog } from "./search-dialog";
import { getSearchablePosts } from "@/lib/content";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const posts = getSearchablePosts();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          Blog
        </Link>
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <SearchDialog posts={posts} />
        </nav>
      </div>
    </header>
  );
}
