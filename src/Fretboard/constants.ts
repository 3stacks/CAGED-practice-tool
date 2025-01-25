import { CircleOfFifthsNotes } from "./types";

export const CIRCLE_OF_FIFTHS: CircleOfFifthsNotes[] = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "Gb",
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
];

export const circleOfFifthsNoteAudio: Record<CircleOfFifthsNotes, string> = {
  E: "/e1.m4a",
  F: "/F.m4a",
  Gb: "/Gb.m4a",
  G: "/G.m4a",
  Ab: "/Ab.m4a",
  A: "/A.m4a",
  Bb: "/Bb.m4a",
  B: "/B.m4a",
  C: "/C.m4a",
  Db: "/Db.m4a",
  D: "/D.m4a",
  Eb: "/Eb.m4a",
};
