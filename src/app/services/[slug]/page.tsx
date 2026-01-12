import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getAllServiceSlugs, getServiceData, getDictionary } from "@lib/i18n-server";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import type { Metadata } from "next";

// Mapping specific result images for services if needed
// This mimics the previous hardcoded logic in individual pages
const RESULTS_MAP: Record<string, { type: "image" | "video"; url: string; caption: string }[]> = {
  'website-creation': [
    {
      type: "image",
      url: "/images/results/website-creation.png",
      caption: "Des sites web qui marquent les esprits"
    }
  ],
  'e-commerce': [
    {
      type: "image",
      url: "/images/results/e-commerce.png",
      caption: "Vendez plus avec une boutique optimisée"
    }
  ],
  'maintenance': [
    {
      type: "image",
      url: "/images/results/maintenance.png",
      caption: "Sécurité et performance garanties"
    }
  ],
  'seo-growth': [
    {
      type: "image",
      url: "/images/results/seo-growth.png",
      caption: "Une croissance visible et durable"
    }
  ],
  'branding': [
    {
      type: "image",
      url: "/images/results/branding.png",
      caption: "Une identité qui vous ressemble"
    }
  ],
  'automation-ai': [
    {
      type: "image",
      url: "/images/results/automation-ai.png",
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
  const lang = (cookieStore.get("i18next")?.value as "fr" | "en") || "fr"; // Default to fr
  
  const serviceData = await getServiceData(slug, lang); 

  if (!serviceData) {
    return {
      title: "Service not found | Kalissea",
    };
  }

  // Use the specific SEO data if available, fallback to hero info
  const title = serviceData.seo?.title || `${serviceData.title} | Kalissea`;
  const description = serviceData.seo?.description || serviceData.heroDescription;
  const keywords = serviceData.seo?.keywords || [];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://kalissea.com/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://kalissea.com/services/${slug}`,
      type: 'website',
    }
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
      ctaTitle={serviceData.ctaTitle}
      ctaDescription={serviceData.ctaDescription}
      backLabel={dict.header.services}
      startProjectLabel={dict.hero.startProject}
    />
  );
}
