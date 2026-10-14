import type { ImageKey } from "@/lib/images";

/**
 * ÉVÉNEMENTS — pour publier un événement, ajoutez un objet dans `events`.
 *
 * - `date` au format "AAAA-MM-JJ" : l’événement passe automatiquement de
 *   « À venir » à « Passés » une fois la date dépassée.
 * - Sans `date`, l’événement est rangé dans « Passés » avec « Date à préciser ».
 * - `cover` / `gallery` : clés du registre `src/lib/images.ts`
 *   (déposez la photo dans `src/assets/images/` puis déclarez-la là-bas).
 * - Ne publiez que des informations confirmées.
 */

export const eventCategories = [
  "Rencontre",
  "Masterclass",
  "Formation",
  "Mentorat",
  "Cérémonie",
  "Partenariat",
] as const;

export type EventCategory = (typeof eventCategories)[number];

export type EventItem = {
  slug: string;
  title: string;
  category: EventCategory;
  /** "AAAA-MM-JJ" */
  date?: string;
  /** "18h00 – 21h00" */
  time?: string;
  location?: string;
  excerpt: string;
  /** Paragraphes de description. */
  body: string[];
  cover: ImageKey;
  gallery?: ImageKey[];
  /** Lien d’inscription (formulaire, billetterie…) pour un événement à venir. */
  registrationUrl?: string;
};

export const events: EventItem[] = [
  {
    slug: "remise-des-echarpes-promotion-wecode",
    title: "Remise des écharpes — promotion Wecode",
    category: "Cérémonie",
    // À compléter : date et lieu exacts de la cérémonie.
    excerpt:
      "La cérémonie de fin de parcours d’une promotion Wecode : cyber sécurité, fullstack, data & IA. Là où tout a commencé pour beaucoup d’entre nous.",
    body: [
      "À la fin des parcours Wecode, les bénéficiaires de chaque branche ont reçu leur écharpe : cyber sécurité, développement fullstack, data & IA.",
      "Ce moment marque la fin des modules… et le début d’autre chose. C’est de cette envie de rester connectés qu’est né We.Connect.",
    ],
    cover: "remiseEcharpes",
    gallery: ["remiseEcharpes", "selfieFullstack", "selfieAlumni"],
  },
  {
    slug: "graduation-data-ia-wecode",
    title: "Graduation Data & IA — Wecode",
    category: "Cérémonie",
    // À compléter : date et lieu exacts de la cérémonie.
    excerpt:
      "Les diplômés de la branche Data & IA reçoivent leur attestation sur scène : un moment de fierté partagé par toute la communauté.",
    body: [
      "Sur scène, attestation en main et écharpe « Data-IA » sur les épaules : les diplômés de la branche Data & IA ont célébré la fin de leur parcours Wecode.",
      "Une étape de plus pour la communauté : ces nouveaux alumni rejoignent le réseau, prêts à partager et à transmettre à leur tour.",
    ],
    cover: "graduationDataIa",
    gallery: ["graduationDataIa", "duoDataIa"],
  },
];

const today = () => new Date().toISOString().slice(0, 10);

export const isUpcoming = (e: EventItem) => !!e.date && e.date >= today();

/** Upcoming events, soonest first. */
export const upcomingEvents = () =>
  events.filter(isUpcoming).sort((a, b) => (a.date! < b.date! ? -1 : 1));

/** Past events, most recent first (undated ones last). */
export const pastEvents = () =>
  events
    .filter((e) => !isUpcoming(e))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const formatDate = (iso?: string) =>
  iso ? dateFormat.format(new Date(`${iso}T00:00:00Z`)) : "Date à préciser";

/** { day: "15", month: "nov." } for date badges. */
export const dateParts = (iso?: string) => {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  return {
    day: String(d.getUTCDate()).padStart(2, "0"),
    month: new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" }).format(d),
    year: String(d.getUTCFullYear()),
  };
};
