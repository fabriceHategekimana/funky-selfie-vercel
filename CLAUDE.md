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
```

No test framework is configured. Validate changes with `npm run build` (catches TypeScript/compilation errors) and `npm run lint`.

## Tech Stack

- **Next.js 16.1.6** — App Router (`src/app/`), Turbopack
- **React 19**, **TypeScript 5** (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — CSS-first config, **no `tailwind.config.*` file**
- **styled-components v6** — CSS-in-JS for sections converted from standalone HTML files
- **Sanity v4** (`sanity`, `next-sanity`) — Headless CMS for content management
- **`@sanity/image-url`** — Image URL builder for Sanity assets (`urlFor()` in `src/sanity/lib/image.ts`)
- **`@sanity/vision`** — GROQ query tool in Sanity Studio
- **Resend** — Email service for quote requests (requires `RESEND_API_KEY`)
- **ESLint 9** flat config (`eslint.config.mjs`)
- No Prettier configured

## Architecture

Single-page site: all sections are composed in `src/app/page.tsx`. The layout (`src/app/layout.tsx`) handles metadata/SEO and wraps with `Header`/`Footer`.

Components are **server components by default**. Only add `"use client"` when the component uses browser APIs, hooks, or event handlers. styled-components components always require `"use client"`.

### Client components
- `Header.tsx` — Sticky nav with mobile hamburger menu
- `HeroCarousel.tsx` — Image carousel (3 photos, 5 s interval, opacity transitions)
- `Configurator.tsx` — Interactive quote builder with package selection, options, and form
- `FaqAccordion.tsx` — Expandable FAQ items
- `Contact.tsx` — Contact section fetching from Sanity (`contactSection`); includes email link and Google Calendar booking button

### Server components
- `Hero.tsx` — Fetches hero data from Sanity (title, subtitle, CTA), renders `HeroCarousel`
- `Features.tsx` — Feature cards grid (Sanity)
- `Services.tsx` — Services grid with images (Sanity + `urlFor()`)
- `Testimonials.tsx` — Testimonials grid (Sanity)
- `Faq.tsx` — FAQ section fetching items from Sanity, renders `FaqAccordion`
- `Footer.tsx` — Footer with tagline, SEO text, and copyright from Sanity

### Unused components
- `Offers.tsx` — Offer cards (kept for future use, replaced by Configurator)

### API routes

`src/app/api/send-quote/route.ts` — receives quote form submissions and sends them via [Resend](https://resend.com).
- From: `devis@funkyselfie.ch` → To: `hello@funkyselfie.ch`
- Requires `RESEND_API_KEY`; if absent, returns `{ ok: true }` without sending.

### Sanity CMS

- **Studio**: Mounted at `/studio` (`src/app/studio/[[...tool]]/page.tsx`)
- **Config**: `sanity.config.ts` at project root (Studio client), `sanity.cli.ts` for CLI
- **Schemas** (`src/sanity/schemaTypes/`): `heroSection`, `feature`, `service`, `testimonial`, `faqItem`, `contactSection`, `footerSection`
- **Queries**: Defined in `src/sanity/lib/queries.ts`, fetched via `sanityFetch` from `src/sanity/lib/live.ts`
- **Image URLs**: `urlFor(source)` exported from `src/sanity/lib/image.ts`
- **Singleton documents** (fixed IDs in `src/sanity/structure.ts`):
  - `heroSection`: `a6d56e4f-a429-4e53-a7b9-bb4640fbb087`
  - `contactSection`: `3427fda4-79ec-4e73-9c02-851604367ee9`
  - `footerSection`: `2c653873-5542-4c48-a0af-0272f370f63b`
- **Live queries**: `SanityLive` component in `layout.tsx` enables real-time content updates
- **Environment variables**:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` — project ID (`ljtxweti`)
  - `NEXT_PUBLIC_SANITY_DATASET` — dataset (`production`)
  - `NEXT_PUBLIC_SANITY_API_VERSION` — API version (default: `2026-03-30`)
  - `SANITY_API_READ_TOKEN` — server-side read token for live queries
  - `RESEND_API_KEY` — optional; email sending is silently skipped if absent

