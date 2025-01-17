import { CAGED } from "./types";

export const NOTES = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export const KEY_CHORDS = {
  C: {
    I: "C",
    ii: "Dm",
    iii: "Em",
    IV: "F",
    V: "G",
    vi: "Am",
    "vii°": "Bdim",
  },
  A: {
    I: "A",
    ii: "Bm",
    iii: "C#m",
    IV: "D",
    V: "E",
    vi: "F#m",
    "vii°": "G#dim",
  },
  G: {
    I: "G",
    ii: "Am",
    iii: "Bm",
    IV: "C",
    V: "D",
    vi: "Em",
    "vii°": "F#dim",
  },
  E: {
    I: "E",
    ii: "F#m",
    iii: "G#m",
    IV: "A",
    V: "B",
    vi: "C#m",
    "vii°": "D#dim",
  },
  D: {
    I: "D",
    ii: "Em",
    iii: "F#m",
    IV: "G",
    V: "A",
    vi: "Bm",
    "vii°": "C#dim",
  },
};

export const CAGED_NOTES: CAGED[] = ["C", "A", "G", "E", "D"];
