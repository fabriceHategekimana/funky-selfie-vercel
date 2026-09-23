import type { StructureResolver } from "sanity/structure";
import { schema } from "./schemaTypes";

// Tous les documents du Studio sont des singletons : un seul exemplaire, ouvert
// directement depuis le menu. L'_id est fixe et identique au nom du type, ce qui
// permet aux requêtes GROQ de cibler `*[_id == "hero"][0]` sans ambiguïté.
const SECTIONS = [
  "hero",
  "formules",
  "comment",
  "features",
  "prints",
  "pourquoi",
  "events",
  "contact",
  "faq",
] as const;

const GLOBALS = ["nav", "configurateur", "footer", "promoSettings"] as const;

const titleOf = (name: string) =>
  schema.types.find((t) => t.name === name)?.title ?? name;

export const structure: StructureResolver = (S) => {
  const item = (name: string) =>
    S.listItem()
      .id(name)
      .title(titleOf(name))
      .child(S.document().schemaType(name).documentId(name).title(titleOf(name)));

  return S.list()
    .title("Contenu du site")
    .items([
      ...SECTIONS.map(item),
      S.divider(),
      ...GLOBALS.map(item),
    ]);
};
