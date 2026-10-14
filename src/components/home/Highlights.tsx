import { ActionCard } from "@/components/actions/ActionCard";
import { EventCard } from "@/components/events/EventCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sortedActions } from "@/content/actions";
import { pastEvents, upcomingEvents } from "@/content/events";

/** "À la une": next (or latest) event and latest action. */
export function Highlights() {
  const event = upcomingEvents()[0] ?? pastEvents()[0];
  const action = sortedActions()[0];
  if (!event && !action) return null;

  return (
    <section className="section section-fog" aria-labelledby="highlights-title">
      <div className="container">
        <div className="section-head-row">
          <SectionHeading
            id="highlights-title"
            kicker="À la une"
            title="La vie de la communauté."
            accents={["vie"]}
          />
          <Reveal className="section-head-actions" delay={0.2}>
            <ButtonLink href="/evenements" variant="outline" arrow={false} magnetic={false}>
              Événements
            </ButtonLink>
            <ButtonLink href="/actions" variant="outline" arrow={false} magnetic={false}>
              Actions
            </ButtonLink>
          </Reveal>
        </div>
        <Stagger className="highlights-grid">
          {event ? (
            <StaggerItem>
              <EventCard event={event} />
            </StaggerItem>
          ) : null}
          {action ? (
            <StaggerItem>
              <ActionCard action={action} />
            </StaggerItem>
          ) : null}
        </Stagger>
      </div>
    </section>
  );
}
