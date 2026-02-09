import "./index.css";
import Providers from "./providers"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://kalissea.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="+ru5y+rFf5tU3296F8N/OQ" async></script>

        {/* Préconnexion aux domaines externes */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
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

          <script src="https://trustviews.io/script.js" data-token="187a8715-d78c-4c85-bef5-f5ab5c0461e1"></script>

          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}