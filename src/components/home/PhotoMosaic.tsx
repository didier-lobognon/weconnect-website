import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";

/** Three photos drifting at different speeds, each tagged with what it evokes. */
export function PhotoMosaic() {
  return (
    <section className="mosaic" aria-label="La communauté en images">
      <div className="container mosaic-grid">
        <Parallax className="mosaic-a" offset={40}>
          <Photo name="coursFormateur" sizes="(min-width: 860px) 55vw, 100vw" />
          <Reveal className="mosaic-tag" delay={0.5} y={16}>
            Transmettre
          </Reveal>
        </Parallax>
        <Parallax className="mosaic-b" offset={90}>
          <Photo name="selfieFullstack" sizes="(min-width: 860px) 35vw, 100vw" />
          <Reveal className="mosaic-tag" delay={0.6} y={16}>
            Se retrouver
          </Reveal>
        </Parallax>
        <Parallax className="mosaic-c" offset={140}>
          <Photo name="priseDeNotes" sizes="(min-width: 860px) 30vw, 100vw" />
          <Reveal className="mosaic-tag" delay={0.7} y={16}>
            Grandir ensemble
          </Reveal>
        </Parallax>
      </div>
    </section>
  );
}
