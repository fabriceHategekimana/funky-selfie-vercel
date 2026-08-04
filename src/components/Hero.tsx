"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";

const subtleZoom = keyframes`
  0% { transform: scale(1.03); }
  100% { transform: scale(1.07) translateX(-1%); }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
`;
const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scaleX(1); }
  50% { opacity: 0.95; transform: translateX(-50%) scaleX(1.25); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const Section = styled.section`
  min-height: 100svh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 145px 40px 60px;

  @media (max-width: 768px) {
    padding: 116px 20px 40px;
  }
`;

const BgPhoto = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  animation: ${subtleZoom} 20s ease-in-out infinite alternate;

  img {
    object-fit: cover;
    object-position: center 40%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    110deg,
    rgba(13, 27, 30, 0.9) 0%,
    rgba(13, 27, 30, 0.58) 50%,
    rgba(13, 27, 30, 0.8) 100%
  );
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

  /* Grain à 3% d'opacité : invisible sur petit écran, coûteux à rastériser. */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    order: 1;
    text-align: center;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(74, 171, 170, 0.15);
  border: 1px solid rgba(74, 171, 170, 0.3);
  color: var(--teal);
  border-radius: 100px;
  padding: 8px 18px;
  font-size: 0.78rem;
  font-weight: 500;
  margin-bottom: 22px;
  letter-spacing: 0.04em;

  &::before {
    content: "●";
    font-size: 0.45rem;
    animation: ${pulse} 2s infinite;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Title = styled.h1`
  font-family: var(--font-syne), sans-serif;
  font-size: clamp(1.9rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--white);
  margin-bottom: 18px;
  text-align: left;

  em {
    font-style: normal;
    color: var(--teal);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.7rem, 7vw, 2.2rem);
    text-align: center;
    margin-bottom: 14px;
  }
`;

const Sub = styled.p`
  font-size: clamp(0.92rem, 2vw, 1.05rem);
  color: rgba(255, 255, 255, 0.62);
  line-height: 1.65;
  margin-bottom: 32px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 0.92rem;
    text-align: center;
    margin-bottom: 18px;
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const BtnPrimary = styled.a`
  background: var(--teal);
  color: white;
  padding: 14px 28px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 50px;
  transition: background 0.2s, box-shadow 0.2s;
  white-space: nowrap;

  &:hover {
    background: var(--teal-dark);
    box-shadow: 0 8px 28px rgba(74, 171, 170, 0.35);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    min-height: 52px;
  }
`;

const BtnSecondary = styled.a`
  background: var(--magenta);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 50px;
  transition: background 0.2s, box-shadow 0.2s;
  white-space: nowrap;

  &:hover {
    background: #8a2a84;
    box-shadow: 0 8px 28px rgba(176, 63, 170, 0.35);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    min-height: 52px;
  }
`;

const Trust = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 24px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 16px;
    padding-top: 14px;
  }
`;

const TrustItem = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 7px;

  span {
    color: var(--teal);
  }

  @media (max-width: 768px) {
    font-size: 0.78rem;
    justify-content: center;
  }
`;

const BoothWrap = styled.div`
  flex: 0 0 420px;
  width: 420px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
    flex: none;
  }
`;

const Booth360 = styled.div`
  width: 380px;
  height: 500px;
  position: relative;
  animation: ${float} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 180px;
    height: 238px;
    margin: 0 auto;
  }

  @media (max-width: 420px) {
    width: 150px;
    height: 198px;
  }
`;

const BoothImg = styled(Image)<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: screen;
  filter: brightness(1.15) contrast(1.1) saturate(1.1);
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const BOOTH_SIZES = "(max-width: 420px) 150px, (max-width: 768px) 180px, 380px";

const Glow = styled.div`
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 36px;
  background: radial-gradient(ellipse, rgba(74, 171, 170, 0.45) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${glowPulse} 4s ease-in-out infinite;
`;

const BOOTHS = ["booth-1.png", "booth-2.png", "booth-3.png", "booth-4.png"];
const BOOTH_ORDER = [0, 3, 1, 2];

export default function Hero() {
  const { t } = useLanguage();
  const [pos, setPos] = useState(0);
  // Rotation désactivée sur mobile : évite 4 calques mix-blend-mode superposés
  // en compositing permanent et le téléchargement des 3 images inutilisées.
  // Défaut à false (comme le reste du repo, cf. LanguageProvider) pour éviter
  // un mismatch d'hydratation ; corrigé côté client juste après le montage.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    // Hydratation depuis le store externe (matchMedia) au montage — exception légitime.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const id = setInterval(() => setPos((p) => (p + 1) % BOOTH_ORDER.length), 2000);
    return () => clearInterval(id);
  }, [isMobile]);

  const activeImg = isMobile ? 0 : BOOTH_ORDER[pos];
  const booths = isMobile ? BOOTHS.slice(0, 1) : BOOTHS;
  const trust = [t.trust1, t.trust2, t.trust3, t.trust4];

  return (
    <Section id="accueil">
      <BgPhoto>
        <Image src="/images/v9/hero-bg.jpg" alt="" fill priority sizes="100vw" />
      </BgPhoto>
      <Overlay />
      <Grain />
      <Inner>
        <Content>
          <Badge>{t.heroBadge}</Badge>
          <Title dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
          <Sub>{t.heroSub}</Sub>
          <Btns>
            <BtnPrimary href="#formules">{t.heroBtn1}</BtnPrimary>
            <BtnSecondary href="#comment">{t.heroBtn2}</BtnSecondary>
          </Btns>
          <Trust>
            {trust.map((item, i) => (
              <TrustItem key={i}>
                <span>✓</span> {item}
              </TrustItem>
            ))}
          </Trust>
        </Content>
        <BoothWrap>
          <Booth360>
            {booths.map((name, i) => (
              <BoothImg
                key={name}
                src={`/images/v9/${name}`}
                alt="FunkySelfie Photobooth"
                width={380}
                height={500}
                sizes={BOOTH_SIZES}
                priority={i === 0}
                $active={i === activeImg}
              />
            ))}
          </Booth360>
          <Glow />
        </BoothWrap>
      </Inner>
    </Section>
  );
}
