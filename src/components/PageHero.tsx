interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  colorScheme?: 'trainers' | 'yoga' | 'gyms' | 'spas' | 'default';
}

const PageHero = ({ title, subtitle, description, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative h-[50vh] md:h-[420px] overflow-hidden">
      <img
        src={backgroundImage}
        alt={`${title} background`}
        className="w-full h-full object-cover scale-105"
        style={{ objectPosition: 'center 40%' }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        sizes="100vw"
      />
      {/* Cinematic gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <div className="text-center max-w-4xl animate-fade-in">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs uppercase tracking-[0.2em] glass-card text-primary border-primary/30">
            {subtitle}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
