"use client";

import { motion } from "motion/react";
import type { IconName } from "@/lib/site";

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

type AllIcons =
  | IconName
  | "arrow"
  | "arrowUpRight"
  | "phone"
  | "mail"
  | "pin"
  | "plus"
  | "check";

const paths: Record<AllIcons, string[]> = {
  shield: ["M12 3l8 3v6c0 5-3.5 8.4-8 9-4.5-.6-8-4-8-9V6l8-3z", "M8.8 12.2l2.2 2.2 4.4-4.6"],
  code: ["M8 8l-4 4 4 4", "M16 8l4 4-4 4", "M13.5 5l-3 14"],
  data: ["M3 20h18", "M6 16v-3", "M10.5 16V8", "M15 16v-5", "M19.5 16V5", "M6 9l4.5-4 4.5 3 4.5-4"],
  compass: [circle(12, 12, 9), "M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1z"],
  calendar: ["M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z", "M3 10h18", "M8 3v4", "M16 3v4", "M8 14h3"],
  mentor: [circle(9, 7, 3), "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6", circle(17.5, 9.5, 2), "M16 14.3c.5-.2 1-.3 1.5-.3 2 0 3.5 1.6 3.5 3.6"],
  spark: ["M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z", "M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"],
  book: ["M3 5h6a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H3z", "M21 5h-6a3 3 0 0 0-3 3v12a2.5 2.5 0 0 1 2.5-2.5H21z"],
  bridge: ["M2 18h20", "M5 18v-6", "M19 18v-6", "M2 12c4 0 6.5-5 10-5s6 5 10 5", "M9 18v-6.5", "M15 18v-6.5"],
  chat: ["M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 20 12z", "M8.5 12h.01", "M12 12h.01", "M15.5 12h.01"],
  link: ["M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1", "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"],
  users: [circle(9, 8, 3.5), "M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5", "M16 4.6a3.5 3.5 0 0 1 0 6.8", "M18 14.8c1.8.7 3 2.6 3.5 5.2"],
  door: ["M3 21h18", "M6 21V3h9v18", "M15 5l4 1.5V21", "M12 12v1.5"],
  graduate: ["M2 9l10-5 10 5-10 5-10-5z", "M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5", "M22 9v6"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  arrowUpRight: ["M7 17L17 7", "M8 7h9v9"],
  phone: ["M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 6a2 2 0 0 1 2-2z"],
  mail: ["M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z", "M3.5 7l8.5 6 8.5-6"],
  pin: ["M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z", circle(12, 10, 2.5)],
  plus: ["M12 5v14", "M5 12h14"],
  check: ["M5 12.5l4.5 4.5L19 7.5"],
};

export function Icon({
  name,
  className,
  draw = false,
  strokeWidth = 1.8,
}: {
  name: AllIcons;
  className?: string;
  /** Draws the strokes when the icon enters the viewport. */
  draw?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className ?? "icon"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name].map((d, i) =>
        draw ? (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              pathLength: { duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.15 + i * 0.18 },
              opacity: { duration: 0.2, delay: 0.15 + i * 0.18 },
            }}
          />
        ) : (
          <path key={i} d={d} />
        ),
      )}
    </svg>
  );
}
