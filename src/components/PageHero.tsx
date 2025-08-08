
interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  colorScheme?: 'trainers' | 'yoga' | 'gyms' | 'spas' | 'default';
}

const PageHero = ({ title, subtitle, description, backgroundImage, colorScheme = 'default' }: PageHeroProps) => {
  const getColorScheme = () => {
    switch (colorScheme) {
      case 'trainers':
        return {
          background: 'linear-gradient(135deg, #E9F1FA 0%, #00ABE4 100%)',
          titleColor: 'from-[#00ABE4] via-white to-[#00ABE4]',
          subtitleColor: 'from-[#E9F1FA] via-white to-[#E9F1FA]',
          descriptionColor: 'from-white via-[#E9F1FA] to-white'
        };
      case 'yoga':
        return {
          background: 'linear-gradient(135deg, #009B4D 0%, #FFCC00 50%, #FAF5E9 100%)',
          titleColor: 'from-white via-[#FAF5E9] to-white',
          subtitleColor: 'from-[#FFCC00] via-[#FAF5E9] to-[#FFCC00]',
          descriptionColor: 'from-[#FAF5E9] via-white to-[#FAF5E9]'
        };
      case 'gyms':
        return {
          background: 'linear-gradient(135deg, #B4121B 0%, #000000 100%)',
          titleColor: 'from-white via-red-100 to-white',
          subtitleColor: 'from-red-300 via-white to-red-300',
          descriptionColor: 'from-white via-red-100 to-white'
        };
      case 'spas':
        return {
          background: 'linear-gradient(135deg, #96C2DB 0%, #E5EDF1 50%, #FFFFFF 100%)',
          titleColor: 'from-[#96C2DB] via-white to-[#96C2DB]',
          subtitleColor: 'from-[#E5EDF1] via-[#96C2DB] to-[#E5EDF1]',
          descriptionColor: 'from-[#96C2DB] via-white to-[#96C2DB]'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #106EBE 0%, #0FFCBE 100%)',
          titleColor: 'from-white via-blue-100 to-white',
          subtitleColor: 'from-emerald-300 via-cyan-300 to-emerald-300',
          descriptionColor: 'from-yellow-200 via-white to-yellow-200'
        };
    }
  };

  const colors = getColorScheme();

  return (
    <section className="relative h-96 overflow-hidden">
      <img 
        src={backgroundImage}
        alt={`${title} background`}
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div 
        className="absolute inset-0 opacity-80"
        style={{ background: colors.background }}
      ></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-4 leading-tight drop-shadow-2xl">
            <span className={`bg-gradient-to-r ${colors.titleColor} bg-clip-text text-transparent animate-pulse`}>
              {title}
            </span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 drop-shadow-2xl">
            <span className={`bg-gradient-to-r ${colors.subtitleColor} bg-clip-text text-transparent`}>
              {subtitle}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            <span className={`bg-gradient-to-r ${colors.descriptionColor} bg-clip-text text-transparent`}>
              {description}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
