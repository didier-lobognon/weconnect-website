import type { Metadata } from "next";
import { Faq } from "@/components/join/Faq";
import { JoinForm } from "@/components/join/JoinForm";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rejoindre — Alumni, mentors et partenaires",
  description:
    "Alumni Wecode, nouveau sortant, mentor ou partenaire : rejoins We.Connect, la communauté tech alumni d’Abidjan. Contact par téléphone ou e-mail.",
  alternates: { canonical: "/rejoindre" },
};

const contacts = [
  {
    icon: "phone",
    label: "Appeler",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: "mail",
    label: "Écrire",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: "pin",
    label: "Nous trouver",
    value: siteConfig.location,
    href: null,
  },
] as const;

export default function JoinPage() {
  return (
    <>
      <PageHero
        kicker="Rejoindre We.Connect"
        image="duoDataIa"
        title="Prêt·e à connecter ?"
        accents={["connecter"]}
        lead="Alumni Wecode, mentor, partenaire ou curieux·se de la scène tech abidjanaise : parlons. Chaque lien créé renforce le réseau."
      />

      <section className="section" aria-labelledby="join-title">
        <div className="container">
          <SectionHeading
            id="join-title"
            kicker="Ta demande"
            title="Deux étapes, et on se connecte."
            accents={["connecte."]}
          />
          <JoinForm />
        </div>
      </section>

      <section className="section section-blue" aria-labelledby="contact-title">
        <div className="container">
          <SectionHeading
            id="contact-title"
            tone="light"
            kicker="Contact direct"
            title="Tu préfères en parler de vive voix ?"
          />
          <Stagger className="contact-grid">
            {contacts.map((c) => (
              <StaggerItem key={c.label}>
                {c.href ? (
                  <a className="contact-card" href={c.href}>
                    <ContactInner {...c} />
                  </a>
                ) : (
                  <div className="contact-card">
                    <ContactInner {...c} />
                  </div>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <SectionHeading
            id="faq-title"
            kicker="Questions fréquentes"
            title="Bon à savoir."
            lead="Les réponses aux questions qu’on nous pose le plus souvent."
          />
          <Faq />
        </div>
      </section>
    </>
  );
}

function ContactInner({
  icon,
  label,
  value,
  href,
}: (typeof contacts)[number]) {
  return (
    <>
      <span className="contact-card-icon">
        <Icon name={icon} className="icon-md" />
      </span>
      <span className="contact-card-label">{label}</span>
      <strong>{value}</strong>
      {href ? <Icon name="arrowUpRight" className="contact-card-arrow" strokeWidth={2} /> : null}
    </>
  );
}
