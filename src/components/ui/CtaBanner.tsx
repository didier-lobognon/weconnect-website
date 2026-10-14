import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Icon } from "@/components/ui/Icon";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import { Parallax } from "@/components/motion/Parallax";
import { PhotoBackdrop } from "@/components/ui/Photo";
import type { ImageKey } from "@/lib/images";

/** Closing call-to-action with a rotating, magnetic round button. */
export function CtaBanner({
  title = "Prêt·e à connecter ?",
  text = "Alumni Wecode, nouveau sortant, mentor ou partenaire : la communauté grandit avec chaque lien créé.",
  href = "/rejoindre",
  label = "Rejoindre",
  image = "selfieAlumni",
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
  image?: ImageKey;
}) {
  return (
    <section className="cta-banner" aria-labelledby="cta-title">
      <Parallax className="cta-media" offset={70}>
        <PhotoBackdrop name={image} />
      </Parallax>
      <div className="cta-veil" aria-hidden="true" />
      <NetworkCanvas density={42000} className="network-canvas network-canvas-soft" />
      <div className="container cta-inner">
        <div>
          <SplitText as="h2" id="cta-title" text={title} className="cta-title" />
          <Reveal delay={0.3}>
            <p className="cta-text">{text}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} scale={0.6} y={0}>
          <Magnetic strength={0.4}>
            <Link className="cta-orb" href={href}>
              <svg className="cta-orb-ring" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path id="cta-circle" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
                </defs>
                <text>
                  <textPath href="#cta-circle" textLength="486" lengthAdjust="spacing">
                    CONNECTER POUR RÉUSSIR · CONNECTER POUR RÉUSSIR ·
                  </textPath>
                </text>
              </svg>
              <span className="cta-orb-core">
                <span>{label}</span>
                <Icon name="arrowUpRight" className="cta-orb-icon" strokeWidth={2.2} />
              </span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
