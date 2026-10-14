"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { easeOut } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { faq } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="faq">
      {faq.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li key={item.q} className={`faq-item${isOpen ? " is-open" : ""}`}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span className="faq-toggle" aria-hidden="true">
                  <Icon name="plus" className="icon-sm" strokeWidth={2.4} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  className="faq-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                >
                  <p>{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
