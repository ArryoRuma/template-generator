# template-generator
## **What you have now (baseline to match)**

Your current repo is a **static HTML “proposal as a slide deck” site** with:

- index.html as a landing page with slide navigation
- slides/1.html … slides/11.html as individual slides
- css/style.css holding centralized theme tokens + styles (CSS variables)
- js/config.js for centralized company/contact/proposal fields
- js/nav.js for keyboard + button navigation + fullscreen shortcuts

It’s explicitly designed to run on **GitHub Pages from main with no build step**, and the slides are **1280×720 (16:9)** with CDN dependencies (Tailwind, Font Awesome, Google Fonts).

## **What I want (Nuxt version)**

A **Nuxt 4 proposal generator/template** that:

1. **Looks and navigates**  (slide deck UX, 16:9 canvas, prev/index/next, keyboard shortcuts, fullscreen).
2. Lets you generate new proposals by editing **data files** (not duplicating HTML pages).
3. Deploys as a **static site to GitHub Pages** (same hosting outcome, just with a build step).

The key translation is:

Static HTML pages ⟶ Nuxt pages generated from a proposal “schema” + slide components.

## **Recommended Nuxt architecture (tight and scalable)**

### **Core idea**

- Each proposal is a “record” (YAML/JSON) that declares:
    - client + project metadata
    - theme tokens (colors, logo, etc.)
    - an ordered list of slides, where each slide is a **type** + **payload**
- Nuxt renders:
    - /p/:slug as an index/table-of-contents
    - /p/:slug/s/:n as slide n

### 

## **Target folder structure**

```
proposal-deck/
  app/
    layouts/
      slide.vue
    pages/
      index.vue
      p/[slug]/index.vue
      p/[slug]/s/[n].vue
    components/
      SlideFrame.vue
      SlideNav.vue
      SlideRenderer.vue
      slides/
        CoverSlide.vue
        SectionSlide.vue
        TwoColumnBullets.vue
        TimelineSlide.vue
        InvestmentSlide.vue
        NextStepsSlide.vue
    composables/
      useProposal.ts
      useSlideNav.ts
    plugins/
      slide-nav.client.ts
  public/
    assets/
      logos/
  data/
    proposals/
      shore-av-build.json
      template.json
  nuxt.config.ts
  package.json
```

Notes:

