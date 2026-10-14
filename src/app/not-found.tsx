import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <PageHero
      kicker="Erreur 404"
      title="Ce lien s’est perdu dans le réseau."
      accents={["perdu"]}
      lead="La page que tu cherches n’existe pas ou a été déplacée. Reconnectons-nous depuis l’accueil."
    >
      <ButtonLink href="/">Retour à l’accueil</ButtonLink>
      <ButtonLink href="/rejoindre" variant="ghost" arrow={false}>
        Nous contacter
      </ButtonLink>
    </PageHero>
  );
}
