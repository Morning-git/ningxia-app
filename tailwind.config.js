/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          light: '#8BC34A',
          dark: '#388E3C'
        },
        ios: {
          background: '#F2F2F7',
          card: '#FFFFFF',
          separator: '#C6C6C8',
          label: '#000000',
          secondaryLabel: '#3C3C43',
          tertiaryLabel: '#3C3C4399',
          systemGreen: '#34C759',
          systemRed: '#FF3B30',
          systemBlue: '#007AFF',
          systemOrange: '#FF9500'
        }
      },
      fontSize: {
        'ios-title': ['17px', { lineHeight: '22px', fontWeight: '600' }],
        'ios-body': ['17px', { lineHeight: '22px', fontWeight: '400' }],
        'ios-caption': ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'ios-footnote': ['13px', { lineHeight: '18px', fontWeight: '400' }]
      },
      spacing: {
        'ios-xs': '4px',
        'ios-sm': '8px',
        'ios-md': '16px',
        'ios-lg': '24px',
        'ios-xl': '32px'
      },
      borderRadius: {
        'ios': '10px',
        'ios-lg': '14px',
        'ios-xl': '20px'
      },
      boxShadow: {
        'ios': '0 1px 3px rgba(0,0,0,0.1)',
        'ios-lg': '0 4px 12px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
}
