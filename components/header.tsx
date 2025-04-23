"use client";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="border border-b border-gray-100 bg-white">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 h-12">
        <Link className="font-bold text-lg" href="/">
          이언상 개발블로그
        </Link>
        <nav className="ml-auto text-sm font-medium space-x-6">
          <Link href="/">Home</Link>
          <Link
            target="_blank"
            href="https://docs.google.com/document/d/1BJiiVS4Hll_-LcrP00itEPT1qVnNknn05ntOcS6uki8/edit?usp=sharing"
          >
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
};
