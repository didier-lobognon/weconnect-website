"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { activities } from "@/lib/site";

const featured = activities.filter((a) =>
  ["evenements", "mentorat", "masterclasses", "partenariats"].includes(a.slug),
);
const tones = ["blue", "light", "orange", "deep"] as const;

/** Sticky cards that stack and recede as the next one slides over them. */
export function ActivityStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="section activity-stack-section" aria-labelledby="activities-title">
      <div className="container">
        <SectionHeading
          id="activities-title"
          kicker="Ce que nous faisons"
          title="Rencontres, transmission, ouverture."
          accents={["transmission"]}
          lead="Une communauté active qui crée de la valeur réelle pour ses membres et pour la prochaine génération tech."
        />
        <div className="activity-stack" ref={ref}>
          {featured.map((activity, i) => (
            <StackCard
              key={activity.slug}
              index={i}
              total={featured.length}
              progress={scrollYProgress}
              tone={tones[i]}
              activity={activity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  index,
  total,
  progress,
  tone,
  activity,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  tone: (typeof tones)[number];
  activity: (typeof featured)[number];
}) {
  const reduce = useReducedMotion();
  const target = 1 - (total - index - 1) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, target]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - index - 1) * 0.12]);

  return (
    <div className="stack-slot" style={{ top: `calc(var(--nav-h) + ${1 + index * 1.5}rem)` }}>
      <motion.article
        className={`stack-card tone-${tone}`}
        style={reduce ? undefined : { scale }}
      >
        <div className="stack-card-body">
          <span className="stack-card-index">0{index + 1}</span>
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
          <ul className="chips">
            {activity.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link className="text-link" href={`/activites#${activity.slug}`}>
            En savoir plus
            <Icon name="arrowUpRight" className="text-link-icon" strokeWidth={2.2} />
          </Link>
        </div>
        <div className="stack-card-art">
          <Photo name={activity.image} sizes="(min-width: 860px) 40vw, 100vw" parallax={30} decorative />
          <span className="stack-card-badge" aria-hidden="true">
            <Icon name={activity.icon} className="icon-md" />
          </span>
        </div>
        {!reduce ? <motion.div className="stack-card-dim" style={{ opacity: dim }} /> : null}
      </motion.article>
    </div>
  );
}
