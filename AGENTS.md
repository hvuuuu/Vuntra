<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run lint`, `npm run typecheck`, `npm run format:check`: run before saying a change is done.
- `npm run test:e2e`: builds the site and runs Playwright on desktop and mobile Chromium and WebKit. Run it for any UI change.

## Where things go

- `src/app/`: layout and the page that assembles sections.
- `src/sections/`: one file per page section. A section with its own parts gets a folder (see `work/`).
- `src/components/`: building blocks shared by sections.
- `src/content/site.ts`: copy and links (bio, projects, roles, skills).
- `src/hooks/`, `e2e/`, `docs/decisions/` (why things are the way they are).

Lint enforces which folder may import which; the error message says what to do instead. A `react/jsx-no-literals` error in a section means: move that text into a `…Copy` object in `site.ts`. Text inside `work/demos/` is part of the drawing and stays there.

## Golden example

Copy the Experience section when adding a section: `src/content/site.ts` (`Role` type + `as const satisfies`), `src/sections/experience.tsx`, `e2e/experience.spec.ts`.

## Judgment calls

- Ask before adding a dependency.
- Prefer CSS and Motion's built-ins over new animation code; respect `prefers-reduced-motion`.
- When the same mistake happens twice, propose a lint rule, a type or a test, not another line in this file.
