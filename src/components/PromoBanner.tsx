"use client";

import { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePromo } from "@/contexts/PromoContext";

const promoscroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Banner = styled.div`
  background: var(--promo);
  color: white;
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  overflow: hidden;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    height: 36px;
  }
`;

const Ticker = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${promoscroll} 18s linear infinite;
  width: max-content;
`;

const Msg = styled.span`
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0 60px;
`;

const Sep = styled.span`
  color: rgba(255, 255, 255, 0.5);
  padding: 0 8px;
`;

export default function PromoBanner() {
  const { t } = useLanguage();
  const promo = usePromo();

  // Bannière masquée tant que la promo n'est pas active.
  if (!promo.active) return null;

  const text = t.promoBanner.replace("{pct}", String(promo.percentage));

  // 6 répétitions identiques → boucle sans couture avec translateX(-50%).
  return (
    <Banner>
      <Ticker>
        {Array.from({ length: 6 }).map((_, i) => (
          <Fragment key={i}>
            <Msg>{text}</Msg>
            <Sep>✦</Sep>
          </Fragment>
        ))}
      </Ticker>
    </Banner>
  );
}
