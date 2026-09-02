"use client";

import { useSyncExternalStore } from "react";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

export function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCE_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

let webglResult: boolean | null = null;
function detectWebGL(): boolean {
  if (webglResult !== null) return webglResult;
  try {
    const canvas = document.createElement("canvas");
    webglResult = !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    webglResult = false;
  }
  return webglResult;
}

/** null during SSR / first paint, boolean once checked on the client */
export function useHasWebGL(): boolean | null {
  return useSyncExternalStore(
    () => () => {},
    detectWebGL,
    () => null,
  );
}
