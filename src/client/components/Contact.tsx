"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  // const { toast } = useToast();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   company: "",
  //   message: "",
  // });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const response = await fetch("https://formspree.io/f/maqwarar", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       toast({
  //         title: "Message sent!",
  //         description: "We'll get back to you within 24 hours.",
  //       });
  //       setFormData({ name: "", email: "", company: "", message: "" });
  //     } else {
  //       throw new Error("Failed to send message");
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Something went wrong. Please try again later.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <section id="contact" className="py-24 px-6 bg-card/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">{t('contact.label')}</div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {t('contact.title')}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto text-balance">
            {t('contact.description')}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 md:p-12 text-center">
          <div className="flex flex-col items-center gap-6">
             <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 text-green-500 fill-current"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
             </div>
            
            <Button 
                variant="hero" 
                size="lg" 
                className="w-full sm:w-auto min-w-50 bg-[#25D366] hover:bg-[#128C7E] text-white border-none"
                asChild
            >
              <a 
                href="https://wa.me/+33695925556" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {t('contact.whatsappButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

             <p className="text-sm text-muted-foreground mt-4">
              {t('contact.preferEmail')} <a href="mailto:contact@kalissea.com" className="text-primary hover:underline">contact@kalissea.com</a>
            </p>
          </div>

          {/* Commented out form UI
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name *</label>
                <Input
                  required
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-muted border-border focus:border-primary"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email *</label>
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-muted border-border focus:border-primary"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Company</label>
              <Input
                name="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-muted border-border focus:border-primary"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Project Details *</label>
              <Textarea
                required
                name="message"
                placeholder="Tell us about your project..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-muted border-border focus:border-primary resize-none"
                disabled={isSubmitting}
              />
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>hello@kalissea.com</span>
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
