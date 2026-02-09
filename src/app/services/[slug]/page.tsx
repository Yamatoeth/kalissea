import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getAllServiceSlugs, getServiceData, getDictionary } from "@lib/i18n-server";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import Script from "next/script";
import type { Metadata } from "next";

  // Mapping specific result images for services
const RESULTS_MAP: Record<string, { type: "image" | "video"; url: string; caption: string }[]> = {
  'website-creation': [
    {
      type: "image",
      url: "/images/results/website-creation.avif",
      caption: "Des sites web qui marquent les esprits"
    }
  ],
  'e-commerce': [
    {
      type: "image",
      url: "/images/results/e-commerce.avif",
      caption: "Vendez plus avec une boutique optimisée"
    }
  ],
  'maintenance': [
    {
      type: "image",
      url: "/images/results/maintenance.avif",
      caption: "Sécurité et performance garanties"
    }
  ],
  'seo-growth': [
    {
      type: "image",
      url: "/images/results/seo-growth.avif",
      caption: "Une croissance visible et durable"
    }
  ],
  'branding': [
    {
      type: "image",
      url: "/images/results/branding.avif",
      caption: "Une identité qui vous ressemble"
    }
  ],
  'automation-ai': [
    {
      type: "image",
      url: "/images/results/automation-ai.avif",
      caption: "L'intelligence artificielle au service de votre temps"
    }
  ]
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("i18next")?.value as "fr" | "en") || "fr";
  
  const serviceData = await getServiceData(slug, lang); 

  if (!serviceData) {
    return {
      title: "Service not found | Kalissea",
    };
  }

  const baseUrl = "https://kalissea.com";
  const serviceUrl = `${baseUrl}/services/${slug}`;
  const ogImageUrl = `${baseUrl}/og/${slug}.png`;

  const title = serviceData.seo?.title || `${serviceData.title} | Kalissea`;
  const description = serviceData.seo?.description || serviceData.heroDescription;
  const keywords = serviceData.seo?.keywords || [];

  return {
    title,
    description,
    keywords: [...keywords, "agence web", "Kalissea"],
    alternates: {
      canonical: serviceUrl,
      languages: {
        'fr': serviceUrl,
        'en': serviceUrl,
        'x-default': serviceUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: serviceUrl,
      siteName: 'Kalissea',
      type: 'website',
      locale: 'fr_CA',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: serviceData.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@kalissea',
      site: '@kalissea',
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("i18next")?.value as "fr" | "en") || "fr"; // Default to fr

  const serviceData = await getServiceData(slug, lang);
  const dict = await getDictionary(lang); 

  if (!serviceData) {
    notFound();
  }

  // All services for internal linking
  const allServices = [
    { key: "creation", path: "/services/website-creation" },
    { key: "ecommerce", path: "/services/e-commerce" },
    { key: "maintenance", path: "/services/maintenance" },
    { key: "seo", path: "/services/seo-growth" },
    { key: "branding", path: "/services/branding" },
    { key: "automation", path: "/services/automation-ai" },
  ];

  // Get related services (all except current one)
  const relatedServices = allServices
    .filter(s => s.key !== serviceData.key)
    .map(s => ({
      key: s.key,
      title: dict.services?.items?.[s.key]?.title || s.key,
      path: s.path,
    }));

  // Determine results (images) to show
  // In the future this should come from the CMS/JSON as well
  let results = RESULTS_MAP[slug];
  
  if (!results) {
    // Default placeholder result
    results = [
      {
        type: "image",
        url: "/placeholder.svg", 
        caption: serviceData.heroTitle
      }
    ];
  } else {
      // Update the caption from the translation if it was hardcoded or we want to ensure consistency
       results = results.map(r => ({
           ...r,
           caption: serviceData.heroTitle // Reusing hero title as caption like in the old page
       }));
  }

  return (
    <>
      {/* Breadcrumb Schema */}
      <Script
        id={`breadcrumb-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://kalissea.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://kalissea.com/#services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": serviceData.title,
                "item": `https://kalissea.com/services/${slug}`
              }
            ]
          })
        }}
      />

      {/* FAQ Schema */}
      {serviceData.faq && serviceData.faq.length > 0 && (
        <Script
          id={`faq-${slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": serviceData.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />
      )}

      {/* Service + LocalBusiness Schema */}
      <Script
        id={`service-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Kalissea",
            "description": "Agence web spécialisée en développement, SEO et automatisation",
            "url": "https://kalissea.com",
            "telephone": "",
            "areaServed": {
              "@type": "Country",
              "name": "CA"
            },
            "service": {
              "@type": "Service",
              "name": serviceData.title,
              "description": serviceData.seo?.description || serviceData.heroDescription,
              "provider": {
                "@type": "Organization",
                "name": "Kalissea",
                "url": "https://kalissea.com"
              },
              "areaServed": {
                "@type": "Country",
                "name": "CA"
              }
            }
          })
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
        relatedServicesTitle={dict.services.details.relatedServicesTitle || "Découvrez nos autres services"}
        relatedServices={relatedServices}
        ctaTitle={serviceData.ctaTitle}
        ctaDescription={serviceData.ctaDescription}
        backLabel={dict.header.services}
        startProjectLabel={dict.hero.startProject}
      />
    </>
  );
}
