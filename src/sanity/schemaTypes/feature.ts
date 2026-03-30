import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const feature = defineType({
  name: "feature",
  title: "Avantage",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
  ],
});
