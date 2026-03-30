import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactSection = defineType({
  name: "contactSection",
  title: "Section Contact",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "Adresse email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "note",
      title: "Note de bas de section",
      type: "string",
    }),
  ],
});
