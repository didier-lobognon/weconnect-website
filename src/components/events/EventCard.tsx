import Link from "next/link";
import { dateParts, formatDate, isUpcoming, type EventItem } from "@/content/events";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";

export function EventCard({ event }: { event: EventItem }) {
  const parts = dateParts(event.date);
  const upcoming = isUpcoming(event);

  return (
    <Link href={`/evenements/${event.slug}`} className="event-card">
      <div className="event-card-media">
        <Photo name={event.cover} sizes="(min-width: 960px) 33vw, 100vw" parallax={0} decorative />
        <span className={`event-date${parts ? "" : " is-unknown"}`}>
          {parts ? (
            <>
              <strong>{parts.day}</strong>
              <span>{parts.month}</span>
            </>
          ) : (
            <span>Date à préciser</span>
          )}
        </span>
        {upcoming ? <span className="event-status">À venir</span> : null}
      </div>
      <div className="event-card-body">
        <span className="tag">{event.category}</span>
        <h3>{event.title}</h3>
        <ul className="event-meta">
          <li>
            <Icon name="calendar" className="icon-sm" />
            {formatDate(event.date)}
            {event.time ? ` · ${event.time}` : ""}
          </li>
          {event.location ? (
            <li>
              <Icon name="pin" className="icon-sm" />
              {event.location}
            </li>
          ) : null}
        </ul>
        <p>{event.excerpt}</p>
        <span className="text-link">
          {upcoming ? "Voir le programme" : "Revivre l’événement"}
          <Icon name="arrowUpRight" className="text-link-icon" strokeWidth={2.2} />
        </span>
      </div>
    </Link>
  );
}
