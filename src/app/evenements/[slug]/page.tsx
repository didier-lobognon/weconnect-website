import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Countdown } from "@/components/events/Countdown";
import { EventCard } from "@/components/events/EventCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryBody } from "@/components/ui/StoryBody";
import { events, formatDate, getEvent, isUpcoming } from "@/content/events";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = getEvent((await params).slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.excerpt,
    alternates: { canonical: `/evenements/${event.slug}` },
    openGraph: { images: [images[event.cover].src.src] },
  };
}

export default async function EventPage({ params }: Props) {
  const event = getEvent((await params).slug);
  if (!event) notFound();

  const upcoming = isUpcoming(event);
  const others = events.filter((e) => e.slug !== event.slug).slice(0, 3);
  const jsonLd = event.date
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.excerpt,
        startDate: event.date,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.location ?? siteConfig.location,
          address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
        },
        organizer: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        image: `${siteConfig.url}${images[event.cover].src.src}`,
      }
    : null;

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <PageHero
        kicker={`${upcoming ? "À venir" : "Événement passé"} · ${event.category}`}
        image={event.cover}
        title={event.title}
        compact
        lead={event.excerpt}
      >
        {upcoming && event.registrationUrl ? (
          <ButtonLink href={event.registrationUrl}>S’inscrire</ButtonLink>
        ) : null}
      </PageHero>

      <StoryBody
        body={event.body}
        back={{ href: "/evenements", label: "Tous les événements" }}
        gallery={event.gallery}
        meta={[
          { icon: "calendar", label: "Date", value: `${formatDate(event.date)}${event.time ? ` · ${event.time}` : ""}` },
          ...(event.location ? [{ icon: "pin" as const, label: "Lieu", value: event.location }] : []),
          { icon: "spark", label: "Format", value: event.category },
        ]}
        aside={upcoming && event.date ? <Countdown date={event.date} /> : null}
      />

      {others.length ? (
        <section className="section" aria-labelledby="others-title">
          <div className="container">
            <SectionHeading id="others-title" kicker="Encore plus" title="D’autres rendez-vous." />
            <Stagger className="events-grid">
              {others.map((e) => (
                <StaggerItem key={e.slug}>
                  <EventCard event={e} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}
    </>
  );
}
