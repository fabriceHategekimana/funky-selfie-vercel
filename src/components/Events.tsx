"use client";

import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";

const imgTicker = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Section = styled.div`
  background: var(--dark);
  padding: 72px 0 56px;
  overflow: hidden;
`;

const Label = styled.p`
  text-align: center;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 12px;
  padding: 0 24px;
`;

const Title = styled.p`
  text-align: center;
  font-family: var(--font-syne), sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
  color: white;
  margin-bottom: 44px;
  padding: 0 24px;
`;

const TickerWrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Ticker = styled.div<{ $paused: boolean }>`
  display: flex;
  gap: 16px;
  animation: ${imgTicker} 36s linear infinite;
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
  width: max-content;

  &:hover {
    animation-play-state: paused;
  }
`;

const Card = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 260px;
  height: 190px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;

  img {
    object-fit: cover;
    transition: transform 0.5s;
  }
  &:hover {
    transform: scale(1.04);
  }
  &:hover img {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 155px;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 35%, rgba(13, 27, 30, 0.88) 100%);
`;

const CardLabel = styled.div`
  position: absolute;
  bottom: 14px;
  left: 14px;
  right: 14px;
  color: white;
  z-index: 2;
`;

const Tag = styled.div<{ $magenta: boolean }>`
  display: inline-block;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 100px;
  margin-bottom: 4px;
  color: white;
  background: ${(p) => (p.$magenta ? "var(--magenta)" : "var(--teal)")};
`;

const Desc = styled.div`
  font-family: var(--font-syne), sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
`;

const Cta = styled.div`
  text-align: center;
  margin-top: 44px;
  padding: 0 24px;
`;

const BtnPrimary = styled.a`
  background: var(--teal);
  color: white;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  font-size: 1rem;
  min-height: 50px;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: var(--teal-dark);
    box-shadow: 0 8px 28px rgba(74, 171, 170, 0.35);
  }
`;

export default function Events() {
  const { t } = useLanguage();
  const [ref, inView] = useInView<HTMLDivElement>();
  // 9 images uniques ; dupliquées pour une boucle sans couture (translateX -50%).
  const cards = t.eventCards.map((c, i) => ({
    ...c,
    src: `/images/v9/event-${i + 1}.jpg`,
    magenta: i % 2 === 0,
  }));
  const loop = [...cards, ...cards];

  return (
    <Section ref={ref}>
      <Label>{t.eventsLabel}</Label>
      <Title>{t.eventsTitle}</Title>
      <TickerWrap>
        <Ticker $paused={!inView}>
          {loop.map((c, i) => (
            <Card key={i}>
              <Image src={c.src} alt={c.tag} fill sizes="(max-width: 768px) 200px, 260px" loading="lazy" />
              <CardOverlay />
              <CardLabel>
                <Tag $magenta={c.magenta}>{c.tag}</Tag>
                <Desc>{c.desc}</Desc>
              </CardLabel>
            </Card>
          ))}
        </Ticker>
      </TickerWrap>
      <Cta>
        <BtnPrimary href="#formules">{t.reserveBtn}</BtnPrimary>
      </Cta>
    </Section>
  );
}
