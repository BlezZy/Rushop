/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kolory główne
        white: "#FFFFFF", // Dla kart i innych białych elementów
        lightPink: "#FEE7E6", // Jasny różowy dla akcentów i hoverów
        black: "#000000", // Tekst, przyciski
        gray: "#F3F4F6", // Tło sekcji lub kart
        red: "#E63946", // Czerwony dla stanu "Sold out"
        textGray: "#666666", // Neutralny szary dla opisu

        // Dodatkowe kolory
        darkPink: "#FFB6C1", // Ciemniejszy różowy (do gradientów)
        gold: "#FFD700", // Złoty dla akcentów
        darkGray: "#4A4A4A", // Ciemniejszy szary
        inkBlue: "#1B1F3B", // Głęboki atramentowy kolor
        purple: "#8A2BE2", // Fioletowy do wyróżnień
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"], // Nagłówki
        secondary: ["Roboto", "sans-serif"], // Treść
      },
      fontSize: {
        xl: "48px", // Duże nagłówki (np. H1)
        lg: "32px", // Nagłówki sekcji (np. H2)
        md: "18px", // Treść (np. opisy produktów)
        sm: "16px", // Drobniejsze teksty
        button: "18px", // Przycisk
      },
      borderRadius: {
        card: "10px", // Zaokrąglone rogi kart
        button: "6px", // Zaokrąglone rogi przycisków
      },
      boxShadow: {
        card: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Cień dla kart
      },
      spacing: {
        cardPadding: "20px", // Padding wewnętrzny kart
        buttonPadding: "12px 24px", // Padding dla przycisków
      },
      transitionDuration: {
        DEFAULT: "300ms", // Domyślny czas przejścia
      },
    },
  },
  plugins: [],
};
