"use client";

import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { Logo } from "@/components/ui/BrandMark";

let firstRender = true;

/**
 * Re-mounts on every navigation: a blue curtain sweeps away to reveal the new page.
 * Skipped on the initial load so content is visible immediately.
 */
export default function Template({ children }: { children: ReactNode }) {
  const animate = !firstRender;

  useEffect(() => {
    firstRender = false;
  }, []);

  return (
    <>
      {animate ? (
        <motion.div
          className="page-curtain"
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        >
          <motion.span
            className="page-curtain-mark"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Logo tone="light" />
          </motion.span>
        </motion.div>
      ) : null}
      <motion.div
        initial={animate ? { opacity: 0, y: 40 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
