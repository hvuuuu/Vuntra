# 0002: Import boundaries with built-in ESLint rules

- **Context:** The architecture (see 0003) has four layers and a handful of import rules, plus a few banned packages.
- **Decision:** Enforce them with ESLint's built-in `no-restricted-imports`, not `eslint-plugin-boundaries`.
- **Why:** The rules fit on one screen and need no extra dependency or plugin vocabulary.
- **Revisit when:** there are enough layers or features that the patterns get hard to read, or rules like "only a module's public entry may be imported" are needed.
