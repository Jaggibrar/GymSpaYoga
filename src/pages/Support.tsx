import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  // Prevent any global hotkeys from hijacking typing in the textarea
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    setFormData((p) => ({ ...p, message: e.target.value }));
  };

  const faqs = [
    {
      question: 'How do I book a session?',
      answer:
        "Browse listings, pick a gym/spa/yoga studio, choose date & time, and confirm. You'll receive an instant confirmation email.",
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer:
        'Yes. You can manage bookings up to 24 hours before the session. Specific policies may vary by provider.',
    },
    {
      question: 'How do payments work?',
      answer:
        'We accept major cards and UPI/digital wallets. Payments are processed securely at the time of booking.',
    },
    {
      question: "What if I'm not satisfied with my experience?",
      answer:
        "Contact support within 48 hours. We'll investigate and work toward a fair resolution.",
    },
    {
      question: 'How do I become a business partner?',
      answer:
        "Click 'For Business' in the footer to register your gym, spa, or yoga studio in minutes.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields.');
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-support-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to: 'gymspayoga@gmail.com',
        },
      });

      if (error) throw error;
      toast.success("Your message has been sent! We'll get back to you within 24 hours.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('Support email error:', err);
      toast.error(err?.message || 'Email service not configured. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Support Center - GymSpaYoga | Contact & Help"
        description="Get help with bookings, payments, or your account. Contact our support team or browse FAQs for quick answers."
        keywords="support, help, contact, FAQ, customer service, gymspayoga support"
      />

      {/* Header */}
      <header className="relative bg-gradient-to-br from-emerald-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Support Center</h1>
          <p className="mt-3 text-white/90 max-w-2xl">
            We’re here to help. Submit a request or explore our FAQs for instant answers.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-white" />
            <span className="text-sm">Fast response • Secure support • Customer-first</span>
          </div>
        </div>
      </header>

      <main className="bg-background">
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Left: Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <MessageCircle className="h-5 w-5" />
                    Send us a message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Describe your issue or question with as much detail as possible"
                        value={formData.message}
                        onChange={handleMessageChange}
                        onKeyDown={(e) => e.stopPropagation()}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        We usually reply within 4–8 hours during business days.
                      </p>
                      <Button type="submit" disabled={sending} aria-busy={sending}>
                        {sending ? 'Sending…' : 'Send message'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ */}
              <section aria-labelledby="faq-heading" className="mt-10 md:mt-12">
                <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground mb-6">
                  Quick answers to common questions. Still need help? Send us a message.
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            {/* Right: Contact Cards */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Contact options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <a
                        href="mailto:gymspayoga@gmail.com"
                        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                      >
                        gymspayoga@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+91 7596958097</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Support hours</p>
                      <p className="text-sm text-muted-foreground">Mon–Fri: 9 AM – 8 PM</p>
                      <p className="text-sm text-muted-foreground">Sat–Sun: 10 AM – 6 PM</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button asChild variant="secondary" className="w-full">
                      <a href="mailto:gymspayoga@gmail.com" aria-label="Email support now">
                        Email support now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Tip: Include booking IDs, screenshots, or exact error messages to help us resolve your issue faster.
                  </p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
};

export default Support;
