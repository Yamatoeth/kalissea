import MainApp from "@/components/MainApp";
import type { Metadata }  from "next";

export const metadata: Metadata = {
  title: "Kalissea – Agence web spécialisée en développement, SEO et automatisation",
  description:
    "Kalissea est une agence web spécialisée en développement de sites performants, SEO technique et automatisation.",
  alternates: {
    canonical: "https://kalissea.com/",
  },
};

export default function Index() {
  return <MainApp />;
}
