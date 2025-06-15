import React from 'react';
import "@/styles/themeStyles.css";

interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  colorScheme?: 'trainers' | 'yoga' | 'gyms' | 'spas' | 'default';
}

const PageHero = ({
  title,
  subtitle,
  description,
  backgroundImage,
}: PageHeroProps) => {
  return (
    <section className="relative h-96 overflow-hidden">
      <img src={backgroundImage} alt={`${title} background`} className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0" style={{ background: 'var(--gyms-payoga-gradient-dark)', opacity: 0.9 }} />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[var(--gyms-payoga-text-glow)] mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-[#3ECF8E] via-[#106EBE] to-[#0FFCBE] bg-clip-text text-transparent animate-pulse">
              {title}
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 drop-shadow-2xl text-white">
            <span className="bg-gradient-to-r from-[#3ECF8E] to-[#106EBE] bg-clip-text text-transparent">
              {subtitle}
            </span>
          </h2>
          <p className="text-base md:text-xl font-semibold text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
