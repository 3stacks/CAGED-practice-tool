import type { ScaleDegree, ScaleInterval } from "../types";
import { ENHARMONIC_MAP } from "../constants";

/**
 * Modulo that handles negative numbers correctly
 */
export const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
};

/**
 * Check if two notes are the same (considering enharmonic equivalents)
 */
export const isEnharmonicEqual = (a: string, b: string): boolean => {
  if (a === b) return true;
  return ENHARMONIC_MAP[a] === b;
};

/**
 * Find index of a note in an array (considering enharmonic equivalents)
 */
export const findNoteIndex = (notes: (string | null)[], note: string): number => {
  return notes.findIndex((n) => n !== null && isEnharmonicEqual(n, note));
};

/**
 * Check if a note is in an array (considering enharmonic equivalents)
 */
export const isNoteInArray = (notes: (string | null)[], note: string): boolean => {
  return findNoteIndex(notes, note) !== -1;
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
