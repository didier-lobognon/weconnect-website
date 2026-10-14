import type { ImageKey } from "@/lib/images";

/**
 * Public URL used for canonical links, sitemap and social previews.
 * 1. NEXT_PUBLIC_SITE_URL (set it once the official domain is live, e.g. https://weconnect.ci)
 * 2. the production URL Vercel injects at build time
 * 3. local development
 */
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "We.Connect",
  tagline: "Connecter pour réussir",
  description:
    "We.Connect fédère les bénéficiaires des formations Wecode (sécurité numérique, fullstack, data/IA, lead tech) à Abidjan : événements, mentorat, masterclasses et partenariats.",
  url: siteUrl(),
  locale: "fr_CI",
  phone: "+2250161875957",
  phoneDisplay: "01 61 87 59 57",
  email: "contact@weconnect.ci",
  location: "Abidjan, Côte d’Ivoire",
  ogImage: "/images/og-cover.png",
} as const;

export const navLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/communaute", label: "Communauté" },
  { href: "/activites", label: "Activités" },
  { href: "/evenements", label: "Événements" },
  { href: "/actions", label: "Actions" },
  { href: "/rejoindre", label: "Rejoindre" },
] as const;

export type IconName =
  | "shield"
  | "code"
  | "data"
  | "compass"
  | "calendar"
  | "mentor"
  | "spark"
  | "book"
  | "bridge"
  | "chat"
  | "link"
  | "users"
  | "door"
  | "graduate";

