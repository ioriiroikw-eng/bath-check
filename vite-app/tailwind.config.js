/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pop': ['"Mochiy Pop One"', 'sans-serif'],
        'hand': ['"Yomogi"', 'cursive'],
      },
      animation: {
        'purupuru': 'purupuru 2s infinite',
        'stampIn': 'stampIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'modalPop': 'modalPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'floatUp': 'floatUp linear infinite',
        'slideUp': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        purupuru: {
          '0%, 50%': { transform: 'scale(1, 1)' },
          '10%': { transform: 'scale(1.02, 0.98)' },
          '40%': { transform: 'scale(0.98, 1.02)' },
        },
        stampIn: {
          '0%': { opacity: '0', transform: 'scale(2) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(0.8)' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        modalPop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        floatUp: {
            '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
            '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
        },
        slideUp: {
            'from': { transform: 'translateY(100%)' },
            'to': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
