"use client";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { useTranslation } from "react-i18next";

export default function WebsiteCreationPage() {
  const { t } = useTranslation();
  const benefits = t("services.details.creation.benefits", { returnObjects: true }) as any[];

  return (
    <ServiceDetailTemplate
      serviceKey="creation"
      benefits={benefits}
      results={[
        {
          type: "image",
          url: "/images/results/website-creation.png",
          caption: t("services.details.creation.heroTitle")
        }
      ]}
    />
  );
}
