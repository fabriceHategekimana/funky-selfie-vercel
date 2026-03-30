import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const heroSection = defineType({
  name: "heroSection",
  title: "Section Hero",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre principal (h1)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaText",
      title: "Texte du bouton CTA",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});
