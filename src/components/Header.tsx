"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#configurateur", label: "Nos Formules" },
  { href: "#services", label: "Services" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#faq", label: "FAQ" },
  { href: "#configurateur", label: "Réserver" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-dark shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        <Link href="/" aria-label="FunkySelfie - Accueil">
          <Image
            src="/images/logo.png"
            alt="FunkySelfie - Location de Photobooth Corporate en Suisse"
            width={300}
            height={100}
            className="w-[200px] md:w-[300px] h-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`no-underline font-medium transition-colors duration-300 ${
                  link.label === "Réserver"
                    ? "bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-dark"
                    : "text-dark hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden bg-transparent border-none text-dark text-2xl cursor-pointer p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden flex flex-col list-none bg-white px-4 py-4 shadow-lg"
        >
          {navLinks.map((link) => (
            <li key={link.label} className="py-2">
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-dark no-underline font-medium transition-colors duration-300 hover:text-primary block"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
