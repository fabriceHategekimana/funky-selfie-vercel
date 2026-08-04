"use client";

import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
`;

const Section = styled.section`
  background: var(--grey);
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
  font-weight: 700;
  line-height: 1.2;
  line-height: 1.15;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 6vw, 1.9rem);
  }
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const ImgWrap = styled.div`
  flex: 0 0 420px;
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 420px;
    height: auto;
    filter: drop-shadow(0 20px 50px rgba(74, 171, 170, 0.2));
    animation: ${float} 5s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex: none;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: 768px) {
    gap: 18px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const Icon = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  box-shadow: 0 2px 12px rgba(0, 95, 107, 0.1);
`;

const ItemTitle = styled.div`
  font-family: var(--font-syne), sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 3px;
`;

const ItemDesc = styled.div`
  font-size: 0.82rem;
  color: #6a8284;
  line-height: 1.5;
`;

const ICONS = ["📸", "🖨️", "📱", "☁️"];

export default function Features() {
  const { t } = useLanguage();

  return (
    <Section id="features">
      <Header>
        <Label>{t.featLabel}</Label>
        <Title>{t.featTitle}</Title>
      </Header>
      <Inner>
        <ImgWrap className="fade-up">
          <Image
            src="/images/v9/booth-1.png"
            alt="FunkySelfie photobooth et imprimante"
            width={420}
            height={420}
          />
        </ImgWrap>
        <List>
          {t.features.map((f, i) => (
            <Item key={i} className="fade-up">
              <Icon>{ICONS[i]}</Icon>
              <div>
                <ItemTitle>{f.t}</ItemTitle>
                <ItemDesc>{f.d}</ItemDesc>
              </div>
            </Item>
          ))}
        </List>
      </Inner>
    </Section>
  );
}
