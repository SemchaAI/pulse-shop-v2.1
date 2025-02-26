import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      darkMode: ['selector', '[data-mode="dark"]'],
      colors: {
        // Background Colors
        background: 'var(--background)',
        // Foreground Colors
        foreground: 'var(--foreground)',
        //Action Colors
        'action-disabled': 'var(--action-disabled)',
        'action-disabled-bg': 'var(--action-disabled-bg)',
        // Primary Colors
        primary: 'var(--primary)',
        'primary-action': 'var(--primary-action)',
        // Secondary Colors
        secondary: 'var(--secondary)',
        'black-01': 'var(--black-01)',
        'black-02': 'var(--black-02)',

        // Feedback Colors
        error: 'var(--error)',
        warning: 'var(--warning)',
        success: 'var(--success)',

        // Border Colors
        border: 'var(--border)',

        // Text Colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-highlight': 'var(--text-highlight)',
        'text-error': 'var(--text-error)',
        'text-warning': 'var(--text-warning)',
        'text-success': 'var(--text-success)',
      },
      maxWidth: {
        'custom-xl': '1440px', //87.5rem
      },
      padding: {
        // 'custom-lg': '5rem', // Example custom padding
        // 'custom-sm': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default fallback
        nunito: ['Nunito', 'sans-serif'], // Add custom fonts
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
