/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        transparentx: "rgba(255, 255, 255, 0.10)", // Exemplo de cor personalizada em RGB
      },
      screens: {
        sm: "240px", // Defina o breakpoint personalizado
      },
    },
  },
  plugins: [],
};
