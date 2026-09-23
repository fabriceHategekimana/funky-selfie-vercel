import { MenuIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

export const nav = singleton({
  name: "nav",
  title: "Navigation & bandeaux",
  icon: MenuIcon,
  fields: [
    locString(
      "promoBanner",
      "Bandeau promo (texte défilant)",
      "Le placeholder {pct} est remplacé par le pourcentage défini dans « Promo »."
    ),
    locString("navLink1", "Menu — lien 1 (ancre #formules)"),
    locString("navLink2", "Menu — lien 2 (ancre #pourquoi)"),
    locString("navLink3", "Menu — lien 3 (ancre #comment)"),
    locString("navLink4", "Menu — lien 4 (ancre #contact)"),
    locString("reserveBtn", "Bouton « Réserver »"),
    locText(
      "cookieText",
      "Bandeau cookies — texte",
      'Le lien HTML <a href="/privacy">…</a> est autorisé et pointe vers la politique de confidentialité.'
    ),
    locString("cookieAccept", "Bandeau cookies — bouton accepter"),
    locString("cookieRefuse", "Bandeau cookies — bouton refuser"),
  ],
});
