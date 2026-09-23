"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  translations as defaultTranslations,
  type Lang,
  type Translation,
} from "@/locales/translations";
import {
  configTranslations as defaultConfigTranslations,
  type ConfigTranslation,
} from "@/locales/configTranslations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Textes de la page dans la langue courante. */
  t: Translation;
  /** Textes du configurateur dans la langue courante. */
  c: ConfigTranslation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "fs_lang";

function isLang(value: string | null): value is Lang {
  return value === "fr" || value === "en" || value === "de";
}

type ProviderProps = {
  children: ReactNode;
  /**
   * Textes résolus côté serveur (Sanity fusionné avec les valeurs de src/locales,
   * cf. src/lib/siteText.ts). Absents = textes du code uniquement.
   */
  translations?: Record<Lang, Translation>;
  configTranslations?: Record<Lang, ConfigTranslation>;
};

export function LanguageProvider({
  children,
  translations = defaultTranslations,
  configTranslations = defaultConfigTranslations,
}: ProviderProps) {
  // SSR + premier rendu client : toujours "fr" pour éviter un mismatch d'hydratation,
  // puis on applique la langue mémorisée dans un effet.
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Hydratation depuis le store externe (localStorage) au montage — exception légitime.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isLang(stored)) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: (next: Lang) => {
        setLangState(next);
        localStorage.setItem(STORAGE_KEY, next);
      },
      t: translations[lang],
      c: configTranslations[lang],
    }),
    [lang, translations, configTranslations]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
