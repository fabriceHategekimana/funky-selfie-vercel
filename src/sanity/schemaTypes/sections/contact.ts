import { defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

export const contact = singleton({
  name: "contact",
  title: "8. Contact",
  icon: EnvelopeIcon,
  fields: [
    locString("label", "Surtitre"),
    locString("title", "Titre de section"),
    locText("sub", "Sous-titre"),
    locString("note", "Petite note sous l'adresse e-mail"),
    locString("btn", "Bouton d'envoi"),
    defineField({
      name: "email",
      title: "Adresse e-mail affichée",
      description: "Identique dans les trois langues. Utilisée pour le lien mailto:.",
      type: "string",
    }),
  ],
});
