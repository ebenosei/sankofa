"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-serif text-xl tracking-[0.2em] font-semibold text-text-primary group-hover:text-accent transition-colors">
            MEDEA
          </span>
          <span className="text-[10px] tracking-[0.15em] text-text-tertiary italic -mt-0.5">
            me dea
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-accent transition-colors"
          >
            Discover
          </Link>
          <Link
            href="/tattoo"
            className="text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-accent transition-colors"
          >
            Tattoo Ideas
          </Link>
          <Link
            href="/customize"
            className="text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-accent transition-colors"
          >
            Customize
          </Link>
        </nav>
      </div>
    </header>
  );
}
