"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/locales/translations";

type PrivacyT = {
  title: string;
  intro: string;
  cookiesTitle: string;
  cookiesBody: string;
  dataTitle: string;
  dataBody: string;
  rightsTitle: string;
  rightsBody: string;
};

const EMAIL = "hello@funkyselfie.ch";

const PRIVACY: Record<Lang, PrivacyT> = {
  fr: {
    title: "Politique de confidentialité",
    intro:
      "FunkySelfie (Bienne, Suisse) accorde une grande importance à la protection de vos données personnelles, conformément à la Loi fédérale sur la protection des données (LPD).",
    cookiesTitle: "Cookies",
    cookiesBody:
      "Notre site utilise des cookies de mesure d'audience (Google Analytics 4) uniquement après votre consentement explicite via le bandeau cookie. Les données sont anonymisées (anonymisation IP) et servent exclusivement à améliorer votre expérience de navigation. Vous pouvez refuser ces cookies sans aucune conséquence sur l'utilisation du site, et revenir sur votre choix à tout moment.",
    dataTitle: "Données collectées",
    dataBody:
      "Lors d'une demande de devis, nous collectons uniquement les informations que vous nous transmettez (date d'événement, région, nom, email, message). Elles servent exclusivement à traiter votre demande et ne sont jamais cédées ni revendues à des tiers.",
    rightsTitle: "Vos droits & contact",
    rightsBody:
      "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour toute question relative à la protection des données, écrivez-nous à",
  },
  en: {
    title: "Privacy Policy",
    intro:
      "FunkySelfie (Biel, Switzerland) takes the protection of your personal data very seriously, in accordance with the Swiss Federal Act on Data Protection (FADP).",
    cookiesTitle: "Cookies",
    cookiesBody:
      "Our site uses analytics cookies (Google Analytics 4) only after your explicit consent via the cookie banner. The data is anonymised (IP anonymisation) and used solely to improve your browsing experience. You can decline these cookies with no impact on your use of the site, and change your choice at any time.",
    dataTitle: "Data collected",
    dataBody:
      "When you request a quote, we only collect the information you provide (event date, region, name, email, message). It is used solely to process your request and is never shared or sold to third parties.",
    rightsTitle: "Your rights & contact",
    rightsBody:
      "You have the right to access, rectify and delete your data. For any data protection question, write to us at",
  },
  de: {
    title: "Datenschutzerklärung",
    intro:
      "FunkySelfie (Biel, Schweiz) legt grossen Wert auf den Schutz Ihrer persönlichen Daten, gemäss dem schweizerischen Datenschutzgesetz (DSG).",
    cookiesTitle: "Cookies",
    cookiesBody:
      "Unsere Website verwendet Analyse-Cookies (Google Analytics 4) erst nach Ihrer ausdrücklichen Zustimmung über das Cookie-Banner. Die Daten werden anonymisiert (IP-Anonymisierung) und dienen ausschliesslich der Verbesserung Ihres Surferlebnisses. Sie können diese Cookies ohne Folgen für die Nutzung der Website ablehnen und Ihre Wahl jederzeit ändern.",
    dataTitle: "Erhobene Daten",
    dataBody:
      "Bei einer Offertenanfrage erheben wir nur die von Ihnen übermittelten Informationen (Veranstaltungsdatum, Region, Name, E-Mail, Nachricht). Sie dienen ausschliesslich der Bearbeitung Ihrer Anfrage und werden niemals an Dritte weitergegeben oder verkauft.",
    rightsTitle: "Ihre Rechte & Kontakt",
    rightsBody:
      "Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Bei Fragen zum Datenschutz schreiben Sie uns an",
  },
};

const h2Style: React.CSSProperties = { margin: "28px 0 10px", fontSize: "1.25rem" };

export default function PrivacyContent() {
  const { lang } = useLanguage();
  const p = PRIVACY[lang];

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "160px 24px 80px", lineHeight: 1.7 }}>
      <h1 style={{ marginBottom: 24 }}>{p.title}</h1>
      <p>{p.intro}</p>

      <h2 style={h2Style}>{p.cookiesTitle}</h2>
      <p>{p.cookiesBody}</p>

      <h2 style={h2Style}>{p.dataTitle}</h2>
      <p>{p.dataBody}</p>

      <h2 style={h2Style}>{p.rightsTitle}</h2>
      <p>
        {p.rightsBody}{" "}
        <a href={`mailto:${EMAIL}`} style={{ color: "var(--teal-dark)" }}>
          {EMAIL}
        </a>
        .
      </p>
    </main>
  );
}
