interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  colorScheme?: 'trainers' | 'yoga' | 'gyms' | 'spas' | 'default';
}

const PageHero = ({ title, subtitle, description, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative h-[50vh] md:h-96 overflow-hidden">
      <img 
        src={backgroundImage}
        alt={`${title} background`}
        className="w-full h-full object-cover"
        style={{ objectPosition: 'center 40%' }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-[#0A45FF]/30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-4 leading-tight drop-shadow-2xl">
            {title}
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 drop-shadow-2xl">
            {subtitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
