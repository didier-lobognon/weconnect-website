"use client";

import { motion, type Variants } from "motion/react";
import { easeOut } from "@/components/motion/Reveal";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

type SplitTextProps = {
  text: string;
  as?: Tag;
  className?: string;
  /** Split into words (default) or characters. */
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  /** "mount" animates immediately, "view" waits for the viewport. */
  trigger?: "mount" | "view";
  /** Words rendered with the accent class. */
  accents?: string[];
  id?: string;
};

const inner: Variants = {
  hidden: { y: "110%", rotate: 4 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease: easeOut },
  },
};

/** Masked line-by-line reveal of a headline, word by word or char by char. */
export function SplitText({
  text,
  as = "h2",
  className,
  by = "word",
  delay = 0,
  stagger,
  trigger = "view",
  accents = [],
  id,
}: SplitTextProps) {
  const MotionTag = motion[as];
  // French typography: keep ? ! : ; glued to the previous word (non-breaking space).
  const words = text.replace(/ ([?!:;])/g, "\u00a0$1").split(" ");
  const step = stagger ?? (by === "char" ? 0.03 : 0.07);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren: delay } },
  };

  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" as const }
      : {
          whileInView: "visible" as const,
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        };

  return (
    <MotionTag
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      aria-label={by === "char" ? text : undefined}
      {...triggerProps}
    >
      {words.map((word, wi) => {
        const accent = accents.includes(word.replace(/[.,!?;:]/g, ""));
        return (
          <span key={`${word}-${wi}`}>
            <span
              className={`split-word${accent ? " is-accent" : ""}`}
              aria-hidden={by === "char" ? true : undefined}
            >
              {by === "char" ? (
                Array.from(word).map((char, ci) => (
                  <span className="split-mask" key={ci}>
                    <motion.span className="split-inner" variants={inner}>
                      {char}
                    </motion.span>
                  </span>
                ))
              ) : (
                <span className="split-mask">
                  <motion.span className="split-inner" variants={inner}>
                    {word}
                  </motion.span>
                </span>
              )}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </MotionTag>
  );
}
