import clsx from "clsx";
import type { Scales } from "../types";

export const getNoteClasses = (note: string, isGrayscale: boolean) => {
  const isAccidental = note.endsWith("b") || note.includes("#");

  return clsx("relative note z-10", {
    accidental: isAccidental,
    // Natural notes
    "note-C": note === "C",
    "note-D": note === "D",
    "note-E": note === "E",
    "note-F": note === "F",
    "note-G": note === "G",
    "note-A": note === "A",
    "note-B": note === "B",
    // Flat notes
    "note-Db": note === "Db",
    "note-Eb": note === "Eb",
    "note-Gb": note === "Gb",
    "note-Ab": note === "Ab",
    "note-Bb": note === "Bb",
    // Sharp notes
    "note-C-sharp": note === "C#",
    "note-D-sharp": note === "D#",
    "note-F-sharp": note === "F#",
    "note-G-sharp": note === "G#",
    "note-A-sharp": note === "A#",
    grayscale: isGrayscale,
  });
};

export const prefixInterval = (interval: number, activeScale: Scales) => {
  return interval;
};
