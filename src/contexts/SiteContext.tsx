"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/siteText";

// Réglages non traduits (adresse e-mail, liens réseaux sociaux, copyright),
// résolus côté serveur depuis Sanity puis injectés dans l'arbre client.
const SiteContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function SiteProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: ReactNode;
}) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteSettings {
  return useContext(SiteContext);
}
