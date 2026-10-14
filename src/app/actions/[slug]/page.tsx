import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionCard } from "@/components/actions/ActionCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryBody } from "@/components/ui/StoryBody";
import { actions, getAction, sortedActions } from "@/content/actions";
import { images } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return actions.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const action = getAction((await params).slug);
  if (!action) return {};
  return {
    title: action.title,
    description: action.excerpt,
    alternates: { canonical: `/actions/${action.slug}` },
    openGraph: { images: [images[action.cover].src.src] },
  };
}

export default async function ActionPage({ params }: Props) {
  const action = getAction((await params).slug);
  if (!action) notFound();

  const others = sortedActions()
    .filter((a) => a.slug !== action.slug)
    .slice(0, 2);

  return (
    <>
      <PageHero
        kicker={`Action · ${action.category}`}
        image={action.cover}
        title={action.title}
        compact
        lead={action.excerpt}
      >
        {action.link ? <ButtonLink href={action.link.href}>{action.link.label}</ButtonLink> : null}
      </PageHero>

      <StoryBody
        body={action.body}
        highlights={action.highlights}
        gallery={action.gallery}
        back={{ href: "/actions", label: "Toutes les actions" }}
        meta={[
          { icon: "spark", label: "Catégorie", value: action.category },
          ...(action.period ? [{ icon: "calendar" as const, label: "Période", value: action.period }] : []),
          { icon: "users", label: "Porté par", value: "La communauté We.Connect" },
        ]}
      />

      {others.length ? (
        <section className="section section-fog" aria-labelledby="others-title">
          <div className="container">
            <SectionHeading id="others-title" kicker="À découvrir" title="D’autres actions." />
            <Stagger className="actions-grid">
              {others.map((a) => (
                <StaggerItem key={a.slug}>
                  <ActionCard action={a} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}
    </>
  );
}
