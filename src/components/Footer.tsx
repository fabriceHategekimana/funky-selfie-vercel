"use client";

import styled from "styled-components";

const Bottom = styled.footer`
  text-align: center;
  padding: 28px 24px 36px;
  background: var(--dark);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

const Copy = styled.p`
  font-size: 0.73rem;
  color: rgba(255, 255, 255, 0.18);
`;

const Socials = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 4px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    color: var(--teal);
    transform: translateY(-3px);
  }
`;

// URLs réseaux sociaux issues du prototype — à confirmer par Déborah (brief §8.1).
const SOCIALS = {
  instagram: "https://www.instagram.com/funkyselfie.ch",
  tiktok: "https://www.tiktok.com/@funkyselfie",
  linkedin: "https://www.linkedin.com/company/funkyselfie",
};

export default function Footer() {
  return (
    <Bottom className="footer-bottom">
      <Copy>© 2026 FunkySelfie · funkyselfie.ch</Copy>
      <Socials>
        <SocialIcon href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </SocialIcon>
        <SocialIcon href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" title="TikTok" aria-label="TikTok">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
          </svg>
        </SocialIcon>
        <SocialIcon href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </SocialIcon>
      </Socials>
    </Bottom>
  );
}
