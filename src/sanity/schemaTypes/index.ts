import { type SchemaTypeDefinition } from "sanity";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";
import { heroSection } from "./heroSection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSection, testimonial, faqItem],
};
