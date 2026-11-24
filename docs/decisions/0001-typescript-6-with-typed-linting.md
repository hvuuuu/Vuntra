# 0001: TypeScript 6 with typed linting

- **Context:** TypeScript 7 (native) is out and Next 16 supports it, but stable typescript-eslint only supports TypeScript `<6.1`. A full type check of this project takes about 2 seconds.
- **Decision:** Use TypeScript 6 with `strict` on, and lint with typescript-eslint's type-aware `strictTypeChecked` rules.
- **Why:** Typed rules catch bug classes the compiler misses (unhandled promises, unsafe `any`). TypeScript 7's speed saves under 2 seconds here.
- **Revisit when:** a stable typescript-eslint release supports TypeScript 7.
