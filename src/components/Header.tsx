"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "All Tools", href: "/" },
  { label: "PDF Tools", href: "/#tools" },
  { label: "Convert", href: "/#convert" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-outline-soft/30">
      <nav className="flex items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-1">
          <Link href="/" className="text-xl font-black tracking-tight text-on-surface">
            File<span className="text-primary">Velo</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-on-muted hover:text-on-surface transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right spacer + mobile toggle */}
        <div className="flex-1 flex justify-end">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-on-surface mb-1.5 transition-transform" />
            <div className="w-5 h-0.5 bg-on-surface mb-1.5" />
            <div className="w-5 h-0.5 bg-on-surface transition-transform" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-outline-soft/30 bg-white/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm font-bold text-on-muted hover:text-on-surface transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
