import { mod } from "./utils";
import { AllKeys, CAGED, Notes, Scales } from "./types";

// Chromatic scale using flats (for internal calculations)
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

// Enharmonic equivalents map
export const ENHARMONIC_MAP: Record<string, string> = {
  "C#": "Db",
  "Db": "C#",
  "D#": "Eb",
  "Eb": "D#",
  "E#": "F",
  "F": "E#",
  "F#": "Gb",
  "Gb": "F#",
  "G#": "Ab",
  "Ab": "G#",
  "A#": "Bb",
  "Bb": "A#",
  "B#": "C",
  "C": "B#",
  "Cb": "B",
  "B": "Cb",
};

// Check if two notes are enharmonically equivalent
export const isEnharmonicMatch = (a: string, b: string): boolean =>
  a === b || ENHARMONIC_MAP[a] === b;

// Get the index in chromatic scale (handles sharps by converting to flats)
export const getNoteIndex = (note: string): number => {
  const flatNote = ENHARMONIC_MAP[note] && note.includes("#")
    ? ENHARMONIC_MAP[note]
    : note;
  const index = NOTES.indexOf(flatNote as Notes);
  return index >= 0 ? index : NOTES.indexOf(ENHARMONIC_MAP[note] as Notes);
};

export const flattenScaleDegrees = (
  notes: (Notes | string)[],
  degrees: number[]
): Notes[] => {
  return notes.map((note, index) => {
    if (degrees.includes(index + 1)) {
      const noteIdx = getNoteIndex(note);
      return NOTES[mod(noteIdx - 1, NOTES.length)];
    }
    // Convert sharp to flat equivalent for consistency if not being flattened
    if (note.includes("#")) {
      return ENHARMONIC_MAP[note] as Notes;
    }
    return note as Notes;
  });
};

export const raiseScaleDegrees = (
  notes: (Notes | string)[],
  degrees: number[]
): Notes[] => {
  return notes.map((note, index) => {
    if (degrees.includes(index + 1)) {
      const noteIdx = getNoteIndex(note);
      return NOTES[mod(noteIdx + 1, NOTES.length)];
    }
    // Convert sharp to flat equivalent for consistency if not being raised
    if (note.includes("#")) {
      return ENHARMONIC_MAP[note] as Notes;
    }
    return note as Notes;
  });
};

export const converMajorScaleToMinor = (majorScale: (Notes | string)[]): string[] => {
  // Flatten the third, sixth, and seventh notes
  return majorScale.map((note, index) => {
    if (index === 2 || index === 5 || index === 6) {
      const noteIdx = getNoteIndex(note);
      return NOTES[mod(noteIdx - 1, NOTES.length)];
    }
    return note;
  });
};

// Major keys with correct enharmonic spelling
// Sharp keys (G, D, A, E, B) use sharps
// Flat keys (F, Bb, Eb, Ab, Db, Gb) use flats
export const MAJOR_KEYS: Record<string, (Notes | string)[]> = {
  // Natural key
  C: ["C", "D", "E", "F", "G", "A", "B"],
  // Sharp keys - use sharps
  G: ["G", "A", "B", "C", "D", "E", "F#"],
  D: ["D", "E", "F#", "G", "A", "B", "C#"],
  A: ["A", "B", "C#", "D", "E", "F#", "G#"],
  E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
  B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
  // Flat keys - use flats
  F: ["F", "G", "A", "Bb", "C", "D", "E"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  Gb: ["Gb", "Ab", "Bb", "B", "Db", "Eb", "F"], // Using B instead of Cb for simplicity
};

export const getScaleNotes = (key: Notes, scale: Scales): (Notes | null)[] => {
  if (!key) {
    return [];
  }

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
      return baseNotes.map((note, i) => ([4, 7].includes(i + 1) ? null : note));
    case "pentatonic_minor":
      return minorScaleNotes.map((note, i) =>
        [2, 6].includes(i + 1) ? null : note
      );
    case "harmonic_minor":
      // 1 2 b3 4 5 b6 7 - flatten 3 and 6 only
      return flattenScaleDegrees(baseNotes, [3, 6]);
    case "melodic_minor":
      // 1 2 b3 4 5 6 7 - flatten 3 only
      return flattenScaleDegrees(baseNotes, [3]);
    case "blues":
      // 1 b3 4 b5 5 b7 - special 6-note scale with chromatic b5
      const bluesBase = flattenScaleDegrees(baseNotes, [3, 7]);
      // Blues scale: root, b3, 4, b5, 5, b7 (positions 1, 3, 4, b5, 5, 7)
      // We'll return a 7-element array with nulls for unused degrees
      const fourth = bluesBase[3]; // 4th degree
      const fourthIndex = getNoteIndex(fourth as string);
      const flatFifth = NOTES[mod(fourthIndex + 1, 12)]; // b5 (tritone)
      return [
        bluesBase[0], // 1 (root)
        null,         // 2 (omitted)
        bluesBase[2], // b3
        fourth,       // 4
        flatFifth,    // b5 (blue note)
        baseNotes[4], // 5 (natural 5)
        bluesBase[6], // b7
      ];
    case "major":
    default:
      return baseNotes;
  }
};

