import { mod } from "./Note/utils";
import { CAGED, Notes, Scales } from "./types";

export const NOTES: Notes[] = [
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

export const flattenScaleDegrees = (
  notes: Notes[],
  degrees: number[]
): Notes[] => {
  return notes.map((note, index) => {
    if (degrees.includes(index + 1)) {
      return NOTES[mod(NOTES.indexOf(note) - 1, NOTES.length)];
    }

    return note;
  });
};

export const raiseScaleDegrees = (
  notes: Notes[],
  degrees: number[]
): Notes[] => {
  return notes.map((note, index) => {
    if (degrees.includes(index + 1)) {
      return NOTES[mod(NOTES.indexOf(note) + 1, NOTES.length)];
    }

    return note;
  });
};

export const converMajorScaleToMinor = (majorScale: Notes[]): string[] => {
  // Flatten the third, sixth, and seventh notes
  return majorScale.map((note, index) => {
    if (index === 2 || index === 5 || index === 6) {
      return NOTES[mod(NOTES.indexOf(note) - 1, NOTES.length)];
    }

    return note;
  });
};

export const MAJOR_KEYS: Record<Notes, Notes[]> = {
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

export const MINOR_KEYS: Record<keyof typeof MAJOR_KEYS, Notes[]> =
  Object.entries(MAJOR_KEYS).reduce((acc, [key, notes]) => {
    return {
      ...acc,
      [key]: flattenScaleDegrees(notes, [3, 6, 7]),
    };
  }, MAJOR_KEYS);

export const getScaleNotes = (key: Notes, scale: Scales): Notes[] => {
  const baseNotes = MAJOR_KEYS[key];
  const minorScaleNotes = flattenScaleDegrees(baseNotes, [3, 6, 7]);

  switch (scale) {
    case "dorian":
      return flattenScaleDegrees(baseNotes, [3, 7]);
    case "phrygian":
      return flattenScaleDegrees(baseNotes, [2, 3, 6, 7]);
    case "lydian":
      return raiseScaleDegrees(baseNotes, [4]);
    case "mixolydian":
      return flattenScaleDegrees(baseNotes, [7]);
    case "natural_minor":
      return minorScaleNotes;
    case "locrian":
      return flattenScaleDegrees(baseNotes, [2, 3, 5, 6, 7]);
    case "pentatonic_major":
      return baseNotes.filter((_, i) => ![4, 7].includes(i + 1));
    case "pentatonic_minor":
      return minorScaleNotes.filter((_, i) => ![2, 6].includes(i + 1));
    case "major":
    default:
      return baseNotes;
  }
};

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

export const SCALES: Scales[] = [
  "major",
  "pentatonic_major",
  "natural_minor",
  "pentatonic_minor",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "locrian",
];
