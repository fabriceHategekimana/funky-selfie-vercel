"use client";

import styled, { keyframes } from "styled-components";
import Image from "next/image";

type HeroCarouselProps = {
  title: string;
  subtitle: string;
  ctaText: string;
};

// ─── Keyframes ───────────────────────────────────────────────────────────────

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scaleX(1); }
  50% { opacity: 0.9; transform: translateX(-50%) scaleX(1.2); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

// ─── Styled components ───────────────────────────────────────────────────────

const HeroSection = styled.section`
  min-height: 100svh;
  background: #0d1b1e;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 100px 40px 60px;

  @media (max-width: 768px) {
    padding: 88px 20px 52px;
    align-items: flex-start;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 70% at 70% 50%, rgba(54, 148, 158, 0.18) 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 20% 80%, rgba(189, 60, 161, 0.15) 0%, transparent 60%);
`;

const HeroGrain = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
    align-items: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    order: 1;
    text-align: center;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(54, 148, 158, 0.15);
  border: 1px solid rgba(54, 148, 158, 0.3);
  color: var(--color-primary);
  border-radius: 100px;
  padding: 8px 18px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 24px;
  letter-spacing: 0.04em;

  &::before {
    content: "●";
    font-size: 0.45rem;
    animation: ${pulse} 2s infinite;
  }
`;

const HeroTitle = styled.h1`
  font-family: var(--font-syne, sans-serif);
  font-size: clamp(2rem, 5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.08;
  color: white;
  margin-bottom: 18px;

  em {
    font-style: normal;
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 7vw, 2.3rem);
    text-align: center;
  }
`;

const HeroSub = styled.p`
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.58);
  line-height: 1.65;
  margin-bottom: 36px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    text-align: center;
    margin-bottom: 28px;
  }
`;

const HeroBtns = styled.div`
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
  transition: background 0.2s, box-shadow 0.2s;
  white-space: nowrap;

  &:hover {
    background: var(--color-primary-dark);
    box-shadow: 0 8px 28px rgba(54, 148, 158, 0.35);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    min-height: 54px;
    font-size: 1rem;
  }
`;

const BtnSecondary = styled.a`
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
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.45);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    min-height: 54px;
    font-size: 1rem;
  }
`;

const HeroTrust = styled.div`
  margin-top: 44px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 28px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 28px;
    padding-top: 22px;
  }
`;

const TrustItem = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 7px;

  span {
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    justify-content: center;
  }
`;

const PhotoboothWrap = styled.div`
  flex: 0 0 380px;
  width: 380px;
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

const Photobooth360 = styled.div`
  width: 320px;
  height: 420px;
  position: relative;
  animation: ${float} 4s ease-in-out infinite;

  img {
    mix-blend-mode: screen;
    filter: brightness(1.08) contrast(1.05);
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 260px;
    margin: 0 auto;
  }

  @media (max-width: 420px) {
    width: 170px;
    height: 220px;
  }
`;

const BoothGlow = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 32px;
  background: radial-gradient(
    ellipse,
    rgba(54, 148, 158, 0.4) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: ${glowPulse} 4s ease-in-out infinite;
`;

// ─── Component ───────────────────────────────────────────────────────────────

export default function HeroCarousel({ title, subtitle, ctaText }: HeroCarouselProps) {
  return (
    <HeroSection id="accueil" aria-label="Section d'accueil">
      <HeroBg />
      <HeroGrain />
      <HeroInner>
        <HeroContent>
          <HeroBadge>Disponible partout en Suisse</HeroBadge>
          <HeroTitle>{title}</HeroTitle>
          <HeroSub>{subtitle}</HeroSub>
          <HeroBtns>
            <BtnPrimary href="#configurateur">{ctaText} →</BtnPrimary>
            <BtnSecondary href="#contact">▶ Nous contacter</BtnSecondary>
          </HeroBtns>
          <HeroTrust>
            <TrustItem><span>✓</span> Devis sous 48h</TrustItem>
            <TrustItem><span>✓</span> Sans engagement</TrustItem>
            <TrustItem><span>✓</span> Pick-up gratuit</TrustItem>
            <TrustItem><span>✓</span> 100% personnalisable</TrustItem>
          </HeroTrust>
        </HeroContent>

        <PhotoboothWrap>
          <Photobooth360>
            <Image
              src="/images/Photobooth-bwood.png"
              alt="Photobooth FunkySelfie"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 200px, 320px"
              priority
            />
          </Photobooth360>
          <BoothGlow />
        </PhotoboothWrap>
      </HeroInner>
    </HeroSection>
  );
}
