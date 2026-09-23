import { defineField, defineType } from "sanity";

// Traduction au niveau du champ : chaque chaîne éditable est un objet { fr, en, de }.
// Le français fait office de référence ; si une langue est laissée vide, le site
// retombe sur le texte codé en dur dans src/locales (cf. src/lib/siteText.ts).
const LANGS = [
  { name: "fr", title: "Français" },
  { name: "en", title: "English" },
  { name: "de", title: "Deutsch" },
] as const;

export const localeString = defineType({
  name: "localeString",
  title: "Texte (3 langues)",
  type: "object",
  options: { columns: 1 },
  fields: LANGS.map((l) =>
    defineField({ name: l.name, title: l.title, type: "string" })
  ),
});

export const localeText = defineType({
  name: "localeText",
  title: "Texte long (3 langues)",
  type: "object",
  options: { columns: 1 },
  fields: LANGS.map((l) =>
    defineField({ name: l.name, title: l.title, type: "text", rows: 3 })
  ),
});
