"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ResolvedPromo } from "@/lib/promo";

const PromoContext = createContext<ResolvedPromo>({ active: false, percentage: 0 });

// La valeur est calculée côté serveur (layout) et figée au rendu.
export function PromoProvider({
  value,
  children,
}: {
  value: ResolvedPromo;
  children: ReactNode;
}) {
  return <PromoContext.Provider value={value}>{children}</PromoContext.Provider>;
}

export function usePromo(): ResolvedPromo {
  return useContext(PromoContext);
}
