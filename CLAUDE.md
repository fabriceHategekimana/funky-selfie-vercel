# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FunkySelfie is a single-page marketing website for a photobooth rental business in Switzerland. All user-facing text is in **French (fr_CH locale)**. The page is composed of sections that can be added or removed; new sections often originate from standalone HTML files.

## Commands

```bash
npm run dev       # Start dev server (Turbopack) on http://localhost:3000
npm run build     # Production build — also runs TypeScript checks
npm run start     # Serve production build
npm run lint      # ESLint (flat config, eslint 9)
npm run section path/to/file.html [ComponentName]  # Convert standalone HTML → styled-components section
npm run seed:content              # Pousse les textes de src/locales dans Sanity (documents manquants uniquement)
npm run seed:content -- --force   # Idem, mais écrase les documents déjà remplis
npm run seed:content -- --dry-run # Affiche les documents sans rien écrire
npx sanity schema validate        # Vérifie les schémas du Studio
```

`seed:content` passe par `sanity exec --with-user-token` : il faut être connecté (`npx sanity login`) ou fournir `SANITY_AUTH_TOKEN`.

No test framework is configured. Validate changes with `npm run build` (catches TypeScript/compilation errors) and `npm run lint`.

## Tech Stack

- **Next.js 16.1.6** — App Router (`src/app/`), Turbopack
- **React 19**, **TypeScript 5** (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — CSS-first config, **no `tailwind.config.*` file**
- **styled-components v6** — CSS-in-JS for all hand-crafted sections; SSR support via `src/lib/StyledComponentsRegistry.tsx`
- **Google Fonts** — `Syne` (700/800, headings) and `DM_Sans` (300/400/500, body) loaded in `layout.tsx`; CSS variables `--font-syne`, `--font-dm-sans`
- **Sanity v4** (`sanity`, `next-sanity`) — Headless CMS for content management
- **`@sanity/image-url`** — Image URL builder for Sanity assets (`urlFor()` in `src/sanity/lib/image.ts`)
- **`@sanity/vision`** — GROQ query tool in Sanity Studio
- **Resend** — Email service for quote requests (requires `RESEND_API_KEY`)
- **ESLint 9** flat config (`eslint.config.mjs`)
- No Prettier configured

## Architecture

Single-page site: all sections are composed in `src/app/page.tsx`. The layout (`src/app/layout.tsx`) handles metadata/SEO, fetches le contenu Sanity et enveloppe la page avec `Navbar`/`Footer` et les providers (`LanguageProvider`, `SiteProvider`, `PromoProvider`, `ConsentProvider`).

Components are **server components by default**. Only add `"use client"` when the component uses browser APIs, hooks, or event handlers. styled-components components always require `"use client"`.

### Page composition (`src/app/page.tsx`)

Current section order (recodé d'après le prototype `funkyselfie-final-v9.html`, brief §1.1 — ordre validé, ne pas déplacer) :
`Hero → Formules → Comment → Features → Prints → Pourquoi → Events → Contact → Faq`

`PromoBanner`, `Navbar`, `Footer` et `CookieBanner` vivent dans `layout.tsx` (autour du `<main>`), enveloppés par `LanguageProvider`.

### Internationalisation (FR / EN / DE) & contenu éditable

Tous les textes de la page sont **éditables dans Sanity**, sans que les composants n'aient à connaître Sanity :

1. `src/locales/translations.ts` (type `Translation`) et `src/locales/configTranslations.ts` (type `ConfigTranslation`) restent la **référence** : ce sont les valeurs par défaut, celles qui s'affichent tant que Sanity est vide.
2. `layout.tsx` (server) fait **une seule requête** (`siteTextQuery`) et appelle `buildTranslations` / `buildConfigTranslations` / `buildSettings` (`src/lib/siteText.ts`), qui fusionnent Sanity et les valeurs par défaut **champ par champ** (une chaîne vide dans le Studio = repli sur le code, jamais de section vide).
3. Le résultat (`Record<Lang, Translation>`) est passé en props à `LanguageProvider`, qui expose `useLanguage()` → `{ lang, setLang, t, c }`. Les sections lisent `t`/`c` comme avant : **ajouter un texte éditable = ajouter un champ au schéma + une ligne dans `siteText.ts`**, rien d'autre.
4. `SiteProvider` (`src/contexts/SiteContext.tsx`) porte les valeurs non traduites (e-mail de contact, liens réseaux sociaux, copyright) ; `useSite()` les lit dans `Contact.tsx` et `Footer.tsx`.

- Les listes (`trust`, `steps`, `features`, `faqs`, `eventCards`, features des formules) sont des **tableaux** : Déborah peut en ajouter/supprimer depuis le Studio. Les icônes/photos associées sont cycliques côté code (`ICONS[i % ICONS.length]`, `event-${(i % 9) + 1}.jpg`).
- `LanguageContext` (`"use client"`) : état `lang`, persistance `localStorage` clé `fs_lang`, met à jour `document.documentElement.lang`. Premier rendu toujours en `fr` (évite un mismatch d'hydratation).
- `JsonLd.tsx` reçoit `translations.fr` + les réglages : la FAQ structurée et les liens `sameAs` suivent automatiquement le contenu édité.
- `ScrollReveal.tsx` : IntersectionObserver unique qui ajoute `.visible` aux `.fade-up` (règles dans `globals.css`).
- Images du prototype extraites en base64 → `public/images/v9/` (voir `scripts/extract-v9-images.mjs`). OG image générée par `scripts/make-og-image.mjs`.

### Composants en production

Tous les composants de sections sont des **client components styled-components** qui lisent `useLanguage()` ; aucun ne requête Sanity directement.

- Page (`page.tsx`) : `Hero`, `Formules` (+ `ConfiguratorPanel`), `Comment`, `Features`, `Prints`, `Pourquoi`, `Events`, `Contact`, `Faq`
- Layout : `PromoBanner`, `Navbar`, `Footer`, `CookieBanner`, `ScrollReveal`, `Analytics`, `JsonLd` (server)
- `/privacy` : `PrivacyContent`

### Composants archivés (fichiers présents, non câblés)

`Header.tsx`, `HeroCarousel.tsx`, `WhyUs.tsx`, `HowItWorks.tsx`, `ContactCard.tsx`, `FaqAccordion.tsx`, `ArcPhotobooth.tsx`, `CardsMockup.tsx`, `Offers.tsx` — variantes antérieures au prototype v9, conservées pour référence. Ils ne lisent pas le contenu Sanity ; les supprimer n'aurait aucun impact sur le site.

### API routes

`src/app/api/send-quote/route.ts` — receives quote form submissions (depuis `ConfiguratorPanel`) and sends two emails via [Resend](https://resend.com).
- Email 1 (récap interne) : From `devis@funkyselfie.ch` → To `hello@funkyselfie.ch`, `reply_to` = email client. Inclut la remise appliquée.
- Email 2 (confirmation client) : From `devis@funkyselfie.ch` → To email client (best-effort, n'échoue pas la requête).
- Requires `RESEND_API_KEY` (+ domaine vérifié) ; si absent, renvoie `{ ok: false }` 500 (le configurateur affiche une erreur).

### Sanity CMS

- **Studio**: Mounted at `/studio` (`src/app/studio/[[...tool]]/page.tsx`)
- **Config**: `sanity.config.ts` at project root (Studio client), `sanity.cli.ts` for CLI
- **Traduction au niveau du champ** : `localeString` / `localeText` (`src/sanity/schemaTypes/locale.ts`) = objet `{ fr, en, de }`. Helpers `locString()` / `locText()` / `singleton()` dans `schemaTypes/helpers.ts`.
- **Tous les documents sont des singletons**, un par section, avec un `_id` **fixe et égal au nom du type** — d'où des requêtes non ambiguës `*[_id == "hero"][0]` :

  | Document | Contenu |
  | --- | --- |
  | `hero` | badge, titre (`<em>` autorisé), sous-titre, 2 boutons, arguments ✓ |
  | `formules` | surtitres, sous-titre promo/hors promo, note, 3 formules (nom, accroche, liste incluse) |
  | `comment` | surtitre, titre, sous-titre, étapes |
  | `features` | « Le Funky » : surtitre, titre, caractéristiques |
  | `prints` | surtitre, titre, sous-titre |
  | `pourquoi` | bento : 4 cartes + 2 chiffres (48h / 100%) |
  | `events` | surtitre, titre, cartes du carrousel |
  | `contact` | surtitre, titre, sous-titre, note, bouton, **adresse e-mail** |
  | `faq` | surtitre, titre, questions/réponses (alimente aussi le JSON-LD) |
  | `nav` | liens du menu, bouton Réserver, bandeau promo, bandeau cookies |
  | `configurateur` | libellés des options, formats, formulaire, messages (groupés par onglet) |
  | `footer` | copyright, liens Instagram / TikTok / LinkedIn |
  | `promoSettings` | remise (cf. section Promo) |

- **Ce qui reste dans le code** (non éditable) : les prix (`PLANS` dans `Formules.tsx`, `PACKAGES`/`OPTIONS` dans `ConfiguratorPanel.tsx`), les images, les icônes/emojis et les ancres de navigation.
- **Queries**: `siteTextQuery` (tout le contenu en une requête) et `promoQuery` dans `src/sanity/lib/queries.ts`, via `sanityFetch` (`src/sanity/lib/live.ts`).
- **Image URLs**: `urlFor(source)` exported from `src/sanity/lib/image.ts` (plus utilisé par les sections actuelles).
- **Live queries**: `SanityLive` in `layout.tsx` ; `export const revalidate = 1800` borne la fraîcheur à 30 min au pire.
- **Amorçage** : `npm run seed:content` (`scripts/seed-sanity-content.ts`) crée les 12 documents à partir de `src/locales`, pour que le Studio affiche le texte réel plutôt que des champs vides. Idempotent (`createIfNotExists`) sauf avec `--force`.

### Système de promo (remise configurable)

Source unique de vérité pour toute remise du site, pilotée par le singleton Sanity `promoSettings` (champs : `enabled`, `percentage`, `startDate`, `endDate`, `label`).
- `src/lib/promo.ts` : `resolvePromo(settings, now)` → `{ active, percentage }` (`active` = enabled ET dans la fenêtre de dates) ; `applyPromo(price, promo)` (prix remisé arrondi au franc). `FALLBACK` = `-20%` actif tant qu'aucun doc Promo n'existe.
- `layout.tsx` (server, `export const revalidate = 1800`) fetch la promo et la fournit via `PromoProvider` (`src/contexts/PromoContext.tsx`, hook `usePromo()`). La revalidation 30 min permet l'activation automatique par dates (ex. promo Noël) sans redéploiement.
- Pilote : `PromoBanner` (masquée si inactive), `Navbar` (se cale en `top:0` sans bannière), `Formules` (prix barré + remisé + badge, ou prix plein), `ConfiguratorPanel` (remise sur formule **et** options). Les chaînes promo des traductions utilisent le placeholder `{pct}`.

### Configurateur (§2 du brief)

Fusionné dans la section **Formules** : les cartes sont cliquables (« Choisir » → `setSelectedPkg` + scroll), et `ConfiguratorPanel.tsx` (options avec masquage par formule, format de collage, message 40 car., total, formulaire 3+2 champs, envoi Resend) se déplie sous la grille. Textes FR/EN/DE par défaut dans `src/locales/configTranslations.ts`, éditables via le document Sanity `configurateur` ; ils sont lus par `useLanguage().c`. **Les prix restent dans le code** (`PACKAGES`, `OPTIONS`).

### Cookies & Analytics (§6 — LPD suisse)

- `src/contexts/ConsentContext.tsx` : état du consentement (`fs_cookies` : `accepted`/`refused`/`null`), `ready` après lecture localStorage. `CookieBanner` s'appuie dessus.
- `src/components/Analytics.tsx` : charge GA4 (`next/script`) **uniquement** si `consent === "accepted"` et si `NEXT_PUBLIC_GA_ID` est défini (anonymize_ip). Aucun tracking sinon.
- `/privacy` : `page.tsx` (serveur, métadonnées) + `PrivacyContent.tsx` (client, traduit FR/EN/DE). Liée depuis le bandeau cookie (`cookieText`).
- Variable d'env : `NEXT_PUBLIC_GA_ID` (Measurement ID, fourni par Déborah).
- **Environment variables**:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` — project ID (`ljtxweti`)
  - `NEXT_PUBLIC_SANITY_DATASET` — dataset (`production`)
  - `NEXT_PUBLIC_SANITY_API_VERSION` — API version (default: `2026-03-30`)
  - `SANITY_API_READ_TOKEN` — server-side read token for live queries
  - `RESEND_API_KEY` — optional; email sending is silently skipped if absent

### HTML Section Integration Workflow

New sections often arrive as **standalone HTML files**. The fastest path is the automation script:

```bash
npm run section path/to/file.html ComponentName
# → writes src/components/ComponentName.tsx
```

The script handles: `class → className`, inline style conversion, void element self-closing, CSS extracted to a styled-components template literal, `<script>` blocks replaced with TODO comments.

For manual conversion or fine-tuning:

1. **Convert HTML → JSX**: `class` → `className`, `style="color: red"` → `style={{ color: "red" }}`, self-close void elements.
2. **Extract CSS**: paste `<style>` content into a `styled-components` template literal — avoids converting hand-crafted CSS to Tailwind utilities.
3. **Create component**: add `"use client"` (required for styled-components), create `src/components/MySectionName.tsx` with a default export.
4. **Handle interactivity**: port `<script>` logic to React state/hooks.
5. **Wire into the page**: import and add in `src/app/page.tsx` at the desired position.
6. **Connect to CMS** (optional): add a Sanity schema and fetch via `sanityFetch`.

### Project Structure

```
src/
  app/
    globals.css          # Tailwind imports + custom theme + animations
    layout.tsx           # Root layout (metadata, SEO, fetch Sanity, providers, Navbar/Footer, fonts)
    page.tsx             # Home page: Hero → Formules → Comment → Features → Prints → Pourquoi → Events → Contact → Faq
    robots.ts            # robots.txt generation
    sitemap.ts           # sitemap.xml generation
    studio/[[...tool]]/  # Sanity Studio mounted route
    api/send-quote/      # API route for quote form submissions (Resend)
  components/
    # ── Sections de la page (toutes [client, styled-components], textes via useLanguage) ──
    Hero.tsx             # Hero : badge, titre HTML, boutons, réassurance, rotation photobooth
    Formules.tsx         # 3 formules cliquables + prix (promo) ; monte ConfiguratorPanel
    ConfiguratorPanel.tsx# Options, format, message, total, formulaire → /api/send-quote
    Comment.tsx          # « Comment ça marche » : étapes sur fond photo sombre
    Features.tsx         # « Le Funky » : caractéristiques du photobooth
    Prints.tsx           # Carrousel des impressions
    Pourquoi.tsx         # Bento « Pourquoi FunkySelfie »
    Events.tsx           # Carrousel infini des types d'événements
    Contact.tsx          # Carte contact (e-mail via useSite)
    Faq.tsx              # Accordéon FAQ
    # ── Layout ───────────────────────────────────────────────────────────
    PromoBanner.tsx      # Bandeau promo défilant (masqué si promo inactive) [client]
    Navbar.tsx           # Nav sticky + menu mobile + sélecteur de langue [client]
    Footer.tsx           # Copyright + réseaux sociaux (useSite) [client]
    CookieBanner.tsx     # Bandeau de consentement (LPD) [client]
    ScrollReveal.tsx     # IntersectionObserver pour .fade-up [client]
    Analytics.tsx        # GA4 conditionné au consentement [client]
    JsonLd.tsx           # Données structurées, dérivées du contenu édité [server]
    PrivacyContent.tsx   # Contenu de /privacy [client]
    # ── Archivés (non câblés) ────────────────────────────────────────────
    Header.tsx  HeroCarousel.tsx  WhyUs.tsx  HowItWorks.tsx  ContactCard.tsx
    FaqAccordion.tsx  ArcPhotobooth.tsx  CardsMockup.tsx  Offers.tsx
  lib/
    StyledComponentsRegistry.tsx  # SSR registry for styled-components (wraps app in layout.tsx)
    siteText.ts          # Fusion Sanity ↔ valeurs par défaut (buildTranslations…)
    promo.ts             # resolvePromo / applyPromo
  sanity/
    schemaTypes/         # Schémas du Studio (locale.ts, helpers.ts, sections/*.ts)
    lib/
      client.ts          # Sanity client (useCdn: true, browser-safe, no token)
      image.ts           # urlFor() image URL builder
      live.ts            # sanityFetch + SanityLive for real-time updates
      queries.ts         # GROQ queries
    env.ts               # Sanity env variables
    structure.ts         # Studio structure (singletons + list items)
  contexts/
    LanguageContext.tsx  # lang + textes fusionnés (t, c)
    SiteContext.tsx      # e-mail, réseaux sociaux, copyright
    PromoContext.tsx     # remise résolue
    ConsentContext.tsx   # consentement cookies
  locales/
    translations.ts      # Textes par défaut FR/EN/DE de la page
    configTranslations.ts# Textes par défaut FR/EN/DE du configurateur
scripts/
  html-to-section.mjs    # HTML → styled-components section converter (npm run section)
  seed-sanity-content.ts # Amorçage du Studio depuis src/locales (npm run seed:content)
public/
  images/               # All static images served from /images/*
    favicon-32.png      # Browser tab icon (32×32)
    favicon-192.png     # Touch icon (192×192)
    favicon-512.png     # Apple / large icon (512×512)
    og-image.jpg        # Open Graph image (1200×630) — must exist, referenced in metadata
    logo.png            # Header logo
    logo_square.png     # Square logo
    Photobooth-bwood.png
    photobooth_face.jpeg / photobooth_face.png
    accessoires.png
    decoration.jpg
    1_photo.jpeg / 2_photos.jpeg / 3_photos.jpeg / 4_photos.jpeg  # Photo format examples
    considerate-agency-UrzN-8K1PCE-unsplash.jpg
    elevate-nYgy58eb9aw-unsplash.jpg
    priscilla-du-preez-nF8xhLMmg0c-unsplash.jpg
```

### Key conventions

- Use `@/` path alias for all imports from `src/` (no relative `../../` imports)
- `next/image` for all images with `alt`, `sizes`, and `priority` attributes; images go in `public/images/` and are referenced as `/images/filename`
- `next/link` for internal navigation, `next/script` for third-party scripts
- Data-driven rendering: define data arrays as module-level `const`, then `.map()` over them in JSX
- Sanity data: use `sanityFetch` with GROQ queries; define fallback data for when Sanity is empty
- Responsive grids: `style={{ gridTemplateColumns: "repeat(auto-fit, minmax(Xpx, 1fr))" }}`
- Complex gradients: inline `style={{}}` attributes
- styled-components: used for all hand-crafted sections; always add `"use client"`; named exported styled primitives preferred over anonymous inline ones (see `WhyUs.tsx`, `HowItWorks.tsx`)
- styled-components can use Tailwind theme tokens (`var(--color-primary)` etc.) since both coexist

### Custom theme tokens (defined in `src/app/globals.css` via `@theme inline`)

Palette officielle (brief §1.3), exposée à la fois comme tokens Tailwind `@theme` et variables CSS `:root` (`var(--teal)`, etc.) :

```
--teal:       #4AABAA   (--color-primary)        boutons, accents
--teal-dark:  #005F6B   (--color-primary-dark)   hover, sections sombres
--magenta:    #B03FAA   (--color-magenta)        CTA secondaire, cartes
--dark:       #0D1B1E   (--color-dark / footer)  fond hero, sections sombres
--grey:       #F5F7F7   (--color-bg-light)       fonds clairs, cartes
--text:       #1A2C2E   (--color-text)           texte principal
--promo:      #FF1A1A                            bannière promo, prix réduits, badges -20%
```

Font variables (from `layout.tsx` Google Fonts loader): `--font-syne` (headings, 700/800), `--font-dm-sans` (body, 300/400/500).

Custom animation classes: `animate-fade-in-up`, `animate-fade-in-up-delay-1` (0.2 s delay), `animate-fade-in-up-delay-2` (0.4 s delay).

### SEO

Metadata in `layout.tsx` (Open Graph, Twitter cards, canonical `https://www.funkyselfie.ch`). Pas de hreflang par locale : site mono-URL avec changement de langue côté client (localStorage), donc une seule URL canonique. JSON-LD in `JsonLd.tsx` (`LocalBusiness`, `Service`, `FAQPage`, `WebSite`). `robots.ts` and `sitemap.ts` for crawl directives.

OG image: `/images/og-image.jpg` (1200×630 px) — referenced in metadata; this file must exist.

### TypeScript

When `any` is unavoidable (e.g., third-party window globals), suppress with an explicit disable comment:
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).calendar
```

Client components using browser APIs guard with `typeof window !== "undefined"` before accessing `window`.

### Formatting

2-space indentation, double quotes in TSX, semicolons. Do not modify `next-env.d.ts` (auto-generated).
