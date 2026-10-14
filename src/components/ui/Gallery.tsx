"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getLenis } from "@/components/layout/SmoothScroll";
import { easeOut } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { images, type ImageKey } from "@/lib/images";

/** Photo grid with a full-screen lightbox (keyboard: ← → Échap). */
export function Gallery({ items }: { items: ImageKey[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : images[items[open]];

  return (
    <>
      <div className="gallery">
        {items.map((key, i) => (
          <motion.button
            key={`${key}-${i}`}
            type="button"
            className="gallery-item"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut, delay: (i % 3) * 0.08 }}
          >
            <Image
              src={images[key].src}
              alt={images[key].alt}
              fill
              sizes="(min-width: 960px) 33vw, 50vw"
              placeholder="blur"
              style={{ objectFit: "cover", objectPosition: images[key].position }}
            />
            <span className="gallery-zoom" aria-hidden="true">
              <Icon name="plus" className="icon-sm" strokeWidth={2.4} />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <motion.div
              key={open}
              className="lightbox-frame"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
            <button type="button" className="lightbox-btn lightbox-close" onClick={close} aria-label="Fermer">
              <Icon name="plus" className="icon-md" strokeWidth={2} />
            </button>
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  className="lightbox-btn lightbox-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Photo précédente"
                >
                  <Icon name="arrow" className="icon-md" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="lightbox-btn lightbox-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Photo suivante"
                >
                  <Icon name="arrow" className="icon-md" strokeWidth={2} />
                </button>
              </>
            ) : null}
            <p className="lightbox-caption">{current.alt}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
