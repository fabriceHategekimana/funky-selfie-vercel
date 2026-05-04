import { sanityFetch } from "@/sanity/lib/live";
import { contactQuery } from "@/sanity/lib/queries";
import ContactCard from "./ContactCard";

const FALLBACK = {
  title: "On est là pour vous.",
  subtitle: "Écrivez-nous. On répond sous 48h, sans engagement.",
  email: "hello@funkyselfie.ch",
  note: "Réponse sous 48h · Devis gratuit · Aucun engagement",
};

type ContactData = { title: string | null; subtitle: string | null; email: string | null; note: string | null } | null;

export default async function Contact() {
  const { data } = (await sanityFetch({ query: contactQuery })) as { data: ContactData };

  return (
    <ContactCard
      title={data?.title ?? FALLBACK.title}
      subtitle={data?.subtitle ?? FALLBACK.subtitle}
      email={data?.email ?? FALLBACK.email}
      note={data?.note ?? FALLBACK.note}
    />
  );
}
