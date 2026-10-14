import Link from "next/link";
import { SplitText } from "@/components/motion/SplitText";
import { Logo } from "@/components/ui/BrandMark";
import { Icon } from "@/components/ui/Icon";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <Logo tone="light" tagline className="logo footer-logo" />
            <p>
              Communauté alumni Wecode — connecter les talents pour réussir
              ensemble, à Abidjan et au-delà.
            </p>
          </div>

          <div className="footer-col">
            <h2>Explorer</h2>
            <ul>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={`tel:${siteConfig.phone}`}>
                  <Icon name="phone" className="footer-icon" />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>
                  <Icon name="mail" className="footer-icon" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span>
                  <Icon name="pin" className="footer-icon" />
                  {siteConfig.location}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">
        <SplitText as="div" by="char" text="WE.CONNECT" stagger={0.05} className="footer-giant-text" />
      </div>

      <div className="container footer-bottom">
        <span>© {year} We.Connect. Tous droits réservés.</span>
        <span>{siteConfig.tagline}.</span>
      </div>
    </footer>
  );
}
