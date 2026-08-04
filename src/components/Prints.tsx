"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";

const Section = styled.div`
  background: var(--dark);
  padding: 72px 24px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 56px 18px;
  }
`;

const Header = styled.div`
  max-width: 1100px;
  margin: 0 auto 44px;
  text-align: center;
`;

const Label = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-family: var(--font-syne), sans-serif;
  font-size: clamp(1.6rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  line-height: 1.15;
  color: white;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 6vw, 1.9rem);
  }
`;

const SubText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  margin-top: 10px;
`;

const Carousel = styled.div`
  position: relative;
  max-width: 700px;
  margin: 0 auto;
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Slide = styled.div<{ $active: boolean; $rot: string }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 1s ease;

  img {
    max-height: 360px;
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
    filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.6));
    transform: rotate(${(p) => p.$rot});
  }

  @media (max-width: 768px) {
    img {
      max-height: 270px;
    }
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: 20px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) => (p.$active ? "var(--teal)" : "rgba(255,255,255,0.2)")};
    transition: background 0.3s;
  }
`;

const Cta = styled.div`
  text-align: center;
  margin-top: 36px;
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

const SLIDES = [
  { src: "/images/v9/print-1.jpg", alt: "Groupe photobooth", rot: "-2deg", w: 900, h: 720 },
  { src: "/images/v9/print-2.jpg", alt: "Polaroids party", rot: "1.5deg", w: 900, h: 600 },
  { src: "/images/v9/print-3.jpg", alt: "Photo mariage", rot: "-1deg", w: 900, h: 1200 },
  { src: "/images/v9/print-4.jpg", alt: "Bandes photobooth", rot: "2deg", w: 900, h: 600 },
];

export default function Prints() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>();

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 3200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <Section className="prints-section" ref={ref}>
      <Header className="fade-up">
        <Label>{t.printsLabel}</Label>
        <Title>{t.printsTitle}</Title>
        <SubText>{t.printsSub}</SubText>
      </Header>
      <Carousel className="fade-up">
        {SLIDES.map((s, i) => (
          <Slide key={i} $active={i === current} $rot={s.rot}>
            <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(max-width: 768px) 90vw, 700px" />
          </Slide>
        ))}
      </Carousel>
      <Dots>
        {SLIDES.map((_, i) => (
          <Dot
            key={i}
            $active={i === current}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </Dots>
      <Cta>
        <BtnPrimary href="#formules">{t.reserveBtn}</BtnPrimary>
      </Cta>
    </Section>
  );
}
