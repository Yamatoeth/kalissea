import "./index.css";
import Providers from "./providers"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { DM_Sans, Space_Grotesk } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />

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
