import type { Metadata } from "next";
import { Positioning } from "@/components/about/Positioning";
import { Timeline } from "@/components/about/Timeline";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missionItems, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos — Notre histoire, vision et mission",
  description:
    "Née après les formations Wecode, We.Connect fédère les alumni de toutes les branches à Abidjan pour garder le lien, transmettre et ouvrir des portes.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Notre histoire"
        image="graduationDataIa"
        title="Né après Wecode. Construit pour durer."
        accents={["durer"]}
        lead="We.Connect, c’est l’histoire d’une poignée de bénéficiaires qui ont refusé de perdre le lien à la fin des parcours — et qui ont décidé d’en faire un réseau."
      />

      <section className="section" aria-labelledby="story-title">
        <div className="container">
          <SectionHeading
            id="story-title"
            kicker="D’où l’on vient"
            title="De la formation à la communauté."
            accents={["communauté"]}
          />
          <Timeline />
        </div>
      </section>

      <section className="origin-photo" aria-labelledby="origin-title">
        <div className="container">
          <Photo name="remiseEcharpes" className="origin-photo-frame" sizes="(min-width: 1280px) 1280px, 100vw" parallax={60} />
          <div className="origin-photo-caption">
            <h2 id="origin-title">Là où tout commence.</h2>
            <p>
              Une promotion Wecode lors de la remise des écharpes — cyber
              sécurité, fullstack, data &amp; IA. C’est de ces parcours qu’est
              né We.Connect.
            </p>
          </div>
        </div>
      </section>

      <Positioning />

      <section className="section vision" aria-labelledby="vision-title">
        <div className="container">
          <h2 className="kicker" id="vision-title">
            <span className="kicker-line" aria-hidden="true" />
            Notre vision
          </h2>
          <ScrollWords
            className="manifesto-text"
            accents={["durable", "connecté", "haut"]}
            text="Un réseau durable de talents tech formés via Wecode, où chaque membre reste connecté, progresse, et tire la génération suivante vers le haut — à Abidjan et au-delà."
          />
        </div>
      </section>

      <section className="section section-blue" aria-labelledby="mission-title">
        <div className="container">
          <SectionHeading
            id="mission-title"
            tone="light"
            kicker="Notre mission"
            title="Fédérer tous les bénéficiaires Wecode."
            lead="Cinq engagements concrets qui guident chacune de nos actions."
          />
          <Stagger className="mission-grid" stagger={0.08}>
            {missionItems.map((item, i) => (
              <StaggerItem key={item.title} className="mission-card">
                <span className="mission-card-index">0{i + 1}</span>
                <Icon name={item.icon} className="icon-md" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading
            id="values-title"
            kicker="Ce qui nous guide"
            title="Quatre principes, un même état d’esprit."
            accents={["principes"]}
          />
          <Stagger as="ul" className="values">
            {values.map((v, i) => (
              <StaggerItem as="li" key={v.title} className="value-row">
                <span className="value-index">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner image="salleAuditoire" />
    </>
  );
}
