/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
        colors: {
            'test-color': '#ff0000',
         },
        animation: {
            'expand': 'expand 0.3s ease-out',
            'collapse': 'collapse 0.3s ease-in',
        },
        keyframes: {
            expand: {
                '0%': { 
                maxHeight: '0',
                opacity: '0',
                transform: 'translateY(-10px)'
                },
                '100%': { 
                maxHeight: '10rem',
                opacity: '1',
                transform: 'translateY(0)'
                },
            },
            collapse: {
                '0%': { 
                maxHeight: '10rem',
                opacity: '1',
                transform: 'translateY(0)'
                },
                '100%': { 
                maxHeight: '0',
                opacity: '0',
                transform: 'translateY(-10px)'
                },
            },
        }
      },
    },
  plugins: [],
};