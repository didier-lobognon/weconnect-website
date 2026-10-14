"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { easeOut } from "@/components/motion/Reveal";
import { images, type ImageKey } from "@/lib/images";

/**
 * Framed photo: reveals with a clip-path wipe when it enters the viewport and
 * drifts inside its frame while scrolling (parallax).
 */
export function Photo({
  name,
  className,
  sizes = "(min-width: 960px) 50vw, 100vw",
  priority = false,
  parallax = 40,
  reveal = true,
  decorative = false,
}: {
  name: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Vertical drift in px; 0 disables it (and its scroll listener). */
  parallax?: number;
  reveal?: boolean;
  /** Empty alt when the photo is purely decorative. */
  decorative?: boolean;
}) {
  const img = images[name];
  const reduce = useReducedMotion();
  const image = (
    <Image
      src={img.src}
      alt={decorative ? "" : img.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      priority={priority}
      style={{ objectFit: "cover", objectPosition: img.position }}
    />
  );

  return (
    <motion.div
      className={`photo ${className ?? ""}`.trim()}
      initial={reveal && !reduce ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: easeOut }}
    >
      {parallax && !reduce ? (
        <ParallaxLayer distance={parallax}>{image}</ParallaxLayer>
      ) : (
        <div className="photo-inner" style={{ inset: 0 }}>
          {image}
        </div>
      )}
    </motion.div>
  );
}

function ParallaxLayer({ distance, children }: { distance: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  // The ref sits on a static frame: measuring the moving layer itself would feed back.
  return (
    <div ref={ref} className="photo-frame">
      <motion.div className="photo-inner" style={{ y, inset: `${-distance}px 0` }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Full-bleed background photo for heroes and banners (behind a brand overlay). */
export function PhotoBackdrop({
  name,
  priority = false,
  className,
}: {
  name: ImageKey;
  priority?: boolean;
  className?: string;
}) {
  const img = images[name];
  return (
    <div className={`photo-backdrop ${className ?? ""}`.trim()} aria-hidden="true">
      <Image
        src={img.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        priority={priority}
        style={{ objectFit: "cover", objectPosition: img.position }}
      />
    </div>
  );
}
