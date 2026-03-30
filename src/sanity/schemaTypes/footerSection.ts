import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const footerSection = defineType({
  name: "footerSection",
  title: "Footer",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "tagline",
      title: "Accroche",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoText",
      title: "Texte SEO",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "copyright",
      title: "Mention copyright",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});
