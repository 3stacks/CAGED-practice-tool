import type {
  Interval,
  ScaleDegree,
  ScaleInterval,
  StringNumber,
} from "./types";

const filterIntervals = (intervals: [number, number][]) => {
  return intervals.filter(([position]) => {
    return position >= 0;
  });
};

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

/**
 * TODO: filter and alter intervals based on the active
 * scale here instead of in the String component
 */
export const intervalGetterFactory = (
  stringNumber: StringNumber,
  scaleDegree: ScaleDegree,
  relativeIntervals: boolean
): {
  getCIntervals(rootPosition: number): Interval[];
  getAIntervals(rootPosition: number): Interval[];
  getGIntervals(rootPosition: number): Interval[];
  getEIntervals(rootPosition: number): Interval[];
  getDIntervals(rootPosition: number): Interval[];
  getAllIntervals(rootPosition: number): Interval[];
} => {
  const ONE = transformInterval(1, scaleDegree, relativeIntervals);
  const TWO = transformInterval(2, scaleDegree, relativeIntervals);
  const THREE = transformInterval(3, scaleDegree, relativeIntervals);
  const FOUR = transformInterval(4, scaleDegree, relativeIntervals);
  const FIVE = transformInterval(5, scaleDegree, relativeIntervals);
  const SIX = transformInterval(6, scaleDegree, relativeIntervals);
  const SEVEN = transformInterval(7, scaleDegree, relativeIntervals);

  switch (stringNumber) {
    case 1:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, THREE],
            [rootPosition - 2, FOUR],
            [rootPosition, FIVE],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, FIVE],
            [rootPosition + 2, SIX],
            [rootPosition + 4, SEVEN],
            [rootPosition + 5, ONE],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, SIX],
            [rootPosition - 1, SEVEN],
            [rootPosition, ONE],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, SEVEN],
            [rootPosition, ONE],
            [rootPosition + 2, TWO],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, TWO],
            [rootPosition + 2, THREE],
            [rootPosition + 3, FOUR],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, THREE],
            [rootPosition - 2, FOUR],
            [rootPosition, FIVE],
            [rootPosition + 2, SIX],
            [rootPosition + 4, SEVEN],
            [rootPosition + 5, ONE],
            [rootPosition + 7, TWO],
            [rootPosition + 9, THREE],
            [rootPosition + 10, FOUR],
          ]);
        },
      };
    case 2:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, SEVEN],
            [rootPosition - 2, ONE],
            [rootPosition, TWO],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, TWO],
            [rootPosition + 2, THREE],
            [rootPosition + 3, FOUR],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, THREE],
            [rootPosition - 2, FOUR],
            [rootPosition, FIVE],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, FIVE],
            [rootPosition + 2, SIX],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, SIX],
            [rootPosition + 2, SEVEN],
            [rootPosition + 3, ONE],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, SEVEN],
            [rootPosition - 2, ONE],
            [rootPosition, TWO],
            [rootPosition + 2, THREE],
            [rootPosition + 3, FOUR],
            [rootPosition + 5, FIVE],
            [rootPosition + 7, SIX],
            [rootPosition + 9, SEVEN],
            [rootPosition + 10, ONE],
          ]);
        },
      };
    case 3:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, FIVE],
            [rootPosition - 1, SIX],
            [rootPosition + 1, SEVEN],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, SIX],
            [rootPosition + 1, SEVEN],
            [rootPosition + 2, ONE],
            [rootPosition + 4, TWO],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 4, SEVEN],
            [rootPosition - 3, ONE],
            [rootPosition - 1, TWO],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, TWO],
            [rootPosition + 1, THREE],
            [rootPosition + 2, FOUR],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, THREE],
            [rootPosition, FOUR],
            [rootPosition + 2, FIVE],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, SIX],
            [rootPosition + 1, SEVEN],
            [rootPosition + 2, ONE],
            [rootPosition + 4, TWO],
            [rootPosition + 6, THREE],
            [rootPosition + 7, FOUR],
            [rootPosition + 9, FIVE],
          ]);
        },
      };
    case 4:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, TWO],
            [rootPosition - 1, THREE],
            [rootPosition, FOUR],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, THREE],
            [rootPosition, FOUR],
            [rootPosition + 2, FIVE],
            [rootPosition + 4, SIX],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, FIVE],
            [rootPosition - 1, SIX],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, SIX],
            [rootPosition + 1, SEVEN],
            [rootPosition + 2, ONE],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, SEVEN],
            [rootPosition, ONE],
            [rootPosition + 2, TWO],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, TWO],
            [rootPosition - 1, THREE],
            [rootPosition, FOUR],
            [rootPosition + 2, FIVE],
            [rootPosition + 4, SIX],
            [rootPosition + 6, SEVEN],
            [rootPosition + 7, ONE],
            [rootPosition + 9, TWO],
          ]);
        },
      };
    case 5:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, SIX],
            [rootPosition - 1, SEVEN],
            [rootPosition, ONE],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, SEVEN],
            [rootPosition, ONE],
            [rootPosition + 2, TWO],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, TWO],
            [rootPosition - 1, THREE],
            [rootPosition, FOUR],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, THREE],
            [rootPosition, FOUR],
            [rootPosition + 2, FIVE],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 2, FOUR],
            [rootPosition, FIVE],
            [rootPosition + 2, SIX],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, SIX],
            [rootPosition - 1, SEVEN],
            [rootPosition, ONE],
            [rootPosition + 2, TWO],
            [rootPosition + 4, THREE],
            [rootPosition + 5, FOUR],
            [rootPosition + 7, FIVE],
            [rootPosition + 9, SIX],
          ]);
        },
      };
    case 6:
    default:
      return {
        getCIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, THREE],
            [rootPosition - 2, FOUR],
            [rootPosition, FIVE],
          ]);
        },
        getAIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition, FIVE],
            [rootPosition + 2, SIX],
          ]);
        },
        getGIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, SIX],
            [rootPosition - 1, SEVEN],
            [rootPosition, ONE],
          ]);
        },
        getEIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 1, SEVEN],
            [rootPosition, ONE],
            [rootPosition + 2, TWO],
          ]);
        },
        getDIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 2, ONE],
            [rootPosition, TWO],
            [rootPosition + 2, THREE],
          ]);
        },
        getAllIntervals(rootPosition: number) {
          return filterIntervals([
            [rootPosition - 3, THREE],
            [rootPosition - 2, FOUR],
            [rootPosition, FIVE],
            [rootPosition + 2, SIX],
            [rootPosition + 4, SEVEN],
            [rootPosition + 5, ONE],
            [rootPosition + 7, TWO],
            [rootPosition + 9, THREE],
          ]);
        },
      };
  }
};
