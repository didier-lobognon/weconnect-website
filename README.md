# We.Connect — Site officiel

Site vitrine de la communauté alumni **We.Connect** (formations Wecode : sécurité numérique, fullstack, data/IA, lead tech) — Abidjan, Côte d’Ivoire.

Stack : **Next.js 15** · **React 19** · **TypeScript** · **Tailwind CSS 4** · **Motion** · **Lenis**

> Brief organisation / design pour l’IA et l’équipe : **[WECONNECT.md](./WECONNECT.md)**

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build production |
| `npm start` | Servir le build production |
| `npm run lint` | ESLint |

## Structure

```
src/
  app/                 # Routes : /, /a-propos, /communaute, /activites, /evenements(/[slug]), /actions(/[slug]), /rejoindre
  content/             # events.ts, actions.ts — contenu publié
  components/
    layout/            # Header, Footer, SmoothScroll (Lenis), ScrollProgress, Cursor
    motion/            # Primitives d’animation (Reveal, SplitText, ScrollWords, Marquee, Magnetic, Parallax)
    ui/                # Boutons, icônes, logo, NetworkCanvas, PageHero, SectionHeading, CtaBanner
    home/ about/ branches/ activities/ join/   # Sections propres à chaque page
  lib/site.ts          # Tout le contenu + SEO / JSON-LD
  styles/              # base, layout, components, home, pages
  assets/images/       # Photos (optimisées par next/image)
  lib/images.ts        # Registre des photos (alt, cadrage)
public/                # Logo, favicon, OG image
```

## Publier du contenu

### Un événement (passé ou à venir)

1. Déposer la photo dans `src/assets/images/<thème>/` avec un nom parlant (ex. `ceremonies/meetup-mars-2027.jpg`) et la déclarer dans `src/lib/images.ts` :
   ```ts
   import meetupMars from "@/assets/images/ceremonies/meetup-mars-2027.jpg";
   // dans `images` :
   meetupMars: { src: meetupMars, alt: "Meetup We.Connect de mars à Abidjan" },
   ```
2. Ajouter l’événement dans `src/content/events.ts` :
   ```ts
   {
     slug: "meetup-mars-2027",           // adresse : /evenements/meetup-mars-2027
     title: "Meetup de printemps",
     category: "Rencontre",
     date: "2027-03-14",                  // passe seul de « À venir » à « Passés »
     time: "18h00 – 21h00",
     location: "Abidjan, Cocody",
     excerpt: "Une phrase d’accroche.",
     body: ["Paragraphe 1.", "Paragraphe 2."],
     cover: "meetupMars",
     gallery: ["meetupMars", "autrePhoto"], // galerie affichée à partir de 2 photos
     registrationUrl: "https://…",          // bouton « S’inscrire » (facultatif)
   },
   ```
3. Redéployer. L’événement apparaît sur `/evenements`, en « À la une » sur l’accueil, dans le sitemap, avec ses données structurées Google (Event).

### Une action (réalisation)

Même principe dans `src/content/actions.ts` (`category`, `period`, `sortKey` "AAAA-MM" pour l’ordre, `highlights`, `gallery`, `link` facultatif). Les filtres par catégorie apparaissent automatiquement sur `/actions` dès qu’il y a au moins deux catégories.

> Ne publier que des informations confirmées (dates, lieux, chiffres).

## Déployer sur Vercel

1. Créer un dépôt **vide** sur GitHub (sans README), puis :
   ```bash
   git remote add origin https://github.com/<compte>/weconnect-website.git
   git push -u origin main
   ```
2. Sur [vercel.com/new](https://vercel.com/new) : *Import Git Repository* → choisir le dépôt → **Deploy** (Next.js est détecté, aucun réglage nécessaire).
3. Chaque `git push` sur `main` redéploie automatiquement le site.

L’adresse du site (liens canoniques, sitemap, aperçus de partage) est calculée seule sur Vercel. Une fois le domaine officiel branché (*Settings → Domains*), ajouter la variable d’environnement `NEXT_PUBLIC_SITE_URL=https://weconnect.ci` (*Settings → Environment Variables*) puis redéployer.

## Avant mise en ligne

1. Domaine : voir « Déployer sur Vercel » (`NEXT_PUBLIC_SITE_URL`).
2. Confirmer l’e-mail et le téléphone dans `src/lib/site.ts`.
3. Déployer (Vercel, Netlify, ou Node `npm run build && npm start`).

## Charte

- Bleu `#044E8F` · Orange `#F39200`
- Polices : Syne (display) + Figtree (body)
- Motif réseau animé (réagit à la souris) dans les heros et le CTA

## Photos

Toutes les photos sont de vraies photos de la communauté (fournies par l’équipe), rangées par thème :

```
src/assets/images/
  brand/        logo-officiel-weconnect (source du logo, non utilisée telle quelle sur le site)
  ceremonies/   remise-echarpes-promotion-wecode, promotion-fullstack-escalier,
                graduation-data-ia-scene, duo-alumnae-graduation-data-ia,
                selfie-remise-echarpes-fullstack, selfie-remise-echarpes-alumni
  formations/   salle-wecode-entraide, salle-wecode-auditoire, cours-formateur-projection,
                presentation-projet-en-classe, dev-fullstack-projet-freeads,
                apprenante-prise-de-notes, data-analyst-poste-de-travail
```

Chaque photo est déclarée une seule fois dans `src/lib/images.ts` (texte alternatif + cadrage) puis utilisée par sa clé. Les photos de moins de 1080 px de large (`apprenante-prise-de-notes`, `presentation-projet-en-classe`, `data-analyst-poste-de-travail`) ne servent que dans des cartes, jamais en plein écran.
