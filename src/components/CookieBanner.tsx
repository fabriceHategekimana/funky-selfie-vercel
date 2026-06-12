"use client";

import styled from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsent } from "@/contexts/ConsentContext";

const Banner = styled.div<{ $hidden: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 300;
  background: var(--dark);
  border-top: 2px solid var(--teal);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  transform: translateY(${(p) => (p.$hidden ? "120%" : "0")});
  transition: transform 0.4s ease;

  @media (max-width: 768px) {
    padding: 16px 18px;
  }
`;

const Text = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  line-height: 1.5;
  flex: 1;
  min-width: 200px;

  a {
    color: var(--teal);
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;

const Accept = styled.button`
  background: var(--teal);
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 100px;
  font-family: var(--font-dm-sans), sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: var(--teal-dark);
  }
`;

const Refuse = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 10px 22px;
  border-radius: 100px;
  font-family: var(--font-dm-sans), sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: white;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export default function CookieBanner() {
  const { t } = useLanguage();
  const { consent, ready, setConsent } = useConsent();

  // Affiché seulement après lecture du localStorage et si aucun choix n'a été fait
  // (le chargement effectif de GA4 est géré par Analytics.tsx).
  const hidden = !ready || consent !== null;

  return (
    <Banner $hidden={hidden} aria-hidden={hidden}>
      <Text dangerouslySetInnerHTML={{ __html: t.cookieText }} />
      <Btns>
        <Refuse onClick={() => setConsent("refused")}>{t.cookieRefuse}</Refuse>
        <Accept onClick={() => setConsent("accepted")}>{t.cookieAccept}</Accept>
      </Btns>
    </Banner>
  );
}