export const branches = [
  {
    slug: "securite-numerique",
    image: "remiseEcharpesCyber",
    index: "01",
    title: "Sécurité numérique",
    icon: "shield",
    essence: ["Vigilance", "Confiance", "Protection"],
    description:
      "Défense, bonnes pratiques et culture cyber — pour protéger les produits et les organisations.",
    long: "Les membres issus de la branche sécurité numérique apportent au réseau une culture de la vigilance : bonnes pratiques, défense des systèmes et sens des responsabilités face aux données.",
    focus: [
      "Culture cyber et bonnes pratiques",
      "Protection des systèmes et des données",
      "Sensibilisation des équipes",
    ],
  },
  {
    slug: "fullstack",
    image: "devFullstack",
    index: "02",
    title: "Développement fullstack",
    icon: "code",
    essence: ["Construire", "Livrer", "Itérer"],
    description:
      "Du produit au déploiement : des builders qui conçoivent, codent et livrent des expériences numériques.",
    long: "Les builders du réseau : du front au back, de l’idée à la mise en ligne. Ils transforment des besoins en produits concrets et partagent leurs façons de faire.",
    focus: [
      "Front-end et back-end",
      "Conception de produits",
      "Déploiement et mise en ligne",
    ],
  },
  {
    slug: "data-ia",
    image: "dataAnalyst",
    index: "03",
    title: "Data & IA",
    icon: "data",
    essence: ["Données", "Modèles", "Décisions"],
    description:
      "Données, modèles et décisions intelligentes — pour transformer l’information en impact.",
    long: "Ceux qui font parler les données : analyse, modèles et intelligence artificielle au service de meilleures décisions, pour les projets comme pour les organisations.",
    focus: [
      "Analyse et visualisation de données",
      "Modèles et intelligence artificielle",
      "Aide à la décision",
    ],
  },
  {
    slug: "lead-tech",
    image: "presentationProjet",
    index: "04",
    title: "Lead tech",
    icon: "compass",
    essence: ["Vision", "Leadership", "Encadrement"],
    description:
      "Leadership technique et vision produit — pour guider les équipes et faire grandir les projets.",
    long: "Les profils lead tech donnent le cap : ils encadrent, structurent et font grandir les équipes. Au sein du réseau, ils transmettent leur expérience du pilotage.",
    focus: [
      "Pilotage d’équipes tech",
      "Vision produit et stratégie",
      "Accompagnement des talents",
    ],
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  index: string;
  title: string;
  icon: IconName;
  image: ImageKey;
  essence: readonly string[];
  description: string;
  long: string;
  focus: readonly string[];
}>;

export const activities = [
  {
    slug: "evenements",
    image: "selfieFullstack",
    title: "Événements & rencontres",
    short: "Événements",
    icon: "calendar",
    description:
      "Meetups, retrouvailles et moments de networking à Abidjan pour reconnecter les cohortes, élargir le réseau et célébrer les réussites collectives.",
    points: ["Retrouvailles entre cohortes", "Networking", "Moments de communauté"],
  },
  {
    slug: "mentorat",
    image: "salleEntraide",
    title: "Mentorat",
    short: "Mentorat",
    icon: "mentor",
    description:
      "Les grands frères et grandes sœurs accompagnent ceux qui sortent tout juste des modules : conseils, revue de code, orientation de carrière.",
    points: ["Conseils de parcours", "Revue de code", "Orientation carrière"],
  },
  {
    slug: "masterclasses",
    image: "coursFormateur",
    title: "Masterclasses",
    short: "Masterclasses",
    icon: "spark",
    description:
      "Des sessions intensives animées par des alumni et des invités, pour monter en compétence sur des sujets concrets.",
    points: ["Sujets concrets", "Alumni et invités", "Format intensif"],
  },
  {
    slug: "formations",
    image: "salleAuditoire",
    title: "Formations",
    short: "Formations",
    icon: "book",
    description:
      "Des sessions organisées par et avec la communauté pour continuer à progresser après Wecode, à son rythme.",
    points: ["Par et pour la communauté", "Montée en compétence", "Toutes branches"],
  },
  {
    slug: "partenariats",
    image: "graduationDataIa",
    title: "Partenariats",
    short: "Partenariats",
    icon: "bridge",
    description:
      "Des ponts avec les entreprises, les écoles et les acteurs tech pour des stages, des missions, des formations et des opportunités partagées.",
    points: ["Entreprises et écoles", "Stages et missions", "Opportunités partagées"],
  },
  {
    slug: "partage",
    image: "selfieAlumni",
    title: "Partage d’expériences",
    short: "Partage",
    icon: "chat",
    description:
      "Retours d’expérience sur les modules Wecode, les réseaux et les parcours — pour que chacun avance plus vite.",
    points: ["Retours sur les modules", "Parcours de carrière", "Bonnes adresses"],
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  title: string;
  short: string;
  icon: IconName;
  image: ImageKey;
  description: string;
  points: readonly string[];
}>;

export const story = [
  {
    step: "01",
    title: "Les formations Wecode",
    text: "Des parcours par modules et par branches : sécurité numérique, développement fullstack, data & IA, lead tech.",
  },
  {
    step: "02",
    title: "La fin des parcours",
    text: "Les modules se terminent, chacun repart de son côté… et le risque de perdre le lien devient réel.",
  },
  {
    step: "03",
    title: "La naissance de We.Connect",
    text: "Une poignée de bénéficiaires décide de créer une communauté pour rester connectés, quelle que soit la branche suivie.",
  },
  {
    step: "04",
    title: "Aujourd’hui",
    text: "Un réseau vivant qui se retrouve, partage et accompagne la génération suivante — à Abidjan et au-delà.",
  },
] as const;

export const missionItems = [
  {
    icon: "link",
    title: "Maintenir le lien",
    text: "Garder un lien humain et professionnel entre alumni, toutes branches confondues.",
  },
  {
    icon: "users",
    title: "Se rencontrer",
    text: "Organiser des rencontres et des moments de communauté.",
  },
  {
    icon: "chat",
    title: "Partager",
    text: "Échanger nos expériences de formation, de réseau et de carrière.",
  },
  {
    icon: "mentor",
    title: "Accompagner",
    text: "Soutenir les nouveaux sortants grâce à un mentorat fraternel.",
  },
  {
    icon: "door",
    title: "Ouvrir des portes",
    text: "Développer des partenariats, des formations et des masterclasses.",
  },
] as const satisfies ReadonlyArray<{ icon: IconName; title: string; text: string }>;

export const values = [
  {
    title: "Le lien",
    text: "Rester connectés après la formation. Personne ne reste isolé après Wecode.",
  },
  {
    title: "La transmission",
    text: "Faire du mentorat une habitude, pas un événement ponctuel.",
  },
  {
    title: "L’ouverture",
    text: "Créer des ponts concrets avec l’écosystème tech ivoirien.",
  },
  {
    title: "L’égalité",
    text: "Quatre branches, tous les profils, un seul réseau — sans hiérarchie.",
  },
] as const;

export const mentorshipCycle = [
  {
    title: "Recevoir",
    text: "En sortant des modules, on est accueilli par celles et ceux qui sont passés par là.",
  },
  {
    title: "Grandir",
    text: "Conseils, revue de code, orientation : on progresse plus vite, ensemble.",
  },
  {
    title: "Transmettre",
    text: "Puis vient notre tour de tendre la main à la génération suivante.",
  },
] as const;

export const profiles = [
  {
    id: "alumni",
    icon: "graduate",
    title: "Alumni Wecode",
    text: "Tu as suivi un parcours Wecode, quelle que soit la branche ? Ta place est ici.",
  },
  {
    id: "nouveau",
    icon: "spark",
    title: "Nouveau sortant",
    text: "Tu sors tout juste des modules ? On t’accompagne pour la suite.",
  },
  {
    id: "mentor",
    icon: "mentor",
    title: "Mentor",
    text: "Tu veux transmettre ton expérience à la génération suivante ?",
  },
  {
    id: "partenaire",
    icon: "bridge",
    title: "Partenaire",
    text: "Entreprise, école ou acteur tech : construisons des ponts ensemble.",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  icon: IconName;
  title: string;
  text: string;
}>;

export type ProfileId = (typeof profiles)[number]["id"];

export const faq = [
  {
    q: "We.Connect, c’est Wecode ?",
    a: "Non. Wecode est le programme de formation. We.Connect est la communauté alumni née après ces formations, créée par des bénéficiaires pour garder le lien.",
  },
  {
    q: "Je sors tout juste de formation, c’est pour moi ?",
    a: "Oui, surtout ! Accompagner ceux qui sortent tout juste des modules est au cœur de notre mission : conseils, mentorat, échanges avec les anciens.",
  },
  {
    q: "Quelle que soit ma branche ?",
    a: "Sécurité numérique, fullstack, data & IA ou lead tech : toutes les branches sont représentées et égales. We.Connect est un seul réseau, pas quatre silos.",
  },
  {
    q: "Je représente une entreprise ou une école. Comment collaborer ?",
    a: "Écris-nous via le formulaire en choisissant le profil « Partenaire », ou appelle-nous. Stages, missions, formations, masterclasses : parlons-en.",
  },
] as const;

export const keyMessages = [
  "Sécurité numérique",
  "Développement fullstack",
  "Data & IA",
  "Lead tech",
  "Connecter pour réussir",
] as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "We.Connect",
  alternateName: ["WeConnect", "We Connect"],
  url: siteConfig.url,
  logo: `${siteConfig.url}/icons/logo.svg`,
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  areaServed: {
    "@type": "Country",
    name: "Côte d'Ivoire",
  },
  knowsAbout: [
    "Sécurité numérique",
    "Développement fullstack",
    "Data et intelligence artificielle",
    "Lead tech",
    "Mentorat",
    "Networking",
  ],
};
