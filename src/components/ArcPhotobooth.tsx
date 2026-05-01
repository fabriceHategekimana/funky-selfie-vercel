"use client";
import Image from "next/image";
import styled from "styled-components";

const Styled = styled.div`
  .section {
    background: white;
    padding: 70px 40px;
    text-align: center;
    overflow: hidden;
  }

  .section-label {
    font-size: 11px;
    font-weight: bold;
    color: #B03FAA;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .section-title {
    font-size: 28px;
    font-weight: bold;
    color: #1A1A2E;
    margin-bottom: 6px;
  }

  .section-sub {
    font-size: 14px;
    color: #aaa;
    margin-bottom: 50px;
  }

  /* ── Arc container ── */
  .arc-wrapper {
    position: relative;
    width: 760px;
    height: 360px;
    margin: 0 auto 50px;
  }

  /* Arc pointillé */
  .arc-svg {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
  }

  /* ── Centre : photobooth ── */
  .center-photo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    width: 140px;
    height: 180px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(74,171,170,0.25);
    border: 3px solid #E0F7FA;
    animation: slowSpin 18s linear infinite;
    cursor: pointer;
  }

  .center-photo:hover {
    animation-play-state: paused;
  }

  .center-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes slowSpin {
    0%   { transform: translate(-50%, -30%) rotateY(0deg); }
    50%  { transform: translate(-50%, -30%) rotateY(180deg); }
    100% { transform: translate(-50%, -30%) rotateY(360deg); }
  }

  /* Glow autour */
  .center-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    width: 160px;
    height: 200px;
    border-radius: 20px;
    background: radial-gradient(circle, rgba(74,171,170,0.15), transparent 70%);
    pointer-events: none;
  }

  /* ── Bulles ── */
  .bubble-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    transform: translate(-50%, -50%);
    cursor: default;
  }

  .bubble-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    border: 2.5px solid #4AABAA;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    transition: all 0.25s;
    box-shadow: 0 4px 16px rgba(74,171,170,0.15);
  }

  .bubble-circle.mag {
    border-color: #B03FAA;
    box-shadow: 0 4px 16px rgba(176,63,170,0.15);
  }

  .bubble-item:hover .bubble-circle {
    background: #4AABAA;
    transform: scale(1.12);
    box-shadow: 0 8px 24px rgba(74,171,170,0.4);
  }

  .bubble-item:hover .bubble-circle.mag {
    background: #B03FAA;
    box-shadow: 0 8px 24px rgba(176,63,170,0.4);
  }

  .bubble-item:hover .bnum { color: white !important; }

  .bnum {
    font-size: 9px;
    font-weight: bold;
    color: #0097A7;
    line-height: 1;
  }

  .bubble-circle.mag .bnum { color: #B03FAA; }

  .bicon { font-size: 20px; line-height: 1.1; }

  .btitle {
    font-size: 11px;
    font-weight: bold;
    color: #1A1A2E;
    text-align: center;
    line-height: 1.4;
    max-width: 90px;
  }

  .btext {
    font-size: 10px;
    color: #aaa;
    text-align: center;
    line-height: 1.4;
    max-width: 90px;
    margin-top: 3px;
  }

  /* Positions arc — demi-cercle 760px large, hauteur 320px */
  /* Rayon X=330, Rayon Y=300, Centre x=380, y=340 */
  /* Angles de 200° à 340° (partie haute du cercle) */
  .b1 { left: 65px;  top: 200px; }
  .b2 { left: 180px; top: 68px;  }
  .b3 { left: 330px; top: 15px;  }
  .b4 { left: 430px; top: 15px;  }
  .b5 { left: 580px; top: 68px;  }
  .b6 { left: 695px; top: 200px; }

  /* ── Numéro connecteur ── */
  .connector {
    position: absolute;
    font-size: 10px;
    color: #ccc;
    pointer-events: none;
  }

  /* ── Tooltip au hover ── */
  .bubble-item .tooltip {
    display: none;
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: #1A1A2E;
    color: white;
    font-size: 10px;
    padding: 6px 10px;
    border-radius: 8px;
    white-space: nowrap;
    z-index: 10;
  }

  .bubble-item:hover .tooltip { display: block; }

  /* ── CTA ── */
  .cta-section { margin-top: 10px; }

  .cta-btn {
    display: inline-block;
    background: #4AABAA;
    color: white;
    font-size: 15px;
    font-weight: bold;
    padding: 14px 40px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .cta-btn:hover { background: #005F6B; transform: translateY(-2px); }

  .cta-note {
    font-size: 12px;
    color: #bbb;
    margin-top: 10px;
  }

  /* Hover pause hint */
  .pause-hint {
    font-size: 11px;
    color: #ccc;
    margin-top: -30px;
    margin-bottom: 20px;
    font-style: italic;
  }

  /* ── Mobile : liste verticale ── */
  .steps-mobile {
    display: none;
  }

  @media (max-width: 768px) {
    .section {
      padding: 50px 20px;
    }

    .arc-wrapper {
      display: none;
    }

    .pause-hint {
      display: none;
    }

    .steps-mobile {
      display: block;
      margin-bottom: 30px;
    }

    .mobile-photo {
      width: 90px;
      height: 116px;
      border-radius: 16px;
      overflow: hidden;
      margin: 0 auto 28px;
      box-shadow: 0 16px 48px rgba(74,171,170,0.25);
      border: 3px solid #E0F7FA;
      position: relative;
    }

    .step-row {
      display: flex;
      align-items: center;
      gap: 16px;
      text-align: left;
      margin-bottom: 12px;
      background: #f9fdfd;
      border-radius: 14px;
      padding: 14px 16px;
      border: 1px solid #E0F7FA;
    }

    .step-circle {
      width: 50px;
      height: 50px;
      min-width: 50px;
      border-radius: 50%;
      background: white;
      border: 2px solid #4AABAA;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(74,171,170,0.15);
    }

    .step-circle.mag {
      border-color: #B03FAA;
      box-shadow: 0 2px 8px rgba(176,63,170,0.15);
    }

    .step-content { flex: 1; }

    .step-title {
      font-size: 14px;
      font-weight: bold;
      color: #1A1A2E;
      margin-bottom: 2px;
    }

    .step-desc {
      font-size: 12px;
      color: #aaa;
      line-height: 1.4;
    }
  }
`;

