/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'danblab-background': "url('src/assets/images/danblab_logo.png')",
      }
    },
  },
  plugins: [],
}
