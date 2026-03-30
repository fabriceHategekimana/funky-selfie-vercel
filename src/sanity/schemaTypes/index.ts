import { type SchemaTypeDefinition } from "sanity";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";
import { heroSection } from "./heroSection";
import { feature } from "./feature";
import { service } from "./service";
import { contactSection } from "./contactSection";
import { footerSection } from "./footerSection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSection, feature, service, testimonial, faqItem, contactSection, footerSection],
};
