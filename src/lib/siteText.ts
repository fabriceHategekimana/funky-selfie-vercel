// Fusion « contenu Sanity → textes du site ».
//
// Les textes de src/locales restent la référence : toute chaîne laissée vide dans
// le Studio retombe automatiquement sur la valeur codée en dur, champ par champ.
// Le site ne peut donc jamais se retrouver avec des sections vides, et Sanity peut
// être alimenté progressivement, dans n'importe quel ordre.

import {
  translations,
  type Lang,
  type Translation,
} from "@/locales/translations";
import {
  configTranslations,
  type ConfigTranslation,
} from "@/locales/configTranslations";

/** Objet renvoyé par un champ `localeString` / `localeText`. */
type Loc = { fr?: string | null; en?: string | null; de?: string | null } | null;

type LocPair<A extends string, B extends string> = Partial<Record<A | B, Loc>> | null;

export type SiteTextData = {
  hero?: {
    badge?: Loc; title?: Loc; subtitle?: Loc; btn1?: Loc; btn2?: Loc;
    trust?: (Loc | null)[] | null;
  } | null;
  formules?: {
    label?: Loc; title?: Loc; promoSub?: Loc; sub?: Loc; fromLabel?: Loc;
    popular?: Loc; chooseBtn?: Loc; note?: Loc;
    basic?: PlanData; premium?: PlanData; prestige?: PlanData;
  } | null;
  comment?: {
    label?: Loc; title?: Loc; sub?: Loc;
    steps?: (LocPair<"title", "desc"> | null)[] | null;
  } | null;
  features?: {
    label?: Loc; title?: Loc;
    items?: (LocPair<"title", "desc"> | null)[] | null;
  } | null;
  prints?: { label?: Loc; title?: Loc; sub?: Loc } | null;
  pourquoi?: {
    label?: Loc; title?: Loc;
    card1Title?: Loc; card1Text?: Loc; stat1Label?: Loc;
    card2Title?: Loc; card2Text?: Loc;
    card3Title?: Loc; card3Text?: Loc; stat2Label?: Loc;
    card4Title?: Loc; card4Text?: Loc;
  } | null;
  events?: {
    label?: Loc; title?: Loc;
    cards?: (LocPair<"tag", "desc"> | null)[] | null;
  } | null;
  contact?: {
    label?: Loc; title?: Loc; sub?: Loc; note?: Loc; btn?: Loc;
    email?: string | null;
  } | null;
  faq?: {
    label?: Loc; title?: Loc;
    items?: (LocPair<"question", "answer"> | null)[] | null;
  } | null;
  nav?: {
    promoBanner?: Loc; navLink1?: Loc; navLink2?: Loc; navLink3?: Loc; navLink4?: Loc;
    reserveBtn?: Loc; cookieText?: Loc; cookieAccept?: Loc; cookieRefuse?: Loc;
  } | null;
  configurateur?: ConfiguratorData | null;
  footer?: {
    copyright?: string | null;
    instagram?: string | null;
    tiktok?: string | null;
    linkedin?: string | null;
  } | null;
} | null;

type PlanData = {
  name?: Loc;
  tagline?: Loc;
  features?: (Loc | null)[] | null;
} | null;

type ConfiguratorData = {
  optionsTitle?: Loc;
  options?: Partial<Record<keyof ConfigTranslation["options"], Loc>> | null;
  formatTitle?: Loc;
  formatDim?: Loc;
  formats?: Partial<Record<"f1" | "f2" | "f4", LocPair<"label", "desc">>> | null;
  messageLabel?: Loc; messageOptional?: Loc; messagePlaceholder?: Loc; charsLeft?: Loc;
  totalLabel?: Loc; remiseApplied?: Loc; travelNote?: Loc; reserveBtn?: Loc;
  formTitle?: Loc; sumFormule?: Loc; sumOptions?: Loc; sumFormat?: Loc; sumMessage?: Loc;
  sumTotal?: Loc; none?: Loc; notSpecified?: Loc;
  dateLabel?: Loc; regionLabel?: Loc; regionPlaceholder?: Loc;
  nameLabel?: Loc; optional?: Loc; namePlaceholder?: Loc;
  emailLabel?: Loc; emailPlaceholder?: Loc; phoneLabel?: Loc; phonePlaceholder?: Loc;
  submitBtn?: Loc; sending?: Loc; successTitle?: Loc; successBody?: Loc; errorAlert?: Loc;
} | null;

