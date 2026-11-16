"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function Providers({ children }: { children: ReactNode }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      <MotionConfig reducedMotion="user">
        {reduceMotion ? (
          children
        ) : (
          <ReactLenis root options={{ lerp: 0.11, anchors: true }}>
            {children}
          </ReactLenis>
        )}
      </MotionConfig>
    </ThemeProvider>
  );
}
