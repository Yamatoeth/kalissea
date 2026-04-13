import MainApp from "@/components/MainApp";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  const canonicalUrl =
    locale === "fr" ? "https://kalissea.com/" : "https://kalissea.com/en/";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: "https://kalissea.com/",
        en: "https://kalissea.com/en/",
        "x-default": "https://kalissea.com/",
      },
    },
    openGraph: {
      title,
      description,
      url: locale === "fr" ? "https://kalissea.com/" : "https://kalissea.com/en/",
      siteName: "Kalissea",
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
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

export default async function IndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MainApp />;
}
