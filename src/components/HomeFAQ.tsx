import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const faqs = [
  {
    q: 'How do I find the best gym, spa or yoga studio near me?',
    a: 'Use GymSpaYoga\'s smart search to discover verified gyms, luxury spas and yoga studios in 200+ cities worldwide. Filter by price, ratings, amenities, distance and category to find your perfect wellness match in seconds.',
  },
  {
    q: 'Is booking a gym, spa or yoga class on GymSpaYoga free?',
    a: 'Yes — searching, comparing and booking is 100% free for users. You only pay the business directly for the service you choose. There are no hidden fees, and most listings offer flexible cancellation.',
  },
  {
    q: 'Are the gyms, spas and trainers on GymSpaYoga verified?',
    a: 'Every business and trainer on our platform is manually verified for credentials, location, and quality. We only feature trusted gyms, certified yoga instructors, professional therapists and licensed chiropractors.',
  },
  {
    q: 'Can I book a personal trainer at home?',
    a: 'Absolutely. Many of our certified personal trainers offer at-home and online training sessions in addition to gym-based programs. Filter by "home training" on the trainers page.',
  },
  {
    q: 'What types of yoga classes are available?',
    a: 'You\'ll find Hatha, Vinyasa, Ashtanga, Power Yoga, Hot Yoga, Prenatal Yoga, Aerial Yoga and meditation classes — for beginners to advanced practitioners.',
  },
  {
    q: 'How do spa packages and pricing work?',
    a: 'Spa pricing is set by each business. You can compare packages — Swedish massage, deep tissue, Ayurvedic, Thai, couples spa, aromatherapy, facials — and read verified reviews before booking.',
  },
  {
    q: 'Can I list my gym, spa or yoga studio on GymSpaYoga?',
    a: 'Yes! Business owners can register for free and reach thousands of wellness seekers. Visit our "Register Business" page to create a professional listing in minutes.',
  },
  {
    q: 'Do you offer wellness services internationally?',
    a: 'Yes — GymSpaYoga is available in 200+ cities across 40+ countries including the USA, UK, UAE, Canada, Australia, Singapore, Thailand, Indonesia and more.',
  },
];

const HomeFAQ = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="py-16 md:py-20 bg-accent/30">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-3">
                <HelpCircle className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Everything You Need to Know
              </h2>
              <p className="text-muted-foreground">
                Common questions about booking gyms, spas, yoga and trainers on GymSpaYoga.
              </p>
            </div>
          </ScrollReveal>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/30 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
