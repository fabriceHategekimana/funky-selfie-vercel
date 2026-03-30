import { type SchemaTypeDefinition } from "sanity";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonial, faqItem],
};
