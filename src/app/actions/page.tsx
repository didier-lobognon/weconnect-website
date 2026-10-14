import type { Metadata } from "next";
import { ActionsExplorer } from "@/components/actions/ActionsExplorer";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Actions — Nos réalisations",
  description:
    "Mentorat, formations, partenariats, projets : toutes les réalisations de la communauté We.Connect, alumni Wecode à Abidjan.",
  alternates: { canonical: "/actions" },
};

export default function ActionsPage() {
  return (
    <>
      <PageHero
        kicker="Nos actions"
        image="devFullstack"
        title="Ce que nous construisons ensemble."
        accents={["construisons"]}
        lead="Mentorat, formations, partenariats, projets : chaque action raconte un lien créé. Voici ce que la communauté a déjà réalisé."
      />

      <section className="section" aria-labelledby="actions-title">
        <div className="container">
          <SectionHeading
            id="actions-title"
            kicker="Réalisations"
            title="Des actions concrètes, pas des promesses."
            accents={["concrètes,"]}
          />
          <ActionsExplorer />
        </div>
      </section>

      <CtaBanner
        title="Construisons la suite."
        text="Tu portes un projet, une formation ou un partenariat qui peut servir la communauté ? Parlons-en."
        label="Proposer"
        image="promoFullstack"
      />
    </>
  );
}
