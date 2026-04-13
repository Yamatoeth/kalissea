"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, MessageCircleMore } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type InquiryFormData = {
  name: string;
  company: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

const INITIAL_FORM_DATA: InquiryFormData = {
  name: "",
  company: "",
  email: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

const Contact = () => {
  const t = useTranslations();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_FORM_DATA);

  const projectTypes = t.raw("contact.form.projectType.options") as { value: string; label: string }[];
  const budgetOptions = t.raw("contact.form.budget.options") as { value: string; label: string }[];
  const timelineOptions = t.raw("contact.form.timeline.options") as { value: string; label: string }[];
  const checklist = t.raw("contact.sidebar.checklist") as string[];

  const updateField = <K extends keyof InquiryFormData>(field: K, value: InquiryFormData[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/maqwarar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: `Kalissea inquiry - ${formData.projectType || "General project"}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send project inquiry");
      }

      toast({
        title: t("contact.form.successTitle"),
        description: t("contact.form.successDescription"),
      });
      setFormData(INITIAL_FORM_DATA);
    } catch {
      toast({
        title: t("contact.form.errorTitle"),
        description: t("contact.form.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-card/50 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="section-label mb-4 justify-center">{t("contact.label")}</div>
          <h2 className="mb-4 text-2xl font-bold text-foreground text-balance md:text-4xl">{t("contact.title")}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground text-balance md:text-base">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground">{t("contact.form.title")}</h3>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("contact.form.description")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{t("contact.form.name.label")}</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder={t("contact.form.name.placeholder")}
                    disabled={isSubmitting}
                    className="border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">{t("contact.form.email.label")}</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder={t("contact.form.email.placeholder")}
                    disabled={isSubmitting}
                    className="border-border bg-background"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-company">{t("contact.form.company.label")}</Label>
                  <Input
                    id="contact-company"
                    name="company"
                    value={formData.company}
                    onChange={(event) => updateField("company", event.target.value)}
                    placeholder={t("contact.form.company.placeholder")}
                    disabled={isSubmitting}
                    className="border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-project-type">{t("contact.form.projectType.label")}</Label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={(event) => updateField("projectType", event.target.value)}
                    disabled={isSubmitting}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{t("contact.form.projectType.placeholder")}</option>
                    {projectTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-budget">{t("contact.form.budget.label")}</Label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={(event) => updateField("budget", event.target.value)}
                    disabled={isSubmitting}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{t("contact.form.budget.placeholder")}</option>
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-timeline">{t("contact.form.timeline.label")}</Label>
                  <select
                    id="contact-timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={(event) => updateField("timeline", event.target.value)}
                    disabled={isSubmitting}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{t("contact.form.timeline.placeholder")}</option>
                    {timelineOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">{t("contact.form.message.label")}</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={7}
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder={t("contact.form.message.placeholder")}
                  disabled={isSubmitting}
                  className="resize-none border-border bg-background"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">{t("contact.form.note")}</p>
                <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t("contact.form.submitting")}
                    </>
                  ) : (
                    <>
                      {t("contact.form.submit")}
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t("contact.sidebar.title")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("contact.sidebar.description")}</p>

              <ul className="mt-6 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">{t("contact.alternatives.title")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("contact.alternatives.description")}</p>

              <div className="mt-6 space-y-3">
                <a
                  href="mailto:contact@kalissea.com"
                  className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>contact@kalissea.com</span>
                </a>

                <a
                  href="https://wa.me/+33695925556"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("contact.ariaWhatsapp")}
                  className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
                >
                  <MessageCircleMore className="h-4 w-4 text-primary" />
                  <span>{t("contact.alternatives.whatsapp")}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
