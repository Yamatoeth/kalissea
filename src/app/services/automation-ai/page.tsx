"use client";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { useTranslation } from "react-i18next";

export default function AutomationPage() {
  const { t } = useTranslation();
  const benefits = t("services.details.automation.benefits", { returnObjects: true }) as any[];

  return (
    <ServiceDetailTemplate
      serviceKey="automation"
      benefits={benefits}
      results={[
        {
          type: "image",
          url: "/placeholder.svg",
          caption: t("services.details.automation.heroTitle")
        }
      ]}
    />
  );
}
