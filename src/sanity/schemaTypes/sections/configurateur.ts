import { defineField, type FieldDefinition } from "sanity";
import { ControlsIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

const group =
  (name: string) =>
  (field: FieldDefinition): FieldDefinition => ({ ...field, group: name });

const opt = group("options");
const fmt = group("format");
const tot = group("total");
const frm = group("form");

const formatFields = (title: string) =>
  defineField({
    name: title,
    title,
    type: "object",
    fields: [locString("label", "Libellé"), locText("desc", "Description")],
  });

export const configurateur = singleton({
  name: "configurateur",
  title: "Configurateur de devis",
  icon: ControlsIcon,
  groups: [
    { name: "options", title: "Options", default: true },
    { name: "format", title: "Format & message" },
    { name: "total", title: "Total & réservation" },
    { name: "form", title: "Formulaire" },
  ],
  fields: [
    opt(locString("optionsTitle", "Titre du bloc « Options »")),
    opt(
      defineField({
        name: "options",
        title: "Libellés des options",
        description: "Les prix restent définis dans le code (ConfiguratorPanel.tsx).",
        type: "object",
        options: { collapsible: true, collapsed: false },
        fields: [
          locString("cadre", "Cadre photo personnalisé"),
          locString("fond", "Fond backdrop standard"),
          locString("green", "Fond vert green screen"),
          locString("bulles", "Machine à bulles"),
          locString("livreor", "Livre d'or photo"),
          locString("heure", "Heure supplémentaire"),
          locString("impr", "100 impressions supplémentaires"),
        ],
      })
    ),
    fmt(locString("formatTitle", "Titre du bloc « Format de collage »")),
    fmt(locString("formatDim", "Dimensions affichées (ex. 10x15 cm)")),
    fmt(
      defineField({
        name: "formats",
        title: "Formats de collage",
        type: "object",
        options: { collapsible: true, collapsed: false },
        fields: [
          { ...formatFields("f1"), title: "1 grande photo" },
          { ...formatFields("f2"), title: "2 photos" },
          { ...formatFields("f4"), title: "4 photos en grille" },
        ],
      })
    ),
    fmt(locString("messageLabel", "Libellé du champ message")),
    fmt(locString("messageOptional", "Mention « (optionnel) » du message")),
    fmt(locString("messagePlaceholder", "Exemple affiché dans le champ message")),
    fmt(
      locString("charsLeft", "Compteur de caractères", "Le placeholder {n} est remplacé par le nombre restant.")
    ),
    tot(locString("totalLabel", "Libellé « Total estimé »")),
    tot(
      locString("remiseApplied", "Mention de remise", "Le placeholder {pct} est remplacé par le pourcentage.")
    ),
    tot(locText("travelNote", "Note sur les frais de déplacement")),
    tot(locString("reserveBtn", "Bouton « Réserver ce photobooth »")),
    frm(locString("formTitle", "Titre du formulaire")),
    frm(locString("sumFormule", "Récapitulatif — ligne Formule")),
    frm(locString("sumOptions", "Récapitulatif — ligne Options")),
    frm(locString("sumFormat", "Récapitulatif — ligne Format")),
    frm(locString("sumMessage", "Récapitulatif — ligne Message")),
    frm(locString("sumTotal", "Récapitulatif — ligne Total")),
    frm(locString("none", "Valeur « Aucune »")),
    frm(locString("notSpecified", "Valeur « Non précisé »")),
    frm(locString("dateLabel", "Champ date — libellé")),
    frm(locString("regionLabel", "Champ région — libellé")),
    frm(locString("regionPlaceholder", "Champ région — exemple")),
    frm(locString("nameLabel", "Champ nom — libellé")),
    frm(locString("optional", "Mention « (optionnel) »")),
    frm(locString("namePlaceholder", "Champ nom — exemple")),
    frm(locString("emailLabel", "Champ e-mail — libellé")),
    frm(locString("emailPlaceholder", "Champ e-mail — exemple")),
    frm(locString("phoneLabel", "Champ téléphone — libellé")),
    frm(locString("phonePlaceholder", "Champ téléphone — exemple")),
    frm(locString("submitBtn", "Bouton d'envoi")),
    frm(locString("sending", "Texte pendant l'envoi")),
    frm(locString("successTitle", "Message de confirmation — titre")),
    frm(locText("successBody", "Message de confirmation — texte")),
    frm(locString("errorAlert", "Message d'erreur d'envoi")),
  ],
});
