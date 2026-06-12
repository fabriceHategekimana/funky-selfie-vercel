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
```

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

Single-page site: all sections are composed in `src/app/page.tsx`. The layout (`src/app/layout.tsx`) handles metadata/SEO and wraps with `Header`/`Footer`.

Components are **server components by default**. Only add `"use client"` when the component uses browser APIs, hooks, or event handlers. styled-components components always require `"use client"`.

### Page composition (`src/app/page.tsx`)

Current section order (recodé d'après le prototype `funkyselfie-final-v9.html`, brief §1.1 — ordre validé, ne pas déplacer) :
`Hero → Formules → Comment → Features → Prints → Pourquoi → Events → Contact → Faq`

`PromoBanner`, `Navbar`, `Footer` et `CookieBanner` vivent dans `layout.tsx` (autour du `<main>`), enveloppés par `LanguageProvider`.

### Internationalisation (FR / EN / DE)

- Textes dans `src/locales/translations.ts` (objet `translations[lang]`, type `Translation`) — portés depuis le prototype.
- `src/contexts/LanguageContext.tsx` (`"use client"`) : état `lang`, persistance `localStorage` clé `fs_lang`, met à jour `document.documentElement.lang`. Hook `useLanguage()` → `{ lang, setLang, t }`.
- Les sections du prototype sont des **client components styled-components** qui lisent `useLanguage()`. Elles n'utilisent **pas** Sanity (le contenu est statique/traduit). Les composants Sanity restent dans le repo mais ne sont plus câblés.
- `ScrollReveal.tsx` : IntersectionObserver unique qui ajoute `.visible` aux `.fade-up` (règles dans `globals.css`).
- Images du prototype extraites en base64 → `public/images/v9/` (voir `scripts/extract-v9-images.mjs`). OG image générée par `scripts/make-og-image.mjs`.

### Client components
- `Header.tsx` — Sticky nav with mobile hamburger menu
- `HeroCarousel.tsx` — Image carousel (3 photos, 5 s interval, opacity transitions)
- `WhyUs.tsx` — Bento-grid "Pourquoi FunkySelfie" section; 6 cards (stat, dark, regular variants); static data; styled-components
- `HowItWorks.tsx` — Dark section with 6-step horizontal track (desktop) / vertical list (mobile); static data; styled-components
- `Configurator.tsx` — Interactive quote builder with package selection, options, and form (CHF 499 / 799 / 1500)
- `ContactCard.tsx` — Presentation-only contact card (email + CTA button); props-driven; styled-components

### Server components
- `Hero.tsx` — Fetches hero data from Sanity (title, subtitle, CTA), renders `HeroCarousel`
- `Contact.tsx` — Fetches `contactSection` from Sanity, renders `ContactCard` with fallback data
- `Footer.tsx` — Footer with tagline, SEO text, and copyright from Sanity

### Unused / archived components (files exist, not wired into `page.tsx`)
- `Features.tsx` — Feature cards grid (Sanity) — replaced by `WhyUs`
- `Services.tsx` — Services grid with images (Sanity + `urlFor()`) — replaced by `WhyUs`
- `Testimonials.tsx` — Testimonials grid (Sanity)
- `Faq.tsx` / `FaqAccordion.tsx` — FAQ section (Sanity)
- `ArcPhotobooth.tsx` — Arc-SVG "comment ça marche" variant — replaced by `HowItWorks`
- `CardsMockup.tsx` — Grid "pourquoi FunkySelfie" variant — replaced by `WhyUs`
- `Offers.tsx` — Offer cards — replaced by `Configurator`

### API routes

`src/app/api/send-quote/route.ts` — receives quote form submissions (depuis `ConfiguratorPanel`) and sends two emails via [Resend](https://resend.com).
- Email 1 (récap interne) : From `devis@funkyselfie.ch` → To `hello@funkyselfie.ch`, `reply_to` = email client. Inclut la remise appliquée.
- Email 2 (confirmation client) : From `devis@funkyselfie.ch` → To email client (best-effort, n'échoue pas la requête).
- Requires `RESEND_API_KEY` (+ domaine vérifié) ; si absent, renvoie `{ ok: false }` 500 (le configurateur affiche une erreur).

### Sanity CMS

- **Studio**: Mounted at `/studio` (`src/app/studio/[[...tool]]/page.tsx`)
- **Config**: `sanity.config.ts` at project root (Studio client), `sanity.cli.ts` for CLI
- **Schemas** (`src/sanity/schemaTypes/`): `heroSection`, `feature`, `service`, `testimonial`, `faqItem`, `contactSection`, `footerSection`, `promoSettings`
- **Queries**: Defined in `src/sanity/lib/queries.ts`, fetched via `sanityFetch` from `src/sanity/lib/live.ts`
- **Image URLs**: `urlFor(source)` exported from `src/sanity/lib/image.ts`
- **Singleton documents** (fixed IDs in `src/sanity/structure.ts`):
  - `heroSection`: `a6d56e4f-a429-4e53-a7b9-bb4640fbb087`
  - `contactSection`: `3427fda4-79ec-4e73-9c02-851604367ee9`
  - `footerSection`: `2c653873-5542-4c48-a0af-0272f370f63b`
  - `promoSettings`: `promoSettings`
- **Live queries**: `SanityLive` component in `layout.tsx` enables real-time content updates

### Système de promo (remise configurable)

Source unique de vérité pour toute remise du site, pilotée par le singleton Sanity `promoSettings` (champs : `enabled`, `percentage`, `startDate`, `endDate`, `label`).
- `src/lib/promo.ts` : `resolvePromo(settings, now)` → `{ active, percentage }` (`active` = enabled ET dans la fenêtre de dates) ; `applyPromo(price, promo)` (prix remisé arrondi au franc). `FALLBACK` = `-20%` actif tant qu'aucun doc Promo n'existe.
- `layout.tsx` (server, `export const revalidate = 1800`) fetch la promo et la fournit via `PromoProvider` (`src/contexts/PromoContext.tsx`, hook `usePromo()`). La revalidation 30 min permet l'activation automatique par dates (ex. promo Noël) sans redéploiement.
- Pilote : `PromoBanner` (masquée si inactive), `Navbar` (se cale en `top:0` sans bannière), `Formules` (prix barré + remisé + badge, ou prix plein), `ConfiguratorPanel` (remise sur formule **et** options). Les chaînes promo des traductions utilisent le placeholder `{pct}`.

### Configurateur (§2 du brief)

Fusionné dans la section **Formules** : les cartes sont cliquables (« Choisir » → `setSelectedPkg` + scroll), et `ConfiguratorPanel.tsx` (options avec masquage par formule, format de collage, message 40 car., total, formulaire 3+2 champs, envoi Resend) se déplie sous la grille. Textes FR/EN/DE dans `src/locales/configTranslations.ts` (séparé des chaînes du prototype). Le v9 lui-même ne contient pas de configurateur.

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
    layout.tsx           # Root layout (metadata, SEO, Header/Footer, StyledComponentsRegistry, fonts)
    page.tsx             # Home page: Hero → WhyUs → HowItWorks → Configurator → Contact
    robots.ts            # robots.txt generation
    sitemap.ts           # sitemap.xml generation
    studio/[[...tool]]/  # Sanity Studio mounted route
    api/send-quote/      # API route for quote form submissions (Resend)
  components/
    Header.tsx           # Sticky nav with mobile hamburger menu [client]
    Hero.tsx             # Server component fetching hero data from Sanity [server]
    HeroCarousel.tsx     # Image carousel hero section [client]
    WhyUs.tsx            # Bento-grid "Pourquoi FunkySelfie" — static data [client, styled-components]
    HowItWorks.tsx       # 6-step dark section — static data [client, styled-components]
    Configurator.tsx     # Interactive quote builder (CHF 499 / 799 / 1500) [client, styled-components]
    Contact.tsx          # Fetches contactSection from Sanity, renders ContactCard [server]
    ContactCard.tsx      # Email + CTA card — props-driven [client, styled-components]
    Footer.tsx           # Footer with Sanity data [server]
    JsonLd.tsx           # Structured data (JSON-LD schemas) [server]
    # ── Archived (not in page.tsx) ────────────────────────────────────────
    Features.tsx         # Feature cards grid (Sanity) [server] — replaced by WhyUs
    Services.tsx         # Services grid with images (Sanity + urlFor) [server] — replaced by WhyUs
    Testimonials.tsx     # Testimonials grid (Sanity) [server]
    Faq.tsx              # FAQ section (Sanity) [server]
    FaqAccordion.tsx     # FAQ accordion [client]
    ArcPhotobooth.tsx    # Arc-SVG "comment ça marche" variant [client, styled-components] — replaced by HowItWorks
    CardsMockup.tsx      # Grid "pourquoi FunkySelfie" variant [client, styled-components] — replaced by WhyUs
    Offers.tsx           # Offer cards [client] — replaced by Configurator
  lib/
    StyledComponentsRegistry.tsx  # SSR registry for styled-components (wraps app in layout.tsx)
  sanity/
    schemaTypes/         # Sanity schemas
    lib/
      client.ts          # Sanity client (useCdn: true, browser-safe, no token)
      image.ts           # urlFor() image URL builder
      live.ts            # sanityFetch + SanityLive for real-time updates
      queries.ts         # GROQ queries
    env.ts               # Sanity env variables
    structure.ts         # Studio structure (singletons + list items)
scripts/
  html-to-section.mjs    # HTML → styled-components section converter (npm run section)
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
