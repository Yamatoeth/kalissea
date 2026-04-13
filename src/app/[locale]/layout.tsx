import { DM_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "../../i18n/routing";
import Providers from "../providers";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${dmSans.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body>
        {/* Organization structured data */}
        <Script
          id="schema-org-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kalissea",
              url: "https://kalissea.com",
              logo: "https://kalissea.com/logo.png",
              description:
                "Agence web spécialisée en développement, SEO et automatisation",
              foundingDate: "2020",
              areaServed: { "@type": "Country", name: "FR" },
              sameAs: [
                "https://medium.com/@kalissea",
                "https://kalissea.substack.com",
                "https://github.com/kalissea",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Sales",
                url: "https://kalissea.com/#contact",
              },
            }),
          }}
        />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="+ru5y+rFf5tU3296F8N/OQ"
          strategy="afterInteractive"
        />
        <Script
          src="https://trustviews.io/script.js"
          data-token="187a8715-d78c-4c85-bef5-f5ab5c0461e1"
          strategy="afterInteractive"
        />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <WhatsAppFloat />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
