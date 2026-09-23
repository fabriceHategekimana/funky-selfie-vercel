import { type SchemaTypeDefinition } from "sanity";
import { localeString, localeText } from "./locale";
import { promoSettings } from "./promoSettings";
import { nav } from "./sections/nav";
import { hero } from "./sections/hero";
import { formules } from "./sections/formules";
import { comment } from "./sections/comment";
import { features } from "./sections/features";
import { prints } from "./sections/prints";
import { pourquoi } from "./sections/pourquoi";
import { events } from "./sections/events";
import { contact } from "./sections/contact";
import { faq } from "./sections/faq";
import { configurateur } from "./sections/configurateur";
import { footer } from "./sections/footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Types de champs réutilisables (traduction FR/EN/DE au niveau du champ).
    localeString,
    localeText,
    // Sections de la page d'accueil, dans l'ordre d'affichage.
    hero,
    formules,
    comment,
    features,
    prints,
    pourquoi,
    events,
    contact,
    faq,
    // Éléments transverses.
    nav,
    configurateur,
    footer,
    promoSettings,
  ],
};
