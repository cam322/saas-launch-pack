module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#eef2ff',
          200: '#e0f2fe',
          300: '#bae6fd',
          400: '#7dd3fc',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#7c3aed',
          800: '#075985',
          DEFAULT: '#7c3aed',
          cyan: '#06b6d4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
