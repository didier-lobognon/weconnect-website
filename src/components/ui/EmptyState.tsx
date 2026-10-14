import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

export function EmptyState({
  title,
  text,
  icon = "calendar",
  children,
}: {
  title: string;
  text: string;
  icon?: "calendar" | "spark";
  children?: ReactNode;
}) {
  return (
    <Reveal className="empty-state">
      <span className="empty-state-pulse" aria-hidden="true">
        <Icon name={icon} className="icon-lg" />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      {children}
    </Reveal>
  );
}
