"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ActionCard } from "@/components/actions/ActionCard";
import { easeOut } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { actionCategories, sortedActions, type ActionCategory } from "@/content/actions";

type Filter = "Tout" | ActionCategory;

/** Filterable grid of actions with animated re-layout. */
export function ActionsExplorer() {
  const all = sortedActions();
  const [filter, setFilter] = useState<Filter>("Tout");
  const present = actionCategories.filter((c) => all.some((a) => a.category === c));
  const filters: Filter[] = ["Tout", ...present];
  const visible = filter === "Tout" ? all : all.filter((a) => a.category === filter);

  return (
    <LayoutGroup>
      {filters.length > 2 ? (
        <div className="filters" role="group" aria-label="Filtrer par catégorie">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter${filter === f ? " is-active" : ""}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {filter === f ? (
                <motion.span layoutId="filter-pill" className="filter-pill" transition={{ duration: 0.4, ease: easeOut }} />
              ) : null}
              <span className="filter-label">{f}</span>
            </button>
          ))}
        </div>
      ) : null}

      <motion.div layout className="actions-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((action) => (
            <motion.div
              key={action.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <ActionCard action={action} />
            </motion.div>
          ))}
          <motion.div
            key="next"
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
          >
            <Link href="/rejoindre" className="action-next">
              <span className="action-next-icon" aria-hidden="true">
                <Icon name="plus" className="icon-lg" strokeWidth={1.6} />
              </span>
              <h3>La prochaine action s’écrit avec toi.</h3>
              <p>
                Un projet, une formation, un partenariat à lancer ? Propose-le à
                la communauté.
              </p>
              <span className="text-link">
                Proposer une action
                <Icon name="arrowUpRight" className="text-link-icon" strokeWidth={2.2} />
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
