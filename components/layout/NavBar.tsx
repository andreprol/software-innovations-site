"use client";

import Link from "next/link";
import { useState } from "react";
import { company } from "@/lib/content/company";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="h-0.5 w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400" />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-lg font-bold tracking-tight text-transparent"
        >
          {company.tradeName}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-zinc-700 transition-colors hover:text-purple-600 dark:text-zinc-300 dark:hover:text-cyan-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded-full bg-zinc-800 transition-transform dark:bg-zinc-200 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-zinc-800 transition-opacity dark:bg-zinc-200 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-zinc-800 transition-transform dark:bg-zinc-200 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {isMenuOpen && (
        <ul
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-zinc-200 px-6 py-4 md:hidden dark:border-zinc-800"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