### HTML Section Integration Workflow

New sections often arrive as **standalone HTML files**. To integrate one:

1. **Convert HTML → JSX**:
   - `class` → `className`
   - Inline styles: `style="color: red"` → `style={{ color: "red" }}`
   - Self-close void elements: `<img>` → `<img />`
2. **Extract CSS**: copy the `<style>` block content into **styled-components** template literals — this avoids converting hand-crafted CSS to Tailwind utilities.
3. **Create component**: add `"use client"` (required for styled-components), create `src/components/MySectionName.tsx` with a default export.
4. **Handle interactivity**: if the HTML includes `<script>` logic, port it to React state/hooks.
5. **Wire into the page**: import and add the component in `src/app/page.tsx` at the desired position.
6. **Connect to CMS** (optional): if the content should be editable, add a Sanity schema and fetch via `sanityFetch`.

### Project Structure

```
src/
  app/
    globals.css          # Tailwind imports + custom theme + animations
    layout.tsx           # Root layout (metadata, SEO, Header/Footer)
    page.tsx             # Home page composing all section components
    robots.ts            # robots.txt generation
    sitemap.ts           # sitemap.xml generation
    studio/[[...tool]]/  # Sanity Studio mounted route
    api/send-quote/      # API route for quote form submissions
  components/
    Header.tsx           # Sticky nav with mobile hamburger menu
    Hero.tsx             # Server component fetching hero data from Sanity
    HeroCarousel.tsx     # Image carousel hero section
    Features.tsx         # Feature cards grid (Sanity)
    Configurator.tsx     # Interactive quote builder (CHF 499 / 799 / 1500)
    Services.tsx         # Services grid with images (Sanity + urlFor)
    Testimonials.tsx     # Testimonials grid (Sanity)
    Faq.tsx              # FAQ section (Sanity)
    FaqAccordion.tsx     # FAQ accordion component
    Contact.tsx          # Contact section (Sanity + Google Calendar button)
    Footer.tsx           # Footer with Sanity data
    JsonLd.tsx           # Structured data (JSON-LD schemas)
    Offers.tsx           # Offer cards (unused, kept for future use)
  sanity/
    schemaTypes/         # Sanity schemas
    lib/
      client.ts          # Sanity client (useCdn: true, browser-safe, no token)
      image.ts           # urlFor() image URL builder
      live.ts            # sanityFetch + SanityLive for real-time updates
      queries.ts         # GROQ queries
    env.ts               # Sanity env variables
    structure.ts         # Studio structure (singletons + list items)
public/
  images/               # All static images served from /images/*
    favicon-32.png      # Browser tab icon (32×32)
    favicon-192.png     # Touch icon (192×192)
    favicon-512.png     # Apple / large icon (512×512)
    og-image.jpg        # Open Graph image (1200×630) — must exist
    logo.png            # Header logo
    logo_square.png     # Square logo
    Photobooth-bwood.png
    accessoires.png
    decoration.jpg
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
- styled-components: used for sections converted from standalone HTML; always add `"use client"`

### Custom theme tokens (defined in `src/app/globals.css` via `@theme inline`)

```
--color-primary: #36949e
--color-primary-dark: #2d7a82
--color-magenta: #bd3ca1
--color-dark: #2c2c2c
--color-text: #333333
--color-text-light: #4a4a4a
--color-bg-light: #f8f9fa
--color-footer: #1a1a1a
```

Custom animation classes: `animate-fade-in-up`, `animate-fade-in-up-delay-1` (0.2 s delay), `animate-fade-in-up-delay-2` (0.4 s delay).

### SEO

Metadata in `layout.tsx` (Open Graph, Twitter cards, canonical `https://funky-selfie.ch`). JSON-LD in `JsonLd.tsx` (`LocalBusiness`, `Service`, `FAQPage`, `WebSite`). `robots.ts` and `sitemap.ts` for crawl directives.

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
