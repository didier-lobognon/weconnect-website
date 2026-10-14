import type { Metadata, Viewport } from "next";
import { Figtree, Syne } from "next/font/google";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { organizationJsonLd, siteConfig } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "We.Connect — Communauté alumni Wecode | Abidjan",
    template: "%s | We.Connect",
  },
  description: siteConfig.description,
  keywords: [
    "We.Connect",
    "WeConnect",
    "Wecode",
    "Wecode alumni",
    "Abidjan",
    "Côte d'Ivoire",
    "communauté tech Abidjan",
    "réseau tech Côte d'Ivoire",
    "sécurité numérique",
    "fullstack",
    "data IA",
    "lead tech",
    "mentorat tech",
    "masterclass tech Abidjan",
  ],
  authors: [{ name: "We.Connect" }],
  creator: "We.Connect",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "We.Connect — Connecter pour réussir",
    description:
      "Communauté alumni Wecode à Abidjan : garder le lien entre les branches, partager, mentorat, événements et masterclasses.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "We.Connect — Connecter pour réussir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We.Connect — Connecter pour réussir",
    description:
      "Communauté alumni Wecode à Abidjan. Événements, mentorat, masterclasses, partenariats.",
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/logo.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#044E8F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${figtree.variable}`}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
