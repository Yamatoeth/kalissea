"use client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import I18nProvider from "./i18n-provider";

const queryClient = new QueryClient();

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <React.Suspense fallback="Loading...">
        <I18nProvider>
          {children}
        </I18nProvider>
      </React.Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default Providers;
