"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getLenis } from "@/components/layout/SmoothScroll";
import { easeOut } from "@/components/motion/Reveal";
import { Logo } from "@/components/ui/BrandMark";
import { Icon } from "@/components/ui/Icon";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        className={`site-header${scrolled && !open ? " is-scrolled" : ""}`}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <div className="container nav-inner">
          <Link className="brand" href="/" aria-label="We.Connect — accueil">
            <Logo tone={scrolled && !open ? "color" : "light"} />
          </Link>

          <nav aria-label="Navigation principale" className="nav-desktop">
            <ul className="nav-links">
              {navLinks.filter((l) => l.href !== "/rejoindre").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "is-active" : undefined}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    <span className="nav-link-roll">
                      <span className="nav-link-text" data-text={link.label}>
                        {link.label}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-right">
            <Link className="nav-cta" href="/rejoindre">
              Rejoindre
              <Icon name="arrowUpRight" className="nav-cta-icon" strokeWidth={2.4} />
            </Link>
            <button
              className={`menu-toggle${open ? " is-open" : ""}`}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
              <span className="menu-toggle-bar" />
              <span className="menu-toggle-bar" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-menu"
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Navigation mobile" className="container">
              <ul className="mobile-menu-links">
                {[{ href: "/", label: "Accueil" }, ...navLinks].map((link, i) => (
                  <li key={link.href} className="mobile-menu-item">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, ease: easeOut, delay: 0.15 + i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        <span className="mobile-menu-index">0{i + 1}</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                className="mobile-menu-foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <span>{siteConfig.location}</span>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
