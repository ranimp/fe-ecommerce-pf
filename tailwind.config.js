module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'B5C5F2' : "#B5C5F2",
        '3F70F9' : "#3F70F9",
        '4C79F9' : "rgba(76, 121, 249, 0.71)",
        '69BAEC' : "#69BAEC",
      },
      boxShadow : {
        '3xl' : "0 15px 15px -15px rgba(0, 0, 0, 0.5)",
      },
      fontFamily : {
        'poppins' : ['poppins']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
