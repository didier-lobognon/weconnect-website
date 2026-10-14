import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

export function SectionHeading({
  kicker,
  title,
  lead,
  id,
  accents,
  tone = "dark",
  className,
}: {
  kicker: string;
  title: string;
  lead?: string;
  id?: string;
  accents?: string[];
  /** "light" for text on blue backgrounds. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`section-head ${className ?? ""}`.trim()}>
      <Reveal y={16}>
        <span className={`kicker${tone === "light" ? " kicker-light" : ""}`}>
          <span className="kicker-line" aria-hidden="true" />
          {kicker}
        </span>
      </Reveal>
      <SplitText as="h2" id={id} text={title} accents={accents} className="section-title" />
      {lead ? (
        <Reveal delay={0.25}>
          <p className="section-lead">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
