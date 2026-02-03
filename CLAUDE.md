# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for gullys.website built with Astro 5.x static site generator. Content-focused site with multiple collections (blog, poetry, projects, RPG content, professional work). Dark mode default with philosophical/minimalist aesthetic.

## Development Commands

```bash
npm run dev       # Start development server (localhost:4321)
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

## Architecture

### Tech Stack
- **Framework**: Astro 5.x (static site generation, zero JS by default)
- **Styling**: Tailwind CSS with custom color palette (`midnight` for dark blues, `truth` for amber accents)
- **Content**: Markdown/MDX via Astro Content Collections
- **Deployment**: GitHub Pages via GitHub Actions (triggers on push to main/master)

### Directory Structure
```
src/
├── pages/           # File-based routing (index.astro, about.astro, [collection]/...)
├── content/         # Markdown content collections
│   ├── ars-veritatis/  # Philosophy/AI/science essays
│   ├── blog/           # General posts
│   ├── poetry/
│   ├── projects/
│   ├── rpg/
│   └── work/           # Professional portfolio
├── components/      # Reusable Astro components
├── layouts/         # Base.astro (root), Post.astro (articles)
└── styles/          # global.css with Tailwind layers
```

### Content Collections

Schemas defined in `src/content/config.ts`. Each collection uses Zod validation:

| Collection | Key Fields |
|------------|-----------|
| ars-veritatis, blog | title, description, pubDate, tags, draft |
| poetry | title, pubDate, tags (description optional) |
| projects | title, description, pubDate, repo, demo, tags, featured |
| rpg | title, description, pubDate, system, tags |
| work | title, description, pubDate, organization, tags, featured |

### Styling Conventions

- Dark mode is default (class-based via `dark` on `<html>`)
- Light mode overrides use `:global(html:not(.dark))` selectors
- Prose content styled via `@tailwindcss/typography` with `prose-invert`
- Custom colors: `midnight-*` (backgrounds/text), `truth-*` (accents/links)

### Dynamic Routes

Content sections use `[...slug].astro` for static path generation:
```typescript
export async function getStaticPaths() {
  const entries = await getCollection('collection-name');
  return entries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
```
