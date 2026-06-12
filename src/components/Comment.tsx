"use client";

import Image from "next/image";
import styled from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";

const Wrap = styled.div`
  position: relative;
  color: white;
  overflow: hidden;
`;

const BgPhoto = styled.div`
  position: absolute;
  inset: 0;

  img {
    object-fit: cover;
    object-position: center 30%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(13, 27, 30, 0.87);
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  padding: 80px 24px;

  @media (max-width: 768px) {
    padding: 56px 18px;
  }
`;

const Header = styled.div`
  max-width: 1100px;
  margin: 0 auto 48px;
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
  font-weight: 800;
  line-height: 1.15;
  color: white;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 6vw, 1.9rem);
  }
`;

const Sub = styled.p`
  font-size: 0.97rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.65;
  margin-bottom: 0;
`;

const Track = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 35px;
    left: 8%;
    right: 8%;
    height: 2px;
    background: linear-gradient(90deg, var(--teal) 0%, var(--magenta) 100%);
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    &::before {
      display: none;
    }
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 8px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: row;
    text-align: left;
    gap: 14px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    align-items: flex-start;
  }
`;

const Num = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(74, 171, 170, 0.12);
  border: 2px solid rgba(74, 171, 170, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  margin-bottom: 16px;
  position: relative;
  z-index: 2;
  transition: all 0.3s;

  ${Step}:hover & {
    background: var(--teal);
    border-color: var(--teal);
    transform: scale(1.08);
    box-shadow: 0 0 28px rgba(74, 171, 170, 0.4);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    min-width: 50px;
    font-size: 1.1rem;
    margin-bottom: 0;
  }
`;

const StepTitle = styled.div`
  font-family: var(--font-syne), sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
`;

const StepDesc = styled.p`
  font-size: 0.73rem;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.5;
`;

const ICONS = ["📦", "✨", "📅", "✉️", "✅", "🎉"];

export default function Comment() {
  const { t } = useLanguage();
  const steps = [
    { t: t.s1t, d: t.s1d },
    { t: t.s2t, d: t.s2d },
    { t: t.s3t, d: t.s3d },
    { t: t.s4t, d: t.s4d },
    { t: t.s5t, d: t.s5d },
    { t: t.s6t, d: t.s6d },
  ];

  return (
    <Wrap id="comment">
      <BgPhoto>
        <Image src="/images/v9/comment-bg.jpg" alt="" fill sizes="100vw" />
      </BgPhoto>
      <Overlay />
      <Inner>
        <Header>
          <Label>{t.commentLabel}</Label>
          <Title>{t.commentTitle}</Title>
          <Sub>{t.commentSub}</Sub>
        </Header>
        <Track>
          {steps.map((s, i) => (
            <Step key={i} className="fade-up">
              <Num>{ICONS[i]}</Num>
              <div>
                <StepTitle>{s.t}</StepTitle>
                <StepDesc>{s.d}</StepDesc>
              </div>
            </Step>
          ))}
        </Track>
      </Inner>
    </Wrap>
  );
}
