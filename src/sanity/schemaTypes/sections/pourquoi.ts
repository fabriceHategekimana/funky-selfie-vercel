import { SparklesIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

export const pourquoi = singleton({
  name: "pourquoi",
  title: "6. Pourquoi FunkySelfie",
  icon: SparklesIcon,
  fields: [
    locString("label", "Surtitre"),
    locString("title", "Titre de section"),
    locString("card1Title", "Carte 1 🚚 — titre"),
    locText("card1Text", "Carte 1 🚚 — texte"),
    locString("stat1Label", "Carte « 48h » — légende"),
    locString("card2Title", "Carte 2 🎨 — titre"),
    locText("card2Text", "Carte 2 🎨 — texte"),
    locString("card3Title", "Carte 3 📲 — titre"),
    locText("card3Text", "Carte 3 📲 — texte"),
    locString("stat2Label", "Carte « 100% » — légende"),
    locString("card4Title", "Carte 4 📍 — titre"),
    locText("card4Text", "Carte 4 📍 — texte"),
  ],
});
