/**
 * Amorce le Studio avec les textes actuels du site (src/locales) afin que Déborah
 * retrouve dans Sanity exactement ce qui est en ligne, plutôt que des champs vides.
 *
 *   npx sanity login                 # une seule fois
 *   npm run seed:content             # crée les documents manquants
 *   npm run seed:content -- --force  # écrase aussi les documents déjà remplis
 *   npm run seed:content -- --dry-run # vérifie sans rien écrire
 *
 * Sans --force, aucun contenu déjà saisi dans le Studio n'est modifié.
 */
import { getCliClient } from "sanity/cli";
import { translations, type Lang, type Translation } from "../src/locales/translations";
import {
  configTranslations,
  type ConfigTranslation,
} from "../src/locales/configTranslations";

const LANGS: Lang[] = ["fr", "en", "de"];
const force = process.argv.includes("--force");
// --dry-run : construit les documents et les affiche sans rien écrire.
const dryRun = process.argv.includes("--dry-run");

// projectId / dataset viennent de sanity.cli.ts ; le token vient de `sanity login`
// (option --with-user-token, ajoutée par le script npm).
const client = getCliClient({ apiVersion: "2026-03-30" });

type Loc = { _type: string; fr: string; en: string; de: string };

const loc = (type: string, pick: (t: Translation) => string): Loc =>
  ({ _type: type, ...Object.fromEntries(LANGS.map((l) => [l, pick(translations[l])])) }) as Loc;
const cloc = (type: string, pick: (c: ConfigTranslation) => string): Loc =>
  ({ _type: type, ...Object.fromEntries(LANGS.map((l) => [l, pick(configTranslations[l])])) }) as Loc;

/** Chaîne courte traduite. */
const s = (pick: (t: Translation) => string) => loc("localeString", pick);
/** Paragraphe traduit. */
const x = (pick: (t: Translation) => string) => loc("localeText", pick);
const cs = (pick: (c: ConfigTranslation) => string) => cloc("localeString", pick);
const cx = (pick: (c: ConfigTranslation) => string) => cloc("localeText", pick);

const keyed = <T,>(items: T[], prefix: string) =>
  items.map((item, i) => ({ ...item, _key: `${prefix}${i}` }));

const fr = translations.fr;
const cfr = configTranslations.fr;

const planFeatures = (plan: "basic" | "premium" | "prestige") =>
  keyed(
    cfr.planFeatures[plan].map((_, i) => cs((c) => c.planFeatures[plan][i] ?? "")),
    "f"
  );

// Le typage fin des documents est assuré par le schéma Sanity, pas ici.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SeedDoc = { _id: string; _type: string } & Record<string, any>;

