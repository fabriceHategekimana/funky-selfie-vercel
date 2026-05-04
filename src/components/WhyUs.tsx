"use client";

import styled from "styled-components";

// ─── Data ─────────────────────────────────────────────────────────────────────

type BentoCard =
  | { type: "regular"; icon: string; title: string; text: string }
  | { type: "dark" | "accent" | "magenta"; icon: string; title: string; text: string }
  | { type: "stat-accent" | "stat-magenta"; stat: string; statLabel: string };

const cards: BentoCard[] = [
  {
    type: "dark",
    icon: "🚚",
    title: "Zéro effort de votre côté",
    text: "Livraison, installation et reprise.",
  },
  {
    type: "stat-accent",
    stat: "48h",
    statLabel: "Devis garanti",
  },
  {
    type: "regular",
    icon: "🎨",
    title: "Votre image, sur chaque photo",
    text: "Logo, couleurs, cadre personnalisé.",
  },
  {
    type: "regular",
    icon: "📲",
    title: "Partagé en un clic",
    text: "Impression instantanée, QR Code, AirDrop ou email.",
  },
  {
    type: "stat-magenta",
    stat: "100%",
    statLabel: "Sur mesure, de A à Z",
  },
  {
    type: "regular",
    icon: "📍",
    title: "Toute la Suisse",
    text: "Pick-up gratuit à Bienne ou livraison partout en Suisse.",
  },
];

// ─── Styled components ────────────────────────────────────────────────────────

const Section = styled.section`
  background: white;
  padding: 88px 24px;

  @media (max-width: 768px) {
    padding: 60px 18px;
  }
`;

const SectionHeader = styled.div`
  max-width: 1100px;
  margin: 0 auto 52px;

  @media (max-width: 768px) {
    margin-bottom: 36px;
  }
`;

const SectionLabel = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 14px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-dark);
  margin-bottom: 14px;
`;

const SectionSub = styled.p`
  font-size: 1rem;
  color: #5a7274;
  line-height: 1.65;
`;

const BentoGrid = styled.div`
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

const BentoCard = styled.div<{ $variant: string }>`
  background: ${({ $variant }) => {
    if ($variant === "dark") return "#005f6b";
    if ($variant === "stat-accent") return "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)";
    if ($variant === "stat-magenta") return "linear-gradient(135deg, var(--color-magenta) 0%, #7a1a74 100%)";
    return "#f5f7f7";
  }};
  color: ${({ $variant }) =>
    ["dark", "stat-accent", "stat-magenta"].includes($variant) ? "white" : "inherit"};
  border-radius: 18px;
  padding: 26px;
  transition: transform 0.25s, box-shadow 0.25s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 95, 107, 0.09);
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 14px;
  }
`;

const BentoIcon = styled.span`
  font-size: 1.7rem;
  margin-bottom: 12px;
  display: block;
`;

const BentoTitle = styled.div`
  font-family: var(--font-syne, sans-serif);
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 7px;
`;

const BentoText = styled.p`
  font-size: 0.82rem;
  line-height: 1.55;
  opacity: 0.78;
  margin: 0;
`;

const BentoStat = styled.div`
  font-family: var(--font-syne, sans-serif);
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const BentoStatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.75;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyUs() {
  return (
    <Section id="pourquoi" aria-label="Pourquoi choisir FunkySelfie">
      <SectionHeader>
        <SectionLabel>Pourquoi FunkySelfie</SectionLabel>
        <SectionTitle>On s'occupe de tout.</SectionTitle>
        <SectionSub>Ce qui nous différencie des autres.</SectionSub>
      </SectionHeader>

      <BentoGrid>
        {cards.map((card, i) =>
          "stat" in card ? (
            <BentoCard key={i} $variant={card.type}>
              <BentoStat>{card.stat}</BentoStat>
              <BentoStatLabel>{card.statLabel}</BentoStatLabel>
            </BentoCard>
          ) : (
            <BentoCard key={i} $variant={card.type}>
              <BentoIcon>{card.icon}</BentoIcon>
              <BentoTitle>{card.title}</BentoTitle>
              <BentoText>{card.text}</BentoText>
            </BentoCard>
          )
        )}
      </BentoGrid>
    </Section>
  );
}
