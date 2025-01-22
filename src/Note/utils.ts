import { ScaleDegree, ScaleInterval } from "../types";

const mod = (n: number, m: number) => {
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
