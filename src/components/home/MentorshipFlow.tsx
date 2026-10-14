"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mentorshipCycle } from "@/lib/site";

const mentors = [
  { x: 90, y: 70 },
  { x: 250, y: 50 },
  { x: 410, y: 70 },
];
const juniors = [
  { x: 40, y: 290 },
  { x: 145, y: 320 },
  { x: 250, y: 300 },
  { x: 355, y: 320 },
  { x: 460, y: 290 },
];
const links: Array<[number, number]> = [
  [0, 0], [0, 1], [1, 1], [1, 2], [1, 3], [2, 3], [2, 4], [0, 2],
];

/** Diagram where mentor → junior links draw on scroll, then juniors light up. */
export function MentorshipFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] });

  return (
    <section className="section section-blue mentorship" aria-labelledby="mentorship-title">
      <div className="container mentorship-grid">
        <div>
          <SectionHeading
            id="mentorship-title"
            tone="light"
            kicker="Mentorat fraternel"
            title="Grands frères, grandes sœurs."
            lead="Accompagner celles et ceux qui sortent tout juste des modules : c’est le cœur de We.Connect. Une relation de pair à pair, pas une hiérarchie."
          />
          <Stagger as="ol" className="cycle">
            {mentorshipCycle.map((step, i) => (
              <StaggerItem as="li" key={step.title} className="cycle-step">
                <span className="cycle-index">0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mentorship-art" ref={ref} aria-hidden="true">
          <svg viewBox="0 0 500 370" fill="none">
            {links.map(([m, j], i) => (
              <FlowLink
                key={i}
                from={mentors[m]}
                to={juniors[j]}
                progress={scrollYProgress}
                range={[0.05 + i * 0.05, 0.4 + i * 0.05]}
                static={!!reduce}
              />
            ))}
            {mentors.map((n, i) => (
              <g key={`m${i}`}>
                <circle cx={n.x} cy={n.y} r="22" fill="#F39200" opacity="0.18" />
                <circle cx={n.x} cy={n.y} r="12" fill="#F39200" />
              </g>
            ))}
            {juniors.map((n, i) => (
              <Junior key={`j${i}`} node={n} progress={scrollYProgress} index={i} static={!!reduce} />
            ))}
            <text x="250" y="16" textAnchor="middle" className="mentorship-label">
              ALUMNI
            </text>
            <text x="250" y="365" textAnchor="middle" className="mentorship-label">
              NOUVEAUX SORTANTS
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

function FlowLink({
  from,
  to,
  progress,
  range,
  static: isStatic,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  progress: MotionValue<number>;
  range: [number, number];
  static: boolean;
}) {
  const pathLength = useTransform(progress, range, [0, 1]);
  const midY = (from.y + to.y) / 2;
  const d = `M${from.x} ${from.y} C${from.x} ${midY} ${to.x} ${midY} ${to.x} ${to.y}`;
  return (
    <>
      <path d={d} stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <motion.path
        d={d}
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: isStatic ? 1 : pathLength }}
      />
    </>
  );
}

function Junior({
  node,
  progress,
  index,
  static: isStatic,
}: {
  node: { x: number; y: number };
  progress: MotionValue<number>;
  index: number;
  static: boolean;
}) {
  const start = 0.55 + index * 0.06;
  const glow = useTransform(progress, [start, start + 0.15], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.15], [0.7, 1]);
  const halo = useTransform(glow, (v) => v * 0.2);
  return (
    <g>
      <motion.circle
        cx={node.x}
        cy={node.y}
        r="24"
        fill="#2ECC71"
        style={{ opacity: isStatic ? 0.2 : halo }}
      />
      <motion.circle
        cx={node.x}
        cy={node.y}
        r="10"
        fill="#ffffff"
        style={{ scale: isStatic ? 1 : scale, transformOrigin: `${node.x}px ${node.y}px` }}
      />
    </g>
  );
}
