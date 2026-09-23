import { defineArrayMember, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

export const hero = singleton({
  name: "hero",
  title: "1. Hero (haut de page)",
  icon: HomeIcon,
  fields: [
    locString("badge", "Badge (pastille au-dessus du titre)"),
    locText(
      "title",
      "Titre principal (h1)",
      "La balise <em>…</em> colore une partie du titre en turquoise. Ex. : Faites de votre événement, <em>celui dont tout le monde parle !</em>"
    ),
    locText("subtitle", "Sous-titre"),
    locString("btn1", "Bouton 1 (vers les formules)"),
    locString("btn2", "Bouton 2 (vers « comment ça marche »)"),
    defineField({
      name: "trust",
      title: "Arguments de réassurance (✓)",
      description: "4 éléments dans la maquette. Vous pouvez en ajouter ou en retirer.",
      type: "array",
      of: [defineArrayMember({ type: "localeString" })],
    }),
  ],
});
