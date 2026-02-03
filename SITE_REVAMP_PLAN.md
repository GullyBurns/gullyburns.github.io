# gullys.website Revamp Plan

## Vision

A tech-forward personal website with philosophical depth. Clean, modern aesthetics paired with intellectual gravitas. The site should feel like the digital home of someone who thinks deeply about truth, science, and AI's role in society.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Astro 4.x** | Fast, content-focused, ships minimal JS |
| Styling | **Tailwind CSS** | Utility-first, easy theming, dark mode |
| Content | **Markdown/MDX** | Write naturally, embed components when needed |
| CMS | **Decap CMS** | Web-based editor, works on mobile, Git-backed |
| Hosting | **GitHub Pages** | Free, already configured for this repo |
| CI/CD | **GitHub Actions** | Auto-deploy on push to main |

---

## Site Structure

```
gullys.website/
├── /                      # Landing page - personal intro
├── /about/                # Trimmed bio
├── /ars-veritatis/        # Blog: truth, science, AI, society
├── /projects/             # Personal coding projects
├── /rpg/                  # Roleplaying game content
└── /work/                 # AI for Science portfolio
```

---

## Design Direction

### Aesthetic
- **Dark mode default** with light mode toggle
- **Typography**: Modern sans-serif body (Inter), subtle serif for philosophical quotes/callouts
- **Color palette**: Deep blues/grays with a single accent color (perhaps gold/amber for "truth/light" symbolism)
- **Whitespace**: Generous, unhurried - invites contemplation
- **No visual clutter**: Let the words breathe

### Landing Page
- Brief, understated personal introduction
- Not a wall of text - a few thoughtful sentences
- Clear navigation to the four sections
- Perhaps a rotating/featured quote or thought (optional)

### Section Cards
Each section (ars-veritatis, projects, rpg, work) gets a subtle card with:
- Section title
- One-line description
- Latest item or count

---

## Content Architecture

### Astro Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

// Same pattern for: projects, rpg, work
```

### File Structure

```
src/
├── content/
│   ├── ars-veritatis/
│   │   └── *.md           # Blog posts
│   ├── projects/
│   │   └── *.md           # Project writeups
│   ├── rpg/
│   │   └── *.md           # RPG content
│   └── work/
│       └── *.md           # Professional portfolio items
├── pages/
│   ├── index.astro        # Landing
│   ├── about.astro        # Bio
│   ├── ars-veritatis/
│   │   ├── index.astro    # Blog listing
│   │   └── [...slug].astro # Individual posts
│   ├── projects/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── rpg/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── work/
│       ├── index.astro
│       └── [...slug].astro
├── components/
│   ├── Header.astro       # Navigation
│   ├── Footer.astro
│   ├── ThemeToggle.astro  # Dark/light switch
│   ├── SectionCard.astro  # Homepage section cards
│   └── PostCard.astro     # Blog/content listing cards
└── layouts/
    ├── Base.astro         # HTML shell, meta, theme
    └── Post.astro         # Individual content pages
```

---

## Mobile Editing with Decap CMS

Decap CMS provides a web-based admin interface at `gullys.website/admin/`.

### Setup
1. Add `public/admin/index.html` - CMS entry point
2. Add `public/admin/config.yml` - defines collections
3. Configure GitHub OAuth (one-time setup)

### Writing Flow (from phone)
1. Go to `gullys.website/admin/`
2. Login with GitHub
3. Click "New Post" in any collection
4. Write in the visual editor
5. Save → creates a commit → triggers deploy

---

## GitHub Actions Workflow

### Auto-Deploy on Push

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Claude PR Integration (Optional)

To enable `@claude` in PRs for automated changes:

```yaml
# .github/workflows/claude-pr.yml
name: Claude PR Assistant

on:
  issue_comment:
    types: [created]

jobs:
  claude-response:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Claude Code GitHub Action integration
      # (Configure with ANTHROPIC_API_KEY secret)
```

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Initialize Astro project
- [ ] Configure Tailwind with dark mode
- [ ] Create base layout and theme toggle
- [ ] Set up content collections (empty)
- [ ] Deploy to GitHub Pages

### Phase 2: Core Pages
- [ ] Landing page with personal intro
- [ ] About page (trimmed bio)
- [ ] Navigation header
- [ ] Footer with links

### Phase 3: Content Sections
- [ ] ars-veritatis blog listing + post template
- [ ] projects listing + detail template
- [ ] rpg listing + detail template
- [ ] work portfolio listing + detail template

### Phase 4: CMS Integration
- [ ] Add Decap CMS admin interface
- [ ] Configure GitHub OAuth app
- [ ] Test mobile editing flow

### Phase 5: Polish
- [ ] SEO meta tags
- [ ] Open Graph images
- [ ] RSS feed for ars-veritatis
- [ ] 404 page
- [ ] Performance audit

---

## Bio (Trimmed)

> I'm Gully - named after a character in a 1950s pulp sci-fi novel, *The Stars My Destination*.
>
> I studied physics, pivoted to neuroscience, and spent two decades building knowledge systems to accelerate scientific discovery. Now I work at the intersection of AI and science, trying to help researchers move faster.
>
> I write about truth, epistemology, and AI's role in society at **ars-veritatis**. I also tinker with code, play RPGs, and believe the world can't wait for us to solve the problems we face.

---

## Domain Configuration

Current: `gullys.website` (via CNAME)

No changes needed - Astro will deploy to the same GitHub Pages setup.

---

## Next Steps

1. Review and approve this plan
2. Create a PR with `@claude` to implement Phase 1
3. Iterate from there
