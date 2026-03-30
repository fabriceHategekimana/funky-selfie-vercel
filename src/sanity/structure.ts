import type { StructureResolver } from "sanity/structure";
import { HomeIcon } from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Section Hero")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("heroSection")
            .documentId("a6d56e4f-a429-4e53-a7b9-bb4640fbb087")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "heroSection"
      ),
    ]);
