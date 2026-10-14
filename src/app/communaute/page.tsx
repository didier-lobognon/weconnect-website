import type { Metadata } from "next";
import { BranchConstellation } from "@/components/branches/BranchConstellation";
import { BranchDetail } from "@/components/branches/BranchDetail";
import { Marquee } from "@/components/motion/Marquee";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { branches } from "@/lib/site";

export const metadata: Metadata = {
  title: "Communauté — Sécurité numérique, fullstack, data & IA, lead tech",
  description:
    "Les alumni We.Connect viennent des quatre branches Wecode : sécurité numérique, développement fullstack, data & IA et lead tech. Un seul réseau à Abidjan.",
  alternates: { canonical: "/communaute" },
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        kicker="Notre communauté"
        image="promoFullstack"
        title="Une communauté. Quatre expertises."
        accents={["communauté."]}
        lead="Sécurité numérique, développement fullstack, data & IA, lead tech : nos membres viennent de toutes les filières Wecode — et c’est précisément ce qui fait la force de la communauté."
      >
        <ButtonLink href="#securite-numerique" variant="primary">
          Découvrir les expertises
        </ButtonLink>
      </PageHero>

      <section className="section" aria-labelledby="graph-title">
        <div className="container">
          <SectionHeading
            id="graph-title"
            kicker="Croiser les expertises"
            title="Pas quatre silos : un réseau."
            accents={["réseau."]}
            lead="Un projet a besoin de sécurité, de code, de données et de leadership. En reliant les branches, We.Connect multiplie les rencontres utiles."
          />
          <BranchConstellation />
        </div>
      </section>

      <Marquee items={branches.map((b) => b.title)} baseVelocity={1} className="marquee-blue" />

      {branches.map((branch, i) => (
        <BranchDetail key={branch.slug} branch={branch} flip={i % 2 === 1} />
      ))}

      <CtaBanner
        title="Ta branche a sa place ici."
        image="salleEntraide"
        text="Quelle que soit ta filière Wecode, rejoins un réseau où chaque expertise compte autant que les autres."
      />
    </>
  );
}
