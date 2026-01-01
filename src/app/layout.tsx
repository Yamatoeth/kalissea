"use client";
  import "@/index.css";
import Providers from "./providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kalissea | Digital Agency - Web Development, SEO & Branding</title>
    <meta name="description" content="Kalissea is a digital agency specializing in web development, e-commerce, SEO, branding, and automation. Transparent pricing, fast delivery, and results that matter." />
    <meta name="keywords" content="web development, digital agency, SEO, branding, e-commerce, website design" />
    <link rel="canonical" href="https://agency.kalissea.com" />

    <meta property="og:title" content="Kalissea | Digital Agency" />
    <meta property="og:description" content="Web development, SEO, branding, and automation. Clear pricing. Results that matter." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://agency.kalissea.com" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Kalissea | Digital Agency" />
    <meta name="twitter:description" content="Web development, SEO, branding, and automation. Clear pricing. Results that matter." />
  </head>

  <body>
    <Providers>{children}</Providers>
    
  </body>
</html>
);
}
