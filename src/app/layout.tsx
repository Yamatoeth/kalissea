import "./index.css";
import Providers from "./providers"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="+ru5y+rFf5tU3296F8N/OQ" async></script>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Préconnexion aux domaines externes */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        <title>Kalissea – Agence web spécialisée en développement, SEO et automatisation</title>

        <meta
          name="description"
          content="Kalissea est une agence web spécialisée en développement de sites performants, SEO technique et automatisation. Solutions claires, mesurables et durables."
        />

        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <link rel="canonical" href="https://kalissea.com/" />

        <meta property="og:title" content="Kalissea – Agence web & SEO technique" />
        <meta
          property="og:description"
          content="Agence web spécialisée en développement, SEO technique et automatisation. Performance, clarté, résultats."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kalissea.com/" />
        <meta property="og:image" content="https://kalissea.com/og/kalissea-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kalissea - Agence web & SEO" />
        <meta property="og:locale" content="fr_CA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kalissea – Agence web & SEO technique" />
        <meta
          name="twitter:description"
          content="Développement web, SEO technique et automatisation orientés performance."
        />
        <meta name="twitter:image" content="https://kalissea.com/og/kalissea-og.png" />
        <meta name="twitter:creator" content="@kalissea" />
        
        {/* Schema.org Organization - Load eagerly for better SEO */}
        <Script
          id="schema-org-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kalissea",
              "url": "https://kalissea.com",
              "logo": "https://kalissea.com/logo.png",
              "description": "Agence web spécialisée en développement, SEO technique et automatisation",
              "foundingDate": "2020",
              "areaServed": {
                "@type": "Country",
                "name": "CA"
              },
              "sameAs": [
                "https://medium.com/@kalissea",
                "https://kalissea.substack.com",
                "https://github.com/kalissea"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Sales",
                "url": "https://kalissea.com/#contact"
              }
            })
          }}
        />
      </head>

      <body>
        <Providers>
          {children}

          <a
            href="https://submithunt.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", width: "150px", margin: "40px auto" }}
          >
            <img
              src="https://submithunt.com/badge.png"
              alt="Featured on SubmitHunt"
              width={150}
              height={45}
            />
          </a>

          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}