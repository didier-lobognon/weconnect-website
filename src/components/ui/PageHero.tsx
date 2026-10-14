"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { easeOut } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import { PhotoBackdrop } from "@/components/ui/Photo";
import type { ImageKey } from "@/lib/images";

/** Full-bleed blue opener shared by inner pages. */
export function PageHero({
  kicker,
  title,
  lead,
  accents,
  image,
  compact = false,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  accents?: string[];
  /** Background photo, shown under a brand-blue veil. */
  image?: ImageKey;
  /** Smaller title, for long detail-page titles. */
  compact?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section className={`page-hero${image ? " has-photo" : ""}${compact ? " is-compact" : ""}`} ref={ref}>
      <motion.div className="page-hero-bg" style={{ scale: reduce ? 1 : canvasScale }}>
        {image ? <PhotoBackdrop name={image} priority /> : null}
      </motion.div>
      {image ? <div className="hero-veil" aria-hidden="true" /> : null}
      <NetworkCanvas
        density={image ? 42000 : 30000}
        className={image ? "network-canvas network-canvas-soft" : "network-canvas"}
      />
      <div className="hero-glow" aria-hidden="true" />

      <motion.div
        className="container page-hero-inner"
        style={reduce ? undefined : { y, opacity }}
      >
        <motion.span
          className="kicker kicker-light"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
        >
          <span className="kicker-line" aria-hidden="true" />
          {kicker}
        </motion.span>
        <SplitText
          as="h1"
          text={title}
          trigger="mount"
          delay={0.2}
          accents={accents}
          className="page-hero-title"
        />
        <motion.p
          className="page-hero-lead"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.7 }}
        >
          {lead}
        </motion.p>
        {children ? (
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.85 }}
          >
            {children}
          </motion.div>
        ) : null}
      </motion.div>

      <ScrollCue />
    </section>
  );
}

export function ScrollCue() {
  return (
    <motion.div
      className="scroll-cue"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
    >
      <span>Défiler</span>
      <span className="scroll-cue-line" />
    </motion.div>
  );
}