- data/proposals/*.json is deliberately boring and reliable. You can move to YAML later if you want.
- Slide “types” live in components/slides/* so you can build a reusable library.

## **Step-by-step implementation plan (copy/paste-friendly for Copilot)**

### **1) Create the Nuxt project**

Commands:

```
npx nuxi@latest init proposal-deck
cd proposal-deck
pnpm install
pnpm dev
```

### **2) Configure for GitHub Pages (static generation)**

You want a static build like your current setup, just produced by Nuxt.

In nuxt.config.ts:

- Set ssr: true (fine for SSG)
- Set nitro.preset = 'github_pages' (best-fit for GH Pages)
- Set app.baseURL to your repo name (GitHub Pages subpath)

Example pattern:

```
export default defineNuxtConfig({
  ssr: true,
  nitro: { preset: 'github_pages' },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/proposal-deck/',
  },
})
```

This is the #1 thing people miss; without it, CSS/assets/routes often break on Pages.

### **3) Add global typography + theme tokens (to match your existing “style.css” approach)**

Your current project centralizes colors as CSS variables.

Keep that model.

- Create app/assets/css/theme.css defining CSS variables (primary, secondary, background, etc.).
- Create app/assets/css/slide.css defining the 1280×720 frame and shared slide styles.

Then include in nuxt.config.ts:

```
css: [
  '@/assets/css/theme.css',
  '@/assets/css/slide.css',
],
```

Also include Google Fonts (Montserrat/Open Sans) via app.head to mirror current fonts.

### **4) Implement the 16:9 slide canvas (the “deck frame”)**

Create components/SlideFrame.vue:

- Outer container centers content
- Inner “canvas” is fixed to 1280×720 with responsive scaling
- Optional “safe margins” to keep content aligned

This is where you enforce the “looks like a deck” constraint that your current repo guarantees by design.

### **5) Create a slide layout**

app/layouts/slide.vue should:

- Wrap pages in <SlideFrame>
- Include <SlideNav> (Prev / Index / Next buttons)
- Register keyboard shortcuts (left/right/home/end, F fullscreen) consistent with your current nav.js behavior.

### **6) Proposal data model (the generator backbone)**

Create data/proposals/template.json:

```
{
  "slug": "template",
  "title": "AV System Design Proposal",
  "date": "January 2026",
  "company": { "name": "Client Name", "tagline": "Proposal Tagline" },
  "preparedBy": { "name": "Your Name / Company", "email": "you@domain.com", "phone": "(555) 123-4567", "website": "domain.com" },
  "theme": { "primary": "#2E5C8A", "secondary": "#4A90E2" },
  "slides": [
    { "type": "cover", "data": { "headline": "AV System Design Proposal", "subhead": "Design-Only" } },
    { "type": "section", "data": { "title": "Project Understanding", "bullets": ["...", "..."] } }
  ]
}
```

This directly replaces js/config.js + scattered slide content with a single source of truth (same intent as your current config.js, just upgraded).

### **7)**

### **useProposal()**

### **composable (loads and validates proposal files)**

Create app/composables/useProposal.ts:

- loads a proposal by slug from data/proposals
- returns proposal, slides, count
- throws a 404 if missing

Implementation options:

- simplest: import a map of proposals (static import)
- scalable: import.meta.glob to auto-register all JSON files

### **8) Dynamic routes**

Create:

- app/pages/p/[slug]/index.vue
    
    Shows the deck landing page:
    
    - title, metadata, and a clickable list of slides (like your current index.html role).
- app/pages/p/[slug]/s/[n].vue
    
    Renders slide number n using:
    
    - <SlideRenderer :slide="slides[n-1]" />

### **9) SlideRenderer (the “templating engine”)**

Create components/SlideRenderer.vue that maps slide.type to a Vue component:

```
const registry = {
  cover: resolveComponent('CoverSlide'),
  section: resolveComponent('SectionSlide'),
  timeline: resolveComponent('TimelineSlide'),
  investment: resolveComponent('InvestmentSlide'),
  nextSteps: resolveComponent('NextStepsSlide'),
}
```

If unknown type:

- show a clean error UI (“Unknown slide type: X”)

This is where you get reusability: you’ll build a small set of slide types that cover 80–90% of proposals, and only create “custom slide components” when needed.

### **10) Navigation logic (replace**

### **js/nav.js**

### **)**

Your current site supports:

- Arrow keys / PageUp / PageDown
- Home / End
- F fullscreen toggle

Implement app/composables/useSlideNav.ts:

- computes prev/next URLs based on current n and slide count
- exposes handlers for keydown
- exposes toggleFullscreen()

Then add app/plugins/slide-nav.client.ts:

- attaches window.addEventListener('keydown', …) on client only
- routes accordingly using navigateTo()

### **11) Styling parity with your current deck**

Your current repo uses:

- CSS variables for theme colors
- Tailwind via CDN

In Nuxt, do **one** of these:

Option A (closest feel): Install Tailwind in Nuxt and use utility classes in components.

Option B (closest philosophy): Keep most styling in slide.css + CSS variables, and use minimal utilities.

Given your goal (“proposal generator/template”), I’d do **Option B**:

- it prevents Tailwind class sprawl across slide components
- it keeps your “theme tokens” approach intact (like css/style.css).

### **12) Theme per proposal (so each client can have their branding)**

On proposal load:

- set CSS variables dynamically from proposal.theme

Do this in layouts/slide.vue (client-safe):

- compute a style object like { '--color-primary': proposal.theme.primary }
- apply to a wrapper <div :style="vars">

This preserves the “edit one place, affect all slides” concept from your current style.css + config model.

### **13) Deployment (GitHub Pages)**

Your current repo deploys from main root.

For Nuxt, you typically deploy the generated dist/ output via GitHub Actions.

High-level steps (the reliable path):

1. Build: pnpm install && pnpm build && pnpm generate
2. Deploy ./dist to GitHub Pages using the official Pages workflow pattern
3. Ensure Pages is configured in repo settings (Build and deployment)

If you want, I can provide the exact .github/workflows/deploy.yml tuned for Nuxt + subpath baseURL, but the design above is the critical foundation.

## **“Proposal generator” upgrades (worth doing early)**

### **A) Proposal scaffolding command**

Add a script: pnpm new:proposal

- asks for client name, slug, date, preparedBy
- copies template.json → data/proposals/<slug>.json
- optionally copies a logo placeholder into public/assets/logos/<slug>.png

### **B) Export to PDF**

Once slide pages exist at stable URLs, you can:

- use Playwright to print /p/:slug (or each slide) to PDF
- store the PDF as a build artifact or commit to /exports/

This is the bridge from “slick web proposal” to “client-friendly attachment”.

### **C) Proposal “blocks” library**

Treat slides as compositions of blocks:

- Bullets, IconList, TwoColumn, Callout, PricingTable, Timeline
    
    This keeps new slide types rare; you just rearrange blocks.
