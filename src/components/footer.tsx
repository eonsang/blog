import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()}</p>
        <Link
          href="/feed.xml"
          className="transition-colors hover:text-foreground"
        >
          RSS
        </Link>
      </div>
    </footer>
  );
}
