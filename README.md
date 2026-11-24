# Vuntra

Personal portfolio of Huy Vu Tran (Vuntra). One page, dark by default, with scroll-driven motion.

## Stack

| Concern       | Choice                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router), React 19, TypeScript                           |
| Styling       | Tailwind CSS 4, design tokens as CSS variables in `src/app/globals.css` |
| Motion        | Motion (`motion/react`) for scroll-linked and in-view animation         |
| Smooth scroll | Lenis                                                                   |
| Theme         | next-themes (`data-theme` on `<html>`, dark by default)                 |
| Fonts         | Self-hosted variable fonts through `next/font/local`                    |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run format`, `npm run format:check`, `npm run test:e2e` (first run `npx playwright install chromium webkit`).

Checks run in three places: a pre-commit hook (lint-staged + typecheck, installed by `npm install`), GitHub Actions on every push and pull request, and Claude Code hooks in `.claude/` that format and lint each file an agent edits.

## Where things live

```
src/
  app/            layout, page, global styles and tokens, icon
  sections/       what the page lays out, one file per section
    work/         the projects section and its demos (illustrations in each panel)
  components/     shared building blocks (Reveal, ButtonLink, ThemeToggle, Providers)
  content/site.ts all copy and links: edit this file to change text
  hooks/          useMediaQuery, useIsClient
  fonts/          woff2 files (SIL Open Font License)
docs/decisions/   why the project is shaped this way (ADRs)
```

## Editing content

All text, links, projects, roles and skills are in `src/content/site.ts`. Sections and components only handle layout and motion; lint fails if a section contains text of its own. The one exception is the drawn demos in `src/sections/work/demos/`, whose text is part of the illustration.

To add a project, add an entry to `projects` and a matching demo in `src/sections/work/work.tsx`. The type checker fails until both exist.

## Motion notes

- The projects section pins and scrolls horizontally only on screens at least 960px wide and 660px tall. Smaller screens get a normal vertical stack.
- Everything respects `prefers-reduced-motion`: smooth scroll, pinning, the custom cursor and looping animations are switched off.

## Deploy

Import the repository on Vercel. No environment variables are needed.

## To do

- Replace the drawn project illustrations with real screenshots or short recordings.
- Add an Open Graph image and set `metadataBase` once the domain is known.
