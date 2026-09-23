import { defineArrayMember, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

const plan = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: false },
    fields: [
      locString("name", "Nom de la formule"),
      locString("tagline", "Accroche (sous le nom)"),
      defineField({
        name: "features",
        title: "Ce qui est inclus (liste à puces)",
        type: "array",
        of: [defineArrayMember({ type: "localeString" })],
      }),
    ],
  });

export const formules = singleton({
  name: "formules",
  title: "2. Formules & prix",
  icon: TagIcon,
  fields: [
    locString("label", "Surtitre"),
    locString("title", "Titre de section"),
    locString(
      "promoSub",
      "Sous-titre affiché quand la promo est active",
      "Le placeholder {pct} est remplacé par le pourcentage de remise."
    ),
    locString("sub", "Sous-titre affiché hors promo"),
    locString("fromLabel", "Mention « À partir de »"),
    locString("popular", "Badge de la formule mise en avant"),
    locString("chooseBtn", "Bouton des cartes"),
    locText("note", "Note sous les cartes (déplacement, options…)"),
    plan("basic", "Formule Basic"),
    plan("premium", "Formule Premium"),
    plan("prestige", "Formule Prestige"),
  ],
});
