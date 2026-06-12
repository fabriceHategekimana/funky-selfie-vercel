"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Consent = "accepted" | "refused" | null;

type ConsentContextValue = {
  consent: Consent;
  /** false tant que le localStorage n'a pas été lu (évite flash / double-chargement) */
  ready: boolean;
  setConsent: (choice: Exclude<Consent, null>) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

const STORAGE_KEY = "fs_cookies";

function isConsent(v: string | null): v is Exclude<Consent, null> {
  return v === "accepted" || v === "refused";
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydratation depuis le store externe (localStorage) au montage — exception légitime.
    const stored = localStorage.getItem(STORAGE_KEY);
    /* eslint-disable react-hooks/set-state-in-effect */
    if (isConsent(stored)) setConsentState(stored);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setConsent = (choice: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setConsentState(choice);
  };

  return (
    <ConsentContext.Provider value={{ consent, ready, setConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
