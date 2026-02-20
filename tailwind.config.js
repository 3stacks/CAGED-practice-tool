/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        screens: {
          'xs': '375px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
        },
        colors: {
            C: '#c62345',
            'C-sharp': '#009d86', // Same as Db (enharmonic)
            Db: '#009d86',
            D: '#e7792b',
            'D-sharp': '#375998', // Same as Eb (enharmonic)
            Eb: '#375998',
            E: '#efda22',
            F: '#9a287d',
            'F-sharp': '#3aab47', // Same as Gb (enharmonic)
            Gb: '#3aab47',
            G: '#de492a',
            'G-sharp': '#008dc7', // Same as Ab (enharmonic)
            Ab: '#008dc7',
            A: '#f3b229',
            'A-sharp': '#753b83', // Same as Bb (enharmonic)
            Bb: '#753b83',
            B: '#9ec73d',
        }
      },
    },
    plugins: [],
  }