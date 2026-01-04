"use client";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { useTranslation } from "react-i18next";

export default function MaintenancePage() {
  const { t } = useTranslation();
  const benefits = t("services.details.maintenance.benefits", { returnObjects: true }) as any[];

  return (
    <ServiceDetailTemplate
      serviceKey="maintenance"
      benefits={benefits}
      results={[
        {
          type: "image",
          url: "/placeholder.svg",
          caption: t("services.details.maintenance.heroTitle")
        }
      ]}
    />
  );
}
