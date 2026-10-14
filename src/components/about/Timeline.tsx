"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { easeOut } from "@/components/motion/Reveal";
import { story } from "@/lib/site";

/** Vertical story whose spine fills as the reader scrolls. */
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol className="timeline" ref={ref}>
      <span className="timeline-spine" aria-hidden="true">
        <motion.span style={{ scaleY: reduce ? 1 : fill }} />
      </span>
      {story.map((item, i) => (
        <motion.li
          key={item.step}
          className={`timeline-item${i % 2 ? " is-right" : ""}`}
          initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1, ease: easeOut }}
        >
          <motion.span
            className="timeline-node"
            aria-hidden="true"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
          />
          <div className="timeline-card">
            <span className="timeline-step">{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
