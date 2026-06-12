"use client";

import styled from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";

const Section = styled.section`
  background: var(--white);
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
  color: var(--text);

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 6vw, 1.9rem);
  }
`;

const Bento = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 14px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div<{ $variant?: "dark" | "accent" | "magenta" }>`
  border-radius: 18px;
  padding: 24px;
  transition: transform 0.25s, box-shadow 0.25s;
  background: ${(p) =>
    p.$variant === "accent"
      ? "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)"
      : p.$variant === "magenta"
        ? "linear-gradient(135deg, var(--magenta) 0%, #7a1a74 100%)"
        : p.$variant === "dark"
          ? "var(--teal-dark)"
          : "var(--grey)"};
  color: ${(p) => (p.$variant ? "white" : "inherit")};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 95, 107, 0.09);
  }

  @media (max-width: 768px) {
    padding: 18px;
    border-radius: 14px;
  }
`;

const Ico = styled.span`
  font-size: 1.6rem;
  margin-bottom: 10px;
  display: block;
`;

const CardTitle = styled.div`
  font-family: var(--font-syne), sans-serif;
  font-size: 0.93rem;
  font-weight: 700;
  margin-bottom: 6px;
`;

const CardText = styled.p`
  font-size: 0.8rem;
  line-height: 1.55;
  opacity: 0.78;
`;

const Stat = styled.div`
  font-family: var(--font-syne), sans-serif;
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.78rem;
  opacity: 0.75;
`;

export default function Pourquoi() {
  const { t } = useLanguage();

  return (
    <Section id="pourquoi">
      <Header>
        <Label>{t.pourquoiLabel}</Label>
        <Title>{t.pourquoiTitle}</Title>
      </Header>
      <Bento>
        <Card className="fade-up" $variant="dark">
          <Ico>🚚</Ico>
          <CardTitle>{t.b1t}</CardTitle>
          <CardText>{t.b1d}</CardText>
        </Card>
        <Card className="fade-up" $variant="accent">
          <Stat>48h</Stat>
          <StatLabel>{t.b2}</StatLabel>
        </Card>
        <Card className="fade-up">
          <Ico>🎨</Ico>
          <CardTitle>{t.b3t}</CardTitle>
          <CardText>{t.b3d}</CardText>
        </Card>
        <Card className="fade-up">
          <Ico>📲</Ico>
          <CardTitle>{t.b4t}</CardTitle>
          <CardText>{t.b4d}</CardText>
        </Card>
        <Card className="fade-up" $variant="magenta">
          <Stat>100%</Stat>
          <StatLabel>{t.b5}</StatLabel>
        </Card>
        <Card className="fade-up">
          <Ico>📍</Ico>
          <CardTitle>{t.b6t}</CardTitle>
          <CardText>{t.b6d}</CardText>
        </Card>
      </Bento>
    </Section>
  );
}
