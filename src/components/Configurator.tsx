"use client";

import { useState } from "react";

const packages = [
  {
    id: "basic",
    label: "Basic",
    price: 499,
    gallery: "1 mois",
    tagline: "L'essentiel pour une belle soirée",
    includes: [
      "400 impressions format 10x15",
      "Accessoires de base inclus",
      "Partage digital QR/AirDrop/email",
      "Galerie cloud privée 1 mois",
      "Livraison + installation + reprise",
      "Pick-up gratuit disponible",
    ],
  },
  {
    id: "premium",
    label: "Premium",
    price: 799,
    gallery: "3 mois",
    tagline: "Le plus choisi — personnalisation complète",
    popular: true,
    includes: [
      "700 impressions format 10x15",
      "Cadre photo personnalisé inclus",
      "Fond backdrop standard inclus",
      "Partage digital QR/AirDrop/email",
      "Galerie cloud privée 3 mois",
      "Logo sur chaque photo",
      "Livraison + installation + reprise",
      "Pick-up gratuit disponible",
    ],
  },
  {
    id: "prestige",
    label: "Prestige",
    price: 1500,
    gallery: "6 mois",
    tagline: "L'expérience signature, zéro compromis",
    includes: [
      "Impressions illimitées format 10x15",
      "Accessoires premium inclus",
      "Cadre photo personnalisé inclus",
      "Fond backdrop standard inclus",
      "Partage digital QR/AirDrop/email",
      "Galerie cloud privée 6 mois",
      "Logo sur chaque photo",
      "Support technique sur place",
      "Livraison + installation + reprise",
      "Pick-up gratuit disponible",
    ],
  },
];

const options = [
  { id: "cadre", label: "Cadre photo personnalisé", price: 49, exclude: ["premium", "prestige"] },
  { id: "fond", label: "Fond backdrop standard", price: 59, exclude: ["premium", "prestige"] },
  { id: "green", label: "Fond vert green screen", price: 69, exclude: [] as string[] },
  { id: "bulles", label: "Machine à bulles", price: 39, exclude: [] as string[] },
  { id: "livreor", label: "Livre d'or photo", price: 39, exclude: [] as string[] },
  { id: "heure", label: "Heure supplémentaire", price: 109, exclude: [] as string[] },
  { id: "impr", label: "100 impressions supplémentaires", price: 55, exclude: ["prestige"] },
];

const formats = [
  {
    id: "f1",
    label: "1 grande photo",
    dim: "10x15 cm",
    desc: "Une photo pleine page, classique et élégant",
  },
  {
    id: "f2",
    label: "2 photos",
    dim: "10x15 cm",
    desc: "Deux photos côte à côte, dynamique et fun",
  },
  {
    id: "f4",
    label: "4 photos en grille",
    dim: "10x15 cm",
    desc: "Quatre photos style photomaton, nostalgique",
  },
];

function FormatSvg({ id }: { id: string }) {
  if (id === "f1") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-20" aria-hidden="true">
        <rect x="10" y="5" width="60" height="90" rx="3" fill="#e5f0f1" stroke="#36949e" strokeWidth="1.5" />
        <rect x="18" y="13" width="44" height="60" rx="2" fill="#b2d8dc" />
        <rect x="18" y="79" width="44" height="9" rx="2" fill="#cde8ea" />
      </svg>
    );
  }
  if (id === "f2") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-20" aria-hidden="true">
        <rect x="4" y="5" width="34" height="90" rx="3" fill="#e5f0f1" stroke="#36949e" strokeWidth="1.5" />
        <rect x="10" y="13" width="22" height="60" rx="2" fill="#b2d8dc" />
        <rect x="42" y="5" width="34" height="90" rx="3" fill="#e5f0f1" stroke="#36949e" strokeWidth="1.5" />
        <rect x="48" y="13" width="22" height="60" rx="2" fill="#b2d8dc" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 100" className="w-full h-20" aria-hidden="true">
      <rect x="4" y="5" width="34" height="43" rx="3" fill="#e5f0f1" stroke="#36949e" strokeWidth="1.5" />
      <rect x="10" y="11" width="22" height="29" rx="2" fill="#b2d8dc" />
      <rect x="42" y="5" width="34" height="43" rx="3" fill="#e5f0f1" stroke="#36949e" strokeWidth="1.5" />
      <rect x="48" y="11" width="22" height="29" rx="2" fill="#b2d8dc" />
      <rect x="4" y="52" width="34" height="43" rx="3" fill="#e5f0f1" stroke="#36949e" strokeWidth="1.5" />
      <rect x="10" y="58" width="22" height="29" rx="2" fill="#b2d8dc" />
      <rect x="42" y="52" width="34" height="43" rx="3" fill="#e5f0f1" stroke="#36949e" strokeWidth="1.5" />
      <rect x="48" y="58" width="22" height="29" rx="2" fill="#b2d8dc" />
    </svg>
  );
}

