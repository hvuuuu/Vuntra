# 0003: Sections separate from shared components

- **Context:** One-page portfolio. `components/` mixed page sections with reusable building blocks, so nothing stopped one section from importing another or a building block from depending on a section.
- **Decision:** `src/sections/` holds what the page lays out (one file each, or a folder when a section has its own parts, like `work/`). `src/components/` holds shared building blocks. `src/content/site.ts` stays the only place for copy and links. Dependencies point one way: `app → sections → components → hooks`, and everything may read `content`, which imports nothing local.
- **Why:** The import graph already had this shape. Naming it lets lint enforce it; a split without a rule drifts.
- **Revisit when:** sections grow their own hooks, types and tests (move to feature folders), or the site gets a second page.
