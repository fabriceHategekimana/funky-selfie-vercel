import { defineArrayMember, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

export const comment = singleton({
  name: "comment",
  title: "3. Comment ça marche",
  icon: HelpCircleIcon,
  fields: [
    locString("label", "Surtitre"),
    locString("title", "Titre de section"),
    locText("sub", "Sous-titre"),
    defineField({
      name: "steps",
      title: "Étapes",
      description: "6 étapes dans la maquette. L'icône de chaque étape est fixée par le design.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [locString("title", "Titre de l'étape"), locText("desc", "Description")],
          preview: { select: { title: "title.fr", subtitle: "desc.fr" } },
        }),
      ],
    }),
  ],
});
