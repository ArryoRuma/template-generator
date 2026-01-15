# Getting Started

This Nuxt 4 proposal generator creates professional slide decks for proposals.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Creating a New Proposal

1. Copy `app/data/proposals/template.json` to a new file (e.g., `client-name.json`)
2. Update the proposal data:
   - Change the `slug` to match your filename
   - Update client information
   - Customize theme colors
   - Add/modify slides

## Available Slide Types

- **cover**: Title slide with headline and subhead
- **section**: Single section with bullet points
- **twoColumnBullets**: Two-column layout with bullets
- **timeline**: Phase-based timeline with descriptions
- **investment**: Pricing and investment details
- **nextSteps**: Action items with numbered steps

## Keyboard Shortcuts (on slide pages)

- **Arrow Left / Page Up**: Previous slide
- **Arrow Right / Page Down / Space**: Next slide
- **Home**: Return to proposal index
- **F**: Toggle fullscreen

## Customization

### Theme Colors
Each proposal can have custom theme colors defined in the `theme` object:
```json
"theme": {
  "primary": "#2E5C8A",
  "secondary": "#4A90E2"
}
```

### Adding New Slide Types
1. Create a new component in `app/components/slides/`
2. Register it in `app/components/SlideRenderer.vue`
3. Use it in your proposal data

## Deployment

The project is configured to deploy to GitHub Pages automatically when you push to the main branch.

To manually deploy:
```bash
npm run generate
npx gh-pages --dotfiles -d .output/public
```

## Project Structure

```
├── app/
│   ├── assets/css/          # Global styles
│   ├── components/          # Vue components
│   │   └── slides/          # Slide type components
│   ├── composables/         # Reusable logic
│   ├── data/
│   │   └── proposals/       # Proposal data files
│   ├── layouts/             # Layout templates
│   ├── pages/               # Route pages
│   └── plugins/             # Nuxt plugins
├── public/                  # Static assets
└── nuxt.config.ts          # Nuxt configuration
```
