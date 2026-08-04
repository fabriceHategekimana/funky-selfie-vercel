"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { applyPromo, type ResolvedPromo } from "@/lib/promo";
import { useLanguage } from "@/contexts/LanguageContext";
import { configTranslations } from "@/locales/configTranslations";

type OptId = "cadre" | "fond" | "green" | "bulles" | "livreor" | "heure" | "impr";
type FmtId = "f1" | "f2" | "f4";
type PkgId = "basic" | "premium" | "prestige";

const PACKAGES: { id: PkgId; price: number }[] = [
  { id: "basic", price: 499 },
  { id: "premium", price: 799 },
  { id: "prestige", price: 1500 },
];

const OPTIONS: { id: OptId; price: number; exclude: string[] }[] = [
  { id: "cadre", price: 49, exclude: ["premium", "prestige"] },
  { id: "fond", price: 59, exclude: ["premium", "prestige"] },
  { id: "green", price: 69, exclude: [] },
  { id: "bulles", price: 39, exclude: [] },
  { id: "livreor", price: 39, exclude: [] },
  { id: "heure", price: 109, exclude: [] },
  { id: "impr", price: 55, exclude: ["prestige"] },
];

const FORMAT_IDS: FmtId[] = ["f1", "f2", "f4"];

const ConfigWrapper = styled.div`
  max-width: 896px;
  margin: 44px auto 0;
  scroll-margin-top: 120px;
`;

function FormatSvg({ id }: { id: FmtId }) {
  const src =
    id === "f1" ? "/images/1_photo.jpeg" : id === "f2" ? "/images/2_photos.jpeg" : "/images/4_photos.jpeg";
  return (
    <Image src={src} alt="" width={160} height={200} className="w-full h-20 object-contain" aria-hidden="true" />
  );
}

