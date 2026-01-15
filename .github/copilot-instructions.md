# GitHub Copilot Instructions — Nuxt 4 Proposal Template Generator

You are an agent contributing to a Nuxt 4 codebase. Prioritize Nuxt conventions, type safety, and maintainable composition. Keep changes minimal, scoped, and consistent with existing patterns.

## 1) Core Nuxt 4 Conventions (Non-Negotiable)

- Use **file-based routing** under `app/pages/**`. Do not manually create Vue Router configs unless explicitly required. [oai_citation:1‡Nuxt](https://nuxt.com/docs/getting-started/routing?utm_source=chatgpt.com)
- Use `server/**` for server endpoints and server-only logic. Never import Node-only packages (e.g., `better-sqlite3`) into client-rendered components. [oai_citation:2‡Nuxt](https://nuxt.com/docs/guide/directory-structure/server?utm_source=chatgpt.com)
- Prefer Nuxt **auto-imports**:
  - Put reusable logic in `app/composables/**` (auto-imported). [oai_citation:3‡Nuxt](https://nuxt.com/docs/4.x/directory-structure/app/composables?utm_source=chatgpt.com)
  - Put shared UI in `app/components/**` (auto-imported). [oai_citation:4‡Nuxt](https://nuxt.com/docs/4.x/directory-structure/app/components?utm_source=chatgpt.com)
- Use Nuxt head/SEO composables (Unhead-powered). Prefer SSR-safe patterns over DOM mutation. [oai_citation:5‡Nuxt](https://nuxt.com/docs/getting-started/seo-meta?utm_source=chatgpt.com)

## 2) TypeScript and Quality Gates

- All new logic should be TypeScript-first (typed params, typed returns).
- Prefer schemas for runtime validation (Zod) when data crosses boundaries (content ↔ UI, API ↔ UI).
- Keep lint clean; do not introduce new eslint disables unless unavoidable.

## 3) Content Model & Proposal Data (Nuxt Content v3)

We use **@nuxt/content** as the primary content/data layer:

- Store proposal templates and structured data as Content collections (JSON/YAML/Markdown as appropriate). [oai_citation:6‡Nuxt Content](https://content.nuxt.com/?utm_source=chatgpt.com)
- Define collections and schemas in `content.config.ts` using `defineContentConfig` + Zod schemas for data collections. [oai_citation:7‡Nuxt Content](https://content.nuxt.com/docs/files/json?utm_source=chatgpt.com)
- Nuxt Content configuration belongs in `nuxt.config.ts` under `content: { ... }` when needed. [oai_citation:8‡Nuxt Content](https://content.nuxt.com/docs/getting-started/configuration?utm_source=chatgpt.com)
- When implementing proposal generation:
  - Prefer **structured JSON “data” collections** for proposals (stable typing, deterministic rendering).
  - Render through Vue components; avoid ad-hoc markdown parsing unless a specific feature requires it.

## 4) UI System (Nuxt UI v4)

We use **@nuxt/ui** for consistent components and styling:

- Prefer Nuxt UI components for layout primitives, forms, navigation, overlays, and tables. [oai_citation:9‡Nuxt UI](https://ui.nuxt.com/docs/getting-started?utm_source=chatgpt.com)
- Customize components via Nuxt UI’s theming/variants approach (Tailwind Variants). Avoid per-page style hacks. [oai_citation:10‡Nuxt UI](https://ui.nuxt.com/docs/getting-started/theme/components?utm_source=chatgpt.com)
- Keep UI consistent and accessible: headings, landmarks, focus states, keyboard navigation.

## 5) Images (Nuxt Image)

We use **@nuxt/image** for optimized images:

- Prefer `<NuxtImg>` over `<img>` for responsive/optimized assets unless there is a reason not to. [oai_citation:11‡Nuxt Image](https://image.nuxt.com/usage/nuxt-img?utm_source=chatgpt.com)
- When a provider or special behavior is required, configure via `image: { ... }` in `nuxt.config.ts`. [oai_citation:12‡Nuxt Image](https://image.nuxt.com/get-started/configuration?utm_source=chatgpt.com)

## 6) Fonts (Nuxt Fonts)

We use **@nuxt/fonts** to load/optimize web fonts:

- Prefer declaring fonts via the module and CSS usage; do not add random `<link rel="stylesheet">` tags manually unless instructed. [oai_citation:13‡Nuxt Fonts](https://fonts.nuxt.com/get-started/installation?utm_source=chatgpt.com)

## 7) Third-Party Scripts (Nuxt Scripts)

We use **@nuxt/scripts** for performant, privacy-aware script loading:

- Do not load third-party scripts by manually pasting `<script>` tags in templates.
- Use `useScript()` (and triggers) to control when scripts load (interaction, idle, consent, etc.). [oai_citation:14‡Nuxt Scripts](https://scripts.nuxt.com/docs/api/use-script?utm_source=chatgpt.com)
- Prefer module-level globals only for scripts needed site-wide; otherwise keep scripts page-scoped. [oai_citation:15‡Nuxt Scripts](https://scripts.nuxt.com/docs/guides/global?utm_source=chatgpt.com)

## 8) SEO (Nuxt SEO + Unhead)

We use **@nuxtjs/seo** (Nuxt SEO bundle) and Unhead composables:

- Prefer `useSeoMeta()` for SEO meta tags; use `useHead()` for generic head tags. [oai_citation:16‡Unhead](https://unhead.unjs.io/docs/head/api/composables/use-seo-meta?utm_source=chatgpt.com)
- For per-page SEO, implement in page components (or shared composables) rather than hardcoding in layouts.
- Ensure canonical URLs, robots/sitemap behavior follow module defaults unless explicitly overridden. [oai_citation:17‡Nuxt](https://nuxt.com/modules/seo?utm_source=chatgpt.com)

## 9) OG Images (nuxt-og-image)

We use **nuxt-og-image** for social share previews:

- Prefer `defineOgImage()` (or `defineOgImageComponent()`) in pages where OG image should be customized. [oai_citation:18‡Nuxt SEO](https://nuxtseo.com/docs/og-image/api/define-og-image?utm_source=chatgpt.com)
- If content pages are backed by Nuxt Content, leverage frontmatter integration when appropriate, but follow current v5+ guidance (don’t assume legacy behavior). [oai_citation:19‡Nuxt SEO](https://nuxtseo.com/docs/og-image/integrations/content?utm_source=chatgpt.com)
- Keep OG templates deterministic and fast; don’t introduce heavy runtime dependencies.

## 10) Analytics (nuxt-gtag)

We use **nuxt-gtag** for Google tag integration:

- Configure in `nuxt.config.ts` under `gtag: { id: 'G-XXXX' }` and keep IDs in environment/runtime config when appropriate. [oai_citation:20‡Nuxt](https://nuxt.com/modules/gtag?utm_source=chatgpt.com)
- Avoid double-instrumentation (do not manually load gtag via scripts when module is active).

## 11) Accessibility and DX (Nuxt A11y + Nuxt Hints)

We use:

- **@nuxt/a11y** for real-time a11y feedback/testing during development. [oai_citation:21‡Nuxt](https://nuxt.com/modules/a11y?utm_source=chatgpt.com)
- **@nuxt/hints** for performance/security/accessibility hints in DevTools. [oai_citation:22‡Nuxt](https://nuxt.com/modules/hints?utm_source=chatgpt.com)
  When modifying UI:
- Favor semantic HTML + correct landmarks.
- Ensure keyboard navigation works.
- Avoid introducing modals/overlays without accessible titles/labels.

## 12) VueUse (Utilities)

We use **@vueuse/nuxt** for auto-imported composition utilities:

- Prefer VueUse composables (debounce, event listeners, storage) instead of hand-rolled equivalents. [oai_citation:23‡vueuse.org](https://vueuse.org/nuxt/readme.html?utm_source=chatgpt.com)
- Ensure SSR safety (guard browser-only APIs with `process.client` or `onMounted` patterns where needed).

## 13) Animations (motion-v)

We use `motion-v` for animation. Keep animations:

- subtle and purposeful
- performance-safe (avoid layout thrash)
- progressive enhancement (don’t block content rendering)

## 14) Server Data (better-sqlite3)

We use `better-sqlite3` for local persistence:

- Only import/instantiate it in `server/**` files (handlers, server utils).
- Do not expose raw SQL errors to the client; return sanitized error messages.
- Provide typed API responses; validate request bodies with Zod.

## 15) Markdown Handling (marked)

We have `marked` available, but prefer Nuxt Content rendering when feasible:

- Use `marked` only for legacy inputs or special transforms where Content/MDC doesn’t fit.
- If you use `marked`, sanitize/escape appropriately if any user-provided content is involved.

## 16) Implementation Style Rules

- Prefer small, composable components over monolithic pages.
- Prefer reusable composables for shared business logic.
- Avoid new dependencies unless a strong reason exists.
- Match existing naming:
  - `useThing()` for composables
  - `ThingCard.vue` / `ThingTable.vue` for components
  - `server/api/*.ts` for API endpoints

## 17) When You’re Unsure

- Follow official Nuxt docs patterns for routing, server handlers, and head/SEO APIs. [oai_citation:24‡Nuxt](https://nuxt.com/docs/getting-started/routing?utm_source=chatgpt.com)
- Prefer module documentation over blog posts.
- Ask for clarification only if a change would affect architecture, data modeling, or deployment behavior.
