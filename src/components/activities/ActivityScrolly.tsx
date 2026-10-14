"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/lib/images";
import { activities } from "@/lib/site";

/**
 * Scrollytelling: a sticky visual follows the activity crossing the middle of the screen.
 * All six slides are mounted once and cross-faded with CSS (no image decoding mid-scroll),
 * and the active step is derived from a single scroll progress value.
 */
export function ActivityScrolly() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(activities.length - 1, Math.max(0, Math.floor(p * activities.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <div className="scrolly">
      <div className="scrolly-visual" aria-hidden="true">
        <div className="scrolly-visual-inner">
          {activities.map((a, i) => (
            <div key={a.slug} className={`scrolly-slide${i === active ? " is-active" : ""}`}>
              <Image
                src={images[a.image].src}
                alt=""
                fill
                sizes="(min-width: 960px) 45vw, 1px"
                placeholder="blur"
                style={{ objectFit: "cover", objectPosition: images[a.image].position }}
              />
              <span className="scrolly-shade" />
              <span className="scrolly-caption">
                <Icon name={a.icon} className="icon-lg" />
                <span className="scrolly-label">{a.short}</span>
              </span>
            </div>
          ))}
          <div className="scrolly-counter">
            <span>0{active + 1}</span> / 0{activities.length}
          </div>
          <div className="scrolly-dots">
            {activities.map((a, i) => (
              <span key={a.slug} className={i === active ? "is-active" : undefined} />
            ))}
          </div>
        </div>
      </div>

      <div className="scrolly-steps" ref={stepsRef}>
        {activities.map((activity, i) => (
          <article
            key={activity.slug}
            id={activity.slug}
            className={`scrolly-step${i === active ? " is-active" : ""}`}
          >
            <div className="scrolly-step-media">
              <Photo name={activity.image} sizes="100vw" parallax={0} decorative />
              <span className="scrolly-step-icon">
                <Icon name={activity.icon} className="icon-md" />
              </span>
            </div>
            <span className="scrolly-step-index">0{i + 1}</span>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <ul className="chips chips-outline">
              {activity.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
