import "./index.css";
import Providers from "./providers"
import WhatsAppFloat from "@/components/WhatsAppFloat"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="fr">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Kalissea – Agence web spécialisée en développement, SEO et automatisation</title>

    <meta
      name="description"
      content="Kalissea est une agence web spécialisée en développement de sites performants, SEO technique et automatisation. Solutions claires, mesurables et durables."
    />

    <link rel="canonical" href="https://kalissea.com/" />

    <meta property="og:title" content="Kalissea – Agence web & SEO technique" />
    <meta
      property="og:description"
      content="Agence web spécialisée en développement, SEO technique et automatisation. Performance, clarté, résultats."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://kalissea.com/" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Kalissea – Agence web & SEO technique" />
    <meta
      name="twitter:description"
      content="Développement web, SEO technique et automatisation orientés performance."
    />
  </head>

  <body>
    <Providers>
      {children}
      <WhatsAppFloat />
    </Providers>
    
  </body>
</html>
);
}
