import { defineConfig } from "tailwindcss";

export default defineConfig({
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: ["text-blue-500", "text-yellow-500", "text-orange-500", "text-green-500"],
    theme: {
        extend: {
            colors: {
                bg: "var(--color-bg)",
                border: "var(--color-border)",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
});
