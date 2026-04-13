import { notFound } from "next/navigation";
import { getAllServiceSlugs, getServiceData, getDictionary } from "@lib/i18n-server";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import Script from "next/script";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "../../../../i18n/routing";

// Mapping specific result images for services
const RESULTS_MAP: Record<
  string,
  { type: "image" | "video"; url: string; caption: string }[]
> = {
  "website-creation": [
    {
      type: "image",
      url: "/images/results/website-creation.avif",
      caption: "Des sites web qui marquent les esprits",
    },
  ],
  "e-commerce": [
    {
      type: "image",
      url: "/images/results/e-commerce.avif",
      caption: "Vendez plus avec une boutique optimisée",
    },
  ],
  maintenance: [
    {
      type: "image",
      url: "/images/results/maintenance.avif",
      caption: "Sécurité et performance garanties",
    },
  ],
  "seo-growth": [
    {
      type: "image",
      url: "/images/results/seo-growth.avif",
      caption: "Une croissance visible et durable",
    },
  ],
  branding: [
    {
      type: "image",
      url: "/images/results/branding.avif",
      caption: "Une identité qui vous ressemble",
    },
  ],
  "automation-ai": [
    {
      type: "image",
      url: "/images/results/automation-ai.avif",
      caption: "L'intelligence artificielle au service de votre temps",
    },
  ],
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const locales = routing.locales;
  const slugs = getAllServiceSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const serviceData = await getServiceData(slug, locale);

  if (!serviceData) {
    return { title: "Service not found | Kalissea" };
  }

  const baseUrl = "https://kalissea.com";
  const serviceUrlFr = `${baseUrl}/services/${slug}`;
  const serviceUrlEn = `${baseUrl}/en/services/${slug}`;
  const serviceUrl = locale === "fr" ? serviceUrlFr : serviceUrlEn;
  const ogImageUrl = RESULTS_MAP[slug]?.[0]?.url
    ? `${baseUrl}${RESULTS_MAP[slug][0].url}`
    : `${baseUrl}/kalissealogo.png`;

  const title = serviceData.seo?.title || `${serviceData.title} | Kalissea`;
  const description =
    serviceData.seo?.description || serviceData.heroDescription;
  const keywords = serviceData.seo?.keywords || [];

  return {
    title,
    description,
    keywords: [...keywords, "agence web", "Kalissea"],
    alternates: {
      canonical: serviceUrl,
      languages: {
        fr: serviceUrlFr,
        en: serviceUrlEn,
        "x-default": serviceUrlFr,
      },
    },
    openGraph: {
      title,
      description,
      url: serviceUrl,
      siteName: "Kalissea",
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1024,
          height: 1024,
          alt: serviceData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const serviceData = await getServiceData(slug, locale);
  const dict = await getDictionary(locale);

  if (!serviceData) {
    notFound();
  }

  const allServices = [
    { key: "creation", path: "/services/website-creation" },
    { key: "ecommerce", path: "/services/e-commerce" },
    { key: "maintenance", path: "/services/maintenance" },
    { key: "seo", path: "/services/seo-growth" },
    { key: "branding", path: "/services/branding" },
    { key: "automation", path: "/services/automation-ai" },
  ];

  const relatedServices = allServices
    .filter((s) => s.key !== serviceData.key)
    .map((s) => ({
      key: s.key,
      title: dict.services?.items?.[s.key]?.title || s.key,
      path: s.path,
    }));

  let results = RESULTS_MAP[slug];
  if (!results) {
    results = [
      { type: "image", url: "/placeholder.svg", caption: serviceData.heroTitle },
    ];
  } else {
    results = results.map((r) => ({ ...r, caption: serviceData.heroTitle }));
  }

  const baseUrl = "https://kalissea.com";

  return (
    <>
      <Script
        id={`breadcrumb-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: `${baseUrl}/${locale === "fr" ? "" : locale + "/"}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: `${baseUrl}/${locale === "fr" ? "" : locale + "/"}#services`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: serviceData.title,
                item: `${baseUrl}/${locale === "fr" ? "" : locale + "/"}services/${slug}`,
              },
            ],
          }),
        }}
      />

      {serviceData.faq && serviceData.faq.length > 0 && (
        <Script
          id={`faq-${slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: serviceData.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      )}

      <Script
        id={`service-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Kalissea",
            description:
              "Studio digital indépendant pour sites web, e-commerce et outils numériques sur mesure",
            url: "https://kalissea.com",
            service: {
              "@type": "Service",
              name: serviceData.title,
              description:
                serviceData.seo?.description || serviceData.heroDescription,
              provider: {
                "@type": "Organization",
                name: "Kalissea",
                url: "https://kalissea.com",
              },
            },
          }),
        }}
      />

      <ServiceDetailTemplate
        title={serviceData.title}
        heroTitle={serviceData.heroTitle}
        heroDescription={serviceData.heroDescription}
        longDescription={serviceData.longDescription}
        benefitsTitle={dict.services.details.benefitsTitle}
        benefits={serviceData.benefits}
        featuresTitle={dict.services.details.featuresTitle}
        featuresDescription={dict.services.details.featuresDescription}
        features={serviceData.features}
        resultsTitle={dict.services.details.resultsTitle}
        results={results}
        faqTitle={dict.services.details.faqTitle}
        faq={serviceData.faq}
        relatedServicesTitle={
          dict.services.details.relatedServicesTitle ||
          "Découvrez nos autres services"
        }
        relatedServices={relatedServices}
        ctaTitle={serviceData.ctaTitle}
        ctaDescription={serviceData.ctaDescription}
        backLabel={dict.header.capabilities}
        startProjectLabel={dict.hero.startProject}
      />
    </>
  );
}
