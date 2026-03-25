import MainApp from "@/components/MainApp";
import type { Metadata }  from "next";
import { cookies } from "next/headers";
import { getDictionary } from "@lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("i18next")?.value as "fr" | "en") || "fr";
  const dict = await getDictionary(lang);

  const title = dict.metadata?.title || "Kalissea – Agence web spécialisée en développement, SEO et automatisation";
  const description = dict.metadata?.description || "Kalissea est une agence web spécialisée en développement de sites performants, SEO technique et automatisation. Solutions claires, mesurables et durables.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://kalissea.com/",
      languages: {
        'fr': 'https://kalissea.com/',
        'en': 'https://kalissea.com/',
        'x-default': 'https://kalissea.com/',
      },
    },
    openGraph: {
      title,
      description,
      url: "https://kalissea.com/",
      siteName: "Kalissea",
      type: "website",
      locale: lang === "fr" ? "fr_CA" : "en_US",
      images: [
        {
          url: "https://kalissea.com/og/kalissea-og.png",
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://kalissea.com/og/kalissea-og.png"],
      creator: "@kalissea",
      site: "@kalissea",
    },
  };
}

export default function Index() {
  return <MainApp />;
}
