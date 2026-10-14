import type { Metadata } from "next";
import Link from "next/link";
import { Countdown } from "@/components/events/Countdown";
import { EventCard } from "@/components/events/EventCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate, pastEvents, upcomingEvents } from "@/content/events";

export const metadata: Metadata = {
  title: "Événements — Rencontres, masterclasses et formations à Abidjan",
  description:
    "Tous les rendez-vous de la communauté We.Connect à Abidjan : événements à venir, rencontres passées, masterclasses, formations et cérémonies.",
  alternates: { canonical: "/evenements" },
};

/** Re-rendered hourly so events move from "À venir" to "Passés" on their own. */
export const revalidate = 3600;

export default function EventsPage() {
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const [featured, ...nextOnes] = upcoming;

  return (
    <>
      <PageHero
        kicker="Événements"
        image="selfieFullstack"
        title="Se retrouver, encore et toujours."
        accents={["encore"]}
        lead="Rencontres, masterclasses, formations, cérémonies : tous les rendez-vous de la communauté, à venir et passés."
      >
        <ButtonLink href="#a-venir">Voir les prochains rendez-vous</ButtonLink>
      </PageHero>

      <section className="section" id="a-venir" aria-labelledby="upcoming-title">
        <div className="container">
          <SectionHeading
            id="upcoming-title"
            kicker="À venir"
            title="Les prochains rendez-vous."
            accents={["prochains"]}
          />

          {featured ? (
            <Reveal className="featured-event">
              <Photo name={featured.cover} className="featured-event-media" sizes="(min-width: 960px) 50vw, 100vw" />
              <div className="featured-event-body">
                <span className="tag tag-light">{featured.category}</span>
                <h3>{featured.title}</h3>
                <p className="featured-event-meta">
                  <Icon name="calendar" className="icon-sm" />
                  {formatDate(featured.date)}
                  {featured.time ? ` · ${featured.time}` : ""}
                  {featured.location ? (
                    <>
                      <Icon name="pin" className="icon-sm" />
                      {featured.location}
                    </>
                  ) : null}
                </p>
                <p>{featured.excerpt}</p>
                {featured.date ? <Countdown date={featured.date} /> : null}
                <div className="hero-actions">
                  {featured.registrationUrl ? (
                    <ButtonLink href={featured.registrationUrl}>S’inscrire</ButtonLink>
                  ) : null}
                  <ButtonLink href={`/evenements/${featured.slug}`} variant="ghost" arrow={false}>
                    Détails
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ) : (
            <EmptyState
              title="Le prochain rendez-vous arrive bientôt."
              text="Aucun événement n’est annoncé pour le moment. Laisse-nous tes coordonnées pour être parmi les premiers informés."
            >
              <ButtonLink href="/rejoindre" variant="blue">
                Être informé·e
              </ButtonLink>
            </EmptyState>
          )}

          {nextOnes.length ? (
            <Stagger className="events-grid events-grid-spaced">
              {nextOnes.map((e) => (
                <StaggerItem key={e.slug}>
                  <EventCard event={e} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}
        </div>
      </section>

      <section className="section section-fog" id="passes" aria-labelledby="past-title">
        <div className="container">
          <SectionHeading
            id="past-title"
            kicker="Passés"
            title="Ce que nous avons vécu ensemble."
            accents={["ensemble."]}
            lead="Retour en images sur les moments qui ont fait la communauté."
          />
          {past.length ? (
            <Stagger className="events-grid">
              {past.map((e) => (
                <StaggerItem key={e.slug}>
                  <EventCard event={e} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <EmptyState title="Les souvenirs arrivent." text="Les événements passés seront publiés ici." />
          )}
          <Reveal className="section-foot" delay={0.1}>
            <p>
              Tu as des photos d’un événement We.Connect ?{" "}
              <Link href="/rejoindre">Partage-les avec nous</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Une idée d’événement ?"
        text="Meetup, masterclass, atelier ou retrouvailles : propose ton idée, la communauté s’occupe du reste avec toi."
        label="Proposer"
        image="coursFormateur"
      />
    </>
  );
}
