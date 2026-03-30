import type { StructureResolver } from "sanity/structure";
import { HomeIcon, EnvelopeIcon, DocumentIcon } from "@sanity/icons";

const SINGLETONS = ["heroSection", "contactSection", "footerSection"];

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
      S.listItem()
        .title("Section Contact")
        .icon(EnvelopeIcon)
        .child(
          S.document()
            .schemaType("contactSection")
            .documentId("3427fda4-79ec-4e73-9c02-851604367ee9")
        ),
      S.listItem()
        .title("Footer")
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType("footerSection")
            .documentId("2c653873-5542-4c48-a0af-0272f370f63b")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? "")
      ),
    ]);
