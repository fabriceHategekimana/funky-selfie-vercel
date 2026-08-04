"use client";

import styled from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";

const Section = styled.section`
  background: var(--white);
  text-align: center;
  padding: 80px 24px;

  @media (max-width: 768px) {
    padding: 56px 18px;
  }
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
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 6vw, 1.9rem);
  }
`;

const Sub = styled.p`
  font-size: 0.97rem;
  color: #5a7274;
  line-height: 1.65;
  margin: 0 auto 36px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 18px;
`;

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: var(--grey);
  border-radius: 22px;
  padding: 40px 48px;
  box-shadow: 0 8px 40px rgba(0, 95, 107, 0.08);
  max-width: 440px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 28px 18px;
    max-width: 100%;
  }
`;

const Emoji = styled.span`
  font-size: 1.8rem;
`;

const Email = styled.a`
  font-family: var(--font-syne), sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--teal-dark);
  text-decoration: none;
  border-bottom: 2px solid var(--teal);
  padding-bottom: 3px;
`;

const Note = styled.p`
  font-size: 0.8rem;
  color: #8aa0a2;
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
  justify-content: center;
  gap: 8px;
  min-height: 50px;
  width: 100%;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: var(--teal-dark);
    box-shadow: 0 8px 28px rgba(74, 171, 170, 0.35);
  }
`;

const EMAIL = "hello@funkyselfie.ch";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact">
      <Label>{t.contactLabel}</Label>
      <Title>{t.contactTitle}</Title>
      <Sub>{t.contactSub}</Sub>
      <Wrap>
        <Card className="fade-up">
          <Emoji>✉️</Emoji>
          <Email href={`mailto:${EMAIL}`}>{EMAIL}</Email>
          <Note>{t.contactNote}</Note>
          <BtnPrimary href={`mailto:${EMAIL}`}>{t.contactBtn}</BtnPrimary>
        </Card>
      </Wrap>
    </Section>
  );
}
