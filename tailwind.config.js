/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a5f',
        secondary: '#4a6fa5',
        accent: '#e67e22',
        surface: '#f8f9fa',
        navy: '#1e3a5f',
        steel: '#4a6fa5',
        orange: '#e67e22',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Arial', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'metallic': 'linear-gradient(135deg, #e8e8e8 0%, #d4d4d4 25%, #f0f0f0 50%, #c8c8c8 75%, #e8e8e8 100%)',
      },
    },
  },
  plugins: [],
}