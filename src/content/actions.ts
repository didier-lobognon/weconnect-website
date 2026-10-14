import type { ImageKey } from "@/lib/images";

/**
 * ACTIONS — nos réalisations. Pour publier une action, ajoutez un objet dans `actions`.
 *
 * - `period` : texte libre affiché tel quel ("Mars 2026", "2026", "Depuis 2025"…).
 * - `sortKey` : "AAAA-MM" pour l’ordre d’affichage (la plus récente en premier).
 * - `cover` / `gallery` : clés du registre `src/lib/images.ts`.
 * - `highlights` : 2 à 4 points forts courts (sans chiffres non vérifiés).
 */

export const actionCategories = [
  "Communauté",
  "Mentorat",
  "Formation",
  "Partenariat",
  "Projet",
] as const;

export type ActionCategory = (typeof actionCategories)[number];

export type ActionItem = {
  slug: string;
  title: string;
  category: ActionCategory;
  period?: string;
  sortKey?: string;
  excerpt: string;
  body: string[];
  highlights?: string[];
  cover: ImageKey;
  gallery?: ImageKey[];
  /** Lien externe éventuel (article, projet en ligne…). */
  link?: { href: string; label: string };
};

export const actions: ActionItem[] = [
  {
    slug: "naissance-de-we-connect",
    title: "La naissance de We.Connect",
    category: "Communauté",
    excerpt:
      "À la fin des parcours Wecode, une poignée de bénéficiaires crée We.Connect pour garder le lien entre toutes les branches.",
    body: [
      "Les formations Wecode se déroulent par modules et par branches : sécurité numérique, développement fullstack, data & IA, lead tech. À la fin des parcours, chacun repart de son côté.",
      "Une poignée de bénéficiaires décide alors de créer We.Connect : un espace pour rester connectés quelle que soit la branche suivie, partager les expériences et accompagner celles et ceux qui sortent tout juste des modules.",
    ],
    highlights: [
      "Toutes les branches Wecode réunies",
      "Un réseau pensé pour durer",
      "Le mentorat au cœur du projet",
    ],
    cover: "remiseEcharpes",
    gallery: ["remiseEcharpes", "promoFullstack", "graduationDataIa"],
  },
];

export const sortedActions = () =>
  [...actions].sort((a, b) => (b.sortKey ?? "").localeCompare(a.sortKey ?? ""));

export const getAction = (slug: string) => actions.find((a) => a.slug === slug);
