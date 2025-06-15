import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        background: "#000000",
        text: "#FFFFFF",
        supaGreen: "#3ECF8E",
        primary: {
          DEFAULT: "#3ECF8E",
          foreground: "#000000"
        },
        secondary: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "#222222",
          foreground: "#fff"
        },
        card: {
          DEFAULT: "#101113",
          foreground: "#fff"
        },
        accent: {
          DEFAULT: "#181F1B",
          foreground: "#fff"
        },
        border: "#262626",
        ring: "#3ECF8E"
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px"
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
