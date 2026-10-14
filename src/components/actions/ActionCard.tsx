import Link from "next/link";
import type { ActionItem } from "@/content/actions";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";

export function ActionCard({ action }: { action: ActionItem }) {
  return (
    <Link href={`/actions/${action.slug}`} className="action-card">
      <div className="action-card-media">
        <Photo name={action.cover} sizes="(min-width: 960px) 50vw, 100vw" parallax={0} decorative />
      </div>
      <div className="action-card-body">
        <div className="action-card-top">
          <span className="tag">{action.category}</span>
          {action.period ? <span className="action-card-period">{action.period}</span> : null}
        </div>
        <h3>{action.title}</h3>
        <p>{action.excerpt}</p>
        <span className="text-link">
          Découvrir l’action
          <Icon name="arrowUpRight" className="text-link-icon" strokeWidth={2.2} />
        </span>
      </div>
    </Link>
  );
}
