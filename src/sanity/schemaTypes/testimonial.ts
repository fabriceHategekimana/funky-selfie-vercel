import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const testimonial = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});
