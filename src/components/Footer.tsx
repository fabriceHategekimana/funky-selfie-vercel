"use client";

import styled, { keyframes } from "styled-components";

// ─── Keyframes ───────────────────────────────────────────────────────────────

const tickerAnim = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

// ─── Styled components ───────────────────────────────────────────────────────

const FooterEvents = styled.div`
  background: #0d1b1e;
  padding: 80px 0 60px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 0 40px;
  }
`;

const FooterEventsLabel = styled.p`
  text-align: center;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 40px;
  padding: 0 24px;
`;

const TickerWrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Ticker = styled.div`
  display: flex;
  animation: ${tickerAnim} 24s linear infinite;
  width: max-content;
`;

const TickerItem = styled.span<{ $highlight?: boolean }>`
  padding: 0 28px;
  white-space: nowrap;
  font-family: var(--font-syne, sans-serif);
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  color: ${({ $highlight }) =>
    $highlight ? "var(--color-primary)" : "rgba(255,255,255,0.13)"};

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0 18px;
  }
`;

const TickerDot = styled.span`
  color: var(--color-magenta);
  font-size: 0.5rem;
  vertical-align: middle;
  padding: 0 4px;
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 32px 24px 40px;
  background: #0d1b1e;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FooterBtns = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0 18px;
  }
`;

const FooterBtnPrimary = styled.a`
  background: var(--color-primary);
  color: white;
  padding: 15px 30px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 52px;
  transition: background 0.2s;

  &:hover {
    background: var(--color-primary-dark);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const FooterBtnSecondary = styled.a`
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 15px 30px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 400;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 52px;
  backdrop-filter: blur(8px);
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.45);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const FooterCopy = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.18);
`;

// ─── Ticker content (duplicated for seamless loop) ───────────────────────────

const tickerItems = [
  { label: "Corporate", highlight: true },
  { label: "Mariage", highlight: false },
  { label: "Team Building", highlight: true },
  { label: "Anniversaire", highlight: false },
  { label: "Soirée Annuelle", highlight: true },
  { label: "Fête Privée", highlight: false },
  { label: "Salon Professionnel", highlight: true },
  { label: "Célébration", highlight: false },
  { label: "Lancement Produit", highlight: true },
  { label: "Séminaire", highlight: false },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer>
      <FooterEvents>
        <FooterEventsLabel>Pour tous vos événements</FooterEventsLabel>
        <TickerWrap>
          <Ticker aria-hidden="true">
            {/* Duplicated for seamless infinite loop */}
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i}>
                <TickerItem $highlight={item.highlight}>{item.label}</TickerItem>
                <TickerDot>✦</TickerDot>
              </span>
            ))}
          </Ticker>
        </TickerWrap>
      </FooterEvents>

      <FooterBottom>
        <FooterBtns>
          <FooterBtnPrimary href="#configurateur">Voir les formules →</FooterBtnPrimary>
          <FooterBtnSecondary href="mailto:hello@funkyselfie.ch">
            ✉ hello@funkyselfie.ch
          </FooterBtnSecondary>
        </FooterBtns>
        <FooterCopy>© 2026 FunkySelfie · funkyselfie.ch</FooterCopy>
      </FooterBottom>
    </footer>
  );
}
