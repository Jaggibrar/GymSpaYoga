
interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
}

const PageHero = ({ title, subtitle, description, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative h-96 overflow-hidden">
      <img 
        src={backgroundImage}
        alt={`${title} background`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight">
            {title}
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-4 md:mb-6">
            {subtitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
