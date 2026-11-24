import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";

// Import boundaries (ADR 0002, 0003): app → sections → components → hooks; everything may read content.
// A later `no-restricted-imports` replaces an earlier one for the same file, so every entry repeats the global bans.
function restrictImports(...extraPatterns) {
  return [
    "error",
    {
      paths: [
        { name: "framer-motion", message: "Import from motion/react: same library, current package." },
        { name: "next/font/google", message: "Fonts are self-hosted in src/fonts with next/font/local." },
      ],
      patterns: [
        {
          group: ["../*"],
          message: "Import from another folder with the @/ alias so these boundary rules can see it.",
        },
        ...extraPatterns,
      ],
    },
  ];
}

const boundaries = [
  { files: ["**/*.{ts,tsx}"], rules: { "no-restricted-imports": restrictImports() } },
  {
    files: ["src/content/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        group: ["@/*", "react", "react/*", "next", "next/*", "motion", "motion/*"],
        message: "content/ is plain data: it imports nothing from the app or a framework.",
      }),
    },
  },
  {
    files: ["src/hooks/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        group: ["@/app/*", "@/sections/*", "@/components/*"],
        message: "hooks/ sits below components and sections.",
      }),
    },
  },
  {
    files: ["src/components/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        group: ["@/app/*", "@/sections/*"],
        message: "Shared components must not depend on page sections.",
      }),
    },
  },
  {
    files: ["src/sections/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        group: ["@/app/*", "@/sections/*"],
        message: "A section must not import another section. Move the shared part to components/.",
      }),
    },
  },
  {
    files: ["src/sections/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": restrictImports(
        {
          group: ["@/app/*", "@/sections/*"],
          message: "A section must not import another section. Move the shared part to components/.",
        },
        {
          group: ["./*"],
          message: "Single-file sections have no parts of their own; this would import a sibling section.",
        },
      ),
    },
  },
  {
    files: ["e2e/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        group: ["@/app/*", "@/sections/*", "@/components/*", "@/hooks/*"],
        message: "Tests check the rendered page against content/ and import nothing else from src.",
      }),
    },
  },
];

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Rules that read the types (ADR 0001).
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      // Numbers stringify predictably; objects, null and undefined still fail.
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      // `() => clearInterval(id)` is the normal React cleanup idiom; using a void result is still caught.
      "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
    },
  },
  { files: ["**/*.{js,mjs,cjs}"], extends: [tseslint.configs.disableTypeChecked] },

  ...boundaries,

  // Copy lives in src/content/site.ts so it can be edited in one place. Demos are drawings; their text is part of the picture.
  {
    files: ["src/sections/**/*.tsx"],
    ignores: ["src/sections/work/demos/**"],
    rules: {
      "react/jsx-no-literals": ["error", { noStrings: true, ignoreProps: true, allowedStrings: ["/"] }],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "test-results/**", "playwright-report/**"]),
]);
