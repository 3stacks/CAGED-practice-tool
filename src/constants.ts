import { mod } from "./Note/utils";
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

export const converMajorScaleToMinor = (majorScale: string[]): string[] => {
  // Flatten the third, sixth, and seventh notes
  return majorScale.map((note, index) => {
    if (index === 2 || index === 5 || index === 6) {
      return NOTES[mod(NOTES.indexOf(note) - 1, NOTES.length)];
    }

    return note;
  });
};

export const MAJOR_KEYS = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  D: ["D", "E", "Gb", "G", "A", "B", "Db"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  E: ["E", "Gb", "Ab", "A", "B", "Db", "Eb"],
  F: ["F", "G", "A", "Bb", "C", "D", "E"],
  Gb: ["Gb", "Ab", "Bb", "B", "Db", "Eb", "F"],
  G: ["G", "A", "B", "C", "D", "E", "Gb"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  A: ["A", "B", "Db", "D", "E", "Gb", "Ab"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  B: ["B", "Db", "Eb", "E", "Gb", "Ab", "Bb"],
};

export const MINOR_KEYS: Record<keyof typeof MAJOR_KEYS, string[]> =
  Object.entries(MAJOR_KEYS).reduce((acc, [key, notes]) => {
    return {
      ...acc,
      [key]: converMajorScaleToMinor(notes),
    };
  }, MAJOR_KEYS);

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
    C: [12, 15],
    A: [2, 6],
    G: [4, 8],
    E: [7, 10],
    D: [9, 13],
  },
  A: {
    A: [11, 15],
    G: [1, 5],
    E: [4, 7],
    D: [6, 10],
    C: [9, 12],
  },
  G: {
    G: [11, 15],
    E: [2, 5],
    D: [5, 8],
    C: [7, 10],
    A: [9, 13],
  },
  E: {
    E: [11, 14],
    D: [1, 5],
    C: [4, 7],
    A: [6, 10],
    G: [8, 12],
  },
  D: {
    D: [11, 15],
    C: [2, 5],
    A: [4, 8],
    G: [6, 10],
    E: [9, 12],
  },
};

export const minorKeyShapeRootFretPositionRange: Record<
  CAGED,
  Record<CAGED, [number, number]>
> = {
  C: {
    ...keyShapeRootFretPositionRange.C,
    C: [12, 16],
    G: [5, 9],
    E: [7, 11],
    D: [10, 13],
  },
  A: {
    ...keyShapeRootFretPositionRange.A,
    G: [2, 6],
    E: [4, 8],
    D: [7, 10],
    C: [9, 13],
  },
  G: {
    ...keyShapeRootFretPositionRange.G,
    G: [12, 16],
    E: [2, 6],
    C: [7, 11],
  },
  E: {
    ...keyShapeRootFretPositionRange.E,
    D: [2, 5],
    C: [4, 8],
    G: [9, 13],
    E: [11, 15],
  },
  D: {
    ...keyShapeRootFretPositionRange.D,
    D: [12, 15],
    G: [7, 11],
    E: [9, 13],
  },
};
