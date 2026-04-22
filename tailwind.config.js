/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand:   '#111827',   // gray-900 — primary dark header
        surface: '#1f2937',   // gray-800 — sub-headers, footers
        accent:  '#dc2626',   // red-600  — live badge, borders, links
        muted:   '#6b7280',   // gray-500
        // legacy names kept so old classes don't break
        cricketGreen: '#dc2626',
        cricketDark:  '#111827',
        cricketRed:   '#dc2626',
        cricketYellow:'#f59e0b',
        cricketNavy:  '#1e3a5f',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
