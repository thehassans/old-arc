/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#8b5cf6', // Violet 500
                secondary: '#06b6d4', // Cyan 500
                dark: '#0f172a', // Slate 900
                'dark-lighter': '#1e293b', // Slate 800
                light: '#f8fafc', // Slate 50
                'light-darker': '#e2e8f0', // Slate 200
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
