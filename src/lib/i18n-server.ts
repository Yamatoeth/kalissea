import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';

// Mapping between URL slugs and internal translation keys
const SLUG_TO_KEY: Record<string, string> = {
  'website-creation': 'creation',
  'e-commerce': 'ecommerce',
  'maintenance': 'maintenance',
  'seo-growth': 'seo',
  'branding': 'branding',
  'automation-ai': 'automation',
};

const KEY_TO_SLUG: Record<string, string> = Object.entries(SLUG_TO_KEY).reduce((acc, [slug, key]) => {
  acc[key] = slug;
  return acc;
}, {} as Record<string, string>);

export type ServiceKey = 'creation' | 'ecommerce' | 'maintenance' | 'seo' | 'branding' | 'automation';

export interface Benefit {
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface ServiceData {
  key: ServiceKey;
  slug: string;
  title: string;          // From services.items.[key].title
  description: string;    // From services.items.[key].description
  heroTitle: string;      // From services.details.[key].heroTitle
  heroDescription: string;// From services.details.[key].heroDescription
  ctaTitle: string;       // From services.details.[key].ctaTitle
  ctaDescription: string; // From services.details.[key].ctaDescription
  benefits: Benefit[];    // From services.details.[key].benefits
  
  // New SEO Content
  longDescription: string; // From services.details.[key].longDescription
  features: Feature[];     // From services.details.[key].features
  faq: FAQItem[];          // From services.details.[key].faq
  seo: ServiceSEO;         // From services.details.[key].seo
}

export async function getDictionary(locale: string = 'fr') {
  const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'translation.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getServiceData(slug: string, locale: string = 'fr'): Promise<ServiceData | null> {
  const key = SLUG_TO_KEY[slug];
  if (!key) return null;

  const dict = await getDictionary(locale);
  
  // Safe access with fallbacks
  const item = dict.services?.items?.[key];
  const detail = dict.services?.details?.[key];
  
  if (!item || !detail) return null;

  return {
    key: key as ServiceKey,
    slug,
    title: item.title,
    description: item.description,
    heroTitle: detail.heroTitle,
    heroDescription: detail.heroDescription,
    ctaTitle: detail.ctaTitle,
    ctaDescription: detail.ctaDescription,
    benefits: detail.benefits || [],
    longDescription: detail.longDescription || "",
    features: detail.features || [],
    faq: detail.faq || [],
    seo: detail.seo || { title: item.title, description: item.description, keywords: [] },
  };
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(SLUG_TO_KEY);
}

export function getInternalKey(slug: string): string | undefined {
  return SLUG_TO_KEY[slug];
}
