import type { CAGEDChordShapes } from "./types";

// Major chord voicings for each CAGED shape
// Frets array: [low E, A, D, G, B, high E]
// Fingers: 1=index, 2=middle, 3=ring, 4=pinky, 0=open or muted
export const CAGED_MAJOR_SHAPES: CAGEDChordShapes = {
  C: {
    frets: ["x", 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
  },
  A: {
    frets: ["x", 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
  },
  G: {
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
  },
  E: {
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
  },
  D: {
    frets: ["x", "x", 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
  },
};

// Minor chord voicings for each CAGED shape
export const CAGED_MINOR_SHAPES: CAGEDChordShapes = {
  C: {
    frets: ["x", 3, 1, 0, 1, 0],
    fingers: [0, 3, 1, 0, 2, 0],
  },
  A: {
    frets: ["x", 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0],
  },
  G: {
    frets: [3, 1, 0, 0, 3, 3],
    fingers: [2, 1, 0, 0, 3, 4],
  },
  E: {
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
  },
  D: {
    frets: ["x", "x", 0, 2, 3, 1],
    fingers: [0, 0, 0, 2, 3, 1],
  },
};
