"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { branches } from "@/lib/site";

/**
 * Pinned section: vertical scroll drives a horizontal track of branch panels.
 * Falls back to a vertical stack on small screens and with reduced motion.
 */
export function BranchesScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 960px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      const track = trackRef.current;
      setPinned(mq.matches);
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const bar = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  return (
    <section
      ref={sectionRef}
      className={`hscroll section-fog${pinned ? " is-pinned" : ""}`}
      style={pinned ? { height: `calc(${distance}px + 100vh)` } : undefined}
      aria-labelledby="branches-title"
    >
      <div className="hscroll-sticky">
        <motion.div ref={trackRef} className="hscroll-track" style={pinned ? { x } : undefined}>
          <div className="hscroll-intro">
            <SectionHeading
              id="branches-title"
              kicker="Quatre branches, une communauté"
              title="Tous les talents Wecode, un même réseau."
              accents={["réseau"]}
              lead="Sécurité, code, données, leadership : We.Connect croise les expertises pour accélérer les opportunités collectives."
            />
            <p className="hscroll-hint" aria-hidden="true">
              <Icon name="arrow" className="icon" /> Faites défiler
            </p>
          </div>

          {branches.map((branch) => (
            <article className="branch-panel" key={branch.slug}>
              <div className="branch-panel-media">
                <Photo name={branch.image} sizes="(min-width: 960px) 30rem, 100vw" parallax={0} decorative />
                <span className="branch-panel-index" aria-hidden="true">
                  {branch.index}
                </span>
                <span className="branch-panel-icon">
                  <Icon name={branch.icon} className="icon-md" />
                </span>
              </div>
              <div className="branch-panel-body">
                <h3>{branch.title}</h3>
                <p>{branch.description}</p>
                <ul className="chips">
                  {branch.essence.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <Link className="text-link" href={`/communaute#${branch.slug}`}>
                  Explorer la branche
                  <Icon name="arrowUpRight" className="text-link-icon" strokeWidth={2.2} />
                </Link>
              </div>
            </article>
          ))}
        </motion.div>

        {pinned ? (
          <div className="hscroll-progress" aria-hidden="true">
            <motion.span style={{ scaleX: bar }} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
