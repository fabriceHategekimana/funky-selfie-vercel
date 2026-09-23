import { ImageIcon } from "@sanity/icons";
import { locString, locText, singleton } from "../helpers";

export const prints = singleton({
  name: "prints",
  title: "5. Vos souvenirs (impressions)",
  icon: ImageIcon,
  fields: [
    locString("label", "Surtitre"),
    locString("title", "Titre de section"),
    locText("sub", "Sous-titre"),
  ],
});
