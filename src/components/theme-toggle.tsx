"use client";

import { useTheme } from "next-themes";
import { useIsClient } from "@/hooks/use-is-client";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const next = isClient && resolvedTheme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-3.5 text-sm font-medium transition-colors hover:border-ink"
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
      <span className="capitalize">{next}</span>
    </button>
  );
}