const documents: SeedDoc[] = [
  {
    _id: "hero",
    _type: "hero",
    badge: s((t) => t.heroBadge),
    title: x((t) => t.heroTitle),
    subtitle: x((t) => t.heroSub),
    btn1: s((t) => t.heroBtn1),
    btn2: s((t) => t.heroBtn2),
    trust: keyed(fr.trust.map((_, i) => s((t) => t.trust[i] ?? "")), "t"),
  },
  {
    _id: "formules",
    _type: "formules",
    label: s((t) => t.formulesLabel),
    title: s((t) => t.formulesTitle),
    promoSub: s((t) => t.formulesPromo),
    sub: s((t) => t.formulesSub),
    fromLabel: s((t) => t.formuleFrom),
    popular: s((t) => t.formulePop),
    chooseBtn: s((t) => t.chooseBtn),
    note: x((t) => t.formulesNote),
    basic: {
      name: s((t) => t.basicName),
      tagline: s((t) => t.basicTag),
      features: planFeatures("basic"),
    },
    premium: {
      name: s((t) => t.premiumName),
      tagline: s((t) => t.premiumTag),
      features: planFeatures("premium"),
    },
    prestige: {
      name: s((t) => t.prestigeName),
      tagline: s((t) => t.prestigeTag),
      features: planFeatures("prestige"),
    },
  },
  {
    _id: "comment",
    _type: "comment",
    label: s((t) => t.commentLabel),
    title: s((t) => t.commentTitle),
    sub: x((t) => t.commentSub),
    steps: keyed(
      fr.steps.map((_, i) => ({
        _type: "step",
        title: s((t) => t.steps[i]?.t ?? ""),
        desc: x((t) => t.steps[i]?.d ?? ""),
      })),
      "s"
    ),
  },
  {
    _id: "features",
    _type: "features",
    label: s((t) => t.featLabel),
    title: s((t) => t.featTitle),
    items: keyed(
      fr.features.map((_, i) => ({
        _type: "item",
        title: s((t) => t.features[i]?.t ?? ""),
        desc: x((t) => t.features[i]?.d ?? ""),
      })),
      "i"
    ),
  },
  {
    _id: "prints",
    _type: "prints",
    label: s((t) => t.printsLabel),
    title: s((t) => t.printsTitle),
    sub: x((t) => t.printsSub),
  },
  {
    _id: "pourquoi",
    _type: "pourquoi",
    label: s((t) => t.pourquoiLabel),
    title: s((t) => t.pourquoiTitle),
    card1Title: s((t) => t.b1t),
    card1Text: x((t) => t.b1d),
    stat1Label: s((t) => t.b2),
    card2Title: s((t) => t.b3t),
    card2Text: x((t) => t.b3d),
    card3Title: s((t) => t.b4t),
    card3Text: x((t) => t.b4d),
    stat2Label: s((t) => t.b5),
    card4Title: s((t) => t.b6t),
    card4Text: x((t) => t.b6d),
  },
  {
    _id: "events",
    _type: "events",
    label: s((t) => t.eventsLabel),
    title: s((t) => t.eventsTitle),
    cards: keyed(
      fr.eventCards.map((_, i) => ({
        _type: "card",
        tag: s((t) => t.eventCards[i]?.tag ?? ""),
        desc: s((t) => t.eventCards[i]?.desc ?? ""),
      })),
      "c"
    ),
  },
  {
    _id: "contact",
    _type: "contact",
    label: s((t) => t.contactLabel),
    title: s((t) => t.contactTitle),
    sub: x((t) => t.contactSub),
    note: s((t) => t.contactNote),
    btn: s((t) => t.contactBtn),
    email: "hello@funkyselfie.ch",
  },
  {
    _id: "faq",
    _type: "faq",
    label: s((t) => t.faqLabel),
    title: s((t) => t.faqTitle),
    items: keyed(
      fr.faqs.map((_, i) => ({
        _type: "item",
        question: s((t) => t.faqs[i]?.q ?? ""),
        answer: x((t) => t.faqs[i]?.a ?? ""),
      })),
      "q"
    ),
  },
  {
    _id: "nav",
    _type: "nav",
    promoBanner: s((t) => t.promoBanner),
    navLink1: s((t) => t.navLink1),
    navLink2: s((t) => t.navLink2),
    navLink3: s((t) => t.navLink3),
    navLink4: s((t) => t.navLink4),
    reserveBtn: s((t) => t.reserveBtn),
    cookieText: x((t) => t.cookieText),
    cookieAccept: s((t) => t.cookieAccept),
    cookieRefuse: s((t) => t.cookieRefuse),
  },
  {
    _id: "configurateur",
    _type: "configurateur",
    optionsTitle: cs((c) => c.optionsTitle),
    options: {
      cadre: cs((c) => c.options.cadre),
      fond: cs((c) => c.options.fond),
      green: cs((c) => c.options.green),
      bulles: cs((c) => c.options.bulles),
      livreor: cs((c) => c.options.livreor),
      heure: cs((c) => c.options.heure),
      impr: cs((c) => c.options.impr),
    },
    formatTitle: cs((c) => c.formatTitle),
    formatDim: cs((c) => c.formatDim),
    formats: {
      f1: { label: cs((c) => c.formats.f1.label), desc: cx((c) => c.formats.f1.desc) },
      f2: { label: cs((c) => c.formats.f2.label), desc: cx((c) => c.formats.f2.desc) },
      f4: { label: cs((c) => c.formats.f4.label), desc: cx((c) => c.formats.f4.desc) },
    },
    messageLabel: cs((c) => c.messageLabel),
    messageOptional: cs((c) => c.messageOptional),
    messagePlaceholder: cs((c) => c.messagePlaceholder),
    charsLeft: cs((c) => c.charsLeft),
    totalLabel: cs((c) => c.totalLabel),
    remiseApplied: cs((c) => c.remiseApplied),
    travelNote: cx((c) => c.travelNote),
    reserveBtn: cs((c) => c.reserveBtn),
    formTitle: cs((c) => c.formTitle),
    sumFormule: cs((c) => c.sumFormule),
    sumOptions: cs((c) => c.sumOptions),
    sumFormat: cs((c) => c.sumFormat),
    sumMessage: cs((c) => c.sumMessage),
    sumTotal: cs((c) => c.sumTotal),
    none: cs((c) => c.none),
    notSpecified: cs((c) => c.notSpecified),
    dateLabel: cs((c) => c.dateLabel),
    regionLabel: cs((c) => c.regionLabel),
    regionPlaceholder: cs((c) => c.regionPlaceholder),
    nameLabel: cs((c) => c.nameLabel),
    optional: cs((c) => c.optional),
    namePlaceholder: cs((c) => c.namePlaceholder),
    emailLabel: cs((c) => c.emailLabel),
    emailPlaceholder: cs((c) => c.emailPlaceholder),
    phoneLabel: cs((c) => c.phoneLabel),
    phonePlaceholder: cs((c) => c.phonePlaceholder),
    submitBtn: cs((c) => c.submitBtn),
    sending: cs((c) => c.sending),
    successTitle: cs((c) => c.successTitle),
    successBody: cx((c) => c.successBody),
    errorAlert: cs((c) => c.errorAlert),
  },
  {
    _id: "footer",
    _type: "footer",
    // Mêmes valeurs que DEFAULT_SETTINGS dans src/lib/siteText.ts.
    copyright: "© 2026 FunkySelfie · funkyselfie.ch",
    instagram: "https://www.instagram.com/funkyselfie.ch",
    tiktok: "https://www.tiktok.com/@funkyselfie",
    linkedin: "https://www.linkedin.com/company/funkyselfie",
  },
];

async function main() {
  const ids = documents.map((d) => d._id).join(", ");

  if (dryRun) {
    console.log(JSON.stringify(documents, null, 2));
    console.log(`\n${documents.length} documents prêts : ${ids}`);
    return;
  }

  const tx = documents.reduce(
    (t, doc) => (force ? t.createOrReplace(doc) : t.createIfNotExists(doc)),
    client.transaction()
  );
  await tx.commit();
  console.log(
    `${documents.length} documents ${
      force ? "écrasés" : "créés (ceux déjà présents sont inchangés)"
    } : ${ids}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
