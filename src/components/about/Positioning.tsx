"use client";

import { motion } from "motion/react";
import { easeOut } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandMark } from "@/components/ui/BrandMark";
import { Icon } from "@/components/ui/Icon";

/** "Wecode forme, We.Connect relie" — two cards joined by an animated link. */
export function Positioning() {
  return (
    <section className="section section-fog" aria-labelledby="positioning-title">
      <div className="container">
        <SectionHeading
          id="positioning-title"
          kicker="Bien nous situer"
          title="Wecode forme. We.Connect relie."
          accents={["We.Connect"]}
          lead="We.Connect n’est pas le programme de formation : c’est la communauté qui le prolonge. Fiers de nos origines, tournés vers la suite."
        />

        <div className="positioning">
          <motion.div
            className="positioning-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            <Icon name="graduate" className="icon-lg" draw />
            <span className="positioning-tag">L’origine</span>
            <h3>Wecode</h3>
            <p>Le programme de formation, organisé par modules et par branches.</p>
          </motion.div>

          <div className="positioning-link" aria-hidden="true">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.4 }}
            />
            <motion.i
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.2 }}
            />
          </div>

          <motion.div
            className="positioning-card is-brand"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
          >
            <BrandMark tone="light" className="positioning-mark" />
            <span className="positioning-tag">La communauté</span>
            <h3>We.Connect</h3>
            <p>Le réseau alumni vivant : rencontres, mentorat, partage et opportunités.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
