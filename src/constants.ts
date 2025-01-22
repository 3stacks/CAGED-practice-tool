import { CAGED } from "./types";

export const majorKeys = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  A: ["A", "B", "Db", "D", "E", "Gb", "Ab"],
  G: ["G", "A", "B", "C", "D", "E", "Gb"],
  E: ["E", "Gb", "Ab", "A", "B", "Db", "Eb"],
  D: ["D", "E", "Gb", "G", "A", "B", "Db"],
};

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

export const keyShapeRootFretPositionRange: Record<
  CAGED,
  Record<CAGED, [number, number]>
> = {
  C: {
    C: [0, 3],
    A: [2, 6],
    G: [4, 8],
    E: [7, 10],
    D: [9, 13],
  },
  A: {
    A: [0, 4],
    G: [1, 5],
    E: [4, 7],
    D: [6, 10],
    C: [9, 12],
  },
  G: {
    G: [0, 3],
    E: [2, 5],
    D: [5, 8],
    C: [7, 10],
    A: [9, 13],
  },
  E: {
    E: [0, 2],
    D: [1, 5],
    C: [4, 7],
    A: [6, 10],
    G: [8, 12],
  },
  D: {
    D: [0, 3],
    C: [2, 5],
    A: [4, 8],
    G: [6, 10],
    E: [9, 12],
  },
};
