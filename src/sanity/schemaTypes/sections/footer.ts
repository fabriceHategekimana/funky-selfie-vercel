import { defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { singleton } from "../helpers";

export const footer = singleton({
  name: "footer",
  title: "Pied de page",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "copyright",
      title: "Ligne de copyright",
      description: "Identique dans les trois langues. Ex. : © 2026 FunkySelfie · funkyselfie.ch",
      type: "string",
    }),
    defineField({ name: "instagram", title: "Lien Instagram", type: "url" }),
    defineField({ name: "tiktok", title: "Lien TikTok", type: "url" }),
    defineField({ name: "linkedin", title: "Lien LinkedIn", type: "url" }),
  ],
});
