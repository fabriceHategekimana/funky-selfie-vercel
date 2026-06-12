"use client";

import { useState } from "react";
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
  max-width: 760px;
  margin: 0 auto 40px;
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
  font-weight: 800;
  line-height: 1.15;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 6vw, 1.9rem);
  }
`;

const List = styled.div`
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const ItemWrap = styled.div`
  border-bottom: 1px solid rgba(74, 171, 170, 0.15);
  overflow: hidden;

  &:first-child {
    border-top: 1px solid rgba(74, 171, 170, 0.15);
  }
`;

const Question = styled.button<{ $open: boolean }>`
  width: 100%;
  background: none;
  border: none;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-syne), sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: ${(p) => (p.$open ? "var(--teal)" : "var(--text)")};
  transition: color 0.2s;
  min-height: 52px;

  &:hover {
    color: var(--teal);
  }

  @media (max-width: 768px) {
    font-size: 0.92rem;
  }
`;

const Chevron = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: 2px solid var(--teal);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  background: ${(p) => (p.$open ? "var(--teal)" : "transparent")};
  color: ${(p) => (p.$open ? "white" : "var(--teal)")};
  transform: rotate(${(p) => (p.$open ? "45deg" : "0")});
`;

const Answer = styled.div<{ $open: boolean }>`
  display: ${(p) => (p.$open ? "block" : "none")};
  font-size: 0.9rem;
  color: #5a7274;
  line-height: 1.7;
  padding: 0 0 20px 0;
`;

export default function Faq() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq">
      <Header>
        <Label>{t.faqLabel}</Label>
        <Title>{t.faqTitle}</Title>
      </Header>
      <List>
        {t.faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <ItemWrap key={i}>
              <Question
                $open={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <Chevron $open={isOpen}>+</Chevron>
              </Question>
              <Answer $open={isOpen}>{item.a}</Answer>
            </ItemWrap>
          );
        })}
      </List>
    </Section>
  );
}
