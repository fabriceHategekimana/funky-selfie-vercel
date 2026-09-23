import { defineQuery } from "next-sanity";

// Tous les documents éditables sont des singletons dont l'_id est fixe
// (cf. src/sanity/structure.ts) : une seule requête suffit pour toute la page.
export const siteTextQuery = defineQuery(`{
  "hero": *[_id == "hero"][0],
  "formules": *[_id == "formules"][0],
  "comment": *[_id == "comment"][0],
  "features": *[_id == "features"][0],
  "prints": *[_id == "prints"][0],
  "pourquoi": *[_id == "pourquoi"][0],
  "events": *[_id == "events"][0],
  "contact": *[_id == "contact"][0],
  "faq": *[_id == "faq"][0],
  "nav": *[_id == "nav"][0],
  "configurateur": *[_id == "configurateur"][0],
  "footer": *[_id == "footer"][0]
}`);

export const promoQuery = defineQuery(
  `*[_type == "promoSettings"][0] { enabled, percentage, startDate, endDate, label }`
);
