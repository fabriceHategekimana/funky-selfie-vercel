import { defineField, defineType, type FieldDefinition } from "sanity";

/** Champ « chaîne courte » traduit FR/EN/DE. */
export const locString = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: "localeString" });

/** Champ « paragraphe » traduit FR/EN/DE. */
export const locText = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: "localeText" });

/** Document singleton : un seul exemplaire, ouvert directement depuis le menu du Studio. */
export const singleton = (args: {
  name: string;
  title: string;
  icon?: React.ComponentType;
  description?: string;
  fields: FieldDefinition[];
  groups?: { name: string; title: string; default?: boolean }[];
}) =>
  defineType({
    name: args.name,
    title: args.title,
    type: "document",
    icon: args.icon,
    groups: args.groups,
    fields: args.fields,
    preview: { prepare: () => ({ title: args.title }) },
  });
