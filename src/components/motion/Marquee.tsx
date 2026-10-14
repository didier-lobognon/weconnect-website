"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const COPIES = 4;

/** Infinite band of words whose speed and direction follow the scroll velocity. */
export function Marquee({
  items,
  baseVelocity = -1,
  className,
}: {
  items: readonly string[];
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 1.2], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`marquee ${className ?? ""}`.trim()} aria-hidden="true">
      <motion.div className="marquee-track" style={{ x }}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <span className="marquee-group" key={copy}>
            {items.map((item) => (
              <span className="marquee-item" key={item}>
                {item}
                <svg viewBox="0 0 24 24" className="marquee-sep">
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
