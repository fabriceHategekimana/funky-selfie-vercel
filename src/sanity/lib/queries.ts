import { defineQuery } from "next-sanity";

export const heroQuery = defineQuery(
  `*[_type == "heroSection"][0] { title, subtitle, ctaText }`
);

export const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(_createdAt asc) { _id, quote, author }`
);

export const faqQuery = defineQuery(
  `*[_type == "faqItem"] | order(order asc) { _id, question, answer }`
);
