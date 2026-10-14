import type { Metadata } from "next";
import { ActivityScrolly } from "@/components/activities/ActivityScrolly";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Activités — Événements, mentorat, masterclasses, partenariats",
  description:
    "Rencontres, mentorat, masterclasses, formations, partenariats et partage d’expériences : ce que la communauté We.Connect fait ensemble à Abidjan.",
  alternates: { canonical: "/activites" },
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        kicker="Ce que nous faisons"
        image="coursFormateur"
        title="Rencontres, transmission, ouverture."
        accents={["transmission,"]}
        lead="Six façons concrètes de faire vivre le réseau : on se retrouve, on se forme, on accompagne et on ouvre des portes — ensemble."
      />

      <section className="section" aria-labelledby="activities-list-title">
        <div className="container">
          <SectionHeading
            id="activities-list-title"
            kicker="Six activités"
            title="Une communauté qui agit."
            accents={["agit."]}
          />
          <ActivityScrolly />
        </div>
      </section>

      <section className="section section-fog" aria-labelledby="agenda-title">
        <div className="container agenda">
          <SectionHeading
            id="agenda-title"
            kicker="Agenda"
            title="Tous nos rendez-vous, au même endroit."
            lead="Toutes nos rencontres, masterclasses et formations — à venir et passées — sont publiées sur la page Événements."
          />
          <Reveal className="agenda-card" delay={0.15}>
            <span className="agenda-pulse" aria-hidden="true">
              <Icon name="calendar" className="icon-lg" />
            </span>
            <div>
              <h3>Le calendrier de la communauté</h3>
              <p>Prochains rendez-vous, souvenirs et galeries photos.</p>
            </div>
            <ButtonLink href="/evenements" variant="blue">
              Voir les événements
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Envie de proposer une activité ?"
        text="Une masterclass à animer, un partenariat à construire, une rencontre à organiser : la communauté est ouverte à tes idées."
        label="Proposer"
        image="salleAuditoire"
      />
    </>
  );
}