export type SiteSettings = {
  contactEmail: string;
  footer: {
    copyright: string;
    instagram: string;
    tiktok: string;
    linkedin: string;
  };
};

export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: "hello@funkyselfie.ch",
  footer: {
    copyright: "© 2026 FunkySelfie · funkyselfie.ch",
    // URLs réseaux sociaux issues du prototype — éditables dans le Studio.
    instagram: "https://www.instagram.com/funkyselfie.ch",
    tiktok: "https://www.tiktok.com/@funkyselfie",
    linkedin: "https://www.linkedin.com/company/funkyselfie",
  },
};

/** Chaîne traduite, repli sur le texte codé en dur si la langue est vide. */
function str(loc: Loc | undefined, lang: Lang, fallback: string): string {
  return loc?.[lang]?.trim() || fallback;
}

/** Valeur simple (non traduite), repli sur la valeur codée en dur. */
function plain(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

/**
 * Liste éditable : si le tableau Sanity contient au moins un élément, il fait foi
 * (ajout/suppression possibles) ; sinon on garde la liste du code. Chaque élément
 * retombe champ par champ sur son homologue de même rang, s'il existe.
 */
function list<S, T>(
  items: (S | null)[] | null | undefined,
  fallback: T[],
  map: (item: S, fallback: T | undefined) => T
): T[] {
  if (!items?.length) return fallback;
  return items
    .map((item, i) => (item ? map(item, fallback[i]) : fallback[i]))
    .filter((item): item is T => Boolean(item));
}

export function buildTranslations(data: SiteTextData): Record<Lang, Translation> {
  const langs: Lang[] = ["fr", "en", "de"];
  return Object.fromEntries(
    langs.map((lang) => [lang, translationFor(data, lang)])
  ) as Record<Lang, Translation>;
}

function translationFor(data: SiteTextData, lang: Lang): Translation {
  const d = translations[lang];
  const hero = data?.hero;
  const f = data?.formules;
  const com = data?.comment;
  const feat = data?.features;
  const pr = data?.prints;
  const pq = data?.pourquoi;
  const ev = data?.events;
  const ct = data?.contact;
  const fq = data?.faq;
  const nv = data?.nav;

  return {
    ...d,
    promoBanner: str(nv?.promoBanner, lang, d.promoBanner),
    navLink1: str(nv?.navLink1, lang, d.navLink1),
    navLink2: str(nv?.navLink2, lang, d.navLink2),
    navLink3: str(nv?.navLink3, lang, d.navLink3),
    navLink4: str(nv?.navLink4, lang, d.navLink4),
    reserveBtn: str(nv?.reserveBtn, lang, d.reserveBtn),
    cookieText: str(nv?.cookieText, lang, d.cookieText),
    cookieAccept: str(nv?.cookieAccept, lang, d.cookieAccept),
    cookieRefuse: str(nv?.cookieRefuse, lang, d.cookieRefuse),

    heroBadge: str(hero?.badge, lang, d.heroBadge),
    heroTitle: str(hero?.title, lang, d.heroTitle),
    heroSub: str(hero?.subtitle, lang, d.heroSub),
    heroBtn1: str(hero?.btn1, lang, d.heroBtn1),
    heroBtn2: str(hero?.btn2, lang, d.heroBtn2),
    trust: list(hero?.trust, d.trust, (item, fb) => str(item, lang, fb ?? "")),

    formulesLabel: str(f?.label, lang, d.formulesLabel),
    formulesTitle: str(f?.title, lang, d.formulesTitle),
    formulesPromo: str(f?.promoSub, lang, d.formulesPromo),
    formulesSub: str(f?.sub, lang, d.formulesSub),
    formuleFrom: str(f?.fromLabel, lang, d.formuleFrom),
    formulePop: str(f?.popular, lang, d.formulePop),
    chooseBtn: str(f?.chooseBtn, lang, d.chooseBtn),
    formulesNote: str(f?.note, lang, d.formulesNote),
    basicName: str(f?.basic?.name, lang, d.basicName),
    basicTag: str(f?.basic?.tagline, lang, d.basicTag),
    premiumName: str(f?.premium?.name, lang, d.premiumName),
    premiumTag: str(f?.premium?.tagline, lang, d.premiumTag),
    prestigeName: str(f?.prestige?.name, lang, d.prestigeName),
    prestigeTag: str(f?.prestige?.tagline, lang, d.prestigeTag),

    commentLabel: str(com?.label, lang, d.commentLabel),
    commentTitle: str(com?.title, lang, d.commentTitle),
    commentSub: str(com?.sub, lang, d.commentSub),
    steps: list(com?.steps, d.steps, (item, fb) => ({
      t: str(item?.title, lang, fb?.t ?? ""),
      d: str(item?.desc, lang, fb?.d ?? ""),
    })),

    featLabel: str(feat?.label, lang, d.featLabel),
    featTitle: str(feat?.title, lang, d.featTitle),
    features: list(feat?.items, d.features, (item, fb) => ({
      t: str(item?.title, lang, fb?.t ?? ""),
      d: str(item?.desc, lang, fb?.d ?? ""),
    })),

    printsLabel: str(pr?.label, lang, d.printsLabel),
    printsTitle: str(pr?.title, lang, d.printsTitle),
    printsSub: str(pr?.sub, lang, d.printsSub),

    pourquoiLabel: str(pq?.label, lang, d.pourquoiLabel),
    pourquoiTitle: str(pq?.title, lang, d.pourquoiTitle),
    b1t: str(pq?.card1Title, lang, d.b1t),
    b1d: str(pq?.card1Text, lang, d.b1d),
    b2: str(pq?.stat1Label, lang, d.b2),
    b3t: str(pq?.card2Title, lang, d.b3t),
    b3d: str(pq?.card2Text, lang, d.b3d),
    b4t: str(pq?.card3Title, lang, d.b4t),
    b4d: str(pq?.card3Text, lang, d.b4d),
    b5: str(pq?.stat2Label, lang, d.b5),
    b6t: str(pq?.card4Title, lang, d.b6t),
    b6d: str(pq?.card4Text, lang, d.b6d),

    eventsLabel: str(ev?.label, lang, d.eventsLabel),
    eventsTitle: str(ev?.title, lang, d.eventsTitle),
    eventCards: list(ev?.cards, d.eventCards, (item, fb) => ({
      tag: str(item?.tag, lang, fb?.tag ?? ""),
      desc: str(item?.desc, lang, fb?.desc ?? ""),
    })),

    contactLabel: str(ct?.label, lang, d.contactLabel),
    contactTitle: str(ct?.title, lang, d.contactTitle),
    contactSub: str(ct?.sub, lang, d.contactSub),
    contactNote: str(ct?.note, lang, d.contactNote),
    contactBtn: str(ct?.btn, lang, d.contactBtn),

    faqLabel: str(fq?.label, lang, d.faqLabel),
    faqTitle: str(fq?.title, lang, d.faqTitle),
    faqs: list(fq?.items, d.faqs, (item, fb) => ({
      q: str(item?.question, lang, fb?.q ?? ""),
      a: str(item?.answer, lang, fb?.a ?? ""),
    })),
  };
}

export function buildConfigTranslations(
  data: SiteTextData
): Record<Lang, ConfigTranslation> {
  const langs: Lang[] = ["fr", "en", "de"];
  return Object.fromEntries(
    langs.map((lang) => [lang, configFor(data, lang)])
  ) as Record<Lang, ConfigTranslation>;
}

function configFor(data: SiteTextData, lang: Lang): ConfigTranslation {
  const d = configTranslations[lang];
  const c = data?.configurateur;
  const f = data?.formules;
  const planFeatures = (plan: PlanData | undefined, fallback: string[]) =>
    list(plan?.features, fallback, (item, fb) => str(item, lang, fb ?? ""));

  const fmt = (id: "f1" | "f2" | "f4") => ({
    label: str(c?.formats?.[id]?.label, lang, d.formats[id].label),
    desc: str(c?.formats?.[id]?.desc, lang, d.formats[id].desc),
  });

  return {
    planFeatures: {
      basic: planFeatures(f?.basic, d.planFeatures.basic),
      premium: planFeatures(f?.premium, d.planFeatures.premium),
      prestige: planFeatures(f?.prestige, d.planFeatures.prestige),
    },
    optionsTitle: str(c?.optionsTitle, lang, d.optionsTitle),
    options: {
      cadre: str(c?.options?.cadre, lang, d.options.cadre),
      fond: str(c?.options?.fond, lang, d.options.fond),
      green: str(c?.options?.green, lang, d.options.green),
      bulles: str(c?.options?.bulles, lang, d.options.bulles),
      livreor: str(c?.options?.livreor, lang, d.options.livreor),
      heure: str(c?.options?.heure, lang, d.options.heure),
      impr: str(c?.options?.impr, lang, d.options.impr),
    },
    formatTitle: str(c?.formatTitle, lang, d.formatTitle),
    formatDim: str(c?.formatDim, lang, d.formatDim),
    formats: { f1: fmt("f1"), f2: fmt("f2"), f4: fmt("f4") },
    messageLabel: str(c?.messageLabel, lang, d.messageLabel),
    messageOptional: str(c?.messageOptional, lang, d.messageOptional),
    messagePlaceholder: str(c?.messagePlaceholder, lang, d.messagePlaceholder),
    charsLeft: str(c?.charsLeft, lang, d.charsLeft),
    totalLabel: str(c?.totalLabel, lang, d.totalLabel),
    remiseApplied: str(c?.remiseApplied, lang, d.remiseApplied),
    travelNote: str(c?.travelNote, lang, d.travelNote),
    reserveBtn: str(c?.reserveBtn, lang, d.reserveBtn),
    formTitle: str(c?.formTitle, lang, d.formTitle),
    sumFormule: str(c?.sumFormule, lang, d.sumFormule),
    sumOptions: str(c?.sumOptions, lang, d.sumOptions),
    sumFormat: str(c?.sumFormat, lang, d.sumFormat),
    sumMessage: str(c?.sumMessage, lang, d.sumMessage),
    sumTotal: str(c?.sumTotal, lang, d.sumTotal),
    none: str(c?.none, lang, d.none),
    notSpecified: str(c?.notSpecified, lang, d.notSpecified),
    dateLabel: str(c?.dateLabel, lang, d.dateLabel),
    regionLabel: str(c?.regionLabel, lang, d.regionLabel),
    regionPlaceholder: str(c?.regionPlaceholder, lang, d.regionPlaceholder),
    nameLabel: str(c?.nameLabel, lang, d.nameLabel),
    optional: str(c?.optional, lang, d.optional),
    namePlaceholder: str(c?.namePlaceholder, lang, d.namePlaceholder),
    emailLabel: str(c?.emailLabel, lang, d.emailLabel),
    emailPlaceholder: str(c?.emailPlaceholder, lang, d.emailPlaceholder),
    phoneLabel: str(c?.phoneLabel, lang, d.phoneLabel),
    phonePlaceholder: str(c?.phonePlaceholder, lang, d.phonePlaceholder),
    submitBtn: str(c?.submitBtn, lang, d.submitBtn),
    sending: str(c?.sending, lang, d.sending),
    successTitle: str(c?.successTitle, lang, d.successTitle),
    successBody: str(c?.successBody, lang, d.successBody),
    errorAlert: str(c?.errorAlert, lang, d.errorAlert),
  };
}

export function buildSettings(data: SiteTextData): SiteSettings {
  const f = data?.footer;
  const def = DEFAULT_SETTINGS;
  return {
    contactEmail: plain(data?.contact?.email, def.contactEmail),
    footer: {
      copyright: plain(f?.copyright, def.footer.copyright),
      instagram: plain(f?.instagram, def.footer.instagram),
      tiktok: plain(f?.tiktok, def.footer.tiktok),
      linkedin: plain(f?.linkedin, def.footer.linkedin),
    },
  };
}
