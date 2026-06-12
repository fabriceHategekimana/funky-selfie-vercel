import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const promoSettings = defineType({
  name: "promoSettings",
  title: "Promo",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "enabled",
      title: "Promo activée",
      description:
        "Interrupteur principal. Si désactivé, aucune remise n'est appliquée (prix pleins, bannière masquée).",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "percentage",
      title: "Pourcentage de remise (%)",
      description: "Ex. 10, 20, 25. Appliqué aux formules ET aux options.",
      type: "number",
      validation: (r) => r.min(0).max(90),
      initialValue: 20,
    }),
    defineField({
      name: "startDate",
      title: "Date de début (optionnel)",
      description:
        "Si renseignée, la promo ne s'active qu'à partir de cette date. Laisser vide = active immédiatement.",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "Date de fin (optionnel)",
      description:
        "Si renseignée, la promo s'arrête après cette date. Laisser vide = sans date de fin.",
      type: "datetime",
    }),
    defineField({
      name: "label",
      title: "Libellé interne (optionnel)",
      description: "Ex. « Offre de Noël ». Non affiché publiquement.",
      type: "string",
    }),
  ],
  preview: {
    select: { enabled: "enabled", percentage: "percentage", label: "label" },
    prepare({ enabled, percentage, label }) {
      return {
        title: label || "Promo",
        subtitle: enabled ? `Activée — ${percentage ?? 0}%` : "Désactivée",
      };
    },
  },
});
