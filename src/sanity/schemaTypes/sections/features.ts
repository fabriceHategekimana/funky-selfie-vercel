import { defineArrayMember, defineField } from "sanity";
import { StarIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

export const features = singleton({
  name: "features",
  title: "4. Notre photobooth (Le Funky)",
  icon: StarIcon,
  fields: [
    locString("label", "Surtitre"),
    locString("title", "Titre de section"),
    defineField({
      name: "items",
      title: "Caractéristiques",
      description: "4 éléments dans la maquette. L'icône de chaque ligne est fixée par le design.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "item",
          fields: [locString("title", "Titre"), locText("desc", "Description")],
          preview: { select: { title: "title.fr", subtitle: "desc.fr" } },
        }),
      ],
    }),
  ],
});