//main
const STEPS = [
  { num: "01", icon: "📦", title: "Choisissez votre formule", desc: "Basic, Premium ou Prestige",       tooltip: "Choisissez Basic, Premium ou Prestige",          mag: false, pos: "b1" },
  { num: "02", icon: "✨", title: "Personnalisez",             desc: "Options & format photo",           tooltip: "Cadre, fond, bulles... prix en temps réel",      mag: true,  pos: "b2" },
  { num: "03", icon: "📅", title: "Indiquez votre date",       desc: "Et votre région",                  tooltip: "Date, région, nom — 3 champs seulement",         mag: false, pos: "b3" },
  { num: "04", icon: "✉️", title: "Recevez votre devis",       desc: "Sous 24h, sans surprise",          tooltip: "Devis ferme reçu sous 24h",                      mag: true,  pos: "b4" },
  { num: "05", icon: "✅", title: "Confirmez",                  desc: "Acompte 30% = date bloquée",       tooltip: "Acompte 30% pour bloquer votre date",            mag: false, pos: "b5" },
  { num: "06", icon: "🎉", title: "Jour J — on gère tout",     desc: "Vous profitez de l'événement",     tooltip: "On livre, installe et repart. Vous profitez !",  mag: true,  pos: "b6" },
];

export default function ArcPhotobooth() {
  return (
    <Styled>
      <div className="section">
        <p className="section-label">Comment ça marche</p>
        <h2 className="section-title">Réserver en 6 étapes.<br />On s'occupe du reste.</h2>
        <p className="section-sub">Simple, rapide, sans prise de tête.</p>

        {/* Desktop : arc */}
        <div className="arc-wrapper">
          <svg className="arc-svg" viewBox="0 0 760 360">
            <path d="M 65 200 Q 200 -60 380 10 Q 560 -60 695 200"
                  fill="none"
                  stroke="#E0F7FA"
                  strokeWidth="2"
                  strokeDasharray="8 6"/>
          </svg>
          <div className="center-glow"></div>
          <div className="center-photo" title="Passez la souris pour arrêter">
            <Image src="/images/Photobooth-bwood.png" alt="FunkySelfie Photobooth" fill sizes="140px" />
          </div>
          {STEPS.map((step) => (
            <div key={step.num} className={`bubble-item ${step.pos}`}>
              <div className="tooltip">{step.tooltip}</div>
              <div className={`bubble-circle${step.mag ? " mag" : ""}`}>
                <span className="bnum">{step.num}</span>
                <span className="bicon">{step.icon}</span>
              </div>
              <span className="btitle">{step.title}</span>
              <span className="btext">{step.desc}</span>
            </div>
          ))}
        </div>

        {/* Mobile : liste verticale */}
        <div className="steps-mobile">
          <div className="mobile-photo">
            <Image src="/images/Photobooth-bwood.png" alt="FunkySelfie Photobooth" fill sizes="90px" />
          </div>
          {STEPS.map((step) => (
            <div key={step.num} className="step-row">
              <div className={`step-circle${step.mag ? " mag" : ""}`}>
                <span className="bnum">{step.num}</span>
                <span className="bicon">{step.icon}</span>
              </div>
              <div className="step-content">
                <p className="step-title">{step.title}</p>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="pause-hint">Passez la souris sur le photobooth pour l'arrêter</p>

        <div className="cta-section">
          <button className="cta-btn">Réserver ce photobooth</button>
          <p className="cta-note">Devis gratuit • Réponse sous 24h • Aucun engagement</p>
        </div>
      </div>
    </Styled>
  );
}
