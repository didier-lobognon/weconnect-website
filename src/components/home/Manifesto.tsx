import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { ButtonLink } from "@/components/ui/Button";

export function Manifesto() {
  return (
    <section className="section manifesto" aria-labelledby="manifesto-title">
      <div className="container">
        <Reveal y={16}>
          <h2 className="kicker" id="manifesto-title">
            <span className="kicker-line" aria-hidden="true" />
            Notre raison d’être
          </h2>
        </Reveal>
        <ScrollWords
          className="manifesto-text"
          accents={["We.Connect", "lien", "transmettre", "ensemble"]}
          text="Après Wecode, on ne se quitte pas. We.Connect rassemble les talents de toutes les branches pour garder le lien, transmettre aux plus jeunes et ouvrir des portes — ensemble, à Abidjan et au-delà."
        />
        <Reveal className="manifesto-foot" delay={0.1}>
          <p>
            Né d’une poignée de bénéficiaires des formations Wecode, We.Connect
            est le réseau vivant qui prolonge l’aventure : on se retrouve, on
            partage, on accompagne.
          </p>
          <ButtonLink href="/a-propos" variant="outline">
            Découvrir notre histoire
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