export default function Configurator() {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [selectedOpts, setSelectedOpts] = useState<string[]>([]);
  const [selectedFmt, setSelectedFmt] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ date: "", region: "", nom: "", email: "", telephone: "" });

  const pkg = packages.find((p) => p.id === selectedPkg) ?? null;
  const optsTotal = selectedOpts.reduce((sum, id) => {
    const opt = options.find((o) => o.id === id);
    return sum + (opt ? opt.price : 0);
  }, 0);
  const total = (pkg?.price ?? 0) + optsTotal;
  const availableOptions = options.filter((o) => !o.exclude.includes(selectedPkg ?? ""));

  const handlePkgSelect = (id: string) => {
    setSelectedPkg(id);
    setSelectedOpts([]);
    setSelectedFmt(null);
    setShowForm(false);
    setSent(false);
  };

  const toggleOpt = (id: string) => {
    setSelectedOpts((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const optionsLabel =
    selectedOpts
      .map((id) => {
        const opt = options.find((o) => o.id === id);
        return opt ? `${opt.label} (+CHF ${opt.price})` : "";
      })
      .filter(Boolean)
      .join(", ") || "Aucune";

  const formatLabel = formats.find((f) => f.id === selectedFmt)?.label ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formule: `${pkg?.label} — CHF ${pkg?.price}`,
          options: optionsLabel,
          format: formatLabel ? `${formatLabel} (10x15 cm)` : "Non précisé",
          message: message || "—",
          total: `CHF ${total}`,
          date: formData.date,
          region: formData.region,
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
        }),
      });
    } finally {
      setSent(true);
      setSending(false);
    }
  };

  return (
    <section
      id="configurateur"
      className="bg-bg-light py-12 md:py-20 px-4 md:px-8"
      aria-label="Configurateur de prix photobooth"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-3 text-dark">
          Une formule pour chaque événement. Choisissez, personnalisez, réservez.
        </h2>
        <p className="text-center text-text-light mb-10 md:mb-14">
          Choisissez votre formule, ajoutez vos options. Le prix se calcule en temps réel.
        </p>

        {/* Étape 1 — Formules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {packages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePkgSelect(p.id)}
              className={`relative text-left rounded-2xl border-2 p-6 transition-all duration-200 bg-white cursor-pointer ${
                selectedPkg === p.id
                  ? "border-primary shadow-md"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              {p.id === "premium" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Le plus choisi
                </span>
              )}
              <p className="text-xs text-gray-400 mb-0.5">À partir de</p>
              <p className="text-2xl font-extrabold text-primary mb-1">CHF {p.price}</p>
              <p className="text-lg font-bold text-dark mb-2">{p.label}</p>
              <p className="text-sm text-text-light mb-4">{p.tagline}</p>
              <ul className="space-y-1">
                {p.includes.map((item) => (
                  <li key={item} className="text-xs text-text-light flex items-start gap-1.5">
                    <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Étape 2 — Options */}
        {selectedPkg && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-dark mb-4">Options</h3>
            <div className="divide-y divide-gray-100">
              {availableOptions.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center justify-between py-3 cursor-pointer min-h-[44px]"
                >
                  <span className="text-sm text-text">{opt.label}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">+CHF {opt.price}</span>
                    <input
                      type="checkbox"
                      checked={selectedOpts.includes(opt.id)}
                      onChange={() => toggleOpt(opt.id)}
                      className="w-4 h-4 accent-primary"
                    />
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Étape 3 — Format de collage */}
        {selectedPkg && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-dark mb-4">Format de collage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formats.map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setSelectedFmt(fmt.id)}
                  className={`rounded-xl border-2 p-4 text-center transition-all duration-200 cursor-pointer bg-white ${
                    selectedFmt === fmt.id
                      ? "border-primary shadow-sm"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <FormatSvg id={fmt.id} />
                  <p className="font-semibold text-dark text-sm mt-2">{fmt.label}</p>
                  <p className="text-xs text-gray-400">{fmt.dim}</p>
                  <p className="text-xs text-text-light mt-1">{fmt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Étape 4 — Message photo */}
        {selectedFmt && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <label htmlFor="photo-message" className="block font-bold text-dark mb-2">
              Votre message sur les photos{" "}
              <span className="font-normal text-gray-400 text-sm">(optionnel)</span>
            </label>
            <input
              id="photo-message"
              type="text"
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= 40) setMessage(e.target.value);
              }}
              placeholder="Ex : Soirée annuelle Nestlé 2026 / Just Married / Team Building RH"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              maxLength={40}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {40 - message.length} caractères restants
            </p>
          </div>
        )}

        {/* Étape 5 — Prix total */}
        {selectedPkg && (
          <div className="rounded-2xl border-2 border-primary p-6 mb-6 bg-white">
            <div className="flex items-center justify-between">
              <span className="font-bold text-dark text-lg">Total estimé</span>
              <span className="text-3xl font-extrabold text-primary">CHF {total}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Déplacement calculé dans votre devis : CHF 1.00/km aller-retour depuis Bienne.
            </p>
          </div>
        )}

        {/* Étape 6 — Bouton */}
        <button
          type="button"
          disabled={!selectedPkg}
          onClick={() => setShowForm(true)}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-200 ${
            selectedPkg
              ? "bg-primary text-white hover:bg-primary-dark cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Réserver ce photobooth
        </button>

        {/* Étape 7–9 — Formulaire */}
        {showForm && !sent && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 max-w-xl mx-auto"
          >
            <h3 className="font-bold text-dark text-lg mb-6">Votre demande</h3>

            {/* Champs pré-remplis (lecture seule) */}
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">Formule</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                  {pkg?.label} — CHF {pkg?.price}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Options</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                  {optionsLabel}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Format</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                  {formatLabel || "Non précisé"}
                </div>
              </div>
              {message && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Message sur les photos</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                    {message}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400 mb-1">Total estimé</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-primary">
                  CHF {total}
                </div>
              </div>
            </div>

            {/* Champs à remplir */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="event-date"
                  className="text-sm font-medium text-dark block mb-1"
                >
                  Date de l&apos;événement *
                </label>
                <input
                  id="event-date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData((d) => ({ ...d, date: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="event-region"
                  className="text-sm font-medium text-dark block mb-1"
                >
                  Région *
                </label>
                <input
                  id="event-region"
                  type="text"
                  required
                  value={formData.region}
                  onChange={(e) => setFormData((d) => ({ ...d, region: e.target.value }))}
                  placeholder="Ex : Zurich, Genève, Berne…"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="client-nom"
                  className="text-sm font-medium text-dark block mb-1"
                >
                  Votre nom{" "}
                  <span className="font-normal text-gray-400">(optionnel)</span>
                </label>
                <input
                  id="client-nom"
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData((d) => ({ ...d, nom: e.target.value }))}
                  placeholder="Ex : Marie Dupont"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="client-email"
                  className="text-sm font-medium text-dark block mb-1"
                >
                  Votre email *
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  placeholder="Ex : marie@exemple.ch"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="client-telephone"
                  className="text-sm font-medium text-dark block mb-1"
                >
                  Votre téléphone{" "}
                  <span className="font-normal text-gray-400">(optionnel)</span>
                </label>
                <input
                  id="client-telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData((d) => ({ ...d, telephone: e.target.value }))}
                  placeholder="Ex : +41 79 123 45 67"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full mt-6 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {sending ? "Envoi en cours…" : "Envoyer ma demande"}
            </button>
          </form>
        )}

        {/* Étape 10 — Confirmation */}
        {sent && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-8 text-center max-w-xl mx-auto">
            <p className="text-green-700 font-bold text-lg">
              Votre demande a bien été envoyée !
            </p>
            <p className="text-green-600 mt-2">
              Nous vous répondons sous 24h avec votre devis complet. À très bientôt !
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
