"use client";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { useTranslation } from "react-i18next";

export default function EcommercePage() {
  const { t } = useTranslation();
  const benefits = t("services.details.ecommerce.benefits", { returnObjects: true }) as any[];

  return (
    <ServiceDetailTemplate
      serviceKey="ecommerce"
      benefits={benefits}
      results={[
        {
          type: "image",
          url: "/placeholder.svg",
          caption: t("services.details.ecommerce.heroTitle")
        }
      ]}
    />
  );
}
