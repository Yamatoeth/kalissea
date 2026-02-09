import MainApp from "@/components/MainApp";
import type { Metadata }  from "next";

export const metadata: Metadata = {
  title: "Kalissea – Agence web spécialisée en développement, SEO et automatisation",
  description:
    "Kalissea est une agence web spécialisée en développement de sites performants, SEO technique et automatisation. Solutions claires, mesurables et durables.",
  alternates: {
    canonical: "https://kalissea.com/",
    languages: {
      'fr': 'https://kalissea.com/',
      'x-default': 'https://kalissea.com/',
    },
  },
  openGraph: {
    title: "Kalissea – Agence web & SEO technique",
    description: "Agence web spécialisée en développement, SEO technique et automatisation. Performance, clarté, résultats.",
    url: "https://kalissea.com/",
    siteName: "Kalissea",
    type: "website",
    locale: "fr_CA",
    images: [
      {
        url: "https://kalissea.com/og/kalissea-og.png",
        width: 1200,
        height: 630,
        alt: "Kalissea - Agence web & SEO",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalissea – Agence web & SEO technique",
    description: "Développement web, SEO technique et automatisation orientés performance.",
    images: ["https://kalissea.com/og/kalissea-og.png"],
    creator: "@kalissea",
    site: "@kalissea",
  },
};

export default function Index() {
  return <MainApp />;
}
