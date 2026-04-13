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
  const socialImage = "https://kalissea.com/kalissealogo.png";
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
          url: socialImage,
          width: 1024,
          height: 1024,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default async function IndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MainApp />;
}
