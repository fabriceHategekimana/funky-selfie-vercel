// Logique de promo — source unique de vérité pour la bannière, les formules
// et le configurateur. Pilotée par le singleton Sanity `promoSettings`.

export type PromoSettingsDoc = {
  enabled: boolean | null;
  percentage: number | null;
  startDate: string | null;
  endDate: string | null;
  label: string | null;
};

export type PromoSettings = PromoSettingsDoc | null;

// Promo résolue, transmise aux composants clients.
export type ResolvedPromo = {
  active: boolean;
  percentage: number;
};

// Valeur par défaut si aucun document Promo n'existe encore dans Sanity :
// on conserve la remise -20% actuellement affichée jusqu'à ce que Déborah
// prenne la main depuis /studio.
const FALLBACK: PromoSettingsDoc = {
  enabled: true,
  percentage: 20,
  startDate: null,
  endDate: null,
  label: null,
};

export function resolvePromo(settings: PromoSettings, now: Date = new Date()): ResolvedPromo {
  const s = settings ?? FALLBACK;
  const percentage = s.percentage ?? 0;

  const started = !s.startDate || new Date(s.startDate) <= now;
  const notEnded = !s.endDate || new Date(s.endDate) >= now;
  const active = Boolean(s.enabled) && percentage > 0 && started && notEnded;

  return { active, percentage };
}

// Prix remisé, arrondi au franc. Si la promo n'est pas active, renvoie le prix plein.
export function applyPromo(price: number, promo: ResolvedPromo): number {
  if (!promo.active) return price;
  return Math.round(price * (1 - promo.percentage / 100));
}
