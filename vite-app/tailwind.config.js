/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Zen Maru Gothic"', 'sans-serif'],
        'pop': ['"Mochiy Pop One"', 'sans-serif'],
        'hand': ['"Yomogi"', 'cursive'],
      },
      animation: {
        'purupuru': 'purupuru 2s infinite',
        'stampIn': 'stampIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'modalPop': 'modalPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'floatUp': 'floatUp linear infinite',
        'slideUp': 'slideUp 0.5s ease-out forwards',
        'twinkle': 'twinkle 3s infinite ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-top': 'slideInTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
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
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
        'bounce-in': {
          '0%': { transform: 'translate(-50%, 20px)', opacity: '0' },
          '60%': { transform: 'translate(-50%, -10px)', opacity: '1' },
          '100%': { transform: 'translate(-50%, 0)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