export default function ConfiguratorPanel({
  selectedId,
  promo,
}: {
  selectedId: string;
  promo: ResolvedPromo;
}) {
  const { lang, t } = useLanguage();
  const c = configTranslations[lang];

  const [selectedOpts, setSelectedOpts] = useState<OptId[]>([]);
  const [selectedFmt, setSelectedFmt] = useState<FmtId | null>(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ date: "", region: "", nom: "", email: "", telephone: "" });

  // Réinitialise le configurateur quand on change de formule.
  useEffect(() => {
    setSelectedOpts([]);
    setSelectedFmt(null);
    setMessage("");
    setShowForm(false);
    setSent(false);
  }, [selectedId]);

  const pkg = PACKAGES.find((p) => p.id === selectedId)!;
  const pkgLabel = { basic: t.basicName, premium: t.premiumName, prestige: t.prestigeName }[pkg.id];
  const availableOptions = OPTIONS.filter((o) => !o.exclude.includes(selectedId));

  const pkgNow = applyPromo(pkg.price, promo);
  const optsTotalFull = selectedOpts.reduce((sum, id) => {
    const o = OPTIONS.find((x) => x.id === id);
    return sum + (o ? o.price : 0);
  }, 0);
  const optsTotalNow = selectedOpts.reduce((sum, id) => {
    const o = OPTIONS.find((x) => x.id === id);
    return sum + (o ? applyPromo(o.price, promo) : 0);
  }, 0);
  const totalFull = pkg.price + optsTotalFull;
  const total = pkgNow + optsTotalNow;

  const toggleOpt = (id: OptId) =>
    setSelectedOpts((prev) => (prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]));

  const optionsLabel =
    selectedOpts
      .map((id) => `${c.options[id]} (+CHF ${applyPromo(OPTIONS.find((x) => x.id === id)!.price, promo)})`)
      .join(", ") || c.none;

  const formatLabel = selectedFmt ? c.formats[selectedFmt].label : "";
  const remiseLabel = promo.active ? `-${promo.percentage}% (au lieu de CHF ${totalFull})` : c.none;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formule: `${pkgLabel} — CHF ${pkgNow}`,
          options: optionsLabel,
          format: formatLabel ? `${formatLabel} (${c.formatDim})` : c.notSpecified,
          message: message || "—",
          remise: remiseLabel,
          total: `CHF ${total}`,
          date: formData.date,
          region: formData.region,
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
        }),
      });
      if (!res.ok) throw new Error("Envoi échoué");
      setSent(true);
    } catch {
      alert(c.errorAlert);
    } finally {
      setSending(false);
    }
  };

  return (
    <ConfigWrapper id="configurateur">
      {/* Options */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h3 className="font-bold text-dark mb-4">{c.optionsTitle}</h3>
        <div className="divide-y divide-gray-100">
          {availableOptions.map((opt) => {
            const optNow = applyPromo(opt.price, promo);
            return (
              <label
                key={opt.id}
                className="flex items-center justify-between py-3 cursor-pointer min-h-[44px]"
              >
                <span className="text-sm text-text">{c.options[opt.id]}</span>
                <span className="flex items-center gap-3">
                  {promo.active && (
                    <span className="text-xs text-gray-400 line-through">CHF {opt.price}</span>
                  )}
                  <span className={`text-sm ${promo.active ? "text-primary font-semibold" : "text-gray-400"}`}>
                    +CHF {optNow}
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedOpts.includes(opt.id)}
                    onChange={() => toggleOpt(opt.id)}
                    className="w-4 h-4 accent-primary"
                  />
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Format de collage */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h3 className="font-bold text-dark mb-4">{c.formatTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FORMAT_IDS.map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setSelectedFmt(fmt)}
              className={`rounded-xl border-2 p-4 text-center transition-all duration-200 cursor-pointer bg-white ${
                selectedFmt === fmt ? "border-primary shadow-sm" : "border-gray-200 hover:border-primary/50"
              }`}
            >
              <FormatSvg id={fmt} />
              <p className="font-semibold text-dark text-sm mt-2">{c.formats[fmt].label}</p>
              <p className="text-xs text-gray-400">{c.formatDim}</p>
              <p className="text-xs text-text-light mt-1">{c.formats[fmt].desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Message photo */}
      {selectedFmt && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <label htmlFor="photo-message" className="block font-bold text-dark mb-2">
            {c.messageLabel} <span className="font-normal text-gray-400 text-sm">{c.messageOptional}</span>
          </label>
          <input
            id="photo-message"
            type="text"
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= 40) setMessage(e.target.value);
            }}
            placeholder={c.messagePlaceholder}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-primary"
            maxLength={40}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">
            {c.charsLeft.replace("{n}", String(40 - message.length))}
          </p>
        </div>
      )}

      {/* Prix total */}
      <div className="rounded-2xl border-2 border-primary p-6 mb-6 bg-white">
        <div className="flex items-center justify-between flex-wrap gap-x-4 gap-y-2">
          <span className="font-bold text-dark text-lg">{c.totalLabel}</span>
          <span className="flex items-baseline gap-3 flex-wrap">
            {promo.active && <span className="text-lg text-gray-400 line-through">CHF {totalFull}</span>}
            <span className="text-2xl sm:text-3xl font-extrabold text-primary">CHF {total}</span>
          </span>
        </div>
        {promo.active && (
          <p className="text-xs text-promo font-semibold mt-2">
            {c.remiseApplied.replace("{pct}", String(promo.percentage))}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-2">{c.travelNote}</p>
      </div>

      {/* Bouton réserver */}
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="w-full py-4 rounded-full font-bold text-lg transition-all duration-200 bg-primary text-white hover:bg-primary-dark cursor-pointer"
      >
        {c.reserveBtn}
      </button>

      {/* Formulaire */}
      {showForm && !sent && (
        <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 max-w-xl mx-auto">
          <h3 className="font-bold text-dark text-lg mb-6">{c.formTitle}</h3>

          <div className="space-y-3 mb-6">
            <div>
              <p className="text-xs text-gray-400 mb-1">{c.sumFormule}</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                {pkgLabel} — CHF {pkgNow}
                {promo.active && <span className="text-promo"> (-{promo.percentage}%)</span>}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">{c.sumOptions}</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                {optionsLabel}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">{c.sumFormat}</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                {formatLabel || c.notSpecified}
              </div>
            </div>
            {message && (
              <div>
                <p className="text-xs text-gray-400 mb-1">{c.sumMessage}</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                  {message}
                </div>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 mb-1">{c.sumTotal}</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold text-primary">
                CHF {total}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="event-date" className="text-sm font-medium text-dark block mb-1">
                {c.dateLabel} *
              </label>
              <input
                id="event-date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData((d) => ({ ...d, date: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="event-region" className="text-sm font-medium text-dark block mb-1">
                {c.regionLabel} *
              </label>
              <input
                id="event-region"
                type="text"
                required
                value={formData.region}
                onChange={(e) => setFormData((d) => ({ ...d, region: e.target.value }))}
                placeholder={c.regionPlaceholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="client-nom" className="text-sm font-medium text-dark block mb-1">
                {c.nameLabel} <span className="font-normal text-gray-400">{c.optional}</span>
              </label>
              <input
                id="client-nom"
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData((d) => ({ ...d, nom: e.target.value }))}
                placeholder={c.namePlaceholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="client-email" className="text-sm font-medium text-dark block mb-1">
                {c.emailLabel} *
              </label>
              <input
                id="client-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                placeholder={c.emailPlaceholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="client-telephone" className="text-sm font-medium text-dark block mb-1">
                {c.phoneLabel} <span className="font-normal text-gray-400">{c.optional}</span>
              </label>
              <input
                id="client-telephone"
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData((d) => ({ ...d, telephone: e.target.value }))}
                placeholder={c.phonePlaceholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full mt-6 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {sending ? c.sending : c.submitBtn}
          </button>
        </form>
      )}

      {/* Confirmation */}
      {sent && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-8 text-center max-w-xl mx-auto">
          <p className="text-green-700 font-bold text-lg">{c.successTitle}</p>
          <p className="text-green-600 mt-2">{c.successBody}</p>
        </div>
      )}
    </ConfigWrapper>
  );
}
