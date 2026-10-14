"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { easeOut } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { branches } from "@/lib/site";

const center = { x: 300, y: 210 };
const positions = [
  { x: 90, y: 70 },
  { x: 510, y: 70 },
  { x: 90, y: 350 },
  { x: 510, y: 350 },
];
const pairs: Array<[number, number]> = [
  [0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2],
];

/** Interactive graph: the four branches, equal, all linked through We.Connect. */
export function BranchConstellation() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : branches[active];

  const isLit = (a: number, b?: number) =>
    active === null ? false : a === active || b === active;

  return (
    <div className="constellation">
      <div className="constellation-stage">
        <svg viewBox="0 0 600 420" fill="none" aria-hidden="true">
          {pairs.map(([a, b]) => (
            <motion.line
              key={`${a}-${b}`}
              x1={positions[a].x}
              y1={positions[a].y}
              x2={positions[b].x}
              y2={positions[b].y}
              className={`constellation-edge${isLit(a, b) ? " is-lit" : ""}`}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: easeOut, delay: 0.3 }}
            />
          ))}
          {positions.map((p, i) => (
            <motion.line
              key={`c-${i}`}
              x1={center.x}
              y1={center.y}
              x2={p.x}
              y2={p.y}
              className={`constellation-spoke${isLit(i) ? " is-lit" : ""}`}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easeOut, delay: 0.1 * i }}
            />
          ))}
          <motion.circle
            cx={center.x}
            cy={center.y}
            r="54"
            className="constellation-core"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            style={{ transformOrigin: `${center.x}px ${center.y}px` }}
          />
          <circle cx={center.x} cy={center.y} r="80" className="constellation-pulse" />
          <text x={center.x} y={center.y + 4} textAnchor="middle" className="constellation-core-label">
            WE.CONNECT
          </text>
        </svg>

        {branches.map((b, i) => (
          <button
            key={b.slug}
            type="button"
            className={`constellation-node${active === i ? " is-active" : ""}`}
            style={{
              left: `${(positions[i].x / 600) * 100}%`,
              top: `${(positions[i].y / 420) * 100}%`,
            }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <Icon name={b.icon} className="icon" />
            <span>{b.title}</span>
          </button>
        ))}
      </div>

      <div className="constellation-panel" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.slug ?? "all"}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            {current ? (
              <>
                <span className="constellation-panel-index">{current.index}</span>
                <h3>{current.title}</h3>
                <p>{current.description}</p>
              </>
            ) : (
              <>
                <span className="constellation-panel-index">01 — 04</span>
                <h3>Quatre branches, égales.</h3>
                <p>
                  Aucune hiérarchie entre les filières : chacune enrichit les
                  autres. Survolez une branche pour voir ses liens.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
