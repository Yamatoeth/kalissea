import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "@/i18n"; // Initialize i18n before components mount

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
        {children}
      </React.Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default Providers;
