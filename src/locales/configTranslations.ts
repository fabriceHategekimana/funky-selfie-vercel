// Traductions du configurateur (§2) FR / EN / DE — non incluses dans le prototype v9.
import type { Lang } from "./translations";

export type ConfigTranslation = {
  planFeatures: { basic: string[]; premium: string[]; prestige: string[] };
  optionsTitle: string;
  options: Record<"cadre" | "fond" | "green" | "bulles" | "livreor" | "heure" | "impr", string>;
  formatTitle: string;
  formatDim: string;
  formats: Record<"f1" | "f2" | "f4", { label: string; desc: string }>;
  messageLabel: string;
  messageOptional: string;
  messagePlaceholder: string;
  charsLeft: string; // {n}
  totalLabel: string;
  remiseApplied: string; // {pct}
  travelNote: string;
  reserveBtn: string;
  formTitle: string;
  sumFormule: string;
  sumOptions: string;
  sumFormat: string;
  sumMessage: string;
  sumTotal: string;
  none: string;
  notSpecified: string;
  dateLabel: string;
  regionLabel: string;
  regionPlaceholder: string;
  nameLabel: string;
  optional: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  submitBtn: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorAlert: string;
};

export const configTranslations: Record<Lang, ConfigTranslation> = {
  fr: {
    planFeatures: {
      basic: [
        "400 impressions 10×15",
        "Accessoires de base",
        "Partage QR / AirDrop / email",
        "Galerie cloud 1 mois",
        "Livraison + installation + reprise",
        "Pick-up gratuit disponible",
      ],
      premium: [
        "700 impressions 10×15",
        "Cadre photo personnalisé inclus",
        "Fond backdrop standard inclus",
        "Logo sur chaque photo",
        "Partage QR / AirDrop / email",
        "Galerie cloud 3 mois",
        "Livraison + installation + reprise",
      ],
      prestige: [
        "Impressions illimitées",
        "Cadre + fond sur mesure",
        "Logo sur chaque photo",
        "Accessoires premium",
        "Support technique sur place",
        "Galerie cloud 6 mois",
        "Livraison + installation + reprise",
      ],
    },
    optionsTitle: "Options",
    options: {
      cadre: "Cadre photo personnalisé",
      fond: "Fond backdrop standard",
      green: "Fond vert green screen",
      bulles: "Machine à bulles",
      livreor: "Livre d'or photo",
      heure: "Heure supplémentaire",
      impr: "100 impressions supplémentaires",
    },
    formatTitle: "Format de collage",
    formatDim: "10x15 cm",
    formats: {
      f1: { label: "1 grande photo", desc: "Une photo pleine page, classique et élégant" },
      f2: { label: "2 photos", desc: "Deux photos côte à côte, dynamique et fun" },
      f4: { label: "4 photos en grille", desc: "Quatre photos style photomaton, nostalgique" },
    },
    messageLabel: "Votre message sur les photos",
    messageOptional: "(optionnel)",
    messagePlaceholder: "Ex : Soirée annuelle Nestlé 2026 / Just Married / Team Building RH",
    charsLeft: "{n} caractères restants",
    totalLabel: "Total estimé",
    remiseApplied: "Remise -{pct}% appliquée",
    travelNote: "Déplacement calculé dans votre devis : CHF 1.00/km aller-retour depuis Bienne.",
    reserveBtn: "Réserver ce photobooth",
    formTitle: "Votre demande",
    sumFormule: "Formule",
    sumOptions: "Options",
    sumFormat: "Format",
    sumMessage: "Message sur les photos",
    sumTotal: "Total estimé",
    none: "Aucune",
    notSpecified: "Non précisé",
    dateLabel: "Date de l'événement",
    regionLabel: "Région",
    regionPlaceholder: "Ex : Zurich, Genève, Berne…",
    nameLabel: "Votre nom",
    optional: "(optionnel)",
    namePlaceholder: "Ex : Marie Dupont",
    emailLabel: "Votre email",
    emailPlaceholder: "Ex : marie@exemple.ch",
    phoneLabel: "Votre téléphone",
    phonePlaceholder: "Ex : +41 79 123 45 67",
    submitBtn: "Envoyer ma demande",
    sending: "Envoi en cours…",
    successTitle: "Votre demande a bien été envoyée !",
    successBody: "Nous vous répondons sous 48h avec votre devis complet. À très bientôt !",
    errorAlert:
      "Une erreur est survenue lors de l'envoi. Veuillez nous contacter directement par email.",
  },
  en: {
    planFeatures: {
      basic: [
        "400 prints 10×15",
        "Basic props included",
        "QR / AirDrop / email sharing",
        "1-month cloud gallery",
        "Delivery + setup + collection",
        "Free pick-up available",
      ],
      premium: [
        "700 prints 10×15",
        "Custom photo frame included",
        "Standard backdrop included",
        "Logo on every photo",
        "QR / AirDrop / email sharing",
        "3-month cloud gallery",
        "Delivery + setup + collection",
      ],
      prestige: [
        "Unlimited prints",
        "Bespoke frame + backdrop",
        "Logo on every photo",
        "Premium props",
        "On-site technical support",
        "6-month cloud gallery",
        "Delivery + setup + collection",
      ],
    },
    optionsTitle: "Options",
    options: {
      cadre: "Custom photo frame",
      fond: "Standard backdrop",
      green: "Green screen backdrop",
      bulles: "Bubble machine",
      livreor: "Photo guest book",
      heure: "Extra hour",
      impr: "100 extra prints",
    },
    formatTitle: "Print layout",
    formatDim: "10x15 cm",
    formats: {
      f1: { label: "1 large photo", desc: "A full-page photo, classic and elegant" },
      f2: { label: "2 photos", desc: "Two photos side by side, dynamic and fun" },
      f4: { label: "4-photo grid", desc: "Four photos, photo-booth style, nostalgic" },
    },
    messageLabel: "Your message on the photos",
    messageOptional: "(optional)",
    messagePlaceholder: "E.g. Nestlé Annual Party 2026 / Just Married / HR Team Building",
    charsLeft: "{n} characters left",
    totalLabel: "Estimated total",
    remiseApplied: "-{pct}% discount applied",
    travelNote: "Travel calculated in your quote: CHF 1.00/km round trip from Biel.",
    reserveBtn: "Book this photobooth",
    formTitle: "Your request",
    sumFormule: "Package",
    sumOptions: "Options",
    sumFormat: "Layout",
    sumMessage: "Message on the photos",
    sumTotal: "Estimated total",
    none: "None",
    notSpecified: "Not specified",
    dateLabel: "Event date",
    regionLabel: "Region",
    regionPlaceholder: "E.g. Zurich, Geneva, Bern…",
    nameLabel: "Your name",
    optional: "(optional)",
    namePlaceholder: "E.g. Marie Dupont",
    emailLabel: "Your email",
    emailPlaceholder: "E.g. marie@example.ch",
    phoneLabel: "Your phone",
    phonePlaceholder: "E.g. +41 79 123 45 67",
    submitBtn: "Send my request",
    sending: "Sending…",
    successTitle: "Your request has been sent!",
    successBody: "We'll get back to you within 48h with your full quote. See you soon!",
    errorAlert: "An error occurred while sending. Please contact us directly by email.",
  },
  de: {
    planFeatures: {
      basic: [
        "400 Ausdrucke 10×15",
        "Basis-Accessoires inklusive",
        "Teilen per QR / AirDrop / E-Mail",
        "Cloud-Galerie 1 Monat",
        "Lieferung + Aufbau + Abbau",
        "Kostenlose Abholung möglich",
      ],
      premium: [
        "700 Ausdrucke 10×15",
        "Personalisierter Fotorahmen inklusive",
        "Standard-Backdrop inklusive",
        "Logo auf jedem Foto",
        "Teilen per QR / AirDrop / E-Mail",
        "Cloud-Galerie 3 Monate",
        "Lieferung + Aufbau + Abbau",
      ],
      prestige: [
        "Unbegrenzte Ausdrucke",
        "Massgeschneiderter Rahmen + Backdrop",
        "Logo auf jedem Foto",
        "Premium-Accessoires",
        "Technischer Support vor Ort",
        "Cloud-Galerie 6 Monate",
        "Lieferung + Aufbau + Abbau",
      ],
    },
    optionsTitle: "Optionen",
    options: {
      cadre: "Personalisierter Fotorahmen",
      fond: "Standard-Backdrop",
      green: "Greenscreen-Hintergrund",
      bulles: "Seifenblasenmaschine",
      livreor: "Foto-Gästebuch",
      heure: "Zusätzliche Stunde",
      impr: "100 zusätzliche Ausdrucke",
    },
    formatTitle: "Druck-Layout",
    formatDim: "10x15 cm",
    formats: {
      f1: { label: "1 grosses Foto", desc: "Ein ganzseitiges Foto, klassisch und elegant" },
      f2: { label: "2 Fotos", desc: "Zwei Fotos nebeneinander, dynamisch und fun" },
      f4: { label: "4 Fotos im Raster", desc: "Vier Fotos im Fotoautomaten-Stil, nostalgisch" },
    },
    messageLabel: "Ihre Nachricht auf den Fotos",
    messageOptional: "(optional)",
    messagePlaceholder: "Z. B. Nestlé Jahresfeier 2026 / Just Married / HR Team Building",
    charsLeft: "{n} Zeichen übrig",
    totalLabel: "Geschätzter Gesamtpreis",
    remiseApplied: "-{pct}% Rabatt angewendet",
    travelNote: "Anfahrt wird in Ihrer Offerte berechnet: CHF 1.00/km Hin- und Rückfahrt ab Biel.",
    reserveBtn: "Dieses Photobooth buchen",
    formTitle: "Ihre Anfrage",
    sumFormule: "Paket",
    sumOptions: "Optionen",
    sumFormat: "Layout",
    sumMessage: "Nachricht auf den Fotos",
    sumTotal: "Geschätzter Gesamtpreis",
    none: "Keine",
    notSpecified: "Nicht angegeben",
    dateLabel: "Datum des Events",
    regionLabel: "Region",
    regionPlaceholder: "Z. B. Zürich, Genf, Bern…",
    nameLabel: "Ihr Name",
    optional: "(optional)",
    namePlaceholder: "Z. B. Marie Dupont",
    emailLabel: "Ihre E-Mail",
    emailPlaceholder: "Z. B. marie@beispiel.ch",
    phoneLabel: "Ihre Telefonnummer",
    phonePlaceholder: "Z. B. +41 79 123 45 67",
    submitBtn: "Anfrage senden",
    sending: "Wird gesendet…",
    successTitle: "Ihre Anfrage wurde gesendet!",
    successBody: "Wir melden uns innert 48h mit Ihrer vollständigen Offerte. Bis bald!",
    errorAlert:
      "Beim Senden ist ein Fehler aufgetreten. Bitte kontaktieren Sie uns direkt per E-Mail.",
  },
};
