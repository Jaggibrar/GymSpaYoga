import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1280px' }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        num: ['Space Grotesk', 'ui-monospace', 'monospace'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['SF Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      colors: {
        brand: {
          '50': '#EAF4F1', '100': '#CFE7E0', '200': '#A2D0C4', '300': '#6FB4A3',
          '400': '#3E9382', '500': '#0B6B57', '600': '#0A5D4C', '700': '#094B3E',
          '800': '#083B32', '900': '#0A2F2A'
        },
        gold: {
          DEFAULT: 'hsl(var(--gold))',
          foreground: 'hsl(var(--gold-foreground))',
          '400': '#F0D48F', '500': '#E8C36A', '600': '#D4A945'
        },
        mint: { DEFAULT: 'hsl(var(--mint))', '400': '#6BEFD3', '500': '#3DE6C3' },
        coral: { DEFAULT: 'hsl(var(--coral))', '500': '#FF7A59' },
        sand: { DEFAULT: '#F8F6F1', '50': '#FDFCFA', '100': '#F8F6F1', '200': '#EFEBE1' },
        emerald: {
          '400': '#3E9382', '500': '#0B6B57', '600': '#0A5D4C'
        },
        charcoal: {
          '50': '#F8F8F6', '100': '#F1F1EE', '200': '#E4E4DF', '300': '#CFCFC8',
          '400': '#A3A39B', '500': '#6F6F6F', '600': '#4A4A4A',
          '700': '#2E2E2E', '800': '#1A1A1A', '900': '#0A2F2A', '950': '#071F1C'
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          glow: 'hsl(var(--primary-glow))',
          deep: 'hsl(var(--primary-deep))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '52px' }],
        '6xl': ['64px', { lineHeight: '66px' }],
        '7xl': ['80px', { lineHeight: '82px' }],
        '8xl': ['96px', { lineHeight: '98px' }]
      },
      spacing: { '18': '4.5rem', '88': '22rem' },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      boxShadow: {
        soft: 'var(--shadow-sm)',
        medium: 'var(--shadow)',
        strong: 'var(--shadow-lg)',
        emerald: 'var(--shadow-emerald)',
        gold: 'var(--shadow-gold)',
        '2xs': 'var(--shadow-2xs)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.5s ease-out both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 30s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { transform: 'translateY(12px)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(28px)' },
          '100%': { transform: 'translateY(0)' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
          '50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'accordion-down': {
          from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
