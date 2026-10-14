import type { StaticImageData } from "next/image";
import duoDataIa from "@/assets/images/ceremonies/duo-alumnae-graduation-data-ia.jpg";
import graduationDataIa from "@/assets/images/ceremonies/graduation-data-ia-scene.jpg";
import promoFullstack from "@/assets/images/ceremonies/promotion-fullstack-escalier.jpg";
import remiseEcharpes from "@/assets/images/ceremonies/remise-echarpes-promotion-wecode.jpg";
import selfieAlumni from "@/assets/images/ceremonies/selfie-remise-echarpes-alumni.jpg";
import selfieFullstack from "@/assets/images/ceremonies/selfie-remise-echarpes-fullstack.jpg";
import priseDeNotes from "@/assets/images/formations/apprenante-prise-de-notes.jpg";
import coursFormateur from "@/assets/images/formations/cours-formateur-projection.jpg";
import dataAnalyst from "@/assets/images/formations/data-analyst-poste-de-travail.jpg";
import devFullstack from "@/assets/images/formations/dev-fullstack-projet-freeads.jpg";
import presentationProjet from "@/assets/images/formations/presentation-projet-en-classe.jpg";
import salleAuditoire from "@/assets/images/formations/salle-wecode-auditoire.jpg";
import salleEntraide from "@/assets/images/formations/salle-wecode-entraide.jpg";

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position for cropping. */
  position?: string;
};

/**
 * All site photos — real photos of the Wecode / We.Connect community.
 * Files live in `src/assets/images/{ceremonies,formations}/`.
 * Low-resolution ones (priseDeNotes, dataAnalyst, presentationProjet) are kept
 * for cards and small frames, never for full-screen backgrounds.
 */
export const images = {
  // Cérémonies & promotions
  remiseEcharpes: {
    src: remiseEcharpes,
    alt: "Une promotion Wecode lors de la remise des écharpes : cyber sécurité, fullstack, data & IA",
    position: "50% 35%",
  },
  /** Same photo, cropped on the « Cyber Sec » sashes. */
  remiseEcharpesCyber: {
    src: remiseEcharpes,
    alt: "Des alumni Wecode de la branche cyber sécurité, écharpe « Cyber Sec »",
    position: "8% 35%",
  },
  promoFullstack: {
    src: promoFullstack,
    alt: "La promotion Fullstack de Wecode réunie dans un escalier, écharpes bleues",
    position: "50% 40%",
  },
  graduationDataIa: {
    src: graduationDataIa,
    alt: "Graduation Data & IA de Wecode : les diplômés sur scène avec leurs attestations",
    position: "50% 45%",
  },
  selfieFullstack: {
    src: selfieFullstack,
    alt: "Selfie joyeux d’alumni Wecode en écharpes lors de la remise des écharpes",
    position: "50% 40%",
  },
  selfieAlumni: {
    src: selfieAlumni,
    alt: "Des alumni Wecode fullstack et data & IA font un selfie pendant la cérémonie",
    position: "50% 40%",
  },
  duoDataIa: {
    src: duoDataIa,
    alt: "Deux alumnae à la graduation Data & IA de Wecode",
    position: "50% 30%",
  },
  // Formations & vie en salle
  salleEntraide: {
    src: salleEntraide,
    alt: "Dans une salle Wecode, un apprenant aide une camarade sur son poste",
    position: "45% 50%",
  },
  salleAuditoire: {
    src: salleAuditoire,
    alt: "Des apprenants Wecode attentifs pendant une session en salle",
    position: "50% 50%",
  },
  coursFormateur: {
    src: coursFormateur,
    alt: "Un formateur explique un concept devant une projection, face aux apprenants",
    position: "35% 40%",
  },
  presentationProjet: {
    src: presentationProjet,
    alt: "Une équipe présente son projet devant la classe",
    position: "50% 35%",
  },
  devFullstack: {
    src: devFullstack,
    alt: "Un développeur fullstack travaille sur son projet web en salle",
    position: "40% 45%",
  },
  priseDeNotes: {
    src: priseDeNotes,
    alt: "Une apprenante prend des notes devant son ordinateur",
    position: "40% 40%",
  },
  dataAnalyst: {
    src: dataAnalyst,
    alt: "Poste de travail d’un data analyst, tableur et notes de travail",
    position: "50% 18%",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
