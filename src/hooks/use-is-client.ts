"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** True after hydration. Use to guard UI that depends on client-only state. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
