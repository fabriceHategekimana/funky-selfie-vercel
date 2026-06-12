"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePromo } from "@/contexts/PromoContext";
import type { Lang } from "@/locales/translations";

const Nav = styled.nav<{ $banner: boolean }>`
  position: fixed;
  top: ${(p) => (p.$banner ? "40px" : "0")};
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(74, 171, 170, 0.15);

  @media (max-width: 768px) {
    top: ${(p) => (p.$banner ? "36px" : "0")};
    padding: 12px 18px;
  }
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  img {
    height: 44px;
    width: auto;
    display: block;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 24px;
  list-style: none;

  a {
    text-decoration: none;
    color: var(--text);
    font-size: 0.87rem;
    font-weight: 500;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  a:hover {
    opacity: 1;
    color: var(--teal-dark);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const LangSwitcher = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-right: 12px;

  @media (max-width: 768px) {
    margin-right: 4px;
  }
`;

const LangBtn = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? "rgba(74,171,170,0.1)" : "none")};
  border: 2px solid ${(p) => (p.$active ? "var(--teal)" : "transparent")};
  font-size: 1.4rem;
  line-height: 1;
  padding: 3px 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  opacity: ${(p) => (p.$active ? 1 : 0.55)};
  font-family: var(--font-dm-sans), sans-serif;

  &:hover {
    opacity: ${(p) => (p.$active ? 1 : 0.85)};
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 2px 4px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    .nav-cta-magenta {
      display: none;
    }
  }
`;

const CtaMagenta = styled.a`
  background: var(--magenta);
  color: white;
  padding: 10px 20px;
  border-radius: 100px;
  text-decoration: none;
  font-size: 0.87rem;
  font-weight: 500;
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: #8a2a84;
  }
`;

const Cta = styled.a`
  background: var(--teal);
  color: white;
  padding: 10px 20px;
  border-radius: 100px;
  text-decoration: none;
  font-size: 0.87rem;
  font-weight: 500;
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: var(--teal-dark);
  }

  @media (max-width: 768px) {
    padding: 9px 16px;
    font-size: 0.83rem;
    min-height: 40px;
  }
`;

const Hamburger = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 6px;
  background: none;
  border: none;
  z-index: 110;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: all 0.3s;
  }
  span:nth-child(1) {
    transform: ${(p) => (p.$open ? "rotate(45deg) translate(5px, 5px)" : "none")};
  }
  span:nth-child(2) {
    opacity: ${(p) => (p.$open ? 0 : 1)};
  }
  span:nth-child(3) {
    transform: ${(p) => (p.$open ? "rotate(-45deg) translate(5px, -5px)" : "none")};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: ${(p) => (p.$open ? "flex" : "none")};
  position: fixed;
  inset: 0;
  z-index: 105;
  flex-direction: column;
`;

const MobileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(13, 27, 30, 0.6);
  backdrop-filter: blur(4px);
`;

const MobilePanel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 320px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 100px 32px 40px;
  gap: 8px;
  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.15);
  transform: translateX(${(p) => (p.$open ? "0" : "100%")});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const MobileLangSwitcher = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const MobileLink = styled.a`
  font-family: var(--font-syne), sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 1px solid rgba(74, 171, 170, 0.15);
  transition: color 0.2s;

  &:hover {
    color: var(--teal);
  }
`;

const MobileCta = styled.a<{ $mag?: boolean }>`
  margin-top: ${(p) => (p.$mag ? "8px" : "20px")};
  background: ${(p) => (p.$mag ? "var(--magenta)" : "var(--teal)")};
  color: white;
  padding: 16px;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  display: block;
`;

const LANGS: { code: Lang; flag: string; title: string }[] = [
  { code: "fr", flag: "🇫🇷", title: "Français" },
  { code: "en", flag: "🇬🇧", title: "English" },
  { code: "de", flag: "🇩🇪", title: "Deutsch" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const promo = usePromo();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  const links = [
    { href: "#formules", label: t.navLink1 },
    { href: "#pourquoi", label: t.navLink2 },
    { href: "#comment", label: t.navLink3 },
    { href: "#contact", label: t.navLink4 },
  ];

  return (
    <>
      <Nav $banner={promo.active}>
        <Logo href="#accueil" aria-label="FunkySelfie">
          <Image src="/images/v9/logo.png" alt="FunkySelfie" width={44} height={44} priority />
        </Logo>
        <NavLinks>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </NavLinks>
        <Right>
          <LangSwitcher>
            {LANGS.map((l) => (
              <LangBtn
                key={l.code}
                $active={lang === l.code}
                onClick={() => setLang(l.code)}
                title={l.title}
                aria-label={l.title}
              >
                {l.flag}
              </LangBtn>
            ))}
          </LangSwitcher>
          <NavButtons>
            <CtaMagenta className="nav-cta-magenta" href="#comment">
              {t.commentLabel}
            </CtaMagenta>
            <Cta href="#formules">{t.reserveBtn}</Cta>
          </NavButtons>
          <Hamburger $open={open} onClick={toggleMenu} aria-label="Menu" aria-expanded={open}>
            <span />
            <span />
            <span />
          </Hamburger>
        </Right>
      </Nav>

      <MobileMenu $open={open}>
        <MobileOverlay onClick={closeMenu} />
        <MobilePanel $open={open}>
          <MobileLangSwitcher>
            {LANGS.map((l) => (
              <LangBtn
                key={l.code}
                $active={lang === l.code}
                onClick={() => setLang(l.code)}
                title={l.title}
                aria-label={l.title}
              >
                {l.flag}
              </LangBtn>
            ))}
          </MobileLangSwitcher>
          {links.map((l) => (
            <MobileLink key={l.href} href={l.href} onClick={closeMenu}>
              {l.label}
            </MobileLink>
          ))}
          <MobileCta href="#comment" onClick={closeMenu}>
            {t.commentLabel}
          </MobileCta>
          <MobileCta $mag href="#formules" onClick={closeMenu}>
            {t.reserveBtn}
          </MobileCta>
        </MobilePanel>
      </MobileMenu>
    </>
  );
}
