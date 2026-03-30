# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FunkySelfie is a single-page marketing website for a photobooth rental business in Switzerland. All user-facing text is in **French (fr_CH locale)**.

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
- **ESLint 9** flat config (`eslint.config.mjs`)
- No Prettier configured

## Architecture

Single-page site: all sections are composed in `src/app/page.tsx`. The layout (`src/app/layout.tsx`) handles metadata/SEO and wraps with `Header`/`Footer`.

Components are **server components by default**. Only add `"use client"` when the component uses browser APIs, hooks, or event handlers. Current client components: `Header.tsx` (hamburger nav), `HeroCarousel.tsx` (image carousel), `Contact.tsx` (Google Calendar booking widget), `Configurator.tsx` (interactive quote builder).

### API routes

`src/app/api/send-quote/route.ts` — receives quote form submissions and sends them via [Resend](https://resend.com). Requires the `RESEND_API_KEY` environment variable; if absent, the route returns `{ ok: true }` without sending.

### Key conventions

- Use `@/` path alias for all imports from `src/` (no relative `../../` imports)
- `next/image` for all images with `alt`, `sizes`, and `priority` attributes; images go in `public/images/` and are referenced as `/images/filename`
- `next/link` for internal navigation, `next/script` for third-party scripts
- Data-driven rendering: define data arrays as module-level `const`, then `.map()` over them in JSX
- Responsive grids use `style={{ gridTemplateColumns: "repeat(auto-fit, minmax(Xpx, 1fr))" }}`
- For complex gradients, use inline `style={{}}` attributes

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

### SEO

Metadata in `layout.tsx` (Open Graph, Twitter cards, canonical URL). JSON-LD structured data in `JsonLd.tsx`. `robots.ts` and `sitemap.ts` for search engine directives.

### TypeScript

When `any` is unavoidable (e.g., third-party window globals), suppress with an explicit disable comment:
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).calendar
```

Client components using browser APIs guard with `typeof window !== "undefined"` before accessing `window`.

### Formatting

2-space indentation, double quotes in TSX, semicolons. Do not modify `next-env.d.ts` (auto-generated).
