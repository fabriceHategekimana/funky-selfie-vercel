"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "FunkySelfie se déplace-t-il partout en Suisse ?",
    answer:
      "Oui, nous intervenons dans toute la Suisse — de Genève à Zurich, en passant par Lausanne, Berne, Fribourg et Bâle. La livraison, l'installation et la reprise sont assurées par notre équipe. Les frais de déplacement sont calculés au kilomètre (CHF 1.00/km aller-retour) et affichés clairement dans votre devis. Le pick-up est gratuit.",
  },
  {
    question:
      "Peut-on personnaliser le photobooth aux couleurs de notre entreprise ?",
    answer:
      "Absolument. Dès la formule Basic, le cadre photo est personnalisé avec votre logo et vos couleurs. Les formules Premium et Prestige incluent un habillage complet : fond de décor, overlays, écran d'accueil — entièrement aux couleurs de votre charte graphique.",
  },
  {
    question: "Combien de temps dure l'installation ?",
    answer:
      "L'installation prend 30 à 45 minutes. Nous arrivons toujours en avance pour que le photobooth soit opérationnel avant le début de votre événement. Le démontage est rapide et discret en fin de soirée.",
  },
  {
    question: "Quelles options peut-on ajouter à la réservation ?",
    answer:
      "Vous pouvez ajouter un animateur dédié (CHF 45/h), des props et accessoires, un fond de décor sur mesure, ainsi que des animations supplémentaires (GIF, Boomerang). Ces options sont sélectionnables directement lors de votre demande de devis en ligne.",
  },
  {
    question: "Comment les invités récupèrent-ils leurs photos ?",
    answer:
      "De trois façons : impression instantanée sur place, envoi par SMS ou email directement depuis le photobooth, et accès à la galerie en ligne sécurisée partagée après l'événement.",
  },
  {
    question: "Quel est le délai pour obtenir un devis ?",
    answer:
      "Nous répondons sous 24 heures ouvrables. Pour les événements nécessitant une personnalisation avancée, nous recommandons de nous contacter au moins 2 à 3 semaines avant la date.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-12 md:py-20 px-4 md:px-8"
      aria-label="Questions fréquentes"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-dark">
          Questions fréquentes
        </h2>
        <dl className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.question}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <dt>
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center gap-4 p-5 md:p-6 text-left font-semibold text-dark bg-transparent border-none cursor-pointer hover:bg-bg-light transition-colors duration-200"
                  aria-expanded={openIndex === index}
                >
                  <span>{item.question}</span>
                  <span
                    className={`shrink-0 text-primary text-xl transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </dt>
              {openIndex === index && (
                <dd className="px-5 md:px-6 pb-5 md:pb-6 text-text-light leading-relaxed">
                  {item.answer}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
