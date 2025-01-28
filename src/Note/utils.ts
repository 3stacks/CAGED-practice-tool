import clsx from "clsx";
import { Notes, ScaleDegree, ScaleInterval } from "../types";

export const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
};

/**
 * Intervals for respective chords
 * Tonic - 1, 3, 5
 * ii - 2, 4, 6
 * iii - 3, 5, 7
 * IV - 4, 6, 1
 * V - 5, 7, 2
 * vi - 6, 1, 3
 * vii° - 7, 2, 4
 */
export const transformInterval = (
  baseInterval: ScaleInterval,
  scaleDegree: ScaleDegree,
  relativeIntervals: boolean
) => {
  if (!relativeIntervals) {
    return baseInterval;
  }

  switch (scaleDegree) {
    case "I":
      return baseInterval;
    case "ii":
      return mod(baseInterval - 1, 7);
    case "iii":
      return mod(baseInterval - 2, 7);
    case "IV":
      return mod(baseInterval - 3, 7);
    case "V":
      return mod(baseInterval - 4, 7);
    case "vi":
      return mod(baseInterval - 5, 7);
    case "vii°":
      return mod(baseInterval - 6, 7);
  }
};

export const isIntervalInTriad = (
  interval: number,
  scaleDegree: ScaleDegree
) => {
  switch (scaleDegree) {
    case "I":
      return [1, 3, 5].includes(interval);
    case "ii":
      return [2, 4, 6].includes(interval);
    case "iii":
      return [3, 5, 7].includes(interval);
    case "IV":
      return [4, 6, 1].includes(interval);
    case "V":
      return [5, 7, 2].includes(interval);
    case "vi":
      return [6, 1, 3].includes(interval);
    case "vii°":
      return [7, 2, 4].includes(interval);
  }
};

export const getNoteClasses = (note: string, isGrayscale: boolean) => {
  return clsx("relative note z-10", {
    flat: note.endsWith("b"),
    "note-C": note === "C",
    "note-Db": note === "Db",
    "note-D": note === "D",
    "note-Eb": note === "Eb",
    "note-E": note === "E",
    "note-F": note === "F",
    "note-Gb": note === "Gb",
    "note-G": note === "G",
    "note-Ab": note === "Ab",
    "note-A": note === "A",
    "note-Bb": note === "Bb",
    "note-B": note === "B",
    grayscale: isGrayscale,
  });
};

export const prefixInterval = (interval: number, activeScale: Scales) => {
  if (activeScale.includes("minor") && [3, 6, 7].includes(interval)) {
    return `b${interval}`;
  }

  return interval;
};
