import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        primary: '#2BD17E',
        error: '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39',
        'card-hover': '#1E414E',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'heading-one': ['64px', '80px'],
        'heading-two': ['48px', '56px'],
        'heading-three': ['32px', '40px'],
        'heading-four': ['24px', '32px'],
        'heading-five': ['20px', '24px'],
        'heading-six': ['16px', '24px'],
        'body-large': ['20px', '32px'],
        'body-regular': ['16px', '24px'],
        'body-small': ['14px', '24px'],
        'body-extra-small': ['12px', '24px'],
        caption: ['14px', '16px'],
      },
      fontWeight: {
        regular: '400',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '120': '120px',
        '160': '160px',
      },
      maxWidth: {
        '1440': '1440px',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
