/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'input-field-color': 'rgba(242, 243, 244, 1)',
        'input-field-border': '#C0C0C0',
        'arrow-color': '#abb2b9',
        'error-color': '#e91e63',
        'button-color': '#f7971e',
        'header-color': '#fff',
        'top-container': 'linear-gradient(to right, #ffb75e, #ed8f03)',
        'spare-blue': '#29b6f6',
        'body-bg': '#f2f3f4',
        'box-shadow': '#c7c7c7',
        'box-shadow-light':'rgba(15, 15, 15, 0.2)',
        'form-background':'rgba( 234, 236, 238 , 0.7)',
        'custom-background':'rgba(207, 207, 207, 0.08)',
        'custom-background-shadow':'rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth:{
        '1': '1px'
      }
    },
  },
  plugins: [],
}

