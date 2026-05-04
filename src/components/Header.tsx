"use client";

import styled from "styled-components";
import { useState } from "react";

const navLinks = [
  { href: "#pourquoi", label: "Pourquoi nous" },
  { href: "#comment", label: "Comment ça marche" },
  { href: "#configurateur", label: "Formules" },
  { href: "#contact", label: "Contact" },
];

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(54, 148, 158, 0.15);
`;

const NavLogo = styled.a`
  font-family: var(--font-syne, sans-serif);
  font-size: 1.2rem;
  font-weight: 800;
  text-decoration: none;
  display: flex;

  span:first-child {
    color: var(--color-primary);
  }
  span:last-child {
    color: var(--color-magenta);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 28px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--color-text);
  font-size: 0.88rem;
  font-weight: 500;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: var(--color-primary-dark);
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const NavCta = styled.a<{ $magenta?: boolean }>`
  background: ${({ $magenta }) =>
    $magenta ? "var(--color-magenta)" : "var(--color-primary)"};
  color: white;
  padding: 12px 24px;
  border-radius: 100px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ $magenta }) =>
      $magenta ? "#8a2a84" : "var(--color-primary-dark)"};
  }

  @media (max-width: 768px) {
    ${({ $magenta }) =>
      $magenta
        ? "display: none;"
        : "padding: 10px 18px; font-size: 0.85rem; min-height: 44px;"}
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--color-dark);
  font-size: 1.4rem;
  cursor: pointer;
  padding: 8px;
  line-height: 1;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled.ul`
  position: fixed;
  top: 65px;
  left: 0;
  right: 0;
  background: white;
  list-style: none;
  margin: 0;
  padding: 8px 24px 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  z-index: 99;
`;

const MobileMenuLink = styled.a`
  text-decoration: none;
  color: var(--color-dark);
  font-size: 1rem;
  font-weight: 500;
  padding: 14px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: block;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: var(--color-primary);
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Nav>
        <NavLogo href="#accueil">
          <span>FUNKY</span>
          <span>SELFIE</span>
        </NavLogo>

        <NavLinks>
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </NavLinks>

        <NavButtons>
          <NavCta $magenta href="#comment">
            Comment ça marche
          </NavCta>
          <NavCta href="#configurateur">Réserver →</NavCta>
          <MobileMenuBtn
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </MobileMenuBtn>
        </NavButtons>
      </Nav>

      {menuOpen && (
        <MobileMenu>
          {navLinks.map((link) => (
            <li key={link.href}>
              <MobileMenuLink
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </MobileMenuLink>
            </li>
          ))}
        </MobileMenu>
      )}
    </>
  );
}
