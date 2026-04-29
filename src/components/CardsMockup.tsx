"use client";
import styled from "styled-components";

const Styled = styled.div`
  .section {
    background: #E0F7FA;
    padding: 60px 40px;
    text-align: center;
  }

  .section-label {
    font-size: 12px;
    font-weight: bold;
    color: #0097A7;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .section-title {
    font-size: 28px;
    font-weight: bold;
    color: #1A1A2E;
    margin-bottom: 8px;
  }

  .section-sub {
    font-size: 15px;
    color: #777;
    margin-bottom: 48px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    border: 1.5px solid #E0F7FA;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    cursor: default;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 151, 167, 0.15);
    border-color: #4AABAA;
  }

  .icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px;
    font-size: 26px;
  }

  .icon-teal { background: #E0F7FA; }
  .icon-magenta { background: #F5EEF8; }

  .card-title {
    font-size: 15px;
    font-weight: bold;
    color: #1A1A2E;
    margin-bottom: 8px;
  }

  .card-text {
    font-size: 13px;
    color: #777;
    line-height: 1.6;
  }

  .card-text span {
    display: block;
    font-size: 12px;
    color: #0097A7;
    margin-top: 6px;
    font-weight: bold;
  }

  .badge {
    display: inline-block;
    background: #4AABAA;
    color: white;
    font-size: 10px;
    font-weight: bold;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

export default function CardsMockup() {
  return (
    <Styled>
      <div className="section">
        <p className="section-label">Pourquoi FunkySelfie</p>
        <h2 className="section-title">Tout ce dont vous avez besoin.<br />Rien à gérer.</h2>
        <p className="section-sub">Ce qui nous différencie des autres.</p>
      
        <div className="grid">
      
          <div className="card">
            <div className="icon icon-teal">🚚</div>
            <p className="card-title">Livraison & installation</p>
            <p className="card-text">On arrive, on installe, on repart. Vous n'avez rien à faire.</p>
          </div>
      
          <div className="card">
            <div className="icon icon-teal">📍</div>
            <p className="card-title">Toute la Suisse</p>
            <p className="card-text">Nous intervenons partout en Suisse.
              <span>Berne • Zurich • Lausanne • Genève • Bâle</span>
            </p>
          </div>
      
          <div className="card">
            <div className="icon icon-magenta">🎨</div>
            <p className="card-title">100% personnalisé</p>
            <p className="card-text">Vos couleurs, votre logo, votre message sur chaque photo imprimée.</p>
          </div>
      
          <div className="card">
            <div className="icon icon-teal">⚡</div>
            <p className="card-title">Devis en 24h</p>
            <p className="card-text">Prix ferme, sans surprise, avant toute confirmation de votre part.</p>
          </div>
      
          <div className="card">
            <div className="icon icon-magenta">📸</div>
            <p className="card-title">Partage instantané</p>
            <p className="card-text">QR code, email ou AirDrop. Vos invités repartent avec leurs photos.</p>
          </div>
      
          <div className="card">
            <div className="icon icon-teal">⭐</div>
            <p className="card-title">Clé en main</p>
            <p className="card-text">Du brief au démontage, on gère tout. Vous profitez de votre événement.</p>
          </div>
      
        </div>
      </div>
    </Styled>
  );
}