export const KEY_CHORDS: Record<string, Record<string, string>> = {
  // Natural keys
  C: {
    I: "C",
    ii: "Dm",
    iii: "Em",
    IV: "F",
    V: "G",
    vi: "Am",
    "vii°": "Bdim",
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
  D: {
    I: "D",
    ii: "Em",
    iii: "F#m",
    IV: "G",
    V: "A",
    vi: "Bm",
    "vii°": "C#dim",
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
  E: {
    I: "E",
    ii: "F#m",
    iii: "G#m",
    IV: "A",
    V: "B",
    vi: "C#m",
    "vii°": "D#dim",
  },
  B: {
    I: "B",
    ii: "C#m",
    iii: "D#m",
    IV: "E",
    V: "F#",
    vi: "G#m",
    "vii°": "A#dim",
  },
  // Flat keys
  F: {
    I: "F",
    ii: "Gm",
    iii: "Am",
    IV: "Bb",
    V: "C",
    vi: "Dm",
    "vii°": "Edim",
  },
  Bb: {
    I: "Bb",
    ii: "Cm",
    iii: "Dm",
    IV: "Eb",
    V: "F",
    vi: "Gm",
    "vii°": "Adim",
  },
  Eb: {
    I: "Eb",
    ii: "Fm",
    iii: "Gm",
    IV: "Ab",
    V: "Bb",
    vi: "Cm",
    "vii°": "Ddim",
  },
  Ab: {
    I: "Ab",
    ii: "Bbm",
    iii: "Cm",
    IV: "Db",
    V: "Eb",
    vi: "Fm",
    "vii°": "Gdim",
  },
  Db: {
    I: "Db",
    ii: "Ebm",
    iii: "Fm",
    IV: "Gb",
    V: "Ab",
    vi: "Bbm",
    "vii°": "Cdim",
  },
  Gb: {
    I: "Gb",
    ii: "Abm",
    iii: "Bbm",
    IV: "B",
    V: "Db",
    vi: "Ebm",
    "vii°": "Fdim",
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
  "harmonic_minor",
  "melodic_minor",
  "blues",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "locrian",
];

// Get fret position range for any key (not just CAGED keys)
// Uses the C shape as reference and shifts based on semitone offset
export const getShapeFretRange = (
  key: AllKeys,
  shape: CAGED,
  isMinor: boolean
): [number, number] => {
  const keyIndex = getNoteIndex(key);
  const cIndex = getNoteIndex("C"); // C = 0

  // Calculate semitone offset from C
  const offset = mod(keyIndex - cIndex, 12);

  // Get the base range for C (or use original lookup for CAGED keys)
  const baseRanges = isMinor ? minorKeyShapeRootFretPositionRange : keyShapeRootFretPositionRange;

  // If it's a CAGED key, use original lookup
  if (CAGED_NOTES.includes(key as CAGED)) {
    return baseRanges[key as CAGED][shape];
  }

  // For non-CAGED keys, shift the C shape positions by the semitone offset
  const cRange = baseRanges.C[shape];
  const newStart = mod(cRange[0] + offset, 17);
  const newEnd = mod(cRange[1] + offset, 17);

  // Handle wrap-around (if end < start, it means we wrapped past fret 16)
  if (newEnd < newStart) {
    return [newStart, newEnd + 17];
  }

  return [newStart, newEnd];
};
