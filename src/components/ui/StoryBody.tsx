import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Gallery } from "@/components/ui/Gallery";
import { Icon } from "@/components/ui/Icon";
import type { ImageKey } from "@/lib/images";

type Meta = { icon: "calendar" | "pin" | "spark" | "users"; label: string; value: string };

/** Shared body for event and action detail pages: text, facts aside, highlights, gallery. */
export function StoryBody({
  body,
  meta,
  highlights,
  gallery,
  back,
  aside,
}: {
  body: string[];
  meta: Meta[];
  highlights?: string[];
  gallery?: ImageKey[];
  back: { href: string; label: string };
  aside?: ReactNode;
}) {
  return (
    <>
      <section className="section">
        <div className="container story-grid">
          <div className="story-main">
            <Reveal y={16}>
              <Link href={back.href} className="back-link">
                <Icon name="arrow" className="back-link-icon" strokeWidth={2.2} />
                {back.label}
              </Link>
            </Reveal>
            {body.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "story-lead" : undefined}>{p}</p>
              </Reveal>
            ))}
            {highlights?.length ? (
              <Stagger as="ul" className="check-list story-highlights">
                {highlights.map((h) => (
                  <StaggerItem as="li" key={h}>
                    <Icon name="check" className="check-icon" strokeWidth={2.4} />
                    {h}
                  </StaggerItem>
                ))}
              </Stagger>
            ) : null}
          </div>

          <Reveal className="story-aside" delay={0.15}>
            <dl className="story-facts">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt>
                    <Icon name={m.icon} className="icon-sm" />
                    {m.label}
                  </dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
            {aside}
          </Reveal>
        </div>
      </section>

      {gallery && gallery.length > 1 ? (
        <section className="section section-fog" aria-labelledby="gallery-title">
          <div className="container">
            <h2 className="kicker" id="gallery-title">
              <span className="kicker-line" aria-hidden="true" />
              Galerie
            </h2>
            <Gallery items={gallery} />
          </div>
        </section>
      ) : null}
    </>
  );
}
