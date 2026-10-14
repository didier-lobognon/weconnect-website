"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { easeOut } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { logoColors } from "@/components/ui/BrandMark";
import { ButtonLink } from "@/components/ui/Button";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import { ScrollCue } from "@/components/ui/PageHero";
import { PhotoBackdrop } from "@/components/ui/Photo";

const letters = Array.from("WE.CONNECT");
const drawEase = [0.65, 0, 0.35, 1] as const;

/** The official network "W", drawn stroke by stroke, nodes popping in. */
function AnimatedMark() {
  const nodes = [
    { cx: 28, cy: 28, fill: logoColors.orange, d: 0.25 },
    { cx: 166, cy: 28, fill: "#7CC1FF", d: 0.45 },
    { cx: 303, cy: 28, fill: logoColors.orange, d: 0.65 },
    { cx: 110, cy: 228, fill: logoColors.orange, d: 0.85 },
    { cx: 223, cy: 228, fill: logoColors.green, d: 1.05 },
  ];
  return (
    <svg className="hero-mark" viewBox="0 0 332 256" fill="none" aria-hidden="true">
      <g stroke="#fff" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M28 28 L110 228 L166 125 L223 228 L303 28"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: drawEase, delay: 0.2 }}
        />
        <motion.path
          d="M68 125 L166 28 L264 125"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: drawEase, delay: 0.7 }}
        />
      </g>
      {nodes.map((n) => (
        <motion.circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r="26"
          fill={n.fill}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: n.d }}
        />
      ))}
    </svg>
  );
}

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <motion.div
        className="hero-media"
        initial={reduce ? false : { scale: 1.18, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: easeOut }}
      >
        <motion.div className="hero-media-inner" style={{ scale: reduce ? 1.05 : bgScale }}>
          <PhotoBackdrop name="remiseEcharpes" priority />
        </motion.div>
      </motion.div>
      <div className="hero-veil" aria-hidden="true" />
      <NetworkCanvas density={42000} className="network-canvas network-canvas-soft" />

      <motion.div
        className="container hero-inner"
        style={reduce ? undefined : { y: contentY, opacity: fade }}
      >
        <div className="hero-brand">
          <AnimatedMark />
          <div className="hero-wordmark" aria-hidden="true">
            {letters.map((char, i) => (
              <span className="split-mask" key={i}>
                <motion.span
                  className={`split-inner${char === "." ? " wordmark-dot" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: easeOut, delay: 0.4 + i * 0.05 }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </div>
        </div>

        <SplitText
          as="h1"
          id="hero-title"
          text="Le lien vivant entre les talents Wecode."
          trigger="mount"
          delay={0.9}
          accents={["vivant"]}
          className="hero-title"
        />

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 1.4 }}
        >
          <ButtonLink href="/rejoindre">Rejoindre la communauté</ButtonLink>
          <ButtonLink href="/a-propos" variant="ghost" arrow={false}>
            Notre histoire
          </ButtonLink>
        </motion.div>
      </motion.div>

      <ScrollCue />
    </section>
  );
}
