"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollWords({
  text,
  className,
  accents = [],
}: {
  text: string;
  className?: string;
  accents?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.replace(/ ([?!:;])/g, "\u00a0$1").split(" ");

  return (
    <p ref={ref} className={`scroll-words ${className ?? ""}`.trim()}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const accent = accents.includes(word.replace(/[.,!?;:—]/g, ""));
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            accent={accent}
            static={!!reduce}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
  static: isStatic,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  static: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <motion.span
        className={accent ? "is-accent" : undefined}
        style={{ opacity: isStatic ? 1 : opacity }}
      >
        {children}
      </motion.span>{" "}
    </>
  );
}
