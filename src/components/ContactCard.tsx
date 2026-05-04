"use client";

import styled from "styled-components";

type ContactCardProps = {
  title: string;
  subtitle: string;
  email: string;
  note: string;
};

// ─── Styled components ───────────────────────────────────────────────────────

const ContactSection = styled.section`
  background: #f5f7f7;
  text-align: center;
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
  margin-bottom: 10px;
`;

const SectionSub = styled.p`
  font-size: 1rem;
  color: #5a7274;
  line-height: 1.65;
  margin: 0 auto;
`;

const CardWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 18px;
`;

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  background: white;
  border-radius: 22px;
  padding: 44px 52px;
  box-shadow: 0 8px 40px rgba(0, 95, 107, 0.08);
  max-width: 440px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 32px 20px;
    max-width: 100%;
  }
`;

const Emoji = styled.span`
  font-size: 1.8rem;
`;

const ContactEmail = styled.a`
  font-family: var(--font-syne, sans-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  text-decoration: none;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 3px;

  &:hover {
    color: var(--color-primary);
  }
`;

const ContactNote = styled.p`
  font-size: 0.82rem;
  color: #8aa0a2;
  margin: 0;
`;

const BtnPrimary = styled.a`
  background: var(--color-primary);
  color: white;
  padding: 15px 30px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  width: 100%;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: var(--color-primary-dark);
    box-shadow: 0 8px 28px rgba(54, 148, 158, 0.35);
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export default function ContactCard({ title, subtitle, email, note }: ContactCardProps) {
  return (
    <ContactSection id="contact" aria-label="Contact FunkySelfie">
      <SectionHeader>
        <SectionLabel>Une question ?</SectionLabel>
        <SectionTitle>{title}</SectionTitle>
        <SectionSub>{subtitle}</SectionSub>
      </SectionHeader>

      <CardWrap>
        <Card>
          <Emoji>✉️</Emoji>
          <ContactEmail href={`mailto:${email}`}>{email}</ContactEmail>
          <ContactNote>{note}</ContactNote>
          <BtnPrimary href={`mailto:${email}`}>Envoyer un message</BtnPrimary>
        </Card>
      </CardWrap>
    </ContactSection>
  );
}
