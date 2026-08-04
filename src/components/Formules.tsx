"use client";

import { useState } from "react";
import styled from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePromo } from "@/contexts/PromoContext";
import { applyPromo } from "@/lib/promo";
import { configTranslations } from "@/locales/configTranslations";
import ConfiguratorPanel from "./ConfiguratorPanel";

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
  color: var(--text);
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 6vw, 1.9rem);
  }
`;

const Sub = styled.p<{ $promo: boolean }>`
  font-size: 0.97rem;
  line-height: 1.65;
  margin-bottom: 0;
  color: ${(p) => (p.$promo ? "var(--promo)" : "#5a7274")};
  font-weight: ${(p) => (p.$promo ? 700 : 400)};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const Card = styled.div<{ $featured?: boolean; $selected?: boolean }>`
  background: ${(p) => (p.$featured ? "linear-gradient(160deg, #f0fafa 0%, white 100%)" : "white")};
  border-radius: 20px;
  padding: 30px 24px;
  border: 2px solid ${(p) => (p.$featured || p.$selected ? "var(--teal)" : "transparent")};
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--teal);
    transform: scaleX(${(p) => (p.$featured || p.$selected ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.3s;
  }

  &:hover {
    border-color: var(--teal);
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(74, 171, 170, 0.14);
  }
  &:hover::before {
    transform: scaleX(1);
  }
`;

const FeaturedTag = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  background: var(--magenta);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 11px;
  border-radius: 100px;
`;

const From = styled.div`
  font-size: 0.73rem;
  color: #8aa0a2;
  margin-bottom: 2px;
`;

const PriceBlock = styled.div`
  margin-bottom: 4px;
`;

const PriceOriginal = styled.div`
  font-size: 1rem;
  color: #bbb;
  text-decoration: line-through;
  font-family: var(--font-syne), sans-serif;
  font-weight: 700;
`;

const PricePromo = styled.div`
  font-family: var(--font-syne), sans-serif;
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--promo);
  line-height: 1;

  sup {
    font-size: 0.9rem;
    font-weight: 500;
    vertical-align: super;
  }
`;

const PricePlain = styled.div`
  font-family: var(--font-syne), sans-serif;
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1;

  sup {
    font-size: 0.9rem;
    font-weight: 500;
    vertical-align: super;
  }
`;

const BadgeSmall = styled.span`
  display: inline-block;
  background: var(--promo);
  color: white;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 100px;
  margin-left: 6px;
  vertical-align: middle;
`;

const Name = styled.div`
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--teal-dark);
  margin-bottom: 6px;
`;

const Tagline = styled.p`
  font-size: 0.86rem;
  color: #5a7274;
  margin: 10px 0 18px;
  line-height: 1.5;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  flex: 1;

  li {
    font-size: 0.84rem;
    color: var(--text);
    display: flex;
    align-items: flex-start;
    gap: 9px;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
  li::before {
    content: "✓";
    color: var(--teal);
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

const ChooseBtn = styled.button<{ $outline?: boolean }>`
  width: 100%;
  padding: 15px;
  background: ${(p) => (p.$outline ? "transparent" : "var(--teal)")};
  color: ${(p) => (p.$outline ? "var(--teal)" : "white")};
  border: ${(p) => (p.$outline ? "2px solid var(--teal)" : "2px solid var(--teal)")};
  border-radius: 14px;
  font-family: var(--font-dm-sans), sans-serif;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 50px;

  &:hover {
    background: var(--teal);
    color: white;
  }
`;

const Note = styled.p`
  text-align: center;
  margin-top: 24px;
  color: #8aa0a2;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0 8px;
  }
`;

const PLANS = [
  { id: "basic", base: 499, featured: false },
  { id: "premium", base: 799, featured: true },
  { id: "prestige", base: 1500, featured: false },
] as const;

export default function Formules() {
  const { t, lang } = useLanguage();
  const promo = usePromo();
  const c = configTranslations[lang];
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);

  const names = [t.basicName, t.premiumName, t.prestigeName];
  const taglines = [t.basicTag, t.premiumTag, t.prestigeTag];

  const choose = (id: string) => {
    setSelectedPkg(id);
    // Laisse le configurateur se monter avant de défiler.
    setTimeout(() => {
      document.getElementById("configurateur")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <Section id="formules">
      <Header>
        <Label>{t.formulesLabel}</Label>
        <Title>{t.formulesTitle}</Title>
        <Sub $promo={promo.active}>
          {promo.active
            ? t.formulesPromo.replace("{pct}", String(promo.percentage))
            : t.formulesSub}
        </Sub>
      </Header>
      <Grid>
        {PLANS.map((plan, i) => {
          const selected = selectedPkg === plan.id;
          const now = applyPromo(plan.base, promo);
          return (
            <Card key={plan.id} className="fade-up" $featured={plan.featured} $selected={selected}>
              {plan.featured && <FeaturedTag>{t.formulePop}</FeaturedTag>}
              <From>{t.formuleFrom}</From>
              <PriceBlock>
                {promo.active ? (
                  <>
                    <PriceOriginal>CHF {plan.base}</PriceOriginal>
                    <PricePromo>
                      <sup>CHF </sup>
                      {now} <BadgeSmall>-{promo.percentage}%</BadgeSmall>
                    </PricePromo>
                  </>
                ) : (
                  <PricePlain>
                    <sup>CHF </sup>
                    {plan.base}
                  </PricePlain>
                )}
              </PriceBlock>
              <Name>{names[i]}</Name>
              <Tagline>{taglines[i]}</Tagline>
              <FeatureList>
                {c.planFeatures[plan.id].map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </FeatureList>
              <ChooseBtn type="button" onClick={() => choose(plan.id)} $outline={!plan.featured && !selected}>
                {selected ? `✓ ${t.chooseBtn}` : t.chooseBtn}
              </ChooseBtn>
            </Card>
          );
        })}
      </Grid>
      <Note>
        Déplacement CHF 1.00/km A/R depuis Bienne · Options supplémentaires dans le configurateur
      </Note>

      {selectedPkg && <ConfiguratorPanel selectedId={selectedPkg} promo={promo} />}
    </Section>
  );
}
