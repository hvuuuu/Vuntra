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

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run format`.

## Where things live

```
src/
  app/            layout, page, global styles and tokens, icon
  components/     one file per section, plus shared pieces (Reveal, ButtonLink)
    demos/        the small illustrations inside each project panel
  content/site.ts all copy and links: edit this file to change text
  hooks/          useMediaQuery, useIsClient
  fonts/          woff2 files (SIL Open Font License)
```

## Editing content

All text, links, projects, roles and skills are in `src/content/site.ts`. Components only handle layout and motion.

To add a project, add an entry to `projects` and a matching demo in `src/components/work.tsx`.

## Motion notes

- The projects section pins and scrolls horizontally only on screens at least 960px wide and 660px tall. Smaller screens get a normal vertical stack.
- Everything respects `prefers-reduced-motion`: smooth scroll, pinning, the custom cursor and looping animations are switched off.

## Deploy

Import the repository on Vercel. No environment variables are needed.

## To do

- Replace the drawn project illustrations with real screenshots or short recordings.
- Add an Open Graph image and set `metadataBase` once the domain is known.
