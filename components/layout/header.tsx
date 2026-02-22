"use client";

import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl" role="img" aria-label="Sankofa bird">
            &#x1F426;
          </span>
          <span className="text-lg font-semibold text-accent group-hover:text-accent-hover transition-colors">
            {APP_NAME}
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Discover
          </Link>
          <Link
            href="/customize"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Customize
          </Link>
        </nav>
      </div>
    </header>
  );
}
