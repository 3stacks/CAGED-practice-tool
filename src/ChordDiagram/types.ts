import type { CAGED } from "../types";

export interface ChordVoicing {
  frets: (number | "x")[];  // Per-string fret numbers (low E to high E)
  fingers: (0 | 1 | 2 | 3 | 4)[];  // Finger assignments (0 = open/not played)
  barrePosition?: number;  // Fret number for barre
  barreStrings?: [number, number];  // Which strings the barre covers [start, end]
  baseFret?: number;  // For shapes higher up the neck
}

export type CAGEDChordShapes = Record<CAGED, ChordVoicing>;
