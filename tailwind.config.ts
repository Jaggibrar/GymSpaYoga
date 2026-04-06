
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
  		screens: {
  			'2xl': '1280px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			display: ['Space Grotesk', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
  			mono: ['SF Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
  		},
  		colors: {
  			brand: {
  				'50': '#EBF5FF',
  				'100': '#D6EBFF',
  				'200': '#ADD6FF',
  				'300': '#85C1FF',
  				'400': '#4A9EF5',
  				'500': '#1877F2',
  				'600': '#1565D8',
  				'700': '#1054B8',
  				'800': '#0D4296',
  				'900': '#0A326F'
  			},
  			warm: {
  				'50': '#FDFBF7',
  				'100': '#FAF5ED',
  				'200': '#F3EAD8',
  				'300': '#E8D5B5',
  				'400': '#D4B88A',
  				'500': '#B8956A',
  				'600': '#9A7550',
  				'700': '#7D5C3D',
  				'800': '#5E4430',
  				'900': '#3D2C20'
  			},
  			charcoal: {
  				'50': '#F8FAFC',
  				'100': '#F1F5F9',
  				'200': '#E2E8F0',
  				'300': '#CBD5E1',
  				'400': '#94A3B8',
  				'500': '#64748B',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1E293B',
  				'900': '#0F172A'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  			'5xl': ['48px', { lineHeight: '48px' }],
  			'6xl': ['60px', { lineHeight: '60px' }]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			soft: 'var(--shadow-sm)',
  			medium: 'var(--shadow)',
  			strong: 'var(--shadow-lg)',
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-out',
  			'slide-up': 'slideUp 0.4s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': { opacity: '0', transform: 'translateY(12px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			slideUp: {
  				'0%': { opacity: '0', transform: 'translateY(20px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
