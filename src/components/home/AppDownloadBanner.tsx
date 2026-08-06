import React from 'react';
import { Apple, Play, QrCode, Smartphone } from 'lucide-react';

const AppDownloadBanner: React.FC = () => (
  <section
    aria-labelledby="app-heading"
    className="relative overflow-hidden rounded-[32px] bg-[hsl(172_65%_11%)] px-6 py-10 sm:px-12 sm:py-14"
  >
    <div
      className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-mint/10 blur-3xl"
      aria-hidden
    />
    <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
      <div className="max-w-lg">
        <span className="pill glass-dark !px-3 !py-1 text-[11px] font-semibold text-white">
          <Smartphone className="h-3 w-3 text-mint" /> Mobile App
        </span>
        <h2 id="app-heading" className="mt-4 font-display text-3xl sm:text-4xl font-extrabold leading-tight text-white">
          Download the GymSpaYoga App
        </h2>
        <p className="mt-3 text-sm text-white/70">
          Your wellness journey in your pocket — discover, book and track everything in one place.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-charcoal-800 transition hover:-translate-y-0.5"
            aria-label="Download on the App Store"
          >
            <Apple className="h-6 w-6" />
            <span className="text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-wide text-charcoal-500">Download on the</span>
              <span className="block text-sm font-semibold">App Store</span>
            </span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-charcoal-800 transition hover:-translate-y-0.5"
            aria-label="Get it on Google Play"
          >
            <Play className="h-6 w-6 fill-current" />
            <span className="text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-wide text-charcoal-500">Get it on</span>
              <span className="block text-sm font-semibold">Google Play</span>
            </span>
          </a>
          <div className="grid h-[68px] w-[68px] place-items-center rounded-2xl bg-white" aria-label="QR code to download the app">
            <QrCode className="h-12 w-12 text-charcoal-800" />
          </div>
        </div>
      </div>

      {/* Phone mockup */}
      <div className="relative mx-auto hidden w-[220px] lg:block">
        <div className="rotate-[-6deg] rounded-[36px] border-[6px] border-white/15 bg-charcoal-950 p-2 shadow-2xl transition-transform duration-700 hover:rotate-0">
          <div className="overflow-hidden rounded-[28px]">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
              alt="GymSpaYoga app preview"
              loading="lazy"
              className="h-[400px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AppDownloadBanner;
