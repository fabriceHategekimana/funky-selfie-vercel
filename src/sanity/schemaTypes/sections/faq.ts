import { defineArrayMember, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

export const faq = singleton({
  name: "faq",
  title: "9. FAQ",
  icon: HelpCircleIcon,
  fields: [
    locString("label", "Surtitre"),
    locString("title", "Titre de section"),
    defineField({
      name: "items",
      title: "Questions / réponses",
      description:
        "Ces questions alimentent aussi les données structurées FAQ envoyées à Google.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "item",
          fields: [locString("question", "Question"), locText("answer", "Réponse")],
          preview: { select: { title: "question.fr", subtitle: "answer.fr" } },
        }),
      ],
    }),
  ],
});
