# Gravel

Design prototypes for **Gravel** — a services scheduling and operations tool for contractors.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the prototype index.

## Structure

```
app/
  layout.tsx          # Root layout (DM Sans, global styles)
  page.tsx            # Prototype index
  prototypes/
    registry.ts       # Register prototypes here
    [slug]/
      page.tsx        # Individual prototype pages

styles/
  tokens.css          # CSS custom properties (colors, spacing, etc.)
  tokens.ts           # TypeScript token exports
  globals.css         # Tailwind + base styles

lib/
  fonts.ts            # DM Sans via next/font/google
  styles.ts           # Re-exports design tokens
```

## Adding a prototype

1. Create a folder at `app/prototypes/your-slug/page.tsx`
2. Add an entry to `app/prototypes/registry.ts`
3. Build your design using the shared tokens in `styles/tokens.css`

## Design tokens

Brand colors and styles live in `styles/tokens.css`. Update the CSS custom properties there — they flow into Tailwind utilities and the TypeScript token exports in `styles/tokens.ts`.
