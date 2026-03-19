# AGENTS.md - Coding Agent Instructions

## Project Overview

FunkySelfie is a single-page marketing website for a photobooth rental business in Switzerland.
Built with **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript 5**, and **Tailwind CSS v4**.
All content is in **French (fr_CH locale)**.

---

## Build, Dev & Lint Commands

```bash
npm run dev       # Start dev server (Turbopack) on http://localhost:3000
npm run build     # Production build (also runs TypeScript checks)
npm run start     # Serve production build
npm run lint      # ESLint (flat config, eslint 9)
```

There is **no test framework** configured. No unit/integration/e2e tests exist.
To validate changes, run `npm run build` (catches TypeScript and compilation errors) and `npm run lint`.

---

## Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | Next.js 16.1.6 (App Router, `src/app/`)    |
| UI           | React 19.2.3                                |
| Language     | TypeScript 5 (strict mode)                  |
| Styling      | Tailwind CSS v4 via `@tailwindcss/postcss`  |
| Linting      | ESLint 9 flat config (`eslint.config.mjs`)  |
| Formatting   | No Prettier configured                      |
| Package Mgr  | npm (lockfile: `package-lock.json`)         |

---

## Project Structure

```
src/
  app/
    globals.css       # Tailwind imports + custom theme + animations
    layout.tsx        # Root layout (metadata, SEO, Header/Footer)
    page.tsx          # Home page composing all section components
    robots.ts         # robots.txt generation
    sitemap.ts        # sitemap.xml generation
  components/
    Header.tsx        # Sticky nav with mobile hamburger menu ("use client")
    HeroCarousel.tsx  # Image carousel hero section ("use client")
    Features.tsx      # Feature cards grid (server component)
    UniversPhoto.tsx  # Product showcase grid (server component)
    Services.tsx      # Services grid (server component)
    Testimonials.tsx  # Testimonials grid (server component)
    Contact.tsx       # Google Calendar booking widget ("use client")
    Footer.tsx        # Simple footer (server component)
    JsonLd.tsx        # Structured data (JSON-LD schemas)
public/
  images/             # All static images served from /images/*
```

---

## Code Style Guidelines

### TypeScript

- **Strict mode** is enabled in `tsconfig.json`.
- Use TypeScript for all files (`.ts`, `.tsx`). No plain `.js` files in `src/`.
- Use `type` imports for type-only imports: `import type { Metadata } from "next"`.
- Prefer interfaces/types over `any`. When `any` is unavoidable (e.g., third-party window globals), use an explicit ESLint disable comment:
  ```ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).calendar
  ```

### Imports

- Use the `@/*` path alias for all imports from `src/` (configured in `tsconfig.json`).
  ```ts
  import Header from "@/components/Header";  // Good
  import Header from "../../components/Header";  // Avoid
  ```
- Order: external packages first, then `@/` aliased imports, then relative imports.
- Use named exports for non-component utilities; use `export default` for page/component files.

### React & Next.js

- **App Router** only (no `pages/` directory).
- Components are **server components by default**. Only add `"use client"` when the component uses browser APIs, hooks (`useState`, `useEffect`, etc.), or event handlers.
- Use `next/image` (`Image`) for all images with proper `alt`, `sizes`, and `priority` attributes.
- Use `next/link` (`Link`) for internal navigation.
- Use `next/script` (`Script`) for third-party scripts with appropriate `strategy`.
- Metadata is defined via the `export const metadata: Metadata` pattern in `layout.tsx`.

### Naming Conventions

- **Components**: PascalCase filenames matching the default export (`Header.tsx` -> `export default function Header()`).
- **Non-component files**: camelCase (e.g., `robots.ts`, `sitemap.ts`).
- **CSS classes**: Tailwind utility classes. Custom classes use kebab-case (e.g., `animate-fade-in-up`).
- **Constants/data arrays**: camelCase, declared as `const` at module scope above the component (e.g., `const features = [...]`, `const navLinks = [...]`).

### Styling

- **Tailwind CSS v4** with CSS-first configuration. There is **no `tailwind.config.*` file**.
- Custom theme tokens are defined via `@theme inline` in `src/app/globals.css`:
  ```css
  @theme inline {
    --color-primary: #36949e;
    --color-primary-dark: #2d7a82;
    --color-magenta: #bd3ca1;
    --color-dark: #2c2c2c;
    --color-text: #333333;
    --color-text-light: #4a4a4a;
    --color-bg-light: #f8f9fa;
    --color-footer: #1a1a1a;
  }
  ```
- Use Tailwind utility classes inline. For complex gradients, use inline `style={{}}` attributes.
- Responsive design uses Tailwind breakpoints (`md:`, `lg:` prefixes). Mobile-first approach.
- Custom animations are defined as `@keyframes` in `globals.css` with corresponding utility classes.

### Component Patterns

- **Data-driven rendering**: Define data arrays (features, services, testimonials, nav links, hero images) as module-level constants, then `.map()` over them in JSX.
- **Accessibility**: Use `aria-label` on sections, `aria-hidden` on decorative elements, `aria-expanded` on toggles, semantic HTML (`<section>`, `<article>`, `<blockquote>`, `<nav>`, `<footer>`, `<cite>`).
- **Grid layouts**: Use CSS Grid via Tailwind's `grid` class with inline `style={{ gridTemplateColumns: "repeat(auto-fit, minmax(Xpx, 1fr))" }}` for responsive auto-fit grids.
- **Hover effects**: `hover:-translate-y-2`, `hover:shadow-xl`, `transition-transform duration-300`.

### Error Handling

- No global error boundary is currently configured.
- Client components using browser APIs check for `typeof window !== "undefined"` before accessing `window`.
- Use optional chaining for potentially undefined values (e.g., `(window as any).calendar?.schedulingButton`).

### SEO

- Comprehensive metadata object in `layout.tsx` (Open Graph, Twitter cards, canonical URL, robots directives).
- JSON-LD structured data in `JsonLd.tsx` (LocalBusiness, Service, WebSite schemas).
- `robots.ts` and `sitemap.ts` for search engine directives.
- All images have descriptive `alt` text in French.

---

## ESLint Configuration

Uses ESLint 9 flat config (`eslint.config.mjs`) extending:
- `eslint-config-next/core-web-vitals` (Next.js + React + accessibility rules)
- `eslint-config-next/typescript` (TypeScript-specific rules)

Run `npm run lint` to check. Fix issues before committing.

---

## Key Conventions for Agents

1. **Always run `npm run build` after making changes** to catch TypeScript and compilation errors.
2. **Run `npm run lint`** to ensure ESLint compliance.
3. **Keep components as server components** unless client-side interactivity is required.
4. **All user-facing text must be in French.**
5. **Use `@/` path aliases** for all imports from `src/`.
6. **Images go in `public/images/`** and are referenced as `/images/filename`.
7. **No Prettier** -- follow the existing code formatting (2-space indentation, double quotes in TSX, semicolons).
8. **Do not modify `next-env.d.ts`** -- it is auto-generated.
9. **Do not create a `tailwind.config.*` file** -- Tailwind v4 uses CSS-first config in `globals.css`.
10. **Preserve the single-page architecture** -- all sections are composed in `page.tsx`.
