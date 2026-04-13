// Deprecated — kept only to avoid import errors during migration.
// All i18n is now handled by next-intl in [locale]/layout.tsx.
"use client";
import React from "react";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}