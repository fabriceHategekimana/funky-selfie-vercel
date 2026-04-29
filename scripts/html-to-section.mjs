#!/usr/bin/env node
/**
 * Converts a standalone HTML file into a Next.js styled-components section.
 *
 * Usage:
 *   npm run section path/to/file.html [ComponentName]
 *
 * Output:
 *   src/components/<ComponentName>.tsx
 *
 * What it does:
 *   - Extracts <style> blocks → styled-components template literal
 *   - Extracts <script> blocks → TODO comments for manual porting
 *   - Converts HTML attributes to JSX (class→className, inline styles, etc.)
 *   - Self-closes void elements
 *   - Wraps everything in a styled <div> so no CSS changes are needed
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { basename, extname, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// --- Args ---

const [htmlArg, nameArg] = process.argv.slice(2);

if (!htmlArg) {
  console.error("Usage: npm run section <file.html> [ComponentName]");
  process.exit(1);
}

const htmlFile = resolve(htmlArg);

if (!existsSync(htmlFile)) {
  console.error(`File not found: ${htmlFile}`);
  process.exit(1);
}

const raw = readFileSync(htmlFile, "utf-8");

// --- Extract <style> blocks ---

const cssBlocks = [];
let stripped = raw.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
  cssBlocks.push(css.trim());
  return "";
});
const css = cssBlocks.join("\n\n");

// --- Extract <script> blocks ---

const scriptBlocks = [];
stripped = stripped.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (_, js) => {
  const trimmed = js.trim();
  if (trimmed) scriptBlocks.push(trimmed);
  return "";
});

// --- Isolate body content ---

// Remove <html>, <head>, doctype; keep body content (or everything if no <body>)
let body = stripped;
const bodyMatch = body.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  body = bodyMatch[1];
} else {
  body = body
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<html[^>]*>[\s\S]*?<\/html>/gi, (m) =>
      m.replace(/<html[^>]*>/i, "").replace(/<\/html>/i, "")
    )
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "");
}

body = body.trim();

// --- HTML → JSX conversions ---

const VOID_TAGS = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;

function cssKeyToCamel(prop) {
  return prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function convertInlineStyle(styleStr) {
  const entries = styleStr
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const colon = s.indexOf(":");
      if (colon === -1) return null;
      const prop = cssKeyToCamel(s.slice(0, colon));
      const val = s.slice(colon + 1).trim().replace(/"/g, '\\"');
      return `${prop}: "${val}"`;
    })
    .filter(Boolean);
  return `{{ ${entries.join(", ")} }}`;
}

function toJsx(html) {
  return (
    html
      // Void elements: normalize existing self-close, add missing one
      .replace(/<(?!\/)([a-z][a-z0-9]*)([^>]*?)(\s*\/)?>/gi, (match, tag, attrs) => {
        if (!VOID_TAGS.test(tag)) return match;
        const cleanAttrs = attrs.trimEnd();
        return `<${tag}${cleanAttrs} />`;
      })
      // class → className
      .replace(/\bclass=/g, "className=")
      // for → htmlFor
      .replace(/\bfor=/g, "htmlFor=")
      // tabindex → tabIndex
      .replace(/\btabindex=/gi, "tabIndex=")
      // colspan / rowspan
      .replace(/\bcolspan=/gi, "colSpan=")
      .replace(/\browspan=/gi, "rowSpan=")
      // Common SVG attributes
      .replace(/\bstroke-width=/gi, "strokeWidth=")
      .replace(/\bfill-rule=/gi, "fillRule=")
      .replace(/\bclip-rule=/gi, "clipRule=")
      .replace(/\bviewbox=/gi, "viewBox=")
      // Event handlers: onclick → onClick
      .replace(/\bon([a-z]+)=/gi, (_, e) => `on${e[0].toUpperCase()}${e.slice(1)}=`)
      // Inline styles
      .replace(/style="([^"]*)"/g, (_, s) => `style=${convertInlineStyle(s)}`)
      // HTML comments → JSX comments
      .replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}")
  );
}

const jsx = toJsx(body);

// --- Derive component name ---

const derived = (nameArg || basename(htmlFile, extname(htmlFile)))
  .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
  .replace(/^(.)/, (c) => c.toUpperCase())
  .replace(/[^a-zA-Z0-9]/g, "");

const componentName = derived || "NewSection";

// --- Build output ---

const outPath = resolve(projectRoot, "src", "components", `${componentName}.tsx`);

if (existsSync(outPath)) {
  console.error(`File already exists: src/components/${componentName}.tsx`);
  console.error("Pass a different ComponentName or rename the existing file.");
  process.exit(1);
}

const scriptSection = scriptBlocks.length
  ? `\n// TODO: port this script logic to React state / hooks:\n${scriptBlocks
      .flatMap((b) => b.split("\n"))
      .map((l) => `// ${l}`)
      .join("\n")}\n`
  : "";

const cssBlock = css
  ? `\nconst Styled = styled.div\`\n${css}\n\`;\n`
  : `\nconst Styled = styled.div\`\`;\n`;

const jsxBody = jsx
  .split("\n")
  .map((l) => `      ${l}`)
  .join("\n");

const output = `"use client";
import styled from "styled-components";
${scriptSection}${cssBlock}
export default function ${componentName}() {
  return (
    <Styled>
${jsxBody}
    </Styled>
  );
}
`;

writeFileSync(outPath, output, "utf-8");

// --- Summary ---

console.log(`✓  Created: src/components/${componentName}.tsx`);
if (css) {
  console.log(`   CSS extracted from ${cssBlocks.length} <style> block(s)`);
}
if (scriptBlocks.length) {
  console.log(`   ⚠  Script logic found → see TODO comments in the file`);
}
console.log(`\n   Next steps:`);
console.log(`   1. Review the generated file for any JSX issues`);
console.log(`   2. Add <${componentName} /> to src/app/page.tsx`);
console.log(`   3. npm run build  (check for TypeScript errors)`);
if (css.includes(":root")) {
  console.log(`\n   ⚠  CSS variables (:root) detected → move them to src/app/globals.css`);
}
