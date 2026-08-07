import React from 'react';

interface CategoryHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/**
 * Neo Wellness Luxury category hero — cinematic image, soft emerald wash,
 * glass eyebrow pill and generous editorial spacing.
 */
const CategoryHero: React.FC<CategoryHeroProps> = ({ eyebrow, title, description, image, imageAlt }) => (
  <section className="relative overflow-hidden h-[340px] md:h-[460px]">
    <img
      src={image}
      alt={imageAlt}
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
    <div className="absolute inset-0 bg-gradient-hero" aria-hidden />

    <div className="relative container-modern h-full flex flex-col items-center justify-center text-center">
      <span className="pill glass-dark !px-4 !py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 animate-fade-in">
        {eyebrow}
      </span>
      <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold text-white leading-[1.05] max-w-3xl animate-slide-up">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed animate-slide-up">
        {description}
      </p>
    </div>
  </section>
);

export default CategoryHero;
