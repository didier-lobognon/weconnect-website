"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** Current Lenis instance (null when smooth scroll is disabled). */
export const getLenis = () => instance;

/** Inertia scrolling (Lenis), skipped when the user prefers reduced motion. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    instance = new Lenis({ lerp: 0.1, autoRaf: true, anchors: { offset: -80 } });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    instance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
