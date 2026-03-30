import { defineQuery } from "next-sanity";

export const contactQuery = defineQuery(
  `*[_type == "contactSection"][0] { title, subtitle, email, note }`
);

export const footerQuery = defineQuery(
  `*[_type == "footerSection"][0] { tagline, seoText, copyright }`
);

export const heroQuery = defineQuery(
  `*[_type == "heroSection"][0] { title, subtitle, ctaText }`
);

export const servicesQuery = defineQuery(
  `*[_type == "service"] | order(order asc) { _id, title, description, featured, image { asset->, alt } }`
);

export const featuresQuery = defineQuery(
  `*[_type == "feature"] | order(order asc) { _id, title, description }`
);

export const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(_createdAt asc) { _id, quote, author }`
);

export const faqQuery = defineQuery(
  `*[_type == "faqItem"] | order(order asc) { _id, question, answer }`
);
