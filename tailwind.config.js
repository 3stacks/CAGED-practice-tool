/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            C: '#c62345',
            Db: '#009d86',
            D: '#e7792b',
            Eb: '#375998',
            E: '#efda22',
            F: '#9a287d',
            Gb: '#3aab47',
            G: '#de492a',
            Ab: '#008dc7',
            A: '#f3b229',
            Bb: '#753b83',
            B: '#9ec73d',
        }
      },
    },
    plugins: [],
  }