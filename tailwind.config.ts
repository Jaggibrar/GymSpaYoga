
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
  			sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  			display: ['Playfair Display', 'Lora', 'ui-serif', 'Georgia', 'serif'],
  			serif: ['Lora', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
  			mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace']
  		},
  		colors: {
  			brand: {
  				'50': '#FFF8ED',
  				'100': '#FFF0D4',
  				'200': '#FFDDA8',
  				'300': '#FFC56E',
  				'400': '#F5A623',
  				'500': '#E8960E',
  				'600': '#CC7A08',
  				'700': '#A95D0B',
  				'800': '#8A4A11',
  				'900': '#6F3B12'
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
  				'50': '#F5F5F6',
  				'100': '#E6E7E9',
  				'200': '#CED0D5',
  				'300': '#A9ACB5',
  				'400': '#7D818E',
  				'500': '#5C6070',
  				'600': '#474B58',
  				'700': '#3A3D48',
  				'800': '#272D35',
  				'900': '#1A1E24'
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
  			xl: ['20px', { lineHeight: '32px' }],
  			'2xl': ['24px', { lineHeight: '36px' }],
  			'3xl': ['30px', { lineHeight: '40px' }],
  			'4xl': ['36px', { lineHeight: '44px' }],
  			'5xl': ['48px', { lineHeight: '56px' }]
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
  			soft: '0 2px 8px rgba(30, 20, 10, 0.06)',
  			medium: '0 4px 16px rgba(30, 20, 10, 0.08)',
  			strong: '0 8px 24px rgba(30, 20, 10, 0.1)',
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.4s ease-out',
  			'slide-up': 'slideUp 0.3s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': { opacity: '0', transform: 'translateY(8px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			slideUp: {
  				'0%': { opacity: '0', transform: 'translateY(16px)' },
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
