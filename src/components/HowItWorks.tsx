"use client";

import styled from "styled-components";

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  { icon: "📦", title: "Choisissez votre formule", desc: "Basic, Premium ou Prestige" },
  { icon: "✨", title: "Personnalisez", desc: "Options et format photo. Prix en temps réel." },
  { icon: "📅", title: "Indiquez votre date", desc: "3 champs seulement. Rapide." },
  { icon: "✉️", title: "Recevez votre devis", desc: "Sous 48h. Prix ferme, sans surprise." },
  { icon: "✅", title: "Confirmez", desc: "Acompte 50% pour bloquer votre date." },
  { icon: "🎉", title: "Jour J", desc: "On arrive, on installe. Vous profitez." },
];

// ─── Styled components ────────────────────────────────────────────────────────

const Section = styled.section`
  background: #0d1b1e;
  color: white;
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
  color: white;
  margin-bottom: 14px;
`;

const SectionSub = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.65;
`;

const StepsTrack = styled.div`
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
    background: linear-gradient(
      90deg,
      var(--color-primary) 0%,
      var(--color-magenta) 100%
    );
    opacity: 0.25;
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
  padding: 0 10px;
  position: relative;

  &:hover .step-num {
    background: var(--color-primary);
    border-color: var(--color-primary);
    transform: scale(1.08);
    box-shadow: 0 0 28px rgba(54, 148, 158, 0.4);
  }

  @media (max-width: 768px) {
    flex-direction: row;
    text-align: left;
    gap: 16px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    align-items: flex-start;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const StepNum = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(54, 148, 158, 0.1);
  border: 2px solid rgba(54, 148, 158, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 18px;
  position: relative;
  z-index: 2;
  transition: all 0.3s;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
    min-width: 52px;
    font-size: 1.15rem;
    margin-bottom: 0;
  }
`;

const StepBody = styled.div``;

const StepTitle = styled.div`
  font-family: var(--font-syne, sans-serif);
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
`;

const StepDesc = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.5;
  margin: 0;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <Section id="comment" aria-label="Comment fonctionne FunkySelfie">
      <SectionHeader>
        <SectionLabel>Comment ça marche</SectionLabel>
        <SectionTitle>Simple. Rapide. Sans stress.</SectionTitle>
        <SectionSub>
          De la réservation au jour J, on vous accompagne à chaque étape.
        </SectionSub>
      </SectionHeader>

      <StepsTrack>
        {steps.map((step) => (
          <Step key={step.title}>
            <StepNum className="step-num">{step.icon}</StepNum>
            <StepBody>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepBody>
          </Step>
        ))}
      </StepsTrack>
    </Section>
  );
}
