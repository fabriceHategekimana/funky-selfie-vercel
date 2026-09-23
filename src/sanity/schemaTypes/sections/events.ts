import { defineArrayMember, defineField } from "sanity";
import { CalendarIcon } from "@sanity/icons";
import { locString, singleton } from "../helpers";

export const events = singleton({
  name: "events",
  title: "7. Types d'événements",
  icon: CalendarIcon,
  fields: [
    locString("label", "Surtitre"),
    locString("title", "Titre de section"),
    defineField({
      name: "cards",
      title: "Cartes du carrousel",
      description:
        "9 cartes dans la maquette, associées dans l'ordre aux photos /images/v9/event-1…9.jpg. Au-delà de 9, les photos se répètent.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "card",
          fields: [locString("tag", "Étiquette"), locString("desc", "Description")],
          preview: { select: { title: "tag.fr", subtitle: "desc.fr" } },
        }),
      ],
    }),
  ],
});
