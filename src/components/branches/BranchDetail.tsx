import { Parallax } from "@/components/motion/Parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { branches } from "@/lib/site";

type Branch = (typeof branches)[number];

export function BranchDetail({ branch, flip }: { branch: Branch; flip: boolean }) {
  return (
    <section
      className={`section branch-detail${flip ? " is-flipped section-fog" : ""}`}
      id={branch.slug}
      aria-labelledby={`${branch.slug}-title`}
    >
      <div className="container branch-detail-grid">
        <div className="branch-detail-visual">
          <Photo name={branch.image} className="branch-detail-photo" sizes="(min-width: 900px) 45vw, 100vw" />
          <Parallax className="branch-detail-index-wrap" offset={50}>
            <span className="branch-detail-index" aria-hidden="true">
              {branch.index}
            </span>
          </Parallax>
          <Reveal className="branch-detail-icon" scale={0.6} y={0} delay={0.4}>
            <Icon name={branch.icon} draw strokeWidth={1.6} className="icon-lg" />
          </Reveal>
        </div>

        <div className="branch-detail-body">
          <Reveal y={16}>
            <span className="kicker">
              <span className="kicker-line" aria-hidden="true" />
              Branche {branch.index}
            </span>
          </Reveal>
          <SplitText as="h2" id={`${branch.slug}-title`} text={branch.title} className="section-title" />
          <Reveal delay={0.2}>
            <p className="section-lead">{branch.long}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <h3 className="branch-detail-subtitle">Ce que la branche apporte au réseau</h3>
          </Reveal>
          <Stagger as="ul" className="check-list">
            {branch.focus.map((f) => (
              <StaggerItem as="li" key={f}>
                <Icon name="check" className="check-icon" strokeWidth={2.4} />
                {f}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <ul className="chips chips-outline">
              {branch.essence.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
